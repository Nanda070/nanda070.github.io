import discord
from discord.ext import commands
from discord import app_commands
import asyncio
from utils import extract_id
import config


async def execute_ban(guild: discord.Guild, target_obj: discord.Object, reason: str, days: int):
    try:
        await guild.ban(target_obj, reason=reason, delete_message_days=days)
        return True, guild.name
    except discord.Forbidden:
        return False, f"{guild.name} (Нет прав)"
    except Exception as e:
        return False, f"{guild.name} ({str(e)})"


async def execute_unban(guild: discord.Guild, target_obj: discord.Object, reason: str):
    try:
        await guild.unban(target_obj, reason=reason)
        return True, guild.name
    except discord.NotFound:
        return False, f"{guild.name} (Не в бане)"
    except discord.Forbidden:
        return False, f"{guild.name} (Нет прав)"
    except Exception as e:
        return False, f"{guild.name} ({str(e)})"


async def execute_kick(guild: discord.Guild, target_obj: discord.Object, reason: str):
    try:
        await guild.kick(target_obj, reason=reason)
        return True, guild.name
    except discord.NotFound:
        return False, f"{guild.name} (Отсутствует)"
    except discord.HTTPException as e:
        if e.code == 10007:
            return False, f"{guild.name} (Отсутствует)"
        return False, f"{guild.name} (HTTP {e.status})"
    except discord.Forbidden:
        return False, f"{guild.name} (Нет прав)"
    except Exception as e:
        return False, f"{guild.name} ({str(e)})"


class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # --- СТАНДАРТНЫЕ КОМАНДЫ (С ИСКЛЮЧЕНИЯМИ) ---
    @app_commands.command(name="kick", description="Кик по фракциям (Игнорирует защищенные сервера)")
    @app_commands.describe(user="Пинг или ID", reason="Причина")
    @app_commands.checks.has_permissions(administrator=True)
    async def standard_kick(self, interaction: discord.Interaction, user: str, reason: str):
        await interaction.response.defer(ephemeral=False)
        target_id = extract_id(user)
        if not target_id:
            return await interaction.followup.send("❌ Ошибка парсинга таргета.")

        target_obj = discord.Object(id=target_id)
        audit_reason = f"Standard Kick | Admin: {interaction.user.name} | Reason: {reason}"

        # Фильтруем сервера-исключения
        target_guilds = [g_id for g_id in self.bot.managed_servers if g_id not in config.PROTECTED_SERVERS]
        tasks = [execute_kick(self.bot.get_guild(g_id), target_obj, audit_reason) for g_id in target_guilds if
                 self.bot.get_guild(g_id)]

        results = await asyncio.gather(*tasks)
        success = [res[1] for res in results if res[0]]
        failed = [res[1] for res in results if not res[0]]

        status_msg = f"**Успех:** {', '.join(success) if success else 'Не найден'}\n"
        if failed: status_msg += f"**Пропуски:** {', '.join(failed)}"

        await interaction.followup.send(f"✅ Операция завершена.\n{status_msg}")

    @app_commands.command(name="ban", description="Блокировка по фракциям (Игнорирует защищенные сервера)")
    @app_commands.describe(user="Пинг или ID", reason="Причина", days="Удаление сообщений (0-7 дн)")
    @app_commands.checks.has_permissions(administrator=True)
    async def standard_ban(self, interaction: discord.Interaction, user: str, reason: str, days: int = 0):
        await interaction.response.defer(ephemeral=False)
        target_id = extract_id(user)
        if not target_id:
            return await interaction.followup.send("❌ Ошибка парсинга таргета.")

        days = max(0, min(days, 7))
        target_obj = discord.Object(id=target_id)
        audit_reason = f"Standard Ban | Admin: {interaction.user.name} | Reason: {reason}"

        target_guilds = [g_id for g_id in self.bot.managed_servers if g_id not in config.PROTECTED_SERVERS]
        tasks = [execute_ban(self.bot.get_guild(g_id), target_obj, audit_reason, days) for g_id in target_guilds if
                 self.bot.get_guild(g_id)]

        results = await asyncio.gather(*tasks)
        success = [res[1] for res in results if res[0]]
        failed = [res[1] for res in results if not res[0]]

        status_msg = f"**Успех:** {', '.join(success) if success else 'Нигде'}\n"
        if failed: status_msg += f"**Ошибки:** {', '.join(failed)}"

        await interaction.followup.send(f"✅ Операция завершена.\n{status_msg}")

    # --- ПОЛНЫЕ КОМАНДЫ (БЬЮТ ПО ВСЕМ) ---
    @app_commands.command(name="kick-full", description="Глобальный кик абсолютно со всех серверов пула")
    @app_commands.describe(user="Пинг или ID", reason="Причина")
    @app_commands.checks.has_permissions(administrator=True)
    async def full_kick(self, interaction: discord.Interaction, user: str, reason: str):
        await interaction.response.defer(ephemeral=False)
        target_id = extract_id(user)
        if not target_id:
            return await interaction.followup.send("❌ Ошибка парсинга таргета.")

        target_obj = discord.Object(id=target_id)
        audit_reason = f"FULL Kick | Admin: {interaction.user.name} | Reason: {reason}"

        tasks = [execute_kick(self.bot.get_guild(g_id), target_obj, audit_reason) for g_id in self.bot.managed_servers
                 if self.bot.get_guild(g_id)]
        results = await asyncio.gather(*tasks)

        success = [res[1] for res in results if res[0]]
        failed = [res[1] for res in results if not res[0]]

        status_msg = f"**Успех:** {', '.join(success) if success else 'Не найден'}\n"
        if failed: status_msg += f"**Пропуски:** {', '.join(failed)}"

        await interaction.followup.send(f"⚠️ ГЛОБАЛЬНАЯ операция завершена.\n{status_msg}")

    @app_commands.command(name="ban-full", description="Глобальный бан абсолютно со всех серверов пула")
    @app_commands.describe(user="Пинг или ID", reason="Причина", days="Удаление сообщений (0-7 дн)")
    @app_commands.checks.has_permissions(administrator=True)
    async def full_ban(self, interaction: discord.Interaction, user: str, reason: str, days: int = 0):
        await interaction.response.defer(ephemeral=False)
        target_id = extract_id(user)
        if not target_id:
            return await interaction.followup.send("❌ Ошибка парсинга таргета.")

        days = max(0, min(days, 7))
        target_obj = discord.Object(id=target_id)
        audit_reason = f"FULL Ban | Admin: {interaction.user.name} | Reason: {reason}"

        tasks = [execute_ban(self.bot.get_guild(g_id), target_obj, audit_reason, days) for g_id in
                 self.bot.managed_servers if self.bot.get_guild(g_id)]
        results = await asyncio.gather(*tasks)

        success = [res[1] for res in results if res[0]]
        failed = [res[1] for res in results if not res[0]]

        status_msg = f"**Успех:** {', '.join(success) if success else 'Нигде'}\n"
        if failed: status_msg += f"**Ошибки:** {', '.join(failed)}"

        await interaction.followup.send(f"⚠️ ГЛОБАЛЬНАЯ операция завершена.\n{status_msg}")

    @app_commands.command(name="unban", description="Глобальный разбан по инфраструктуре")
    @app_commands.describe(user_id="ID Пользователя")
    @app_commands.checks.has_permissions(administrator=True)
    async def global_unban(self, interaction: discord.Interaction, user_id: str):
        # ... (Код unban не менялся, работает глобально везде) ...
        await interaction.response.defer(ephemeral=False)
        target_id = extract_id(user_id)
        if not target_id:
            return await interaction.followup.send("❌ Ошибка парсинга таргета.")

        target_obj = discord.Object(id=target_id)
        audit_reason = f"Global Unban | Admin: {interaction.user.name}"

        tasks = [execute_unban(self.bot.get_guild(g_id), target_obj, audit_reason) for g_id in self.bot.managed_servers
                 if self.bot.get_guild(g_id)]
        results = await asyncio.gather(*tasks)

        success = [res[1] for res in results if res[0]]
        failed = [res[1] for res in results if not res[0]]

        status_msg = f"**Успех:** {', '.join(success) if success else 'Нигде'}\n"
        if failed: status_msg += f"**Пропуски:** {', '.join(failed)}"

        await interaction.followup.send(f"✅ Операция завершена.\n{status_msg}")


async def setup(bot):
    await bot.add_cog(Moderation(bot))
import discord
from discord.ext import commands
from discord import app_commands
from utils import extract_id, ConfigManager, logger


class System(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="инвайт-админ", description="Генерирует инвайты (30 минут, 3 слота) на все сервера")
    @app_commands.checks.has_permissions(administrator=True)
    async def admin_invites(self, interaction: discord.Interaction):
        # Ожидание, т.к. дергаем API сразу нескольких серверов
        await interaction.response.defer(ephemeral=True)

        invites_list = []
        for g_id in self.bot.managed_servers:
            guild = self.bot.get_guild(g_id)
            if not guild:
                invites_list.append(f"❌ `{g_id}` — Узел недоступен (бот оффлайн)")
                continue

            invite_created = False
            for channel in guild.text_channels:
                # Проверяем, может ли бот создать инвайт и видит ли он вообще этот канал
                if channel.permissions_for(guild.me).create_instant_invite and channel.permissions_for(
                        guild.me).view_channel:
                    try:
                        inv = await channel.create_invite(max_age=1800, max_uses=3,
                                                          reason=f"Admin Request by {interaction.user.name}")
                        invites_list.append(f"**{guild.name}**: {inv.url}")
                        invite_created = True
                        break
                    except Exception:
                        continue

            if not invite_created:
                invites_list.append(f"❌ **{guild.name}**: Критический сбой прав доступа")

        prefix = "✅ **Сгенерированные доступы (Истекут через 30 минут):**\n\n"
        result_text = "\n".join(invites_list)

        # Предотвращение краша: Discord хард-лимит на 2000 символов
        if len(prefix) + len(result_text) > 2000:
            allowed_len = 2000 - len(prefix) - 30
            result_text = result_text[:allowed_len] + "\n\n... (Лог обрезан лимитом Discord)"

        await interaction.followup.send(content=f"{prefix}{result_text}")

    @app_commands.command(name="info_server", description="Метрики инстанса")
    @app_commands.describe(server_id="ID Сервера")
    @app_commands.checks.has_permissions(administrator=True)
    async def info_server(self, interaction: discord.Interaction, server_id: str):
        guild_id = extract_id(server_id)
        # Обработка некорректного парсинга
        if not guild_id:
            return await interaction.response.send_message("❌ Некорректный ID.", ephemeral=True)

        guild = self.bot.get_guild(guild_id)
        if not guild:
            return await interaction.response.send_message("❌ Инстанс вне зоны видимости бота.", ephemeral=True)

        embed = discord.Embed(title=f"Аналитика: {guild.name}", color=discord.Color.blue())
        if guild.icon:
            embed.set_thumbnail(url=guild.icon.url)
        embed.add_field(name="ID", value=guild.id, inline=True)
        embed.add_field(name="Owner", value=f"<@{guild.owner_id}>", inline=True)
        embed.add_field(name="Members", value=guild.member_count, inline=True)

        status = "✅ В глобальном пуле" if guild.id in self.bot.managed_servers else "❌ Автономно"
        embed.add_field(name="Статус синхронизации", value=status, inline=False)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="add_server", description="Интеграция инстанса в кластер")
    @app_commands.describe(server_id="ID Сервера")
    @app_commands.checks.has_permissions(administrator=True)
    async def add_server(self, interaction: discord.Interaction, server_id: str):
        guild_id = extract_id(server_id)
        if not guild_id:
            return await interaction.response.send_message("❌ Ошибка парсинга ID.", ephemeral=True)

        if guild_id in self.bot.managed_servers:
            return await interaction.response.send_message("⚠️ Инстанс уже существует в БД.", ephemeral=True)

        self.bot.managed_servers.append(guild_id)
        ConfigManager.save(self.bot.managed_servers)
        logger.info(f"Интегрирован узел: {guild_id}")
        await interaction.response.send_message(f"✅ Узел `{guild_id}` добавлен в пайплайн.")

    @app_commands.command(name="remove_server", description="Исключение инстанса из кластера")
    @app_commands.describe(server_id="ID Сервера")
    @app_commands.checks.has_permissions(administrator=True)
    async def remove_server(self, interaction: discord.Interaction, server_id: str):
        guild_id = extract_id(server_id)
        if not guild_id:
            return await interaction.response.send_message("❌ Ошибка парсинга ID.", ephemeral=True)

        if guild_id not in self.bot.managed_servers:
            return await interaction.response.send_message("⚠️ Узел не числится в БД.", ephemeral=True)

        self.bot.managed_servers.remove(guild_id)
        ConfigManager.save(self.bot.managed_servers)
        logger.info(f"Исключен узел: {guild_id}")
        await interaction.response.send_message(f"✅ Узел `{guild_id}` отключен.")

    @app_commands.command(name="clear_text", description="Очистка канала (Purge)")
    @app_commands.describe(amount="Объем")
    @app_commands.checks.has_permissions(manage_messages=True)
    async def clear_text(self, interaction: discord.Interaction, amount: int):
        if not 1 <= amount <= 1000:
            return await interaction.response.send_message("❌ Допустимый лимит: 1-1000.", ephemeral=True)

        await interaction.response.defer(ephemeral=True)
        try:
            deleted = await interaction.channel.purge(limit=amount)
            await interaction.followup.send(f"✅ Удалено {len(deleted)} записей.", ephemeral=True)
        except Exception as e:
            await interaction.followup.send(f"❌ Ошибка выполнения: {str(e)}", ephemeral=True)


async def setup(bot):
    await bot.add_cog(System(bot))
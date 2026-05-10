import discord
from discord.ext import commands
from discord import app_commands
from datetime import datetime
import config
from utils import extract_id

# Безопасные маркеры Markdown (обходят баг линтера PyCharm)
BLOCK = "```"
TICK = "`"


class Tickets(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="запрос-чс", description="Эскалация аккаунта в ОЧС")
    @app_commands.rename(account="аккаунт", reason="причина", server="сервер")
    @app_commands.describe(account="ID аккаунта", reason="Обоснование", server="Фракция/Сервер")
    @app_commands.checks.has_permissions(administrator=True)
    async def request_blacklist(self, interaction: discord.Interaction, account: str, reason: str, server: str):
        channel = self.bot.get_channel(config.BLACKLIST_REQ_CHANNEL)
        if not channel:
            return await interaction.response.send_message("❌ Узел маршрутизации (ЧС) недоступен. Проверьте ID в .env.",
                                                           ephemeral=True)

        embed = discord.Embed(title="Запрос: Внесение в ЧС", color=discord.Color.dark_red(), timestamp=datetime.now())
        embed.set_author(name=f"Инициатор: {interaction.user.display_name}",
                         icon_url=interaction.user.display_avatar.url if interaction.user.display_avatar else None)

        embed.add_field(name="Аккаунт", value=f"{BLOCK}\n{account}\n{BLOCK}", inline=True)
        embed.add_field(name="Сервер", value=f"{BLOCK}\n{server}\n{BLOCK}", inline=True)
        embed.add_field(name="Причина", value=f"> {reason}", inline=False)
        embed.add_field(name="Админин", value=f"<@{interaction.user.id}>\n{TICK}ID: {interaction.user.id}{TICK}",
                        inline=False)
        embed.set_footer(text="Blacklist Management System")

        role_id = str(config.BLACKLIST_ROLE_ID)
        role_ping = f"<@&{role_id}>" if role_id and role_id != "0" else None

        await channel.send(content=role_ping, embed=embed)
        await interaction.response.send_message("✅ Тикет направлен.", ephemeral=True)

    @app_commands.command(name="запрос-обход", description="проверка на обход блокировок")
    @app_commands.rename(target="подозреваемый")
    @app_commands.describe(target="ID аккаунта/Discord")
    @app_commands.checks.has_permissions(administrator=True)
    async def request_evasion(self, interaction: discord.Interaction, target: str):
        channel = self.bot.get_channel(config.TECH_REQ_CHANNEL)
        if not channel:
            return await interaction.response.send_message("❌ Узел (Тех) недоступен. Проверьте ID в .env.",
                                                           ephemeral=True)

        embed = discord.Embed(title="Обход ЧС", color=discord.Color.orange(), timestamp=datetime.now())
        embed.add_field(name="Таргет", value=f"{TICK}{target}{TICK}", inline=False)
        embed.add_field(name="Сотрудник", value=f"<@{interaction.user.id}>", inline=False)

        role_id = str(config.TECH_ROLE_ID)
        role_ping = f"<@&{role_id}>" if role_id and role_id != "0" else None

        await channel.send(content=role_ping, embed=embed)
        await interaction.response.send_message("Тикет направлен логерам.", ephemeral=True)

    @app_commands.command(name="запрос-ники", description="Деанонимизация (Discord -> Никнеймы)")
    @app_commands.rename(discord_id="дискорд")
    @app_commands.describe(discord_id="Discord ID")
    @app_commands.checks.has_permissions(administrator=True)
    async def request_nicks(self, interaction: discord.Interaction, discord_id: str):
        channel = self.bot.get_channel(config.TECH_REQ_CHANNEL)
        if not channel:
            return await interaction.response.send_message("❌ Узел (Тех) недоступен.", ephemeral=True)

        embed = discord.Embed(title="Экстракция данных: Ники", color=discord.Color.blue(), timestamp=datetime.now())

        extracted = extract_id(discord_id) or discord_id
        embed.add_field(name="Объект (ID)", value=f"{TICK}{discord_id}{TICK} (<@{extracted}>)", inline=False)
        embed.add_field(name="Сотрудник", value=f"<@{interaction.user.id}>", inline=False)

        role_id = str(config.TECH_ROLE_ID)
        role_ping = f"<@&{role_id}>" if role_id and role_id != "0" else None

        await channel.send(content=role_ping, embed=embed)
        await interaction.response.send_message("✅ Запрос на выгрузку сформирован.", ephemeral=True)

    @app_commands.command(name="запрос-логи", description="Запрос парсинга манилогов")
    @app_commands.rename(account="аккаунт", target_data="что_ищем")
    @app_commands.describe(account="Static ID / Ник", target_data="Параметры поиска")
    @app_commands.checks.has_permissions(administrator=True)
    async def request_moneylogs(self, interaction: discord.Interaction, account: str, target_data: str):
        channel = self.bot.get_channel(config.TECH_REQ_CHANNEL)
        if not channel:
            return await interaction.response.send_message("❌ Узел (Тех) недоступен.", ephemeral=True)

        embed = discord.Embed(title="Выгрузка: Манилоги", color=discord.Color.purple(), timestamp=datetime.now())
        embed.add_field(name="Аккаунт", value=f"{TICK}{account}{TICK}", inline=False)
        embed.add_field(name="Спецификация поиска", value=f"{BLOCK}\n{target_data}\n{BLOCK}", inline=False)
        embed.add_field(name="Инициатор", value=f"<@{interaction.user.id}>", inline=False)

        role_id = str(config.TECH_ROLE_ID)
        role_ping = f"<@&{role_id}>" if role_id and role_id != "0" else None

        await channel.send(content=role_ping, embed=embed)
        await interaction.response.send_message("✅ ТЗ направлено техническим специалистам.", ephemeral=True)

    @app_commands.command(name="запрос-вирты", description="Эскалация расследования RMT")
    @app_commands.rename(account="нарушитель", reason="основание")
    @app_commands.describe(account="Static ID", reason="Причина расследования")
    @app_commands.checks.has_permissions(administrator=True)
    async def request_rmt(self, interaction: discord.Interaction, account: str, reason: str):
        channel = self.bot.get_channel(config.TECH_REQ_CHANNEL)
        if not channel:
            return await interaction.response.send_message("❌ Узел (Тех) недоступен.", ephemeral=True)

        embed = discord.Embed(title="Инцидент Врт", color=discord.Color.red(), timestamp=datetime.now())
        embed.add_field(name="Таргет", value=f"{TICK}{account}{TICK}", inline=False)
        embed.add_field(name="Контекст", value=f"> {reason}", inline=False)
        embed.add_field(name="Сотрудник", value=f"<@{interaction.user.id}>", inline=False)

        role_id = str(config.TECH_ROLE_ID)
        role_ping = f"<@&{role_id}>" if role_id and role_id != "0" else None

        await channel.send(content=role_ping, embed=embed)
        await interaction.response.send_message("✅ Инцидент зафиксирован и передан в работу.", ephemeral=True)


async def setup(bot):
    await bot.add_cog(Tickets(bot))
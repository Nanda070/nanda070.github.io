import React from 'react';
import { Activity, Lock, Network, Zap, Command, Database, ShieldAlert, Code2, Globe } from 'lucide-react';

export const SYSTEM_CONFIG = {
  user: "Nanda",
  role: "SYSTEMS_ENGINEER // ARCHITECT",
  status: "ONLINE",
  clearance: "LEVEL_ROOT",
  location: "BAKU_NODE_01"
};

export const SYSTEM_METRICS = [
  { label: 'UPTIME', val: '99.99%', icon: <Activity size={14} className="text-green-500" /> },
  { label: 'ENCRYPTION', val: 'AES-256-GCM', icon: <Lock size={14} className="text-green-500" /> },
  { label: 'NODES_ACTIVE', val: '128/128', icon: <Network size={14} className="text-green-500" /> },
  { label: 'LATENCY', val: '8ms', icon: <Zap size={14} className="text-green-500" /> }
];

export const TECH_MATRIX = [
  { group: 'BACKEND_CORE', items: ['Python 3.11+', 'Node.js', 'Java 17', 'C# / .NET'] },
  { group: 'INFRASTRUCTURE', items: ['Debian/Ubuntu', 'Docker & Compose', 'tmux', 'CI/CD'] },
  { group: 'DATABASES', items: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite'] },
  { group: 'INTEGRATIONS', items: ['discord.py', 'Spigot/Paper API', 'REST', 'WebSockets'] }
];

export const TIMELINE = [
  { date: 'CURRENT', title: 'LIFE5RP Core Sync', desc: 'Slash-архитектура, изоляция стейта пользователей. Автоматизация выдачи токенов без ручного вмешательства.' },
  { date: 'PREVIOUS', title: 'AstraSMP Architecture', desc: 'Модификация Java-кода. Кастомные эвенты, Voice Chat, отказоустойчивая система Whitelist.' },
  { date: 'ARCHIVE', title: 'Auth System (DF/USAF/MP)', desc: 'Генератор ID. Рефакторинг структур данных, зачистка рудиментарных полей ("звание").' }
];

export const PROJECTS = [
  { id: 'PRJ-ALPHA', name: 'RoleSync Daemon', type: 'Discord.py / Asyncio', desc: 'Автоматизированный демон LIFE5RP. Отслеживание изменений стейта и зеркалирование ролей.', icon: <Command size={28} /> },
  { id: 'PRJ-BETA', name: 'AstraSMP Controller', type: 'Java / Bukkit', desc: 'Плагин управления ядром. Оптимизация нагрузки на Main Thread, кастомный хендлинг.', icon: <Database size={28} /> },
  { id: 'PRJ-GAMMA', name: 'Security Audit Core', type: 'Python / PostgreSQL', desc: 'Логирование действий. Формирование репортов и пресечение несанкционированного доступа.', icon: <ShieldAlert size={28} /> },
  { id: 'PRJ-DELTA', name: 'Identity Generator', type: 'Cryptography', desc: 'Генерация валидируемых идентификаторов для авторизации департаментов.', icon: <Lock size={28} /> }
];

export const DOCKER_CONTAINERS = [
  { name: 'role_sync_daemon', image: 'python:3.11-slim', status: 'Up 14 days', ports: '-', cpu: '2.4%' },
  { name: 'pg_cluster_main', image: 'postgres:15-alpine', status: 'Up 14 days', ports: '5432:5432', cpu: '1.1%' },
  { name: 'redis_cache', image: 'redis:alpine', status: 'Up 14 days', ports: '6379:6379', cpu: '0.2%' },
  { name: 'api_gateway', image: 'nginx:alpine', status: 'Up 14 days', ports: '80, 443', cpu: '0.5%' }
];

export const VFS_DATA = {
  "docker-compose.yml": `version: '3.8'\nservices:\n  bot_core:\n    build: .\n    restart: unless-stopped\n    environment:\n      - TOKEN=\${DISCORD_TOKEN}\n      - DB_URI=postgresql://user:pass@db:5432/core\n    depends_on:\n      - db\n      - redis\n  db:\n    image: postgres:15-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:`,
  "nginx.conf": `server {\n    listen 80;\n    server_name api.nanda-sys.dev;\n    location / {\n        proxy_pass http://localhost:8000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        add_header X-Frame-Options "DENY";\n        add_header X-Content-Type-Options "nosniff";\n    }\n}`,
  "sync_daemon.py": `import discord\nfrom discord.ext import tasks\nimport asyncio\n\nclass RoleSyncDaemon:\n    def __init__(self, bot):\n        self.bot = bot\n        self.sync_loop.start()\n\n    @tasks.loop(minutes=5.0)\n    async def sync_loop(self):\n        """Non-destructive role synchronization."""\n        print("[DAEMON] Initiating state check...")\n        await self.process_state_deltas()\n\n    async def process_state_deltas(self):\n        pass`
};

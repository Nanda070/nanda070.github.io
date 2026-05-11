import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  TerminalSquare, ShieldAlert, Cpu, X, Database, 
  Activity, Server, Lock, Command, Layers, Network, Zap, 
  Globe, BarChart, Code2, User, Fingerprint, Crosshair, Binary,
  Share2, FolderTree, FileCode, ShieldCheck, Play
} from 'lucide-react';

// --- DATABASE & CONFIG ---
const SYSTEM_CONFIG = {
  user: "Nanda",
  role: "SYSTEMS_ENGINEER // ARCHITECT",
  status: "ONLINE",
  clearance: "LEVEL_ROOT",
  location: "BAKU_NODE_01"
};

const BOOT_LOGS = [
  "[OK] Booting System Kernel 6.2.0-secure...",
  "[OK] Mount root filesystem... DONE",
  "[OK] Initialize network interfaces... eth0 UP",
  "[OK] Starting SSH daemon... PORT 22 SECURED",
  "[OK] Loading cryptography modules... AES-256-GCM ACTIVE",
  "[OK] Establishing link to backend clusters... OK",
  `[OK] Fetching user profile: ${SYSTEM_CONFIG.user.toUpperCase()}... SUCCESS`,
  "[OK] Bypassing legacy protocols... OVERRIDE ENGAGED",
  "[!!] INITIATING FRONTEND TERMINAL_UI COMPOSITOR..."
];

const SYSTEM_METRICS = [
  { label: 'UPTIME', val: '99.99%', icon: <Activity size={14} className="text-green-500" /> },
  { label: 'ENCRYPTION', val: 'AES-256-GCM', icon: <Lock size={14} className="text-green-500" /> },
  { label: 'NODES_ACTIVE', val: '128/128', icon: <Network size={14} className="text-green-500" /> },
  { label: 'LATENCY', val: '8ms', icon: <Zap size={14} className="text-green-500" /> }
];

const TECH_MATRIX = [
  { group: 'BACKEND_CORE', items: ['Python 3.11+', 'Node.js', 'Java 17', 'C# / .NET', 'REST API'] },
  { group: 'INFRASTRUCTURE', items: ['Debian/Ubuntu', 'Docker & Compose', 'tmux sessions', 'Nginx', 'CI/CD Pipelines'] },
  { group: 'DATABASES', items: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL / SQLite'] },
  { group: 'INTEGRATIONS', items: ['discord.py (Slash Arch)', 'Spigot / Paper API', 'WebSockets', 'OAuth2'] }
];

const TIMELINE = [
  { date: 'RUNTIME: CURRENT', title: 'LIFE5RP Core Synchronization', desc: 'Проектирование slash-архитектуры. Изолированная синхронизация стейта пользователей. Автоматизация выдачи токенов без ручного вмешательства. Строгое удаление деструктивных функций (auto-kick).' },
  { date: 'RUNTIME: PREVIOUS', title: 'AstraSMP Server Architecture', desc: 'Глубокая модификация Java-кода (Bukkit/Spigot). Реализация кастомных эвентов, настройка серверного Voice Chat и отказоустойчивой системы Whitelist.' },
  { date: 'ARCHIVE', title: 'Department Auth System (DF/USAF/MP)', desc: 'Разработка генератора уникальных идентификаторов. Рефакторинг структур данных: оптимизация раздела "Знание Законодательной Базы", зачистка рудиментарных полей ("звание").' }
];

const PROJECTS = [
  { id: 'PRJ-ALPHA', name: 'RoleSync Daemon', type: 'Discord.py / Asyncio', desc: 'Автоматизированный демон для LIFE5RP. Мгновенное отслеживание изменений стейта пользователей и зеркалирование ролей между узлами.', icon: <Command size={28} /> },
  { id: 'PRJ-BETA', name: 'AstraSMP Controller', type: 'Java / Bukkit API', desc: 'Плагин управления ядром сервера. Оптимизация нагрузки на основной поток (Main Thread), кастомный хендлинг событий.', icon: <Database size={28} /> },
  { id: 'PRJ-GAMMA', name: 'Security Audit Core', type: 'Python / PostgreSQL', desc: 'Продвинутая система логирования действий. Автоматическое формирование репортов и пресечение несанкционированных попыток доступа.', icon: <ShieldAlert size={28} /> },
  { id: 'PRJ-DELTA', name: 'Identity Generator', type: 'Cryptography', desc: 'Генерация валидируемых идентификаторов для авторизации департаментов. Поддержка ротации ключей и истечения срока действия.', icon: <Lock size={28} /> },
  { id: 'PRJ-EPSILON', name: 'Native Launcher', type: 'C# / .NET', desc: 'Десктопное приложение для автоматизации запуска, верификации хешей и обновления клиентских файлов.', icon: <Code2 size={28} /> },
  { id: 'PRJ-ZETA', name: 'Telemetry Dashboard', type: 'React / Node.js', desc: 'Визуализация сетевой активности и метрик производительности изолированных контейнеров в реальном времени.', icon: <Globe size={28} /> }
];

const VFS_DATA = {
  "docker-compose.yml": `version: '3.8'
services:
  bot_core:
    build: .
    restart: unless-stopped
    environment:
      - TOKEN=\${DISCORD_TOKEN}
      - DB_URI=postgresql://user:pass@db:5432/core
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
  
  redis:
    image: redis:alpine
    command: redis-server --requirepass \${REDIS_PASS}

volumes:
  pgdata:`,
  "nginx.conf": `server {
    listen 80;
    server_name api.nanda-sys.dev;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_addrs;
        
        # Security Headers
        add_header X-Frame-Options "DENY";
        add_header X-Content-Type-Options "nosniff";
    }
}`,
  "sync_daemon.py": `import discord
from discord.ext import tasks
import asyncio

class RoleSyncDaemon:
    def __init__(self, bot):
        self.bot = bot
        self.sync_loop.start()

    @tasks.loop(minutes=5.0)
    async def sync_loop(self):
        """Non-destructive role synchronization."""
        print("[DAEMON] Initiating state check...")
        # Business logic isolated from API wrapper
        await self.process_state_deltas()

    async def process_state_deltas(self):
        # Implementation hidden for security
        pass`
};

// --- UTILS & COMPONENTS ---
const useTypewriter = (text, speed = 15) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0; setDisplayText('');
    const typing = setInterval(() => {
      setDisplayText(text.substring(0, i)); i++;
      if (i > text.length) clearInterval(typing);
    }, speed);
    return () => clearInterval(typing);
  }, [text, speed]);
  return displayText;
};

const Scanlines = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] opacity-10 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
);

const HexDump = () => {
  const [dump, setDump] = useState([]);
  useEffect(() => {
    const generateLine = () => {
      const addr = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(8, '0');
      const hex = Array.from({length: 8}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ');
      return `${addr}  ${hex}`;
    };
    const interval = setInterval(() => setDump(prev => [...prev.slice(-14), generateLine()]), 150);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-mono text-[9px] text-green-500/40 space-y-0.5">
      {dump.map((line, i) => <div key={i}>{line}</div>)}
    </div>
  );
};

const LiveGraph = () => {
  const [bars, setBars] = useState(Array.from({ length: 50 }, () => Math.random() * 100));
  useEffect(() => {
    const interval = setInterval(() => setBars(prev => [...prev.slice(1), Math.random() * 100]), 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-28 flex items-end gap-[2px] opacity-80">
      {bars.map((h, i) => <div key={i} className="flex-1 bg-green-500 transition-all duration-75" style={{ height: `${h}%`, opacity: h / 100 }} />)}
    </div>
  );
};

const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const IPS = ['192.168.1.10', '10.0.4.55', '172.16.254.1', '45.33.22.11', '127.0.0.1'];
  const ACTIONS = ['POST /api/v2/sync', 'GET /health_check', 'AUTH_TOKEN_GEN', 'CRON_JOB_EXEC', 'DB_QUERY_OK'];
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toISOString()}] ${IPS[Math.floor(Math.random()*IPS.length)]} -> ${ACTIONS[Math.floor(Math.random()*ACTIONS.length)]}`;
      setLogs(prev => [...prev.slice(-18), newLog]);
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-mono text-[9px] text-green-500/60 space-y-1 h-[220px] flex flex-col justify-end overflow-hidden">
      {logs.map((log, i) => <div key={i}>{log}</div>)}
    </div>
  );
};

const ThreatMonitor = () => {
  const [threats, setThreats] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const port = [22, 3306, 443, 80][Math.floor(Math.random()*4)];
        const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
        const type = port === 22 ? 'SSH BRUTEFORCE' : 'DDoS PROBE';
        setThreats(prev => [...prev.slice(-4), { ip, port, type, time: new Date().toLocaleTimeString() }]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-red-900/40 bg-[#1a0505] p-6 shadow-inner relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
      <div className="text-[10px] text-red-500 uppercase tracking-widest mb-4 border-b border-red-900/50 pb-2 flex justify-between">
        <span className="flex items-center gap-2"><ShieldCheck size={14}/> THREAT_DEFENSE_MATRIX</span>
        <span className="animate-pulse">ACTIVE_BLOCK</span>
      </div>
      <div className="space-y-2">
        {threats.map((t, i) => (
          <div key={i} className="flex justify-between items-center text-[10px] font-mono border border-red-900/30 p-2 bg-red-950/20">
            <span className="text-red-400">[{t.time}] {t.type}</span>
            <span className="text-gray-500">SRC: {t.ip}:{t.port}</span>
            <span className="text-red-500 font-bold bg-red-900/30 px-2">BLOCKED</span>
          </div>
        ))}
        {threats.length === 0 && <div className="text-[10px] text-green-500 font-mono">NO THREATS DETECTED. IDS/IPS ARMED.</div>}
      </div>
    </div>
  );
};

// --- PAGES ---

const Dashboard = ({ setIsBooting }) => {
  const heroText = useTypewriter(`> ACCESS GRANTED.\n> ROOT_USER DETECTED: ${SYSTEM_CONFIG.user.toUpperCase()}.\n> SYSTEM AWAITING INPUT...`, 30);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([{ type: 'system', text: 'Type "help" to view available execution protocols.' }]);
  const cliEndRef = useRef(null);

  const handleCliSubmit = (e) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    const cmd = cliInput.trim().toLowerCase();
    const newHistory = [...cliHistory, { type: 'user', text: `root@${SYSTEM_CONFIG.user.toLowerCase()}:~# ${cliInput}` }];
    
    switch(cmd) {
      case 'help': newHistory.push({ type: 'system', text: 'Commands: help, status, whoami, neofetch, ping, ls, reboot, clear' }); break;
      case 'whoami': newHistory.push({ type: 'system', text: `${SYSTEM_CONFIG.user}. ${SYSTEM_CONFIG.role}.` }); break;
      case 'ls': newHistory.push({ type: 'system', text: 'bin  boot  dev  etc  home  lib  opt  root  sbin  sys  usr  var  dossier.txt' }); break;
      case 'neofetch':
        newHistory.push({ type: 'system', text: `
   /\\   | OS: Ubuntu 24.04 LTS (Secure Core)
  /  \\  | Kernel: 6.2.0-secure
 /____\\ | Uptime: 99.99%
/      \\| Architect: ${SYSTEM_CONFIG.user}
        ` });
        break;
      case 'ping': newHistory.push({ type: 'system', text: 'Pinging main cluster... 8ms. CONNECTION STABLE.' }); break;
      case 'reboot': setIsBooting(true); return;
      case 'status': newHistory.push({ type: 'system', text: 'All clusters operational. No network anomalies detected. Firewalls active.' }); break;
      case 'clear': setCliHistory([]); setCliInput(''); return;
      default: newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found. Unauthorized execution logged.` });
    }
    setCliHistory(newHistory);
    setCliInput('');
  };

  useEffect(() => cliEndRef.current?.scrollIntoView({ behavior: "smooth" }), [cliHistory]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-in fade-in duration-500">
      <div className="xl:col-span-8 space-y-12">
        <section>
          <div className="h-16 mb-4 text-green-500/80 text-sm whitespace-pre-line font-bold">
            {heroText}<span className="animate-pulse text-white">_</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]">
            System <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-emerald-900">Overlord</span>
          </h1>
          <p className="max-w-3xl text-lg text-gray-500 border-l-4 border-green-500/50 pl-6 py-2 leading-relaxed">
            Проектирование и развертывание отказоустойчивой серверной инфраструктуры. Автоматизация бизнес-логики, глубокая модификация платформ и интеграция API. Строгий контроль над архитектурой на всех уровнях. Никакого легаси.
          </p>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-white/10 bg-[#050505] p-4 border-l-2 border-l-green-500">
            <div className="text-[10px] text-gray-500 tracking-widest mb-1">AUTHORIZATION</div>
            <div className="text-sm text-white font-bold">{SYSTEM_CONFIG.clearance}</div>
          </div>
          <div className="border border-white/10 bg-[#050505] p-4 border-l-2 border-l-green-500">
            <div className="text-[10px] text-gray-500 tracking-widest mb-1">LOCATION</div>
            <div className="text-sm text-white font-bold">{SYSTEM_CONFIG.location}</div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-4 space-y-8">
        <div className="border border-green-900/40 bg-[#050505] p-6 shadow-[0_0_30px_rgba(34,197,94,0.05)]">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between">
            <span>Cluster_Status</span>
            <span className="text-green-500 animate-pulse font-bold">{SYSTEM_CONFIG.status}</span>
          </div>
          <div className="space-y-4">
            {SYSTEM_METRICS.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  {metric.icon}
                  <span className="text-xs text-gray-400 tracking-wider group-hover:text-white transition-colors">{metric.label}</span>
                </div>
                <span className="text-xs text-green-400 font-bold tracking-wider">{metric.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 bg-[#000000] flex flex-col h-[420px] shadow-2xl">
          <div className="bg-[#050505] p-3 border-b border-white/10 flex justify-between items-center">
            <span className="text-[10px] text-green-500 font-bold tracking-widest">tty1 - admin_console</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-red-500/50 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500/50 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500/50 rounded-full"></div>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto text-xs space-y-2 scrollbar-hide whitespace-pre-wrap">
            {cliHistory.map((line, i) => (
              <div key={i} className={`${line.type === 'error' ? 'text-red-400' : line.type === 'user' ? 'text-white' : 'text-gray-400'}`}>
                {line.text}
              </div>
            ))}
            <div ref={cliEndRef} />
          </div>
          <form onSubmit={handleCliSubmit} className="p-3 border-t border-white/10 flex items-center gap-2 bg-[#050505]">
            <span className="text-green-500 text-xs font-bold">~#</span>
            <input type="text" value={cliInput} onChange={(e) => setCliInput(e.target.value)} className="bg-transparent flex-1 text-xs text-white focus:outline-none font-mono" autoComplete="off" />
          </form>
        </div>
      </div>
    </div>
  );
};

const Identity = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
    <div className="lg:col-span-4 space-y-8">
      <div className="border border-white/10 bg-[#050505] p-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500"></div>
        <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
          <User className="text-green-500" size={28} />
          <div>
            <h2 className="text-xl text-white font-black tracking-widest uppercase">{SYSTEM_CONFIG.user}</h2>
            <div className="text-[10px] text-green-500 font-bold tracking-[0.2em]">{SYSTEM_CONFIG.role}</div>
          </div>
        </div>
        <HexDump />
      </div>

      <div className="border border-white/10 bg-[#050505] p-6">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Clearance_Specs</div>
        <ul className="space-y-4">
          <li className="flex justify-between items-center text-sm"><span className="text-gray-500">System Arch:</span><span className="text-white font-bold">Verified</span></li>
          <li className="flex justify-between items-center text-sm"><span className="text-gray-500">DevOps:</span><span className="text-white font-bold">Active</span></li>
          <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Backend:</span><span className="text-white font-bold">Master</span></li>
          <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Threat Level:</span><span className="text-green-500 font-bold">Zero</span></li>
        </ul>
      </div>
    </div>

    <div className="lg:col-span-8 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <Fingerprint className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Operational_Profile</h2>
        </div>
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
          <p>
            Я <strong className="text-white">{SYSTEM_CONFIG.user}</strong>. Мой профиль — разработка сложных, масштабируемых бэкенд-систем и администрирование инфраструктур. Я не пишу код ради кода. Моя цель — автоматизация процессов, исключающая человеческий фактор.
          </p>
          <div className="border-l-2 border-green-500 bg-green-500/5 p-6 mt-8">
            <h3 className="text-white font-bold tracking-widest mb-2 flex items-center gap-2"><Crosshair size={16} className="text-green-500"/> ФИЛОСОФИЯ</h3>
            <p className="text-sm">Forward-thinking. Строгое разделение логики, микросервисная архитектура. Максимальная изоляция данных. Если фича деструктивна или избыточна — она идет под нож.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const Infrastructure = () => {
  const [mockEndpoint, setMockEndpoint] = useState('/api/v1/auth/status');
  const [mockResponse, setMockResponse] = useState('');

  const executeApi = () => {
    setMockResponse('Executing query...');
    setTimeout(() => {
      setMockResponse(JSON.stringify({
        status: 200,
        message: "OK",
        data: { active_sessions: 14, system_load: "34%", auth_server: "UP" }
      }, null, 2));
    }, 600);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <Layers className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Tech_Matrix</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_MATRIX.map((col, idx) => (
            <div key={idx} className="bg-[#050505] p-8 border border-white/5 hover:border-green-500/40 transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-[10px] text-green-500 font-bold tracking-[0.2em] mb-6 uppercase">{col.group}</div>
                <ul className="space-y-3">
                  {col.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-3">
                      <Binary size={12} className="text-green-900" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Sandbox Module */}
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <TerminalSquare className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">API_Sandbox</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#050505] border border-white/10 p-6">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">REST API Request Builder</div>
            <div className="flex gap-2 mb-4">
              <select className="bg-[#000000] border border-white/10 text-green-500 p-2 text-xs font-bold outline-none">
                <option>GET</option>
                <option>POST</option>
              </select>
              <input type="text" value={mockEndpoint} onChange={(e)=>setMockEndpoint(e.target.value)} className="bg-[#000000] border border-white/10 text-white p-2 text-xs flex-1 outline-none font-mono" />
              <button onClick={executeApi} className="bg-green-500/10 text-green-500 border border-green-500/30 px-4 hover:bg-green-500 hover:text-black transition-colors flex items-center gap-2"><Play size={14}/> EXEC</button>
            </div>
            <p className="text-xs text-gray-500">Interactive sandbox to simulate responses from the backend microservices. Proves API architecture comprehension.</p>
          </div>
          <div className="bg-[#000000] border border-white/10 p-4 h-[200px] overflow-y-auto">
            <div className="text-[10px] text-green-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Response JSON</div>
            <pre className="text-xs text-gray-300 font-mono">{mockResponse || '// Awaiting execution...'}</pre>
          </div>
        </div>
      </section>
    </div>
  );
};

const VirtualFileSystem = () => {
  const [activeFile, setActiveFile] = useState('docker-compose.yml');

  return (
    <section className="animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
        <FolderTree className="text-green-500" size={24} />
        <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">VFS_Config_Dump</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-[#050505] border border-white/10 p-4">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Repository Tree</div>
          <div className="space-y-2">
            {Object.keys(VFS_DATA).map(file => (
              <button 
                key={file} 
                onClick={() => setActiveFile(file)}
                className={`w-full text-left text-xs font-mono p-2 flex items-center gap-2 transition-colors ${activeFile === file ? 'bg-green-500/10 text-green-400 border-l-2 border-green-500' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <FileCode size={14} /> {file}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 bg-[#000000] border border-white/10 p-6 overflow-x-auto relative">
          <div className="absolute top-0 right-0 bg-green-500/10 text-green-500 text-[9px] font-bold px-2 py-1 uppercase tracking-widest">READ_ONLY</div>
          <pre className="text-sm text-gray-300 font-mono leading-relaxed">{VFS_DATA[activeFile]}</pre>
        </div>
      </div>
    </section>
  );
};

const TopologyMap = () => (
  <section className="animate-in fade-in duration-500 pb-16">
    <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
      <Share2 className="text-green-500" size={24} />
      <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Network_Topology</h2>
    </div>
    <div className="bg-[#050505] border border-white/10 p-8 h-[400px] relative overflow-hidden flex items-center justify-center">
      {/* Псевдо-схема узлов */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-3xl flex justify-between items-center">
        {/* Client */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-black border-2 border-gray-600 rounded-full flex items-center justify-center text-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.05)]"><Globe size={24}/></div>
          <span className="text-[10px] text-gray-500 font-bold tracking-widest">CLIENTS</span>
        </div>

        {/* Connection Line */}
        <div className="flex-1 h-px bg-gray-800 relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Load Balancer */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-green-950 border-2 border-green-500 rounded-lg flex items-center justify-center text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.2)]"><Network size={32}/></div>
          <span className="text-[10px] text-green-500 font-bold tracking-widest">NGINX_LB</span>
        </div>

        {/* Connection Lines Branching */}
        <div className="w-24 h-32 border-t border-b border-l border-green-900/50 relative">
             <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/50 animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500/50 animate-pulse"></div>
        </div>

        {/* Backend Nodes */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-black border border-white/20 rounded-md flex items-center justify-center text-white"><Server size={24}/></div>
            <span className="text-[10px] text-gray-400 font-bold tracking-widest">APP_NODE_1</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-black border border-white/20 rounded-md flex items-center justify-center text-white"><Server size={24}/></div>
            <span className="text-[10px] text-gray-400 font-bold tracking-widest">APP_NODE_2</span>
          </div>
        </div>

        {/* Connection to DB */}
        <div className="w-16 h-px bg-white/20"></div>

        {/* Database */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 bg-[#0a0a0a] border-2 border-blue-900 rounded-full flex items-center justify-center text-blue-500 shadow-[0_0_40px_rgba(30,58,138,0.3)]"><Database size={36}/></div>
          <span className="text-[10px] text-blue-500 font-bold tracking-widest">PG_CLUSTER</span>
        </div>
      </div>
    </div>
  </section>
);

const Deployments = () => (
  <div className="space-y-16">
    <VirtualFileSystem />
    <section className="animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
        <Cpu className="text-green-500" size={24} />
        <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Deployed_Modules</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="border border-white/5 bg-[#050505] p-8 hover:bg-[#0a0a0a] hover:border-green-500/30 transition-all group relative cursor-crosshair">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="flex justify-between items-start mb-8">
              <div className="text-green-500/40 group-hover:text-green-500 transition-colors">{proj.icon}</div>
              <div className="text-[10px] text-white/20 font-bold tracking-widest group-hover:text-green-500/50 transition-colors">{proj.id}</div>
            </div>
            <div className="text-[10px] text-green-500 font-bold tracking-[0.2em] mb-2 uppercase">{proj.type}</div>
            <h3 className="text-xl text-white font-black mb-4 uppercase">{proj.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{proj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const Telemetry = () => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <TopologyMap />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 border border-white/10 bg-[#050505] p-8 shadow-lg flex flex-col justify-between">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-3 flex justify-between items-center">
          <span>Global_Compute_Load</span>
          <span className="px-2 py-1 bg-green-500/10 text-green-500 font-bold tracking-widest">ACTIVE</span>
        </div>
        <LiveGraph />
        
        {/* Server Rack Visualizer */}
        <div className="mt-8 grid grid-cols-4 gap-2 h-20">
           {Array.from({length: 4}).map((_, i) => (
             <div key={i} className="bg-black border border-white/10 rounded-sm p-2 flex flex-col justify-between">
                <div className="flex gap-1 justify-end">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-[8px] text-gray-600 font-mono text-center">BLADE_0{i+1}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="xl:col-span-1 space-y-8">
        <ThreatMonitor />
        <div className="border border-white/10 bg-[#050505] p-6 shadow-lg h-[260px] flex flex-col">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2 flex justify-between items-center">
            <span>Network_Stream</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <LiveLogs />
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN LAYOUT & ROUTING ---
export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogIndex, setBootLogIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isBooting) {
      setBootLogIndex(0);
      const timer = setInterval(() => {
        setBootLogIndex(prev => {
          if (prev >= BOOT_LOGS.length) {
            clearInterval(timer);
            setTimeout(() => setIsBooting(false), 700);
            return prev;
          }
          return prev + 1;
        });
      }, 120);
      return () => clearInterval(timer);
    }
  }, [isBooting]);

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 selection:bg-green-500/30">
        <Scanlines />
        <div className="max-w-4xl mx-auto mt-16">
          <div className="animate-pulse mb-6 text-sm tracking-widest font-bold">SECURE BOOT SEQUENCE INITIATED...</div>
          <div className="space-y-1.5">
            {BOOT_LOGS.slice(0, bootLogIndex).map((log, i) => <div key={i} className="text-sm">{log}</div>)}
          </div>
          {bootLogIndex < BOOT_LOGS.length && <div className="w-3 h-5 bg-green-500 animate-pulse mt-4"></div>}
        </div>
      </div>
    );
  }

  const NavLink = ({ to, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`text-[11px] tracking-[0.25em] font-bold uppercase transition-all duration-300 ${isActive ? 'text-green-500 border-b-2 border-green-500 pb-1.5 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'text-gray-500 hover:text-white hover:border-b-2 hover:border-white/30 pb-1.5'}`}>
        {label}
      </Link>
    );
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#020202] text-gray-400 font-mono selection:bg-green-500/30 selection:text-green-400 flex flex-col relative">
        <Scanlines />
        
        <nav className="fixed w-full top-0 border-b border-green-900/30 bg-[#000000]/95 backdrop-blur-xl z-50">
          <div className="max-w-[1600px] mx-auto px-8 py-5 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="p-2 bg-green-950/40 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]"><TerminalSquare className="text-green-500" size={22} /></div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tighter text-base uppercase leading-none">{SYSTEM_CONFIG.user}</span>
                <span className="text-[9px] text-green-500 tracking-[0.3em] font-bold mt-1">{SYSTEM_CONFIG.role}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-10">
              <NavLink to="/" label="[ ROOT ]" />
              <NavLink to="/identity" label="[ IDENTITY ]" />
              <NavLink to="/infrastructure" label="[ INFRA ]" />
              <NavLink to="/deployments" label="[ DEPLOYMENTS ]" />
              <NavLink to="/telemetry" label="[ TELEMETRY ]" />
            </div>

            <button onClick={() => setModalOpen(true)} className="px-6 py-2.5 border border-green-500/40 bg-green-500/5 hover:bg-green-500 hover:text-black transition-all duration-300 text-[10px] uppercase tracking-[0.25em] font-bold text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              INIT_CONTACT
            </button>
          </div>
        </nav>

        <main className="flex-1 max-w-[1600px] w-full mx-auto px-8 pt-40 pb-32">
          <Routes>
            <Route path="/" element={<Dashboard setIsBooting={setIsBooting} />} />
            <Route path="/identity" element={<Identity />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/telemetry" element={<Telemetry />} />
          </Routes>
        </main>

        <footer className="py-8 border-t border-green-900/20 bg-[#000000] text-center text-[10px] text-gray-600 tracking-[0.5em] font-bold">
          EOF / {new Date().getFullYear()} / SECURE KERNEL / ALL SYSTEMS NORMAL
        </footer>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-6">
            <Scanlines />
            <div className="bg-[#050505] border border-green-500/40 w-full max-w-2xl shadow-[0_0_80px_rgba(34,197,94,0.1)] relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500"></div>
              <div className="flex justify-between items-center p-5 border-b border-white/5 bg-[#020202]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Establish_Connection_Protocol</span>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1"><X size={18} /></button>
              </div>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] text-green-500 font-bold uppercase tracking-widest">ID / Callsign</label>
                    <input name="name" required type="text" className="w-full bg-[#000000] border border-white/10 p-3.5 text-white focus:border-green-500 outline-none transition-colors text-sm font-mono shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Secure Route (Telegram)</label>
                    <input name="contact" required type="text" className="w-full bg-[#000000] border border-white/10 p-3.5 text-white focus:border-green-500 outline-none transition-colors text-sm font-mono shadow-inner" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Payload (Specs / Task)</label>
                  <textarea name="msg" required rows="5" className="w-full bg-[#000000] border border-white/10 p-3.5 text-white focus:border-green-500 outline-none resize-none transition-colors text-sm font-mono shadow-inner"></textarea>
                </div>
                <button type="submit" className="w-full bg-green-500/10 border border-green-500/40 text-green-500 font-black py-5 text-xs tracking-[0.3em] uppercase hover:bg-green-500 hover:text-black transition-all active:scale-[0.99] shadow-lg">
                  Execute_Transmission
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
}

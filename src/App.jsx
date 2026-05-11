import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  TerminalSquare, ShieldAlert, Cpu, X, Database, 
  Activity, Server, Lock, Command, Layers, Network, Zap, 
  Globe, BarChart, Code2, User, Fingerprint, Crosshair, Binary
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
      case 'help': 
        newHistory.push({ type: 'system', text: 'Commands: help, status, whoami, neofetch, ping, ls, reboot, clear' }); 
        break;
      case 'whoami': 
        newHistory.push({ type: 'system', text: `${SYSTEM_CONFIG.user}. ${SYSTEM_CONFIG.role}.` }); 
        break;
      case 'ls': 
        newHistory.push({ type: 'system', text: 'bin  boot  dev  etc  home  lib  opt  root  sbin  sys  usr  var  dossier.txt' }); 
        break;
      case 'neofetch':
        newHistory.push({ type: 'system', text: `
   /\\   | OS: Ubuntu 24.04 LTS (Secure Core)
  /  \\  | Kernel: 6.2.0-secure
 /____\\ | Uptime: 99.99%
/      \\| Packages: 2048 (dpkg)
        | Shell: zsh 5.8
        | Architect: ${SYSTEM_CONFIG.user}
        ` });
        break;
      case 'ping':
        newHistory.push({ type: 'system', text: 'Pinging main cluster... 8ms. CONNECTION STABLE.' });
        break;
      case 'reboot':
        setIsBooting(true);
        return;
      case 'status': 
        newHistory.push({ type: 'system', text: 'All clusters operational. No network anomalies detected. Firewalls active.' }); 
        break;
      case 'clear': 
        setCliHistory([]); 
        setCliInput(''); 
        return;
      default: 
        newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found. Unauthorized execution logged.` });
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
            Проектирование и развертывание отказоустойчивой серверной инфраструктуры. Автоматизация бизнес-логики, глубокая модификация платформ и интеграция API. Строгий контроль над архитектурой на всех уровнях: от ядра до интерфейса. Никакого легаси, только forward-thinking решения.
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
            Я <strong className="text-white">{SYSTEM_CONFIG.user}</strong>. Мой профиль — разработка сложных, масштабируемых бэкенд-систем и администрирование закрытых инфраструктур. Я не пишу код ради кода. Моя цель — автоматизация процессов, исключающая человеческий фактор и рутину.
          </p>
          <p>
            Подход к разработке сугубо прагматичный. Строгое разделение логики, микросервисная архитектура и модульные концепты (например, Cogs в Discord-ботах). Максимальная изоляция данных. Если фича деструктивна или избыточна — она идет под нож.
          </p>
          <div className="border-l-2 border-green-500 bg-green-500/5 p-6 mt-8">
            <h3 className="text-white font-bold tracking-widest mb-2 flex items-center gap-2"><Crosshair size={16} className="text-green-500"/> ФИЛОСОФИЯ</h3>
            <p className="text-sm">Forward-thinking. Смотрим вперед, не топчемся в легаси. Инновационные, но всегда практичные решения. Любая задача, от написания плагина до конфигурации VDS, доводится до полностью рабочего, самодостаточного состояния.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const Infrastructure = () => (
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

    <section>
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        <Activity className="text-green-500" size={24} />
        <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Execution_Log</h2>
      </div>
      <div className="border-l border-white/10 ml-3 space-y-12">
        {TIMELINE.map((log, idx) => (
          <div key={idx} className="relative pl-10 group">
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-green-900 group-hover:bg-green-500 transition-colors rounded-full shadow-[0_0_15px_rgba(34,197,94,0)] group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
            <div className="text-[10px] text-green-500/80 font-bold tracking-widest mb-2">{log.date}</div>
            <h3 className="text-lg text-white font-bold mb-3">{log.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">{log.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const Deployments = () => (
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
);

const Telemetry = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
      <BarChart className="text-green-500" size={24} />
      <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Live_Telemetry</h2>
    </div>
    
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="border border-white/10 bg-[#050505] p-8 shadow-lg">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-3 flex justify-between items-center">
          <span>Global_Compute_Load</span>
          <span className="px-2 py-1 bg-green-500/10 text-green-500 font-bold tracking-widest">ACTIVE</span>
        </div>
        <LiveGraph />
        <div className="mt-6 grid grid-cols-3 gap-4 text-center border-t border-white/5 pt-4">
          <div><div className="text-[10px] text-gray-600 mb-1">CPU</div><div className="text-green-500 font-bold">34%</div></div>
          <div><div className="text-[10px] text-gray-600 mb-1">RAM</div><div className="text-green-500 font-bold">16.4GB</div></div>
          <div><div className="text-[10px] text-gray-600 mb-1">SWAP</div><div className="text-green-500 font-bold">0.1GB</div></div>
        </div>
      </div>

      <div className="border border-white/10 bg-[#050505] p-8 shadow-lg">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-3 flex justify-between items-center">
          <span>Network_Traffic_Stream</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <LiveLogs />
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

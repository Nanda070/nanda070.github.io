import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  TerminalSquare, ShieldAlert, Cpu, X, Database, 
  Activity, Server, Lock, Command, Layers, Network, Zap, 
  Globe, BarChart, Code2, Terminal as TerminalIcon
} from 'lucide-react';

// --- DATA ---
const BOOT_LOGS = [
  "[OK] Booting System Kernel 5.15.0-generic...",
  "[OK] Mount root filesystem... DONE",
  "[OK] Initialize network interfaces... eth0 UP",
  "[OK] Starting SSH daemon... PORT 22 SECURED",
  "[OK] Loading cryptography modules... AES-256 ACTIVE",
  "[OK] Establishing link to backend clusters... OK",
  "[OK] Fetching user profile: ADNAN... SUCCESS",
  "[!!] INITIATING FRONTEND TERMINAL_UI COMPOSITOR..."
];

const SYSTEM_METRICS = [
  { label: 'UPTIME', val: '99.99%', icon: <Activity size={14} className="text-green-500" /> },
  { label: 'ENCRYPTION', val: 'AES-256-GCM', icon: <Lock size={14} className="text-green-500" /> },
  { label: 'NODES_ACTIVE', val: '24/24', icon: <Network size={14} className="text-green-500" /> },
  { label: 'LATENCY', val: '12ms', icon: <Zap size={14} className="text-green-500" /> }
];

const TECH_MATRIX = [
  { group: 'BACKEND_CORE', items: ['Python 3.11', 'FastAPI', 'Node.js', 'Java 17', 'C# / .NET'] },
  { group: 'INFRASTRUCTURE', items: ['Debian/Ubuntu', 'Docker', 'tmux', 'Nginx', 'CI/CD'] },
  { group: 'DATABASES', items: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite'] },
  { group: 'APIs & MODS', items: ['discord.py', 'Spigot API', 'PaperMC', 'REST', 'WebSockets'] }
];

const TIMELINE = [
  { date: 'RUNTIME: CURRENT', title: 'LIFE5RP Ecosystem System Core', desc: 'Архитектура slash-команд. Изолированная синхронизация стейта пользователей. Автоматизация выдачи токенов без ручного вмешательства.' },
  { date: 'RUNTIME: PREVIOUS', title: 'AstraSMP Server Architecture', desc: 'Глубокая модификация Java-кода (Bukkit/Spigot). Реализация кастомных эвентов, настройка Voice Chat и системы Whitelist.' },
  { date: 'ARCHIVE', title: 'Security Audit & OSINT Tools', desc: 'Разработка парсеров и ботов для мониторинга действий. Автоматический сбор логов и выявление аномалий в сети.' }
];

const PROJECTS = [
  { id: 'PRJ-ALPHA', name: 'RoleSync Daemon', type: 'Discord.py / Asyncio', desc: 'Автоматизированный демон для LIFE5RP. Отслеживание изменений стейта пользователей и зеркалирование ролей.', icon: <Command size={28} /> },
  { id: 'PRJ-BETA', name: 'AstraSMP Controller', type: 'Java / Bukkit API', desc: 'Плагин управления ядром сервера. Оптимизация нагрузки на основной поток (Main Thread).', icon: <Database size={28} /> },
  { id: 'PRJ-GAMMA', name: 'Security Audit', type: 'Python / PostgreSQL', desc: 'Система логирования действий администраторов. Автоматическое формирование репортов.', icon: <ShieldAlert size={28} /> },
  { id: 'PRJ-DELTA', name: 'Token Generator', type: 'Cryptography Core', desc: 'Генерация уникальных идентификаторов для авторизации департаментов.', icon: <Lock size={28} /> },
  { id: 'PRJ-EPSILON', name: 'Custom Launcher', type: 'C# / .NET', desc: 'Нативное приложение для автоматизации запуска и обновления клиентских файлов.', icon: <Code2 size={28} /> },
  { id: 'PRJ-ZETA', name: 'Net Monitor', type: 'Node.js / React', desc: 'Дашборд для визуализации сетевой активности и нагрузки на Docker контейнеры.', icon: <Globe size={28} /> }
];

// --- UTILS & COMPONENTS ---
const useTypewriter = (text, speed = 20) => {
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

// Анимированный график нагрузки (CPU/RAM)
const LiveGraph = () => {
  const [bars, setBars] = useState(Array.from({ length: 40 }, () => Math.random() * 100));
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => [...prev.slice(1), Math.random() * 100]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-24 flex items-end gap-[2px] opacity-70">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 bg-green-500 transition-all duration-200" style={{ height: `${h}%`, opacity: h / 100 }} />
      ))}
    </div>
  );
};

// Бесконечный поток логов
const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);
  const IPS = ['192.168.1.1', '10.0.0.5', '172.16.254.1', '45.33.22.11'];
  const ACTIONS = ['POST /api/sync', 'GET /health', 'AUTH_ATTEMPT', 'CRON_JOB_EXEC'];

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toISOString()}] ${IPS[Math.floor(Math.random()*IPS.length)]} - ${ACTIONS[Math.floor(Math.random()*ACTIONS.length)]} - STATUS: OK`;
      setLogs(prev => [...prev.slice(-14), newLog]); // Храним последние 15
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[9px] text-green-500/50 space-y-1 h-[180px] overflow-hidden flex flex-col justify-end">
      {logs.map((log, i) => <div key={i}>{log}</div>)}
    </div>
  );
};

// --- PAGES ---

const Dashboard = ({ setIsBooting }) => {
  const heroText = useTypewriter("> ACCESS GRANTED.\n> ROOT_USER DETECTED.\n> SYSTEM AWAITING INPUT...", 30);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([{ type: 'system', text: 'Type "help" for available commands.' }]);
  const cliEndRef = useRef(null);

  const handleCliSubmit = (e) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    const cmd = cliInput.trim().toLowerCase();
    const newHistory = [...cliHistory, { type: 'user', text: `root@adnan:~# ${cliInput}` }];
    
    switch(cmd) {
      case 'help': 
        newHistory.push({ type: 'system', text: 'Commands: help, status, whoami, neofetch, ping, reboot, sudo, clear' }); 
        break;
      case 'whoami': 
        newHistory.push({ type: 'system', text: 'Adnan. System Engineer & DevOps.' }); 
        break;
      case 'neofetch':
        newHistory.push({ type: 'system', text: `
   /\\   | OS: Ubuntu 24.04 LTS (Simulated)
  /  \\  | Kernel: 5.15.0-generic
 /____\\ | Uptime: 99.99%
/      \\| Packages: 1402 (dpkg)
        | Shell: bash 5.1.16
        | Dev: Adnan / System Architect
        ` });
        break;
      case 'ping':
        newHistory.push({ type: 'system', text: 'Pinging main cluster... 12ms. OK.' });
        break;
      case 'sudo':
        newHistory.push({ type: 'error', text: 'adnan is not in the sudoers file. This incident will be reported.' });
        break;
      case 'reboot':
        setIsBooting(true);
        return;
      case 'status': 
        newHistory.push({ type: 'system', text: 'All clusters operational. No network anomalies detected.' }); 
        break;
      case 'clear': 
        setCliHistory([]); 
        setCliInput(''); 
        return;
      default: 
        newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found` });
    }
    setCliHistory(newHistory);
    setCliInput('');
  };

  useEffect(() => cliEndRef.current?.scrollIntoView({ behavior: "smooth" }), [cliHistory]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-in fade-in duration-500">
      <div className="xl:col-span-8 space-y-12">
        <section>
          <div className="h-16 mb-4 text-green-500/70 text-sm whitespace-pre-line font-bold">
            {heroText}<span className="animate-pulse text-white">_</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            System <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-emerald-900">Overlord</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-500 border-l-2 border-green-500/40 pl-6 py-2 leading-relaxed">
            Разработка отказоустойчивой серверной инфраструктуры, автоматизация процессов и глубокая модификация платформ. Контроль на всех уровнях: от ядра до интерфейса.
          </p>
        </section>
      </div>

      <div className="xl:col-span-4 space-y-8">
        <div className="border border-green-900/30 bg-[#050505] p-6">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between">
            <span>Cluster_Status</span>
            <span className="text-green-500 animate-pulse">ONLINE</span>
          </div>
          <div className="space-y-4">
            {SYSTEM_METRICS.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  {metric.icon}
                  <span className="text-xs text-gray-400 tracking-wider group-hover:text-white transition-colors">{metric.label}</span>
                </div>
                <span className="text-xs text-green-400 font-bold">{metric.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Интерактивный терминал */}
        <div className="border border-white/10 bg-[#000000] flex flex-col h-[400px]">
          <div className="bg-[#050505] p-3 border-b border-white/10 flex justify-between items-center">
            <span className="text-[10px] text-green-500 font-bold tracking-widest">tty1 - interactive</span>
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
            <input type="text" value={cliInput} onChange={(e) => setCliInput(e.target.value)} className="bg-transparent flex-1 text-xs text-white focus:outline-none" autoComplete="off" />
          </form>
        </div>
      </div>
    </div>
  );
};

const Infrastructure = () => (
  <div className="space-y-16 animate-in fade-in duration-500">
    <section>
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        <Layers className="text-green-500" size={20} />
        <h2 className="text-lg text-white font-black tracking-[0.3em] uppercase">Tech_Matrix</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
        {TECH_MATRIX.map((col, idx) => (
          <div key={idx} className="bg-[#050505] p-8 hover:bg-[#080808] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="text-[10px] text-green-500 font-bold tracking-[0.2em] mb-6 uppercase">{col.group}</div>
              <ul className="space-y-3">
                {col.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-green-900 text-xs">/</span> {item}
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
        <Activity className="text-green-500" size={20} />
        <h2 className="text-lg text-white font-black tracking-[0.3em] uppercase">Execution_Log</h2>
      </div>
      <div className="border-l border-white/10 ml-2 space-y-10">
        {TIMELINE.map((log, idx) => (
          <div key={idx} className="relative pl-8 group">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-green-900 group-hover:bg-green-500 transition-colors rounded-full"></div>
            <div className="text-[10px] text-green-500/70 font-bold tracking-widest mb-1">{log.date}</div>
            <h3 className="text-base text-white font-bold mb-2">{log.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{log.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const Deployments = () => (
  <section className="animate-in fade-in duration-500">
    <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
      <Cpu className="text-green-500" size={20} />
      <h2 className="text-lg text-white font-black tracking-[0.3em] uppercase">Deployed_Modules</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((proj) => (
        <div key={proj.id} className="border border-white/5 bg-[#050505] p-8 hover:border-green-500/30 transition-all group relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="text-green-500/50 group-hover:text-green-500 transition-colors">{proj.icon}</div>
            <div className="text-[10px] text-white/20 font-bold tracking-widest">{proj.id}</div>
          </div>
          <div className="text-[10px] text-green-500 font-bold tracking-widest mb-2">{proj.type}</div>
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
      <BarChart className="text-green-500" size={20} />
      <h2 className="text-lg text-white font-black tracking-[0.3em] uppercase">Live_Telemetry</h2>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* CPU/NET Graph */}
      <div className="border border-white/10 bg-[#050505] p-6">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between">
          <span>CPU_Load_Average</span>
          <span className="text-green-500 animate-pulse">ACTIVE</span>
        </div>
        <LiveGraph />
      </div>

      {/* RAW Log Stream */}
      <div className="border border-white/10 bg-[#050505] p-6">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Raw_Network_Stream</div>
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
            setTimeout(() => setIsBooting(false), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 150);
      return () => clearInterval(timer);
    }
  }, [isBooting]);

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-6 selection:bg-green-500/30">
        <Scanlines />
        <div className="max-w-3xl mx-auto mt-10">
          <div className="animate-pulse mb-4 text-xs tracking-widest">BIOS-UEFI INITIALIZATION...</div>
          {BOOT_LOGS.slice(0, bootLogIndex).map((log, i) => <div key={i} className="text-sm mb-1">{log}</div>)}
          {bootLogIndex < BOOT_LOGS.length && <div className="w-2 h-4 bg-green-500 animate-pulse mt-2"></div>}
        </div>
      </div>
    );
  }

  const NavLink = ({ to, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`text-[10px] tracking-[0.2em] font-bold uppercase transition-colors ${isActive ? 'text-green-500 border-b border-green-500 pb-1' : 'text-gray-500 hover:text-white'}`}>
        {label}
      </Link>
    );
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#020202] text-gray-400 font-mono selection:bg-green-500/30 selection:text-green-400 flex flex-col relative">
        <Scanlines />
        
        <nav className="fixed w-full top-0 border-b border-white/5 bg-[#020202]/95 backdrop-blur-md z-50">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-green-950/50 border border-green-500/20"><TerminalSquare className="text-green-500" size={18} /></div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tighter text-sm uppercase">Adnan</span>
                <span className="text-[9px] text-green-500 tracking-[0.2em] font-bold">SYSTEMS_ENGINEER</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              <NavLink to="/" label="[ ROOT ]" />
              <NavLink to="/infrastructure" label="[ INFRA ]" />
              <NavLink to="/deployments" label="[ DEPLOYMENTS ]" />
              <NavLink to="/telemetry" label="[ TELEMETRY ]" />
            </div>

            <button onClick={() => setModalOpen(true)} className="px-5 py-2 border border-green-500/30 hover:bg-green-500/10 transition-all text-[10px] uppercase tracking-[0.2em] font-bold text-green-500">
              INIT_CONTACT
            </button>
          </div>
        </nav>

        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 pt-32 pb-24">
          <Routes>
            <Route path="/" element={<Dashboard setIsBooting={setIsBooting} />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/telemetry" element={<Telemetry />} />
          </Routes>
        </main>

        <footer className="py-6 border-t border-white/5 text-center text-[10px] text-gray-600 tracking-[0.4em] font-bold">
          EOF / {new Date().getFullYear()} / ROOT KERNEL ONLINE
        </footer>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
            <Scanlines />
            <div className="bg-[#050505] border border-green-500/30 w-full max-w-xl shadow-[0_0_50px_rgba(34,197,94,0.05)]">
              <div className="flex justify-between items-center p-4 border-b border-white/5">
                <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Establish_Connection_Req</span>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
              </div>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="p-8 space-y-6">
                <input name="name" required type="text" placeholder="ID / Callsign" className="w-full bg-black border border-white/10 p-3 text-white focus:border-green-500 outline-none text-sm font-mono" />
                <input name="contact" required type="text" placeholder="Secure Route (Telegram)" className="w-full bg-black border border-white/10 p-3 text-white focus:border-green-500 outline-none text-sm font-mono" />
                <textarea name="msg" required rows="4" placeholder="Payload..." className="w-full bg-black border border-white/10 p-3 text-white focus:border-green-500 outline-none resize-none text-sm font-mono"></textarea>
                <button type="submit" className="w-full bg-green-500/10 border border-green-500/30 text-green-500 font-black py-4 text-xs tracking-[0.3em] uppercase hover:bg-green-500 hover:text-black transition-all">Send_Packet</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
}

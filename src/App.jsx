import React, { useState, useEffect } from 'react';
import { 
  Terminal, ShieldAlert, Cpu, X, GitBranch, Database, 
  ExternalLink, Activity, Server, Lock, Command, Layers, TerminalSquare 
} from 'lucide-react';

// --- DATA MODULES ---
const SYSTEM_METRICS = [
  { label: 'UPTIME', val: '99.99%', icon: <Activity size={14} className="text-green-500" /> },
  { label: 'ENCRYPTION', val: 'AES-256', icon: <Lock size={14} className="text-green-500" /> },
  { label: 'NODES_ACTIVE', val: '14', icon: <Server size={14} className="text-green-500" /> },
  { label: 'LAST_DEPLOY', val: 'TODAY', icon: <GitBranch size={14} className="text-green-500" /> }
];

const EXPERTISE = [
  {
    domain: 'BACKEND_CORE',
    tech: ['Python 3.11+', 'Java', 'Node.js', 'REST API'],
    desc: 'Разработка асинхронных микросервисов и монолитов. Оптимизация алгоритмов обработки данных и работы с БД.'
  },
  {
    domain: 'INFRASTRUCTURE',
    tech: ['Linux (Debian/Ubuntu)', 'tmux', 'Docker', 'VDS'],
    desc: 'Контейнеризация, настройка изолированных сред, управление демонами и обеспечение отказоустойчивости.'
  },
  {
    domain: 'PLATFORM_MODDING',
    tech: ['discord.py', 'Spigot/Paper API', 'React'],
    desc: 'Глубокая интеграция с API платформ. Перевод на slash-команды, написание кастомных плагинов и модулей.'
  }
];

const TIMELINE = [
  {
    date: 'CURRENT',
    title: 'LIFE5RP Ecosystem Synchronization',
    desc: 'Перевод архитектуры бота на slash-команды. Реализация строгой синхронизации ролей с полным удалением деструктивных функций (auto-kick). Оптимизация циклов обновления.'
  },
  {
    date: 'PREVIOUS',
    title: 'AstraSMP Core Infrastructure',
    desc: 'Модификация Java-исходников для серверов Minecraft. Внедрение систем контроля доступа (Whitelist) и интеграция серверного Voice Chat.'
  },
  {
    date: 'ARCHIVE',
    title: 'Department Auth System (DF/USAF/MP)',
    desc: 'Проектирование логики генерации секьюрных токенов. Рефакторинг форм: стандартизация раздела "Знание Законодательной Базы" и чистка устаревших полей.'
  }
];

const PROJECTS = [
  { 
    id: 'PRJ-ALPHA', 
    name: 'RoleSync Daemon', 
    type: 'Discord.py / Asyncio',
    desc: 'Автоматизированный демон для LIFE5RP. Отслеживание изменений стейта пользователей и зеркалирование ролей между серверами без задержек.',
    icon: <Command className="text-green-500 mb-4" size={32} />
  },
  { 
    id: 'PRJ-BETA', 
    name: 'AstraSMP Controller', 
    type: 'Java / Bukkit API',
    desc: 'Плагин управления ядром сервера. Оптимизация нагрузки на основной поток (Main Thread), кастомная логика эвентов.',
    icon: <Database className="text-green-500 mb-4" size={32} />
  },
  { 
    id: 'PRJ-GAMMA', 
    name: 'Security Audit Bot', 
    type: 'Python / PostgreSQL',
    desc: 'Система логирования действий администраторов. Автоматическое формирование репортов и блокировка несанкционированных попыток доступа.',
    icon: <ShieldAlert className="text-green-500 mb-4" size={32} />
  },
  { 
    id: 'PRJ-DELTA', 
    name: 'Token Generator', 
    type: 'Discord.py / Cryptography',
    desc: 'Генерация уникальных идентификаторов для авторизации департаментов. Поддержка валидации и истечения срока действия.',
    icon: <Lock className="text-green-500 mb-4" size={32} />
  }
];

// --- UTILS ---
const useTypewriter = (text, speed = 25) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const typing = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, speed);
    return () => clearInterval(typing);
  }, [text, speed]);
  return displayText;
};

// --- CORE COMPONENT ---
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroText = useTypewriter("> SYSTEM BOOT SEQUENCE INITIATED...\n> KERNEL LOADED.\n> ESTABLISHING SECURE PROTOCOLS...\n> ACCESS GRANTED: ROOT_USER.", 30);

  return (
    <div className="min-h-screen bg-[#000000] text-gray-400 font-mono selection:bg-green-500/30 selection:text-green-400">
      
      {/* NAVBAR */}
      <nav className="fixed w-full top-0 border-b border-green-900/30 bg-[#000000]/80 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-1.5 bg-green-950/50 border border-green-500/20">
              <TerminalSquare className="text-green-500" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black tracking-tighter text-sm leading-tight uppercase">Adnan</span>
              <span className="text-[9px] text-green-500 tracking-[0.2em] font-bold">SYS_ADMIN // DEVELOPER</span>
            </div>
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="group relative px-6 py-2 bg-green-500/5 hover:bg-green-500/10 border border-green-500/30 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <span className="relative text-[10px] uppercase tracking-[0.2em] font-bold text-green-500">INITIATE_CONTACT</span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="h-24 mb-6 text-green-500/70 text-xs md:text-sm whitespace-pre-line font-bold">
              {heroText}<span className="animate-pulse text-white">_</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
              Engineering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-800">
                Resilience
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-gray-500 border-l-2 border-green-500/40 pl-6 py-2 mb-10 leading-relaxed">
              Комплексная разработка серверных решений, интеграция API и проектирование закрытых систем. Строгая изоляция логики, отказ от легаси-решений и фокус на производительности.
            </p>
          </div>
          
          {/* TELEMETRY PANEL */}
          <div className="lg:col-span-4 hidden lg:flex flex-col justify-center">
            <div className="border border-green-900/30 bg-[#050505] p-6 relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0"></div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">System_Telemetry</div>
              <div className="space-y-4">
                {SYSTEM_METRICS.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="text-xs text-gray-400 tracking-wider">{metric.label}</span>
                    </div>
                    <span className="text-xs text-green-400 font-bold">{metric.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE GRID */}
      <section className="py-20 border-t border-white/5 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <Layers className="text-green-500" size={24} />
            <h2 className="text-xl text-white font-black tracking-[0.3em] uppercase">Core_Modules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERTISE.map((exp, idx) => (
              <div key={idx} className="border border-white/5 bg-[#000000] p-8 hover:border-green-500/30 transition-colors">
                <div className="text-xs text-green-500 font-bold tracking-[0.2em] mb-6">[{exp.domain}]</div>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed h-20">{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="text-[10px] bg-green-900/20 text-green-400 px-2 py-1 border border-green-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE & OPERATIONS */}
      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <Activity className="text-green-500" size={24} />
          <h2 className="text-xl text-white font-black tracking-[0.3em] uppercase">Operations_Timeline</h2>
        </div>
        <div className="border-l border-white/10 ml-3 space-y-12">
          {TIMELINE.map((log, idx) => (
            <div key={idx} className="relative pl-10">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <div className="text-[10px] text-green-500 font-bold tracking-widest mb-2">{log.date}</div>
              <h3 className="text-lg text-white font-bold mb-3">{log.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">{log.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS / REPOSITORIES */}
      <section className="py-24 border-t border-white/5 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="flex items-center gap-4">
              <Cpu className="text-green-500" size={24} />
              <h2 className="text-xl text-white font-black tracking-[0.3em] uppercase">Deployed_Systems</h2>
            </div>
            <div className="hidden md:block text-[10px] text-gray-600 tracking-widest">SHOWING: {PROJECTS.length} REPOSITORIES</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="border border-white/5 bg-[#050505] p-8 group hover:bg-[#080808] transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-[10px] font-bold text-white/10 group-hover:text-green-500/30 transition-colors">
                  {proj.id}
                </div>
                {proj.icon}
                <div className="text-[10px] text-green-500 font-bold tracking-widest mb-2">{proj.type}</div>
                <h3 className="text-2xl text-white font-black mb-4 uppercase">{proj.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">{proj.desc}</p>
                <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold tracking-widest uppercase">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  Status: Online / Active
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-green-900/30 bg-[#000000] text-center">
        <div className="text-[10px] text-gray-600 tracking-[0.4em] uppercase font-bold">
          © {new Date().getFullYear()} / ALL SYSTEMS OPERATIONAL / EOF
        </div>
      </footer>

      {/* CONTACT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-[#050505] border border-green-500/30 w-full max-w-2xl relative shadow-[0_0_80px_rgba(34,197,94,0.05)]">
            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-[#020202]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-white font-bold tracking-widest uppercase">Secure_Channel_Req</span>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            
            {/* Formspree Integration */}
            <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 relative">
                  <label className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Target_ID</label>
                  <input name="name" required type="text" placeholder="Имя / Позывной" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-green-500 outline-none transition-all placeholder:text-gray-800 text-sm" />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Routing_Address</label>
                  <input name="contact" required type="text" placeholder="@telegram / Email" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-green-500 outline-none transition-all placeholder:text-gray-800 text-sm" />
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Payload_Data</label>
                <textarea name="msg" required rows="4" placeholder="Спецификация задачи или суть запроса..." className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-800 text-sm"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-500/10 border border-green-500/50 text-green-500 font-black py-5 text-xs uppercase tracking-[0.3em] hover:bg-green-500 hover:text-black transition-all active:scale-[0.99]">
                Execute_Transmission
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Terminal, Code2, ShieldAlert, Cpu, ChevronRight, X, GitBranch, Database, ExternalLink } from 'lucide-react';

const TECH_STACK = [
  { label: 'OS & Env', val: 'Linux (Debian/Ubuntu), tmux, VDS Configuration' },
  { label: 'Languages', val: 'Python 3.11+, Java, JavaScript' },
  { label: 'Frameworks', val: 'discord.py, React, Spigot/Paper API' },
  { label: 'Architecture', val: 'Slash Commands, Modular Cogs, Async Operations' }
];

const PROJECTS = [
  { 
    id: 'SYS-01', 
    name: 'LIFE5RP Ecosystem', 
    desc: 'Система синхронизации ролей и модерации. Переход на slash-архитектуру, строгая изоляция логики обновлений без деструктивных функций.',
    icon: <Cpu className="text-green-500 mb-4" size={28} />
  },
  { 
    id: 'SYS-02', 
    name: 'Department Auth Core', 
    desc: 'Модуль генерации токенов доступа с рандомизированными ID. Автоматизация форм аттестации и проверки знаний законодательной базы.',
    icon: <ShieldAlert className="text-green-500 mb-4" size={28} />
  },
  { 
    id: 'SYS-03', 
    name: 'AstraSMP Infrastructure', 
    desc: 'Модификация Java-кода для серверов Minecraft. Интеграция кастомных конфигураций Voice Chat и управление системами доступа.',
    icon: <Database className="text-green-500 mb-4" size={28} />
  }
];

const useTypewriter = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, speed);
    return () => clearInterval(typing);
  }, [text, speed]);
  return displayText;
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroText = useTypewriter("> INITIALIZING SECURE CONNECTION...\n> LOADING MODULES...\n> SYSTEM ONLINE.", 50);

  return (
    <div className="min-h-screen bg-[#020202] text-gray-400 font-mono selection:bg-green-500/30 selection:text-green-400">
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 border-b border-white/5 bg-[#020202]/90 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-1.5 bg-green-500/10 border border-green-500/20 group-hover:border-green-500/50 transition-colors">
              <Terminal className="text-green-500" size={18} />
            </div>
            <span className="text-white font-black tracking-tighter text-sm uppercase group-hover:text-green-400">System_Admin</span>
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="text-[10px] uppercase tracking-[0.3em] font-bold border border-green-500/40 text-green-500 px-5 py-2 hover:bg-green-500 hover:text-black transition-all active:scale-95"
          >
            Connect_STUB
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="h-20 mb-8 text-green-500/60 text-xs md:text-sm leading-relaxed">
          {heroText}<span className="animate-pulse">█</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
          Lead <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-emerald-900">
            Developer
          </span>
        </h1>
        <p className="max-w-xl text-lg text-gray-500 border-l border-green-500/30 pl-8 py-2 mb-12">
          Проектирование отказоустойчивых архитектур и автоматизация сложных бизнес-процессов. Минимализм в коде, максимальная эффективность в работе.
        </p>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {TECH_STACK.map((item, idx) => (
            <div key={idx} className="bg-[#020202] p-10 hover:bg-[#050505] transition-all group">
              <div className="text-[10px] text-green-500/40 mb-2 font-bold tracking-[0.2em]">{item.label}</div>
              <div className="text-gray-200 text-lg group-hover:text-green-400 transition-colors">{item.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-white/5"></div>
          <h2 className="text-sm text-white font-bold tracking-[0.5em] uppercase">Operations_Log</h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="border border-white/5 bg-[#040404] p-8 relative group cursor-default">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
              <div className="text-[10px] font-bold text-white/10 mb-6">{proj.id}</div>
              {proj.icon}
              <h3 className="text-xl text-white font-black mb-4 uppercase">{proj.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{proj.desc}</p>
              <div className="flex items-center gap-2 text-[10px] text-green-500 font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                STATUS: DEPLOYED <ExternalLink size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="text-[10px] text-gray-700 tracking-[0.4em] uppercase">
          © 2026 / End_of_Line
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="bg-[#050505] border border-green-500/20 w-full max-w-xl shadow-[0_0_50px_rgba(34,197,94,0.05)]">
            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#080808]">
              <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Establish_Connection</span>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                <X size={16} />
              </button>
            </div>
            <form action="https://formspree.io/f/YOUR_ID" method="POST" className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Source_ID</label>
                <input name="name" required type="text" placeholder="Identification Required" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-green-500 outline-none transition-all placeholder:text-gray-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Secure_Channel</label>
                <input name="contact" required type="text" placeholder="Telegram / Email" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-green-500 outline-none transition-all placeholder:text-gray-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Payload</label>
                <textarea name="msg" required rows="3" placeholder="Project Specification..." className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-green-500 outline-none transition-all resize-none placeholder:text-gray-800"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-black font-black py-5 text-xs uppercase tracking-[0.3em] hover:bg-green-400 transition-all shadow-lg shadow-green-900/10 active:scale-[0.98]">
                Execute_Transmission
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

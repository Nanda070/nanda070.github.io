import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TerminalSquare, Lock, X } from 'lucide-react';

import { SYSTEM_CONFIG } from './data';
import { Scanlines, CommandPalette } from './components';

import { Dashboard, Identity, Infrastructure, Deployments, Telemetry, OsintCore } from './pages';

// Компонент бегущей строки Network Sniffer
const SnifferTicker = () => {
  const [hashes, setHashes] = useState('');
  useEffect(() => {
    const generateHash = () => Array.from({length: 12}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setHashes(Array.from({length: 20}, () => `[0x${generateHash()}]`).join('   ---   '));
  }, []);
  return (
    <div className="overflow-hidden whitespace-nowrap border-t border-b border-green-900/30 bg-green-950/20 py-1 flex">
       <div className="animate-[marquee_20s_linear_infinite] text-[8px] font-mono text-green-500/40 inline-block">
          {hashes} {hashes} {hashes}
       </div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
     if(isAuthenticated) {
        setIsBooting(true);
        setTimeout(() => setIsBooting(false), 800);
     }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex items-center justify-center selection:bg-green-500/30 relative">
        <Scanlines />
        <div className="w-full max-w-lg border border-green-900/40 bg-[#050505] p-8 shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
           <div className="flex justify-center mb-6"><Lock size={48} className="text-green-500/50" /></div>
           <h1 className="text-center text-xl font-black tracking-[0.3em] uppercase text-white mb-2">Zero_Trust_Gateway</h1>
           <p className="text-center text-xs text-gray-500 mb-8">CONNECTION TO {SYSTEM_CONFIG.location} REQUIRES ROOT CLEARANCE.</p>
           <div className="bg-black border border-white/10 p-4 mb-8 text-xs text-gray-400 font-mono">
              > Checking local certificates... FAILED<br/>> Requesting biometric payload... BYPASSED<br/>> Awaiting manual override protocol...
           </div>
           <button onClick={() => setIsAuthenticated(true)} className="w-full bg-green-500/10 border border-green-500/40 text-green-500 font-black py-4 text-xs tracking-[0.3em] uppercase hover:bg-green-500 hover:text-black transition-all active:scale-[0.98]">
             EXECUTE_OVERRIDE
           </button>
        </div>
      </div>
    );
  }

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex items-center justify-center">
        <div className="animate-pulse tracking-widest">MOUNTING FILESYSTEM...</div>
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
        <CommandPalette isOpen={paletteOpen} setOpen={setPaletteOpen} />
        
        <nav className="fixed w-full top-0 border-b border-green-900/30 bg-[#000000]/95 backdrop-blur-xl z-50">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-5 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="p-2 bg-green-950/40 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]"><TerminalSquare className="text-green-500" size={22} /></div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tighter text-base uppercase leading-none">{SYSTEM_CONFIG.user}</span>
                <span className="text-[9px] text-green-500 tracking-[0.3em] font-bold mt-1">{SYSTEM_CONFIG.role}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
              <NavLink to="/" label="[ DASHBOARD ]" />
              <NavLink to="/identity" label="[ IDENTITY ]" />
              <NavLink to="/infrastructure" label="[ INFRA ]" />
              <NavLink to="/deployments" label="[ DEPLOYMENTS ]" />
              <NavLink to="/osint" label="[ OSINT_CORE ]" />
              <NavLink to="/telemetry" label="[ TELEMETRY ]" />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 border border-white/10 px-3 py-1.5 text-[10px] text-gray-500 cursor-pointer hover:border-green-500/50 transition-colors" onClick={() => setPaletteOpen(true)}>
                <span>CMD / SEARCH</span>
                <span className="bg-white/10 px-1 rounded">CTRL+K</span>
              </div>
              <button onClick={() => setModalOpen(true)} className="px-6 py-2 border border-green-500/40 bg-green-500/5 hover:bg-green-500 hover:text-black transition-all duration-300 text-[10px] uppercase tracking-[0.25em] font-bold text-green-500">
                INIT_CONTACT
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 lg:px-8 pt-44 pb-32">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/identity" element={<Identity />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/osint" element={<OsintCore />} />
            <Route path="/telemetry" element={<Telemetry />} />
          </Routes>
        </main>

        <footer className="mt-auto">
          <SnifferTicker />
          <div className="py-6 border-t border-green-900/20 bg-[#000000] text-center text-[10px] text-gray-600 tracking-[0.5em] font-bold">
            EOF / {new Date().getFullYear()} / ZERO_TRUST PROTOCOL ACTIVE
          </div>
        </footer>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-6">
            <div className="bg-[#050505] border border-green-500/40 w-full max-w-2xl relative shadow-[0_0_80px_rgba(34,197,94,0.1)]">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500"></div>
              <div className="flex justify-between items-center p-5 border-b border-white/5 bg-[#020202]">
                <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Establish_Connection</span>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
              </div>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="p-10 space-y-8">
                <input name="name" required type="text" placeholder="ID / Callsign" className="w-full bg-[#000000] border border-white/10 p-3.5 text-white focus:border-green-500 outline-none transition-colors text-sm font-mono shadow-inner" />
                <input name="contact" required type="text" placeholder="Secure Route (Telegram)" className="w-full bg-[#000000] border border-white/10 p-3.5 text-white focus:border-green-500 outline-none transition-colors text-sm font-mono shadow-inner" />
                <textarea name="msg" required rows="5" placeholder="Payload / Specs" className="w-full bg-[#000000] border border-white/10 p-3.5 text-white focus:border-green-500 outline-none resize-none transition-colors text-sm font-mono shadow-inner"></textarea>
                <button type="submit" className="w-full bg-green-500/10 border border-green-500/40 text-green-500 font-black py-5 text-xs tracking-[0.3em] uppercase hover:bg-green-500 hover:text-black transition-all">Execute</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
}

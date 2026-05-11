import React, { useState } from 'react';
import { User, Fingerprint, Crosshair, Layers, Binary, Activity, TerminalSquare, Play, FolderTree, FileCode, Cpu, Share2, Globe, Network, Server, Database, BarChart } from 'lucide-react';
import { SYSTEM_CONFIG, TECH_MATRIX, TIMELINE, PROJECTS, VFS_DATA } from './data';
import { HtopSimulation, DockerManager, CICDPipeline, ThreatMonitor, LiveGraph, LiveLogs, SqlConsole } from './components';
import { OSINT_DB } from './data';
import { OsintScanner } from './components';

export const Dashboard = () => (
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-in fade-in duration-500">
    <div className="xl:col-span-7 space-y-10">
      <section>
        <div className="h-10 mb-4 text-green-500/80 text-sm font-bold">> KERNEL PANIC: FALSE <br/>> SYSTEM OPERATIONAL.<span className="animate-pulse text-white">_</span></div>
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]">
          System <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-emerald-900">Overlord</span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-500 border-l-4 border-green-500/50 pl-6 py-2 leading-relaxed">
          Проектирование и развертывание отказоустойчивой инфраструктуры. Автоматизация бизнес-логики и глубокая модификация платформ. Контроль архитектуры от ядра до интерфейса.
        </p>
      </section>
      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="border border-white/10 bg-[#050505] p-4 border-l-2 border-l-green-500">
          <div className="text-[10px] text-gray-500 tracking-widest mb-1">AUTHORIZATION</div><div className="text-sm text-white font-bold">{SYSTEM_CONFIG.clearance}</div>
        </div>
        <div className="border border-white/10 bg-[#050505] p-4 border-l-2 border-l-green-500">
          <div className="text-[10px] text-gray-500 tracking-widest mb-1">LOCATION</div><div className="text-sm text-white font-bold">{SYSTEM_CONFIG.location}</div>
        </div>
      </div>
    </div>
    <div className="xl:col-span-5 space-y-8">
      <HtopSimulation />
      <DockerManager />
    </div>
  </div>
);

export const Identity = () => (
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
        <div className="font-mono text-[9px] text-green-500/40 space-y-0.5">
          {Array.from({length: 8}).map((_, i) => (
             <div key={i}>{Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(8, '0')}  {Array.from({length: 8}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ')}</div>
          ))}
        </div>
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
          <p>Я <strong className="text-white">{SYSTEM_CONFIG.user}</strong>. Мой профиль — разработка сложных, масштабируемых бэкенд-систем и администрирование инфраструктур. Я не пишу код ради кода. Цель — автоматизация процессов, исключающая человеческий фактор.</p>
          <div className="border-l-2 border-green-500 bg-green-500/5 p-6 mt-8">
            <h3 className="text-white font-bold tracking-widest mb-2 flex items-center gap-2"><Crosshair size={16} className="text-green-500"/> ФИЛОСОФИЯ</h3>
            <p className="text-sm">Forward-thinking. Строгое разделение логики, микросервисная архитектура. Оптимизация на уровне железа и процессов. Решения прикладные и завершенные.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export const OsintCore = () => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <section>
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        <Crosshair className="text-red-500" size={24} />
        <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Open_Source_Intelligence</h2>
      </div>
      <p className="text-gray-400 max-w-3xl leading-relaxed mb-8">
        Разработка парсеров, ботов и аналитических модулей для сбора данных по открытым источникам. Мониторинг действий, анализ логов и выявление аномалий в сети. Инструменты спроектированы с упором на отказоустойчивость при работе с большими массивами данных.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <OsintScanner />
        </div>
        
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-[#050505] border border-white/10 p-6">
             <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Active_Probes</div>
             <div className="space-y-3">
               {OSINT_DB.map((db, i) => (
                 <div key={i} className="flex justify-between items-center text-[10px] font-mono border border-white/5 p-2 bg-[#000000]">
                   <div>
                     <div className="text-white">{db.module}</div>
                     <div className="text-gray-600 mt-0.5">LATENCY: {db.latency}</div>
                   </div>
                   <div className="text-right">
                     <div className={db.status === 'ACTIVE' ? 'text-green-500' : 'text-gray-500'}>{db.status}</div>
                     <div className="text-gray-600 mt-0.5">{db.records} REC</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const Infrastructure = () => {
  const [mockEndpoint, setMockEndpoint] = useState('/api/v1/auth/status');
  const [mockResponse, setMockResponse] = useState('');
  const executeApi = () => {
    setMockResponse('Executing query...');
    setTimeout(() => setMockResponse(JSON.stringify({ status: 200, message: "OK", data: { active_sessions: 14, system_load: "34%", auth_server: "UP" } }, null, 2)), 600);
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
                <ul className="space-y-3">{col.items.map((item, i) => <li key={i} className="text-sm text-gray-400 flex items-center gap-3"><Binary size={12} className="text-green-900" /> {item}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ИНТЕГРИРОВАН SQL И API */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <TerminalSquare className="text-green-500" size={24} />
            <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">API_Sandbox</h2>
          </div>
          <div className="bg-[#050505] border border-white/10 p-6 flex flex-col h-[300px]">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">REST API Request Builder</div>
            <div className="flex gap-2 mb-4">
              <select className="bg-[#000000] border border-white/10 text-green-500 p-2 text-xs font-bold outline-none"><option>GET</option><option>POST</option></select>
              <input type="text" value={mockEndpoint} onChange={(e)=>setMockEndpoint(e.target.value)} className="bg-[#000000] border border-white/10 text-white p-2 text-xs flex-1 outline-none font-mono" />
              <button onClick={executeApi} className="bg-green-500/10 text-green-500 border border-green-500/30 px-4 hover:bg-green-500 hover:text-black transition-colors flex items-center gap-2"><Play size={14}/> EXEC</button>
            </div>
            <div className="bg-[#000000] border border-white/10 p-4 flex-1 overflow-y-auto">
              <div className="text-[10px] text-green-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Response JSON</div>
              <pre className="text-xs text-gray-300 font-mono">{mockResponse || '// Awaiting execution...'}</pre>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <Database className="text-green-500" size={24} />
            <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">DB_Terminal</h2>
          </div>
          <SqlConsole />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <Activity className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Execution_Log</h2>
        </div>
        <div className="border-l border-white/10 ml-3 space-y-10">
          {TIMELINE.map((log, idx) => (
            <div key={idx} className="relative pl-8 group">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-green-900 group-hover:bg-green-500 transition-colors rounded-full shadow-[0_0_15px_rgba(34,197,94,0)] group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
              <div className="text-[10px] text-green-500/80 font-bold tracking-widest mb-1">{log.date}</div>
              <h3 className="text-lg text-white font-bold mb-2">{log.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">{log.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const Deployments = () => {
  const [activeFile, setActiveFile] = useState('docker-compose.yml');

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <CICDPipeline />
      
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <FolderTree className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">VFS_Config_Dump</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-[#050505] border border-white/10 p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Repository Tree</div>
            <div className="space-y-2">
              {Object.keys(VFS_DATA).map(file => (
                <button key={file} onClick={() => setActiveFile(file)} className={`w-full text-left text-xs font-mono p-2 flex items-center gap-2 transition-colors ${activeFile === file ? 'bg-green-500/10 text-green-400 border-l-2 border-green-500' : 'text-gray-400 hover:bg-white/5'}`}><FileCode size={14} /> {file}</button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 bg-[#000000] border border-white/10 p-6 overflow-x-auto relative">
            <div className="absolute top-0 right-0 bg-green-500/10 text-green-500 text-[9px] font-bold px-2 py-1 uppercase tracking-widest">READ_ONLY</div>
            <pre className="text-sm text-gray-300 font-mono leading-relaxed">{VFS_DATA[activeFile]}</pre>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
          <Cpu className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Deployed_Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="border border-white/5 bg-[#050505] p-8 hover:bg-[#0a0a0a] hover:border-green-500/30 transition-all group relative cursor-crosshair">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="text-green-500/40 group-hover:text-green-500 transition-colors">{proj.icon}</div>
                <div className="text-[10px] text-white/20 font-bold tracking-widest">{proj.id}</div>
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
};

export const Telemetry = () => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <section className="pb-8">
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        <Share2 className="text-green-500" size={24} />
        <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">Network_Topology</h2>
      </div>
      <div className="bg-[#050505] border border-white/10 p-8 h-[350px] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black"></div>
        <div className="relative z-10 w-full max-w-4xl flex justify-between items-center px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-black border-2 border-gray-600 rounded-full flex items-center justify-center text-gray-400"><Globe size={20}/></div>
            <span className="text-[9px] text-gray-500 font-bold tracking-widest">CLIENTS</span>
          </div>
          <div className="flex-1 h-px bg-gray-800 relative mx-4"><div className="absolute top-0 left-0 h-full w-1/3 bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></div></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-green-950 border-2 border-green-500 rounded-lg flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]"><Network size={24}/></div>
            <span className="text-[9px] text-green-500 font-bold tracking-widest">NGINX_LB</span>
          </div>
          <div className="w-16 h-24 border-t border-b border-l border-green-900/50 relative mx-4">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/50 animate-pulse"></div>
               <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500/50 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 bg-black border border-white/20 rounded-md flex items-center justify-center text-white"><Server size={20}/></div><span className="text-[9px] text-gray-400 font-bold tracking-widest">APP_NODE_1</span></div>
            <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 bg-black border border-white/20 rounded-md flex items-center justify-center text-white"><Server size={20}/></div><span className="text-[9px] text-gray-400 font-bold tracking-widest">APP_NODE_2</span></div>
          </div>
          <div className="w-12 h-px bg-white/20 mx-4"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-[#0a0a0a] border-2 border-blue-900 rounded-full flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(30,58,138,0.3)]"><Database size={28}/></div>
            <span className="text-[9px] text-blue-500 font-bold tracking-widest">PG_CLUSTER</span>
          </div>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 border border-white/10 bg-[#050505] p-8 shadow-lg flex flex-col justify-between">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-3 flex justify-between items-center">
          <span className="flex items-center gap-2"><BarChart size={14}/> Global_Compute_Load</span>
          <span className="px-2 py-1 bg-green-500/10 text-green-500 font-bold tracking-widest">ACTIVE</span>
        </div>
        <LiveGraph />
      </div>
      <div className="xl:col-span-1 space-y-8">
        <ThreatMonitor />
        <div className="border border-white/10 bg-[#050505] p-6 shadow-lg h-[240px] flex flex-col">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2 flex justify-between items-center">
            <span>Network_Stream</span><div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <LiveLogs />
        </div>
      </div>
    </div>
  </div>
);

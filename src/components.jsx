import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, ShieldCheck, Box, CheckCircle2, AlertTriangle, Activity, 
  Search, Database as DbIcon, ChevronRight, MapPin, Crosshair, Network, 
  Github, GitFork, Star, MessageSquare
} from 'lucide-react';
import { DOCKER_CONTAINERS } from './data';

export const Scanlines = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] opacity-10 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
);

export const LiveGraph = () => {
  const [bars, setBars] = useState(Array.from({ length: 40 }, () => Math.random() * 100));
  useEffect(() => {
    const interval = setInterval(() => setBars(prev => [...prev.slice(1), Math.random() * 100]), 150);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-24 flex items-end gap-[2px] opacity-80">
      {bars.map((h, i) => <div key={i} className="flex-1 bg-green-500 transition-all duration-75" style={{ height: `${h}%`, opacity: h / 100 }} />)}
    </div>
  );
};

export const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const IPS = ['192.168.1.10', '10.0.4.55', '172.16.254.1', '45.33.22.11'];
  const ACTIONS = ['POST /api/v2/sync', 'GET /health_check', 'AUTH_TOKEN_GEN', 'DB_QUERY_OK'];
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-10), `[${new Date().toISOString().split('T')[1].slice(0,-1)}] ${IPS[Math.floor(Math.random()*IPS.length)]} -> ${ACTIONS[Math.floor(Math.random()*ACTIONS.length)]}`]);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-mono text-[9px] text-green-500/60 space-y-1 h-[140px] flex flex-col justify-end overflow-hidden">
      {logs.map((log, i) => <div key={i}>{log}</div>)}
    </div>
  );
};

export const HtopSimulation = () => {
  const [processes, setProcesses] = useState([]);
  useEffect(() => {
    const generate = () => {
      const cmds = ['python3 sync.py', 'postgres', 'redis-server', 'nginx: worker', 'bash', 'docker-proxy'];
      return Array.from({length: 6}, (_, i) => ({
        pid: Math.floor(Math.random() * 30000) + 1000, user: i === 0 ? 'nanda' : 'root',
        cpu: (Math.random() * 15).toFixed(1), mem: (Math.random() * 5).toFixed(1),
        time: `00:0${Math.floor(Math.random()*9)}:${Math.floor(Math.random()*59).toString().padStart(2,'0')}`,
        cmd: cmds[Math.floor(Math.random() * cmds.length)]
      })).sort((a, b) => b.cpu - a.cpu);
    };
    setProcesses(generate());
    const interval = setInterval(() => setProcesses(generate()), 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#050505] border border-white/10 p-6 flex flex-col h-[280px] shadow-lg">
      <div className="text-[10px] text-green-500 font-bold tracking-widest mb-4 border-b border-white/5 pb-2 flex justify-between">
        <span className="flex items-center gap-2"><Terminal size={14}/> HTOP_PROCESS_ORCHESTRATOR</span><span>UPTIME: 14 DAYS</span>
      </div>
      <div className="flex-1 overflow-hidden font-mono text-[10px]">
        <div className="grid grid-cols-6 text-gray-500 mb-2 font-bold">
          <div>PID</div><div>USER</div><div>CPU%</div><div>MEM%</div><div>TIME+</div><div>COMMAND</div>
        </div>
        <div className="space-y-1">
          {processes.map((p, i) => (
            <div key={i} className="grid grid-cols-6 text-gray-300 hover:bg-white/5 transition-colors cursor-crosshair">
              <div className="text-green-500">{p.pid}</div><div>{p.user}</div>
              <div className={p.cpu > 10 ? 'text-red-400' : ''}>{p.cpu}</div>
              <div>{p.mem}</div><div>{p.time}</div><div className="truncate">{p.cmd}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ThreatMonitor = () => {
  const [threats, setThreats] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const port = [22, 3306, 443, 80][Math.floor(Math.random()*4)];
        const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
        setThreats(prev => [...prev.slice(-3), { ip, port, type: port === 22 ? 'SSH BRUTEFORCE' : 'DDoS PROBE', time: new Date().toLocaleTimeString() }]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="border border-red-900/40 bg-[#1a0505] p-6 shadow-inner relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
      <div className="text-[10px] text-red-500 uppercase tracking-widest mb-4 border-b border-red-900/50 pb-2 flex justify-between">
        <span className="flex items-center gap-2"><ShieldCheck size={14}/> THREAT_DEFENSE_MATRIX</span><span className="animate-pulse">ACTIVE_BLOCK</span>
      </div>
      <div className="space-y-2">
        {threats.map((t, i) => (
          <div key={i} className="flex justify-between items-center text-[9px] font-mono border border-red-900/30 p-2 bg-red-950/20">
            <span className="text-red-400">[{t.time}] {t.type}</span><span className="text-gray-500">SRC: {t.ip}:{t.port}</span>
            <span className="text-red-500 font-bold bg-red-900/30 px-2">BLOCKED</span>
          </div>
        ))}
        {threats.length === 0 && <div className="text-[10px] text-green-500 font-mono">NO THREATS DETECTED. IDS/IPS ARMED.</div>}
      </div>
    </div>
  );
};

export const CICDPipeline = () => {
  const stages = [{ name: 'COMMIT', status: 'success', time: '12s' }, { name: 'BUILD', status: 'success', time: '1m 24s' }, { name: 'TEST', status: 'success', time: '45s' }, { name: 'SEC_SCAN', status: 'warning', time: '2m 10s' }, { name: 'DEPLOY', status: 'pending', time: '--' }];
  return (
    <div className="bg-[#050505] border border-white/10 p-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-2">Deployment_Pipeline_Status</div>
      <div className="flex items-center justify-between relative overflow-x-auto pb-4">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10"></div>
        {stages.map((stage, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 bg-[#050505] px-4 min-w-[100px]">
            {stage.status === 'success' && <div className="w-8 h-8 rounded-full bg-green-900/40 border border-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]"><CheckCircle2 size={16} className="text-green-500"/></div>}
            {stage.status === 'warning' && <div className="w-8 h-8 rounded-full bg-yellow-900/40 border border-yellow-500 flex items-center justify-center"><AlertTriangle size={16} className="text-yellow-500"/></div>}
            {stage.status === 'pending' && <div className="w-8 h-8 rounded-full bg-black border border-gray-600 flex items-center justify-center"><Activity size={16} className="text-gray-500 animate-pulse"/></div>}
            <div className="text-center">
              <div className={`text-[10px] font-bold tracking-widest ${stage.status === 'success' ? 'text-green-500' : stage.status === 'warning' ? 'text-yellow-500' : 'text-gray-500'}`}>{stage.name}</div>
              <div className="text-[9px] text-gray-600 font-mono mt-1">{stage.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DockerManager = () => (
  <div className="bg-[#050505] border border-white/10 p-6 shadow-lg">
    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2 flex justify-between">
      <span className="flex items-center gap-2"><Box size={14}/> DOCKER_ORCHESTRATION</span><span className="text-green-500 font-bold">DAEMON: ACTIVE</span>
    </div>
    <div className="space-y-2">
      <div className="grid grid-cols-12 text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-2">
        <div className="col-span-4">Container</div><div className="col-span-4">Image</div><div className="col-span-2">Status</div><div className="col-span-2 text-right">CPU</div>
      </div>
      {DOCKER_CONTAINERS.map((c, i) => (
        <div key={i} className="grid grid-cols-12 text-[10px] font-mono items-center border border-white/5 bg-[#000000] p-2 hover:border-green-500/30 transition-colors">
          <div className="col-span-4 text-white font-bold truncate pr-2">{c.name}</div><div className="col-span-4 text-gray-400 truncate pr-2">{c.image}</div>
          <div className={`col-span-2 ${c.status.includes('Up') ? 'text-green-500' : 'text-red-500'}`}>{c.status}</div>
          <div className="col-span-2 text-right text-gray-500">{c.cpu}</div>
        </div>
      ))}
    </div>
  </div>
);

export const SqlConsole = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([{ type: 'info', text: 'PostgreSQL 15.2 connection established.\nType SQL queries (e.g., SELECT * FROM users;) or "help" for commands.' }]);
  const endRef = React.useRef(null);

  const executeSql = (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    const cmd = input.trim();
    const newOut = [...output, { type: 'query', text: `nanda_db=> ${cmd}` }];
    
    const c = cmd.toLowerCase();
    if (c.includes('select * from users')) {
      newOut.push({ type: 'table', cols: ['id', 'username', 'role', 'status'], rows: [['1', 'nanda', 'root', 'active'], ['2', 'sys_daemon', 'bot', 'active']] });
    } else if (c.includes('select * from roles')) {
      newOut.push({ type: 'table', cols: ['role_id', 'guild_id', 'permissions'], rows: [['849302', '110293', '0x8'], ['993021', '110293', '0x0']] });
    } else if (c === 'help') {
      newOut.push({ type: 'info', text: 'Available mock queries:\n- SELECT * FROM users;\n- SELECT * FROM roles;\n- clear' });
    } else if (c === 'clear') {
      setOutput([]); setInput(''); return;
    } else {
      newOut.push({ type: 'error', text: `ERROR: syntax error at or near "${cmd.split(' ')[0]}"` });
    }
    setOutput(newOut); setInput('');
  };

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [output]);

  return (
    <div className="bg-[#050505] border border-white/10 p-6 shadow-lg flex flex-col h-[300px]">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2 flex justify-between">
        <span className="flex items-center gap-2"><DbIcon size={14}/> PSQL_CONSOLE</span>
        <span className="text-blue-500 font-bold">PORT: 5432</span>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-hide">
        {output.map((out, i) => {
          if (out.type === 'table') return (
             <div key={i} className="my-2 border border-white/10">
               <div className="grid grid-cols-4 bg-white/5 p-1 text-green-500 font-bold border-b border-white/10">
                 {out.cols.map(c => <div key={c}>{c}</div>)}
               </div>
               {out.rows.map((row, rIdx) => (
                 <div key={rIdx} className="grid grid-cols-4 p-1 text-gray-300">
                   {row.map((cell, cIdx) => <div key={cIdx}>{cell}</div>)}
                 </div>
               ))}
               <div className="p-1 text-gray-500">({out.rows.length} rows)</div>
             </div>
          );
          return <div key={i} className={`${out.type === 'error' ? 'text-red-400' : out.type === 'query' ? 'text-white' : 'text-blue-400'} whitespace-pre-wrap`}>{out.text}</div>;
        })}
        <div ref={endRef} />
      </div>
      <form onSubmit={executeSql} className="mt-2 border-t border-white/10 pt-2 flex items-center gap-2">
        <span className="text-blue-500 font-bold text-xs">nanda_db=&gt;</span>
        <input type="text" value={input} onChange={e=>setInput(e.target.value)} className="bg-transparent flex-1 text-xs text-white focus:outline-none font-mono" autoComplete="off" placeholder="SELECT * FROM users;"/>
      </form>
    </div>
  );
};

export const CommandPalette = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  if (!isOpen) return null;

  const actions = [
    { name: 'Go to Dashboard', path: '/' },
    { name: 'View Identity Profile', path: '/identity' },
    { name: 'Open Infrastructure Matrix', path: '/infrastructure' },
    { name: 'Check Deployments', path: '/deployments' },
    { name: 'Launch OSINT Tools', path: '/osint' },
    { name: 'Monitor Live Telemetry', path: '/telemetry' },
    { name: 'Connect to 404 : Server Not Found (Discord)', url: 'https://discord.gg/cheterin', icon: <MessageSquare size={14} className="text-[#5865F2]" /> }
  ].filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="w-full max-w-xl bg-[#0a0a0a] border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)] rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <Search className="text-green-500" size={18} />
          <input 
            autoFocus 
            value={search} 
            onChange={e=>setSearch(e.target.value)} 
            placeholder="Type a command or search..." 
            className="w-full bg-transparent text-white text-sm focus:outline-none font-mono"
          />
          <div className="text-[10px] text-gray-500 border border-white/10 px-1.5 py-0.5 rounded">ESC</div>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {actions.length === 0 ? (
             <div className="p-4 text-center text-xs text-gray-500 font-mono">No commands found.</div>
          ) : (
             actions.map((action, idx) => (
               <button 
                 key={idx}
                 onClick={() => { 
                   if (action.url) { window.open(action.url, '_blank'); } 
                   else { navigate(action.path); }
                   setOpen(false); setSearch(''); 
                 }}
                 className="w-full text-left p-3 flex items-center justify-between hover:bg-green-500/10 transition-colors group"
               >
                 <span className="text-xs text-gray-300 font-mono group-hover:text-white flex items-center gap-2">
                   {action.icon ? action.icon : <ChevronRight size={14} className="text-transparent group-hover:text-green-500"/>} 
                   {action.name}
                 </span>
                 <span className="text-[9px] text-gray-600 font-mono tracking-widest">{action.url ? 'EXTERNAL' : action.path.toUpperCase()}</span>
               </button>
             ))
          )}
        </div>
      </div>
    </div>
  );
};

export const OsintScanner = () => {
  const [target, setTarget] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);

  const startScan = () => {
    if (!target || !target.trim() || scanning) return;
    
    setScanning(true);
    setResults(null);
    setLogs([]);

    const currentTarget = target.trim();
    const steps = [
      `[INIT] Target lock: ${currentTarget}`,
      '[SEARCH] Querying Telegram DB...',
      '[SEARCH] Parsing GitHub commits...',
      '[EXTRACT] Cross-referencing Discord IDs...',
      '[ANALYZE] Resolving historical IPs...',
      '[DONE] Payload compiled.'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setLogs(prev => [...prev, steps[stepIdx]]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setScanning(false);
        setResults({
          alias: currentTarget,
          confidence: '94%',
          lastIp: `192.${Math.floor(Math.random()*255)}.x.x`,
          breaches: Math.floor(Math.random() * 5) + 1,
          tgId: Math.floor(Math.random() * 9000000000) + 1000000000
        });
      }
    }, 600);
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-6 flex flex-col h-[400px] relative overflow-hidden">
      {scanning && <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>}
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between">
        <span className="flex items-center gap-2"><Crosshair size={14}/> OSINT_DATA_AGGREGATOR</span>
        <span className={scanning ? 'text-red-500 animate-pulse' : 'text-green-500'}>{scanning ? 'SCANNING' : 'STANDBY'}</span>
      </div>

      <div className="flex gap-2 mb-6 relative z-10">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') startScan(); }}
            disabled={scanning}
            placeholder="Enter Alias, Email, or IP..." 
            className="w-full bg-[#000000] border border-white/10 p-3 pl-9 text-xs text-white focus:border-red-500 focus:outline-none transition-colors font-mono disabled:opacity-50"
          />
        </div>
        <button 
          onClick={startScan}
          disabled={scanning} 
          className="bg-red-900/20 border border-red-500/30 text-red-500 px-6 font-bold text-xs hover:bg-red-500 hover:text-black transition-colors disabled:opacity-50 tracking-widest"
        >
          TRACE
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="bg-[#000000] border border-white/10 p-4 font-mono text-[10px] overflow-y-auto space-y-1">
          {logs.map((log, i) => (
             <div key={i} className={log?.includes('[DONE]') ? 'text-green-400 font-bold' : 'text-gray-400'}>{log}</div>
          ))}
          {scanning && <div className="text-red-500 animate-pulse">...</div>}
        </div>
        <div className="bg-[#000000] border border-white/10 p-4 font-mono text-xs flex flex-col justify-center relative">
          {!results && !scanning && <div className="text-gray-600 text-center text-[10px]">AWAITING TARGET INPUT</div>}
          {scanning && <div className="absolute inset-0 flex items-center justify-center"><Network size={32} className="text-red-500/30 animate-spin" /></div>}
          {results && (
             <div className="space-y-3 animate-in fade-in duration-300">
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-500">TARGET</span><span className="text-white font-bold">{results.alias}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-500">CONFIDENCE</span><span className="text-green-500 font-bold">{results.confidence}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-500">LAST_KNOWN_IP</span><span className="text-white flex items-center gap-1"><MapPin size={10}/> {results.lastIp}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-500">TG_ID</span><span className="text-white">{results.tgId}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">DB_BREACHES</span><span className="text-red-400 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {results.breaches} FOUND</span></div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// НОВЫЙ МОДУЛЬ: Реальный fetch с GitHub API
export const GithubIntegration = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Nanda070/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error('GitHub API Fetch Error:', e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <Github className="text-green-500" size={24} />
          <h2 className="text-2xl text-white font-black tracking-[0.2em] uppercase">GitHub_Repositories</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] text-green-500 font-bold tracking-widest uppercase">LIVE_SYNC</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-xs text-gray-500 font-mono py-12 animate-pulse">FETCHING REPOSITORIES FROM GITHUB...</div>
      ) : repos.length === 0 ? (
        <div className="text-center text-xs text-gray-500 font-mono py-12 border border-white/5 bg-[#050505]">NO PUBLIC REPOSITORIES FOUND FOR @Nanda070</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer"
              className="block bg-[#050505] border border-white/10 p-6 hover:border-green-500/40 hover:bg-[#0a0a0a] transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <Github size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-[9px] text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded">{repo.visibility}</span>
              </div>
              <h3 className="text-lg text-white font-bold mb-2 truncate group-hover:text-green-400 transition-colors">{repo.name}</h3>
              <p className="text-xs text-gray-500 mb-6 line-clamp-2 h-8">{repo.description || 'No description provided.'}</p>
              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</div>
                <div className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, Box, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
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
    <div className="bg-[#050505] border border-white/10 p-6 flex flex-col h-[280px]">
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
            {stage.status === 'success' && <div className="w-8 h-8 rounded-full bg-green-900/40 border border-green-500 flex items-center justify-center"><CheckCircle2 size={16} className="text-green-500"/></div>}
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
  <div className="bg-[#050505] border border-white/10 p-6">
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

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Activity, Cpu, Database, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-cyan-vibrant font-pixel selection:bg-magenta-vibrant/40 overflow-x-hidden p-4 md:p-8">
      <div className="crt-overlay" />
      
      {/* Header / System Status */}
      <header className="relative z-10 mb-12 border-b-4 border-cyan-vibrant pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter glitch-text uppercase">
            Neural_Link_v0.9
          </h1>
          <div className="flex items-center gap-4 text-magenta-vibrant text-xl uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Activity className="w-5 h-5" /> STATUS: CRITICAL
            </span>
            <span className="animate-pulse">|</span>
            <span className="flex items-center gap-2">
              <Cpu className="w-5 h-5" /> CPU: 99%
            </span>
          </div>
        </div>
        
        <div className="text-right font-mono text-sm opacity-70">
          <p>LOC: 37.7749° N, 122.4194° W</p>
          <p>TIME: {new Date().toISOString()}</p>
          <p>USER: fareedashaik058@gmail.com</p>
        </div>
      </header>

      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: System Logs / Cryptic Info */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glitch-border p-4 bg-black/80 space-y-4">
            <h2 className="text-2xl font-bold text-magenta-vibrant border-b border-magenta-vibrant/30 pb-2">SYSTEM_LOG</h2>
            <div className="font-mono text-xs space-y-2 h-48 overflow-y-auto custom-scrollbar">
              <p className="text-green-500">[OK] BOOT_SEQUENCE_INITIATED</p>
              <p className="text-yellow-500">[WARN] MEMORY_LEAK_DETECTED_IN_SECTOR_7</p>
              <p className="text-red-500">[ERR] VOID_PROTOCOL_BREACH</p>
              <p>[INFO] ATTEMPTING_RECOVERY...</p>
              <p className="text-cyan-vibrant">[OK] AUDIO_DRIVERS_OVERRIDDEN</p>
              <p className="text-magenta-vibrant">[CRIT] UNKNOWN_ENTITY_CONNECTED</p>
              <p>[INFO] LOADING_SNAKE_MODULE.EXE</p>
              <p className="text-green-500">[OK] GAME_ENGINE_STABILIZED</p>
              <p className="animate-pulse">_</p>
            </div>
          </div>

          <div className="glitch-border p-4 bg-black/80">
            <h2 className="text-2xl font-bold text-magenta-vibrant border-b border-magenta-vibrant/30 pb-2 mb-4">AUDIO_FEED</h2>
            <MusicPlayer />
          </div>
        </aside>

        {/* Center: The Game (The Core) */}
        <section className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full flex justify-center">
            <div className="absolute -inset-4 bg-magenta-vibrant/10 blur-3xl rounded-full animate-pulse" />
            <div className="relative screen-tear">
              <SnakeGame />
            </div>
          </div>
          
          <div className="mt-12 w-full max-w-2xl glitch-border p-6 bg-black/90">
            <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Zap className="text-magenta-vibrant" /> INSTRUCTIONS_FOR_HUMAN
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-magenta-vibrant font-bold">[↑↓←→]</span> NAVIGATE_VOID
              </li>
              <li className="flex items-center gap-2">
                <span className="text-magenta-vibrant font-bold">[SPACE]</span> TOGGLE_EXISTENCE
              </li>
              <li className="flex items-center gap-2">
                <span className="text-magenta-vibrant font-bold">[ESC]</span> ABORT_MISSION
              </li>
              <li className="flex items-center gap-2">
                <span className="text-magenta-vibrant font-bold">[R]</span> REBOOT_CONSCIOUSNESS
              </li>
            </ul>
          </div>
        </section>

        {/* Right: Data / Metrics */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glitch-border p-4 bg-black/80">
            <h2 className="text-2xl font-bold text-magenta-vibrant border-b border-magenta-vibrant/30 pb-2 mb-4">ENTITY_RANKINGS</h2>
            <div className="space-y-3">
              {[
                { id: 'X-99', score: '99999' },
                { id: 'VOID_WALKER', score: '88421' },
                { id: 'NULL_POINTER', score: '77312' },
                { id: 'GHOST_IN_SHELL', score: '66201' },
              ].map((entity, i) => (
                <div key={i} className="flex justify-between items-center p-2 border border-cyan-vibrant/20 hover:bg-cyan-vibrant/10 transition-colors cursor-crosshair">
                  <span className="text-xl">{entity.id}</span>
                  <span className="text-magenta-vibrant font-mono">{entity.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glitch-border p-4 bg-magenta-vibrant/5 border-magenta-vibrant">
            <h2 className="text-2xl font-bold text-magenta-vibrant border-b border-magenta-vibrant/30 pb-2 mb-4">HARDWARE_TELEMETRY</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-2 border border-magenta-vibrant/20">
                <p className="text-xs opacity-50">TEMP</p>
                <p className="text-2xl">88°C</p>
              </div>
              <div className="p-2 border border-magenta-vibrant/20">
                <p className="text-xs opacity-50">FAN</p>
                <p className="text-2xl">MAX</p>
              </div>
              <div className="p-2 border border-magenta-vibrant/20">
                <p className="text-xs opacity-50">VOLT</p>
                <p className="text-2xl">1.4V</p>
              </div>
              <div className="p-2 border border-magenta-vibrant/20">
                <p className="text-xs opacity-50">FREQ</p>
                <p className="text-2xl">5.2G</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="relative z-10 mt-24 pt-8 border-t-2 border-cyan-vibrant/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50 uppercase tracking-[0.5em]">
        <p>TERMINAL_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
        <p>NO_FUTURE_NO_PAST_ONLY_THE_MACHINE</p>
        <p>© 2026_VOID_INDUSTRIES</p>
      </footer>
    </div>
  );
}

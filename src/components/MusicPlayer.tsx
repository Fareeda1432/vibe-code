import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'VOID_SIGNAL_01',
    artist: 'NULL_ENTITY',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/glitch1/400/400',
  },
  {
    id: '2',
    title: 'NEURAL_STATIC',
    artist: 'VOID_WALKER',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/glitch2/400/400',
  },
  {
    id: '3',
    title: 'GHOST_PROTOCOL',
    artist: 'X-99',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/glitch3/400/400',
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration) {
        audioRef.current.currentTime = (value[0] / 100) * duration;
        setProgress(value[0]);
      }
    }
  };

  return (
    <div className="w-full bg-black border-2 border-cyan-vibrant p-4 relative overflow-hidden group">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,var(--color-magenta-vibrant)_0%,transparent_70%)]" />

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0 border-2 border-magenta-vibrant">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full h-full grayscale hover:grayscale-0 transition-all"
            >
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-xl font-bold text-cyan-vibrant truncate glitch-text">{currentTrack.title}</h3>
            <p className="text-xs text-magenta-vibrant uppercase tracking-widest">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="space-y-1">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-crosshair"
          />
          <div className="flex justify-between text-[10px] font-mono text-cyan-vibrant/50 uppercase tracking-tighter">
            <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '00:00'}</span>
            <span>{audioRef.current ? formatTime(audioRef.current.duration) : '00:00'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTrack}
              className="text-cyan-vibrant hover:bg-cyan-vibrant/20 rounded-none"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              size="icon"
              onClick={togglePlay}
              className="w-10 h-10 rounded-none bg-cyan-vibrant text-black hover:bg-magenta-vibrant transition-colors border-2 border-white"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextTrack}
              className="text-cyan-vibrant hover:bg-cyan-vibrant/20 rounded-none"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-24">
            <Volume2 className="w-3 h-3 text-magenta-vibrant" />
            <Slider
              value={[volume]}
              max={100}
              onValueChange={(v) => setVolume(v[0])}
              className="cursor-crosshair"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function formatTime(seconds: number) {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

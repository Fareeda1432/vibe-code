import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Point, GameStatus } from '../types';
import { RotateCcw, Play, Pause, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Point = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [status, setStatus] = useState<GameStatus>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setStatus('PLAYING');
    setSpeed(INITIAL_SPEED);
    setFood(generateFood(INITIAL_SNAKE));
  };

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setStatus('GAME_OVER');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(prev - 2, 60));
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, generateFood, highScore]);

  useEffect(() => {
    if (status === 'PLAYING') {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [status, moveSnake, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          if (status === 'PLAYING') setStatus('PAUSED');
          else if (status === 'PAUSED') setStatus('PLAYING');
          else if (status === 'IDLE' || status === 'GAME_OVER') resetGame();
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, status]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-between w-full max-w-[400px] items-center mb-2 font-pixel">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-cyan-vibrant opacity-50">DATA_HARVESTED</span>
          <span className="text-3xl text-cyan-vibrant glitch-text">
            {score.toString().padStart(6, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-magenta-vibrant opacity-50">PEAK_EFFICIENCY</span>
          <span className="text-3xl text-magenta-vibrant glitch-text">
            {highScore.toString().padStart(6, '0')}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Glitchy Frame */}
        <div className="absolute -inset-2 border-2 border-cyan-vibrant/30 animate-pulse" />
        <div className="absolute -inset-4 border border-magenta-vibrant/20 animate-ping" />
        
        <div 
          className="relative bg-black border-4 border-cyan-vibrant overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          style={{
            width: GRID_SIZE * 20,
            height: GRID_SIZE * 20,
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

          {/* Snake */}
          {snake.map((segment, i) => (
            <motion.div
              key={`${i}-${segment.x}-${segment.y}`}
              initial={false}
              animate={{
                x: segment.x * 20,
                y: segment.y * 20,
              }}
              transition={{ type: 'just' }}
              className="absolute w-[20px] h-[20px] border border-black"
              style={{
                backgroundColor: i === 0 ? '#00FFFF' : '#FF00FF',
                boxShadow: i === 0 ? '0 0 15px #00FFFF' : '0 0 10px #FF00FF',
                zIndex: snake.length - i,
              }}
            />
          ))}

          {/* Food */}
          <motion.div
            animate={{
              opacity: [1, 0.2, 1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
            className="absolute w-[20px] h-[20px] bg-white shadow-[0_0_20px_#FFF]"
            style={{
              left: food.x * 20,
              top: food.y * 20,
            }}
          />

          {/* Overlays */}
          <AnimatePresence>
            {status !== 'PLAYING' && (
              <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6 text-center"
              >
                {status === 'IDLE' && (
                  <>
                    <h2 className="text-6xl font-black text-cyan-vibrant mb-4 glitch-text">VOID_SNAKE</h2>
                    <p className="text-magenta-vibrant mb-8 text-xl tracking-tighter">INITIATE_NEURAL_LINK?</p>
                    <Button 
                      onClick={resetGame}
                      className="bg-cyan-vibrant hover:bg-magenta-vibrant text-black font-bold px-12 py-8 rounded-none border-4 border-white transition-all transform hover:skew-x-12"
                    >
                      <span className="text-2xl uppercase">EXECUTE(START)</span>
                    </Button>
                  </>
                )}

                {status === 'PAUSED' && (
                  <>
                    <h2 className="text-6xl font-black text-yellow-500 mb-8 glitch-text">HALTED</h2>
                    <Button 
                      onClick={() => setStatus('PLAYING')}
                      className="bg-cyan-vibrant hover:bg-magenta-vibrant text-black font-bold px-12 py-8 rounded-none border-4 border-white transition-all transform hover:-skew-x-12"
                    >
                      <span className="text-2xl uppercase">RESUME_FLOW</span>
                    </Button>
                  </>
                )}

                {status === 'GAME_OVER' && (
                  <>
                    <div className="flex items-center gap-4 text-magenta-vibrant mb-4">
                      <AlertTriangle className="w-12 h-12" />
                      <h2 className="text-6xl font-black glitch-text">FATAL_ERR</h2>
                    </div>
                    <p className="text-white/60 mb-8 text-xl">CONSCIOUSNESS_TERMINATED</p>
                    <Button 
                      onClick={resetGame}
                      className="bg-magenta-vibrant hover:bg-cyan-vibrant text-black font-bold px-12 py-8 rounded-none border-4 border-white transition-all transform hover:rotate-3"
                    >
                      <span className="text-2xl uppercase">REBOOT_SYSTEM</span>
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

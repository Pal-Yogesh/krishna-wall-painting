'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { rooms } from '@/data/rooms';

interface PaintVisualizerProps {
  color: string;
  finish: string;
  selectedWall: string;
  onWallChange: (wall: string) => void;
}

const finishBrightness: Record<string, number> = {
  matte: 1,
  satin: 1.08,
  gloss: 1.15,
};

export default function PaintVisualizer({
  color,
  finish,
  selectedWall,
  onWallChange,
}: PaintVisualizerProps) {
  const [roomIndex, setRoomIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const room = rooms[roomIndex];
  const brightness = finishBrightness[finish] ?? 1;

  const [activeWalls, setActiveWalls] = useState<Set<string>>(
    new Set(room.walls.map((w) => w.id))
  );

  // Reset active walls when switching rooms
  useEffect(() => {
    setActiveWalls(new Set(rooms[roomIndex].walls.map((w) => w.id)));
  }, [roomIndex]);

  const toggleWall = (wallId: string) => {
    setActiveWalls((prev) => {
      const next = new Set(prev);
      if (next.has(wallId)) next.delete(wallId);
      else next.add(wallId);
      return next;
    });
  };

  const resetWalls = () => {
    setActiveWalls(new Set(room.walls.map((w) => w.id)));
  };

  const prevRoom = () => setRoomIndex((i) => (i - 1 + rooms.length) % rooms.length);
  const nextRoom = () => setRoomIndex((i) => (i + 1) % rooms.length);

  return (
    <div className="relative w-full h-full flex flex-col  overflow-hidden">
      <div
        className={`relative flex-1 overflow-hidden transition-transform duration-500 ease-out ${
          zoomed ? 'scale-[1.5] origin-center cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={() => setZoomed((z) => !z)}
      >
        <img
          src={room.image}
          alt={room.label}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />
        <svg
          viewBox={room.viewBox}
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: 'none' }}
        >
          {room.walls.map((wall) => (
            <g
              key={wall.id + color + finish}
              style={{
                mixBlendMode: 'multiply',
                filter: `brightness(${brightness})`,
              }}
            >
              <motion.path
                d={wall.path}
                strokeWidth="0"
                stroke="none"
                initial={{ fill: 'transparent' }}
                animate={{
                  fill: activeWalls.has(wall.id) ? color : 'transparent',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                pointerEvents="none"
              />
            </g>
          ))}
        </svg>
        <div
          className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 pointer-events-auto cursor-pointer"
          onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
        >
          {zoomed ? (
            <ZoomOut className="w-4 h-4 text-white/80" />
          ) : (
            <ZoomIn className="w-4 h-4 text-white/80" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border-t border-white/5">
        <span className="text-white/50 text-xs mr-1">Walls:</span>
        {room.walls.map((wall) => (
          <button
            key={wall.id}
            onClick={() => toggleWall(wall.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeWalls.has(wall.id)
                ? 'bg-white text-black'
                : 'bg-white/10 text-white/50 hover:bg-white/20'
            }`}
          >
            {wall.label}
          </button>
        ))}
        <button
          onClick={resetWalls}
          className="ml-auto p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/50"
          title="Reset all walls"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={prevRoom}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-white text-sm font-medium min-w-[90px] text-center">
            {room.label}
          </span>
          <button
            onClick={nextRoom}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-1.5">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setRoomIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === roomIndex ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-7 h-7 rounded-full border-2 border-white/30 shadow-lg"
            animate={{ backgroundColor: color }}
            transition={{ duration: 0.3 }}
          />
          <div className="text-right">
            <p className="text-white text-xs font-mono leading-none">
              {color.toUpperCase()}
            </p>
            <p className="text-white/50 text-[10px] capitalize">{finish}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

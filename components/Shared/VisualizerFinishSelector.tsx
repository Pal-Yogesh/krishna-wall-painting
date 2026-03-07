'use client';

import { motion } from 'framer-motion';

interface VisualizerFinishSelectorProps {
  selectedFinish: string;
  onFinishChange: (finish: string) => void;
}

const finishes = [
  { id: 'matte', name: 'Matte', description: 'Non-reflective, elegant look', icon: '◎' },
  { id: 'satin', name: 'Satin', description: 'Subtle sheen, easy to clean', icon: '◔' },
  { id: 'gloss', name: 'Gloss', description: 'High shine, premium appearance', icon: '●' },
];

export default function VisualizerFinishSelector({
  selectedFinish,
  onFinishChange,
}: VisualizerFinishSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {finishes.map((finish) => {
        const isSelected = selectedFinish === finish.id;
        return (
          <motion.button
            key={finish.id}
            onClick={() => onFinishChange(finish.id)}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
              isSelected
                ? 'border-amber-500 bg-amber-50'
                : 'border-stone-200 bg-white hover:border-amber-300'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: isSelected
                ? '0 0 20px rgba(245, 158, 11, 0.2)'
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2 text-amber-500">{finish.icon}</div>
              <p className="font-semibold text-stone-800 text-sm">{finish.name}</p>
              <p className="text-xs text-stone-400 mt-1">{finish.description}</p>
            </div>
            {isSelected && (
              <motion.div
                className="absolute top-2 right-2"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

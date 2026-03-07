'use client';

import { motion } from 'framer-motion';
import ColorPicker from './ColorPicker';
import VisualizerFinishSelector from './VisualizerFinishSelector';
import ColorInfoCard from './ColorInfoCard';

interface VisualizerControlPanelProps {
  selectedColor: string;
  selectedFinish: string;
  selectedWall: string;
  onColorChange: (color: string) => void;
  onFinishChange: (finish: string) => void;
  onWallChange: (wall: string) => void;
  onEnquire?: () => void;
  onReset?: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function VisualizerControlPanel({
  selectedColor,
  selectedFinish,
  onColorChange,
  onFinishChange,
  onEnquire,
  onReset,
}: VisualizerControlPanelProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="flex flex-col bg-white"
    >
      <div className="px-6 pt-6 pb-4 border-b border-stone-200">
        <h2 className="text-base font-semibold text-stone-800">Colour Selector</h2>
        <p className="text-xs text-stone-400 mt-0.5">Pick any shade and see it live on your wall</p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <motion.div variants={itemVariants}>
          <ColorPicker color={selectedColor} onChange={onColorChange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-sm font-semibold text-stone-800 mb-3">Paint Finish</p>
          <VisualizerFinishSelector selectedFinish={selectedFinish} onFinishChange={onFinishChange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ColorInfoCard color={selectedColor} finish={selectedFinish} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnquire}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-sm tracking-wide transition-colors shadow-lg shadow-amber-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Enquire for This Color
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="w-full py-3 border-2 border-stone-200 hover:border-amber-300 text-stone-600 hover:text-amber-600 font-semibold rounded-2xl text-sm tracking-wide transition-all"
          >
            Try Another Color
          </motion.button>
        </motion.div>

        {/* Color info summary */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 p-3 rounded-2xl"
          style={{
            backgroundColor: selectedColor + "22",
            border: `1.5px solid ${selectedColor}44`,
          }}
        >
          <span
            className="w-10 h-10 rounded-xl shrink-0 shadow-sm border-2 border-white"
            style={{ backgroundColor: selectedColor }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-stone-800 text-sm truncate">
              {selectedColor.toUpperCase()}
            </p>
            <p className="text-xs text-stone-500 font-mono">Custom Color</p>
          </div>
          <span className="text-xs font-semibold text-stone-400 capitalize shrink-0">
            {selectedFinish}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

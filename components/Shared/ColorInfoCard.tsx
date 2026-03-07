'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface ColorInfoCardProps {
  color: string;
  finish: string;
}

const finishInfo: Record<string, { label: string; desc: string }> = {
  matte: { label: 'Matte', desc: 'Velvety, non-reflective. Hides wall imperfections.' },
  satin: { label: 'Satin', desc: 'Subtle sheen. Durable and easy to clean.' },
  gloss: { label: 'Gloss', desc: 'High shine. Best for trim and accent walls.' },
};

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
}

export default function ColorInfoCard({ color, finish }: ColorInfoCardProps) {
  const [copied, setCopied] = useState(false);
  const rgb = hexToRgb(color);
  const fi = finishInfo[finish] ?? finishInfo.matte;

  const copy = async () => {
    await navigator.clipboard.writeText(color.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div layout className="rounded-xl border border-stone-200 bg-white overflow-hidden">
      <motion.div className="h-16 w-full" animate={{ backgroundColor: color }} transition={{ duration: 0.4 }} />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-stone-400">Hex Code</p>
            <p className="text-sm font-mono font-semibold text-stone-800">{color.toUpperCase()}</p>
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        {rgb && (
          <div className="flex gap-3 text-xs">
            {(['r', 'g', 'b'] as const).map((ch) => (
              <div key={ch} className="flex-1 bg-stone-100 rounded-lg p-2 text-center">
                <p className="text-stone-400 uppercase font-medium">{ch}</p>
                <p className="font-mono font-semibold text-stone-800">{rgb[ch]}</p>
              </div>
            ))}
          </div>
        )}
        <div className="pt-2 border-t border-stone-200">
          <p className="text-xs text-stone-400 mb-1">Finish: <span className="font-medium text-stone-800">{fi.label}</span></p>
          <p className="text-xs text-stone-400 leading-relaxed">{fi.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

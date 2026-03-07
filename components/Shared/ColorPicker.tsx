'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, v * 100];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h /= 360; s /= 100; v /= 100;
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgbCss(h: number): string {
  const [r, g, b] = hsvToRgb(h, 100, 100);
  return `rgb(${r},${g},${b})`;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [hsv, setHsv] = useState<[number, number, number]>(() => {
    const [r, g, b] = hexToRgb(color);
    return rgbToHsv(r, g, b);
  });
  const [hexInput, setHexInput] = useState(color.toUpperCase());
  const [copied, setCopied] = useState(false);

  const svCanvasRef = useRef<HTMLCanvasElement>(null);
  const svContainerRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const draggingSV = useRef(false);
  const draggingHue = useRef(false);

  useEffect(() => {
    const [r, g, b] = hexToRgb(color);
    const newHsv = rgbToHsv(r, g, b);
    if (
      Math.abs(newHsv[0] - hsv[0]) > 1 ||
      Math.abs(newHsv[1] - hsv[1]) > 1 ||
      Math.abs(newHsv[2] - hsv[2]) > 1
    ) {
      setHsv(newHsv);
    }
    setHexInput(color.toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = hueToRgbCss(hsv[0]);
    ctx.fillRect(0, 0, w, h);
    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, w, h);
    const blackGrad = ctx.createLinearGradient(0, 0, 0, h);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, w, h);
  }, [hsv[0]]);

  const emitColor = useCallback(
    (h: number, s: number, v: number) => {
      const [r, g, b] = hsvToRgb(h, s, v);
      const hex = rgbToHex(r, g, b);
      onChange(hex);
    },
    [onChange]
  );

  const handleSVMove = useCallback(
    (clientX: number, clientY: number) => {
      const container = svContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const s = (x / rect.width) * 100;
      const v = (1 - y / rect.height) * 100;
      const newHsv: [number, number, number] = [hsv[0], s, v];
      setHsv(newHsv);
      emitColor(newHsv[0], newHsv[1], newHsv[2]);
    },
    [hsv, emitColor]
  );

  const handleHueMove = useCallback(
    (clientX: number) => {
      const el = hueRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const h = (x / rect.width) * 360;
      const newHsv: [number, number, number] = [h, hsv[1], hsv[2]];
      setHsv(newHsv);
      emitColor(newHsv[0], newHsv[1], newHsv[2]);
    },
    [hsv, emitColor]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (draggingSV.current) { e.preventDefault(); handleSVMove(clientX, clientY); }
      if (draggingHue.current) { e.preventDefault(); handleHueMove(clientX); }
    };
    const onUp = () => { draggingSV.current = false; draggingHue.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleSVMove, handleHueMove]);

  const svThumbX = `${hsv[1]}%`;
  const svThumbY = `${100 - hsv[2]}%`;
  const hueThumbX = `${(hsv[0] / 360) * 100}%`;

  const handleHexSubmit = () => {
    if (/^#[0-9A-Fa-f]{6}$/i.test(hexInput)) onChange(hexInput);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
      <div
        ref={svContainerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-crosshair select-none touch-none"
        onMouseDown={(e) => { draggingSV.current = true; handleSVMove(e.clientX, e.clientY); }}
        onTouchStart={(e) => { draggingSV.current = true; handleSVMove(e.touches[0].clientX, e.touches[0].clientY); }}
      >
        <canvas ref={svCanvasRef} width={400} height={300} className="w-full h-full" />
        <div
          className="absolute w-5 h-5 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.3)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: svThumbX, top: svThumbY }}
        />
      </div>

      <div
        ref={hueRef}
        className="relative h-4 rounded-full cursor-pointer select-none touch-none"
        style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
        onMouseDown={(e) => { draggingHue.current = true; handleHueMove(e.clientX); }}
        onTouchStart={(e) => { draggingHue.current = true; handleHueMove(e.touches[0].clientX); }}
      >
        <div
          className="absolute top-1/2 w-5 h-5 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.25)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: hueThumbX, backgroundColor: hueToRgbCss(hsv[0]) }}
        />
      </div>

      <div className="flex items-center gap-3 bg-stone-50 rounded-lg px-3 py-2.5 border border-stone-200">
        <div className="w-8 h-8 rounded-full border border-stone-200 shadow-sm shrink-0" style={{ backgroundColor: color }} />
        <span className="text-stone-400 font-mono text-sm">#</span>
        <input
          type="text"
          value={hexInput.replace('#', '')}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
            setHexInput('#' + val);
            if (val.length === 6) onChange('#' + val);
          }}
          onBlur={handleHexSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleHexSubmit()}
          className="flex-1 bg-transparent text-sm font-mono font-semibold text-stone-800 focus:outline-none uppercase tracking-wider"
          maxLength={6}
        />
        <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-stone-200 transition-colors text-stone-400" title="Copy hex code">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
        <span className="text-xs text-stone-400 bg-white rounded-md px-2 py-1 border border-stone-200">Hex</span>
      </div>
    </div>
  );
}

"use client";

// components/home/InspirationGallery.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Inspiration Gallery — Room lookbook section
//
// Design: Asymmetric editorial magazine masonry grid on deep off-white.
// SVG illustrated room scenes (no image deps) with real paint colors applied.
// Filter tabs by room type. Click → immersive fullscreen lightbox with
// color details, room info, and a "Visualize This" CTA.
//
// Gallery items: 9 rooms × unique color/layout combinations
// Layout: Pinterest-style varied heights in a 3-column CSS columns grid
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Room scene SVG generator ──────────────────────────────────────────────────
function shade(hex: string, f: number): string {
  const h = hex.replace("#", "");
  const r = Math.min(255, Math.round(parseInt(h.slice(0, 2), 16) * f));
  const g = Math.min(255, Math.round(parseInt(h.slice(2, 4), 16) * f));
  const b = Math.min(255, Math.round(parseInt(h.slice(4, 6), 16) * f));
  return `rgb(${r},${g},${b})`;
}

function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  return (0.299 * parseInt(h.slice(0, 2), 16) + 0.587 * parseInt(h.slice(2, 4), 16) + 0.114 * parseInt(h.slice(4, 6), 16)) / 255 > 0.58;
}

// ── SVG room scenes (5 variants) ──────────────────────────────────────────────
function RoomScene({ wallColor, variant = 0 }: { wallColor: string; variant?: number }) {
  const scenes = [LivingRoomScene, BedroomScene, KitchenScene, OfficeScene, DiningScene];
  const Scene = scenes[variant % scenes.length];
  return <Scene wallColor={wallColor} />;
}

function LivingRoomScene({ wallColor }: { wallColor: string }) {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`lw${wallColor.replace("#","")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={shade(wallColor, 1.1)} /><stop offset="100%" stopColor={shade(wallColor, 0.78)} />
        </linearGradient>
        <linearGradient id={`lf${wallColor.replace("#","")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8a96a" /><stop offset="100%" stopColor="#a07840" />
        </linearGradient>
      </defs>
      {/* Ceiling */}
      <rect x="0" y="0" width="400" height="55" fill="#f0ebe0" />
      {/* Back wall */}
      <rect x="60" y="55" width="280" height="175" fill={`url(#lw${wallColor.replace("#","")})`} />
      {/* Side walls */}
      <polygon points="0,40 60,55 60,230 0,240" fill={shade(wallColor, 0.58)} />
      <polygon points="340,55 400,40 400,240 340,230" fill={shade(wallColor, 0.68)} />
      {/* Floor */}
      <polygon points="0,240 60,230 340,230 400,240 400,280 0,280" fill="url(#lf)" />
      {[248,260,270,278].map((y,i) => <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>)}
      {/* Window */}
      <rect x="155" y="72" width="90" height="70" rx="2" fill="#B8D4E8" />
      <rect x="153" y="70" width="94" height="74" rx="3" fill="none" stroke="#d4c8a8" strokeWidth="4" />
      <line x1="200" y1="72" x2="200" y2="142" stroke="#d4c8a8" strokeWidth="2.5"/>
      <line x1="155" y1="107" x2="245" y2="107" stroke="#d4c8a8" strokeWidth="2.5"/>
      <rect x="155" y="72" width="90" height="70" rx="2" fill="rgba(255,249,232,0.4)"/>
      <rect x="148" y="142" width="104" height="7" rx="2" fill="#e0d4b8"/>
      {/* Sofa */}
      <rect x="105" y="185" width="190" height="40" rx="5" fill="#5A4A36" />
      <rect x="110" y="168" width="180" height="25" rx="5" fill="#4A3A28" />
      <rect x="113" y="188" width="55" height="35" rx="4" fill="#6A5840" />
      <rect x="173" y="188" width="55" height="35" rx="4" fill="#6A5840" />
      <rect x="233" y="188" width="55" height="35" rx="4" fill="#6A5840" />
      <rect x="107" y="175" width="16" height="50" rx="4" fill="#3E2E1C" />
      <rect x="277" y="175" width="16" height="50" rx="4" fill="#3E2E1C" />
      <rect x="115" y="170" width="52" height="22" rx="4" fill="#604A34" />
      <rect x="173" y="170" width="52" height="22" rx="4" fill="#604A34" />
      <rect x="231" y="170" width="52" height="22" rx="4" fill="#604A34" />
      <rect x="116" y="171" width="26" height="20" rx="5" fill="#B85C38" />
      <rect x="256" y="171" width="26" height="20" rx="5" fill="#3A6A5A" />
      {/* Coffee table */}
      <rect x="158" y="218" width="84" height="7" rx="2" fill="#A07820" />
      <rect x="163" y="213" width="74" height="6" rx="2" fill="#B08930" />
      <rect x="168" y="224" width="6" height="8" rx="1" fill="#6B4E10" />
      <rect x="226" y="224" width="6" height="8" rx="1" fill="#6B4E10" />
      {/* Floor lamp */}
      <ellipse cx="318" cy="228" rx="10" ry="3.5" fill="#2A2016" />
      <line x1="318" y1="225" x2="318" y2="160" stroke="#4A3820" strokeWidth="3" strokeLinecap="round"/>
      <polygon points="306,160 330,160 326,142 310,142" fill="#E8C878" />
      {/* Wall art */}
      <rect x="73" y="82" width="40" height="52" rx="2" fill="#1a1a1a" />
      <rect x="76" y="85" width="34" height="46" rx="1" fill="#F5F0E0" />
      <ellipse cx="93" cy="100" rx="10" ry="8" fill={shade(wallColor, 0.6)} opacity="0.85" />
      <ellipse cx="100" cy="116" rx="8" ry="6" fill={shade(wallColor, 1.05)} opacity="0.6" />
      {/* Plant */}
      <polygon points="76,225 84,225 81,232 79,232" fill="#B06830" />
      <ellipse cx="80" cy="224" rx="5" ry="2" fill="#C07840" />
      <path d="M80,223 Q74,212 68,210" stroke="#3A7A3A" strokeWidth="2" fill="none"/>
      <path d="M80,223 Q86,210 92,206" stroke="#3A7A3A" strokeWidth="2" fill="none"/>
      <ellipse cx="67" cy="208" rx="7" ry="4.5" fill="#4A9A4A" transform="rotate(-25 67 208)"/>
      <ellipse cx="93" cy="204" rx="7" ry="4.5" fill="#3A8A3A" transform="rotate(20 93 204)"/>
      {/* Ceiling light */}
      <line x1="200" y1="0" x2="200" y2="34" stroke="#C8B890" strokeWidth="2"/>
      <ellipse cx="200" cy="37" rx="20" ry="5" fill="#E8D898"/>
    </svg>
  );
}

function BedroomScene({ wallColor }: { wallColor: string }) {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`bw${wallColor.replace("#","")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={shade(wallColor, 1.08)} /><stop offset="100%" stopColor={shade(wallColor, 0.8)} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="50" fill="#ede8dd" />
      <rect x="55" y="50" width="290" height="185" fill={`url(#bw${wallColor.replace("#","")})`} />
      <polygon points="0,38 55,50 55,235 0,244" fill={shade(wallColor, 0.55)} />
      <polygon points="345,50 400,38 400,244 345,235" fill={shade(wallColor, 0.65)} />
      <polygon points="0,244 55,235 345,235 400,244 400,280 0,280" fill="#b89860" />
      {/* Headboard */}
      <rect x="100" y="130" width="200" height="60" rx="8" fill={shade(wallColor, 0.45)} />
      <rect x="110" y="140" width="180" height="44" rx="6" fill={shade(wallColor, 0.38)} />
      {/* Bed */}
      <rect x="88" y="185" width="224" height="48" rx="4" fill="#e8e0d0" />
      <rect x="88" y="185" width="224" height="14" rx="4" fill="#d4ccc0" />
      {/* Pillows */}
      <rect x="100" y="192" width="72" height="36" rx="8" fill="white" />
      <rect x="228" y="192" width="72" height="36" rx="8" fill="white" />
      <rect x="102" y="194" width="68" height="32" rx="7" fill="#f8f4ee" />
      <rect x="230" y="194" width="68" height="32" rx="7" fill="#f8f4ee" />
      {/* Duvet */}
      <rect x="88" y="204" width="224" height="29" rx="4" fill={shade(wallColor, 1.22)} opacity="0.55" />
      {/* Bedside tables */}
      <rect x="56" y="198" width="34" height="35" rx="3" fill="#8B6B3A" />
      <rect x="57" y="216" width="32" height="2" fill="#6B4E20" />
      <rect x="310" y="198" width="34" height="35" rx="3" fill="#8B6B3A" />
      <rect x="311" y="216" width="32" height="2" fill="#6B4E20" />
      {/* Lamps */}
      <rect x="64" y="183" width="2" height="16" fill="#C8A850" />
      <ellipse cx="65" cy="182" rx="14" ry="4" fill="#E8D878" />
      <ellipse cx="65" cy="183" rx="9" ry="3" fill="#FFF5C0" />
      <rect x="318" y="183" width="2" height="16" fill="#C8A850" />
      <ellipse cx="319" cy="182" rx="14" ry="4" fill="#E8D878" />
      <ellipse cx="319" cy="183" rx="9" ry="3" fill="#FFF5C0" />
      {/* Window */}
      <rect x="162" y="65" width="76" height="55" rx="2" fill="#B8D4E8" />
      <rect x="160" y="63" width="80" height="59" rx="3" fill="none" stroke="#d4c8a8" strokeWidth="4"/>
      <line x1="200" y1="65" x2="200" y2="120" stroke="#d4c8a8" strokeWidth="2"/>
      <rect x="162" y="65" width="76" height="55" fill="rgba(255,249,232,0.3)"/>
      {/* Curtains */}
      <rect x="152" y="58" width="16" height="70" rx="3" fill={shade(wallColor, 0.45)} opacity="0.8"/>
      <rect x="232" y="58" width="16" height="70" rx="3" fill={shade(wallColor, 0.45)} opacity="0.8"/>
      {/* Art */}
      <rect x="63" y="68" width="52" height="38" rx="2" fill="#111"/>
      <rect x="65" y="70" width="48" height="34" rx="1" fill="#FDF8F0"/>
      <circle cx="89" cy="87" r="12" fill={shade(wallColor, 0.55)} opacity="0.7"/>
      <circle cx="89" cy="87" r="6" fill="white" opacity="0.5"/>
      {/* Ceiling light */}
      <line x1="200" y1="0" x2="200" y2="30" stroke="#C8B890" strokeWidth="1.8"/>
      <ellipse cx="200" cy="33" rx="22" ry="6" fill="#E8D898"/>
    </svg>
  );
}

function KitchenScene({ wallColor }: { wallColor: string }) {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`kw${wallColor.replace("#","")}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shade(wallColor, 1.1)} /><stop offset="100%" stopColor={shade(wallColor, 0.82)} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="52" fill="#f0ebe0" />
      <rect x="0" y="52" width="400" height="228" fill={`url(#kw${wallColor.replace("#","")})`} />
      {/* Counter tops */}
      <rect x="0" y="170" width="145" height="10" rx="1" fill="#e8e0d0" />
      <rect x="255" y="170" width="145" height="10" rx="1" fill="#e8e0d0" />
      {/* Cabinets bottom */}
      <rect x="0" y="180" width="145" height="100" fill="#8B6B3A" />
      <rect x="255" y="180" width="145" height="100" fill="#8B6B3A" />
      {/* Cabinet doors */}
      {[8,56,104].map(x => <rect key={x} x={x} y="188" width="36" height="52" rx="2" fill="#9A7840" stroke="#7A5820" strokeWidth="1"/>)}
      {[263,311,359].map(x => <rect key={x} x={x} y="188" width="36" height="52" rx="2" fill="#9A7840" stroke="#7A5820" strokeWidth="1"/>)}
      {/* Cabinet handles */}
      {[24,72,120].map(x => <rect key={x} x={x+10} y="215" width="16" height="3" rx="1.5" fill="#C8A850"/>)}
      {[279,327,375].map(x => <rect key={x} x={x+10} y="215" width="16" height="3" rx="1.5" fill="#C8A850"/>)}
      {/* Wall cabinets */}
      <rect x="0" y="70" width="130" height="80" fill="#9A7840" />
      <rect x="270" y="70" width="130" height="80" fill="#9A7840" />
      {[6,50,94].map(x => <rect key={x} x={x} y="75" width="38" height="68" rx="2" fill="#A8844A" stroke="#7A5820" strokeWidth="1"/>)}
      {[274,318,362].map(x => <rect key={x} x={x} y="75" width="38" height="68" rx="2" fill="#A8844A" stroke="#7A5820" strokeWidth="1"/>)}
      {/* Backsplash tiles */}
      <rect x="0" y="150" width="145" height="22" fill="rgba(255,255,255,0.15)" />
      <rect x="255" y="150" width="145" height="22" fill="rgba(255,255,255,0.15)" />
      {[0,16,32,48,64,80,96,112,128].map(x => <line key={x} x1={x} y1="150" x2={x} y2="172" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
      {[255,271,287,303,319,335,351,367,383].map(x => <line key={x} x1={x} y1="150" x2={x} y2="172" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
      {/* Sink area */}
      <rect x="145" y="170" width="110" height="10" rx="1" fill="#d4ccc0" />
      <rect x="163" y="176" width="74" height="50" rx="3" fill="#B0A898" />
      <rect x="168" y="180" width="64" height="42" rx="2" fill="#A09888" />
      <circle cx="200" cy="174" r="4" fill="#C8A850" />
      <rect x="197" y="162" width="6" height="14" rx="2" fill="#C8A850" />
      {/* Window above sink */}
      <rect x="162" y="82" width="76" height="60" rx="2" fill="#B8D4E8" />
      <rect x="160" y="80" width="80" height="64" rx="3" fill="none" stroke="#e0d4b8" strokeWidth="4"/>
      <line x1="200" y1="82" x2="200" y2="142" stroke="#e0d4b8" strokeWidth="2"/>
      <rect x="162" y="82" width="76" height="60" fill="rgba(255,249,232,0.3)"/>
      {/* Stove/hob on right counter */}
      <rect x="258" y="154" width="80" height="20" rx="2" fill="#444" />
      {[278,298,318,338].map((x,i) => <circle key={i} cx={x} cy="164" r="7" fill="#333" stroke="#555" strokeWidth="1.5"/>)}
      {[278,298,318,338].map((x,i) => <circle key={i} cx={x} cy="164" r="3.5" fill="#666"/>)}
      {/* Ceiling light */}
      <line x1="200" y1="0" x2="200" y2="35" stroke="#C8B890" strokeWidth="1.8"/>
      <rect x="175" y="35" width="50" height="14" rx="3" fill="#E8D898"/>
    </svg>
  );
}

function OfficeScene({ wallColor }: { wallColor: string }) {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`ow${wallColor.replace("#","")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={shade(wallColor, 1.06)} /><stop offset="100%" stopColor={shade(wallColor, 0.8)} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="52" fill="#ede8dd" />
      <rect x="58" y="52" width="284" height="183" fill={`url(#ow${wallColor.replace("#","")})`} />
      <polygon points="0,40 58,52 58,235 0,244" fill={shade(wallColor, 0.52)} />
      <polygon points="342,52 400,40 400,244 342,235" fill={shade(wallColor, 0.62)} />
      <polygon points="0,244 58,235 342,235 400,244 400,280 0,280" fill="#8a7050" />
      {/* Desk */}
      <rect x="90" y="190" width="220" height="8" rx="2" fill="#6B4E20" />
      <rect x="90" y="198" width="220" height="38" rx="0" fill="#7A5828" />
      <rect x="90" y="225" width="12" height="13" rx="2" fill="#5A4018" />
      <rect x="298" y="225" width="12" height="13" rx="2" fill="#5A4018" />
      {/* Monitor */}
      <rect x="158" y="148" width="84" height="52" rx="3" fill="#1a1a1a" />
      <rect x="161" y="151" width="78" height="44" rx="2" fill="#2a2a2a" />
      <rect x="163" y="153" width="74" height="40" rx="1" fill={shade(wallColor, 0.35)} opacity="0.7" />
      {/* Screen glow lines */}
      {[160,167,174].map((y,i) => <rect key={i} x="168" y={y} width={50-i*6} height="2.5" rx="1" fill="rgba(255,255,255,0.15)"/>)}
      <rect x="192" y="200" width="16" height="8" rx="1" fill="#111" />
      <rect x="182" y="207" width="36" height="3" rx="1" fill="#222" />
      {/* Keyboard */}
      <rect x="158" y="210" width="78" height="14" rx="3" fill="#2a2a2a" />
      {[0,1,2,3].map(row => [0,1,2,3,4,5,6,7].map(col => (
        <rect key={`${row}-${col}`} x={162+col*9} y={212+row*3} width="7" height="2" rx="0.5" fill="#444"/>
      )))}
      {/* Desk lamp */}
      <rect x="280" y="196" width="5" height="24" rx="2" fill="#C8A850" />
      <path d="M282 196 Q295 185 302 175" stroke="#C8A850" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="302" cy="175" rx="16" ry="5" fill="#E8D070" transform="rotate(-20 302 175)"/>
      <ellipse cx="302" cy="175" rx="20" ry="22" fill="#FFF8D0" opacity="0.08" transform="rotate(-20 302 175)"/>
      {/* Bookshelf */}
      <rect x="62" y="68" width="64" height="130" rx="2" fill="#7A5828" />
      <rect x="64" y="70" width="60" height="126" rx="1" fill="#8B6B3A" />
      {[88,108,128,148,168].map(y => <rect key={y} x="64" y={y} width="60" height="2" fill="#6B4E20"/>)}
      {/* Books on shelves */}
      {[[70,18,8,"#C1623F"],[80,14,8,"#7BB8D4"],[88+2,16,8,"#8FAF7E"],[98+2,14,8,"#D4A017"],[108+2,18,8,"#5C3A5E"]].map(([y2,h,w,c],i)=>
        <rect key={i} x={66+i*11} y={70} width={w as number} height={h as number} rx="1" fill={c as string} opacity="0.9"/>
      )}
      {[[1,110,"#C8A0A0"],[2,110,"#A0B8C8"],[3,110,"#B8C8A0"],[4,110,"#D4B88A"]].map(([i,y3,c])=>
        <rect key={i} x={64+((i as number)-1)*14} y={y3 as number} width="11" height="14" rx="1" fill={c as string} opacity="0.8"/>
      )}
      {/* Chair */}
      <rect x="164" y="228" width="72" height="14" rx="8" fill="#3A2A18" />
      <rect x="170" y="214" width="60" height="20" rx="6" fill="#4A3520" />
      <line x1="180" y1="242" x2="175" y2="260" stroke="#2A1A08" strokeWidth="4" strokeLinecap="round"/>
      <line x1="220" y1="242" x2="225" y2="260" stroke="#2A1A08" strokeWidth="4" strokeLinecap="round"/>
      <line x1="175" y1="260" x2="225" y2="260" stroke="#1A0A00" strokeWidth="3"/>
      {/* Plant */}
      <polygon points="350,232 358,232 355,240 353,240" fill="#B06830"/>
      <ellipse cx="354" cy="231" rx="5" ry="2" fill="#C07840"/>
      <path d="M354,230 Q348,218 342,215" stroke="#3A7A3A" strokeWidth="2" fill="none"/>
      <path d="M354,230 Q360,216 366,212" stroke="#3A7A3A" strokeWidth="2" fill="none"/>
      <ellipse cx="341" cy="213" rx="7" ry="4.5" fill="#4A9A4A" transform="rotate(-25 341 213)"/>
      <ellipse cx="367" cy="210" rx="7" ry="4.5" fill="#3A8A3A" transform="rotate(20 367 210)"/>
      {/* Window */}
      <rect x="270" y="66" width="66" height="100" rx="2" fill="#B8D4E8"/>
      <rect x="268" y="64" width="70" height="104" rx="3" fill="none" stroke="#d4c8a8" strokeWidth="4"/>
      <line x1="303" y1="66" x2="303" y2="166" stroke="#d4c8a8" strokeWidth="2"/>
      <line x1="270" y1="116" x2="336" y2="116" stroke="#d4c8a8" strokeWidth="2"/>
      {/* Ceiling light */}
      <line x1="200" y1="0" x2="200" y2="35" stroke="#C8B890" strokeWidth="2"/>
      <ellipse cx="200" cy="38" rx="22" ry="6" fill="#E8D898"/>
    </svg>
  );
}

function DiningScene({ wallColor }: { wallColor: string }) {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`dw${wallColor.replace("#","")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={shade(wallColor, 1.08)} /><stop offset="100%" stopColor={shade(wallColor, 0.78)} />
        </linearGradient>
        <radialGradient id="tableshine" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="52" fill="#ede8dd"/>
      <rect x="55" y="52" width="290" height="183" fill={`url(#dw${wallColor.replace("#","")})`}/>
      <polygon points="0,38 55,52 55,235 0,244" fill={shade(wallColor, 0.55)}/>
      <polygon points="345,52 400,38 400,244 345,235" fill={shade(wallColor, 0.65)}/>
      <polygon points="0,244 55,235 345,235 400,244 400,280 0,280" fill="#b89860"/>
      {/* Dining table */}
      <ellipse cx="200" cy="215" rx="105" ry="32" fill="#8B5E2A"/>
      <ellipse cx="200" cy="213" rx="105" ry="32" fill="#9B6E3A"/>
      <ellipse cx="200" cy="213" rx="105" ry="32" fill="url(#tableshine)"/>
      <rect x="193" y="235" width="6" height="30" rx="2" fill="#6B4218"/>
      {/* Chairs */}
      {[[-80,0],[-40,10],[40,10],[80,0],[-60,-12],[60,-12]].map(([dx,dy],i) => (
        <g key={i}>
          <ellipse cx={200+dx} cy={215+dy} rx="22" ry="14" fill="#5A3A18" opacity="0.5"/>
          <ellipse cx={200+dx} cy={212+dy} rx="22" ry="13" fill="#6A4A28"/>
        </g>
      ))}
      {/* Place settings */}
      {[[-55,208],[0,200],[55,208]].map(([dx,dy],i) => (
        <g key={i}>
          <ellipse cx={200+dx} cy={dy} rx="16" ry="10" fill="white" opacity="0.9"/>
          <circle cx={200+dx} cy={dy} r="6" fill="#f8f4ee"/>
          <line x1={200+dx-22} y1={dy} x2={200+dx-18} y2={dy} stroke="#C8A850" strokeWidth="1.5"/>
          <line x1={200+dx+18} y1={dy} x2={200+dx+22} y2={dy} stroke="#C8A850" strokeWidth="1.5"/>
        </g>
      ))}
      {/* Centrepiece */}
      <ellipse cx="200" cy="207" rx="12" ry="7" fill="#4A7A4A"/>
      <rect x="197" y="200" width="6" height="8" rx="3" fill="#3A6A3A"/>
      <circle cx="200" cy="200" r="5" fill="#D4A040"/>
      {/* Pendant light */}
      <line x1="200" y1="0" x2="200" y2="85" stroke="#C8B890" strokeWidth="2"/>
      <polygon points="182,85 218,85 212,108 188,108" fill="#E8C070"/>
      <ellipse cx="200" cy="84" rx="20" ry="5" fill="#F0D080"/>
      <ellipse cx="200" cy="120" rx="36" ry="28" fill="rgba(255,245,180,0.07)"/>
      {/* Art on wall */}
      <rect x="63" y="72" width="56" height="72" rx="2" fill="#111"/>
      <rect x="65" y="74" width="52" height="68" rx="1" fill="#FDF8F0"/>
      <rect x="68" y="78" width="46" height="60" rx="1" fill={shade(wallColor, 0.5)} opacity="0.6"/>
      <rect x="280" y="75" width="56" height="44" rx="2" fill="#111"/>
      <rect x="282" y="77" width="52" height="40" rx="1" fill="#FDF8F0"/>
      <ellipse cx="308" cy="97" rx="18" ry="14" fill={shade(wallColor, 1.15)} opacity="0.5"/>
      {/* Sideboard */}
      <rect x="60" y="165" width="60" height="70" rx="3" fill="#7A5828"/>
      <rect x="62" y="175" width="28" height="42" rx="2" fill="#8B6B3A" stroke="#6B4E20" strokeWidth="1"/>
      <rect x="92" y="175" width="26" height="42" rx="2" fill="#8B6B3A" stroke="#6B4E20" strokeWidth="1"/>
      <rect x="74" y="197" width="12" height="3" rx="1.5" fill="#C8A850"/>
      <rect x="98" y="197" width="12" height="3" rx="1.5" fill="#C8A850"/>
      {/* Ceiling line */}
      <line x1="0" y1="52" x2="400" y2="52" stroke="rgba(0,0,0,0.06)" strokeWidth="1"/>
    </svg>
  );
}

// ── Gallery items data ────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id:1,  title:"Terracotta Living",   color:"#C1623F", colorName:"Terracotta",    room:"Living Room", variant:0, height:"tall",   tags:["Warm","Trending"] },
  { id:2,  title:"Navy Bedroom Retreat",color:"#2C3E6B", colorName:"Midnight Navy", room:"Bedroom",     variant:1, height:"medium", tags:["Statement","Dark"] },
  { id:3,  title:"Sage Kitchen",        color:"#8FAF7E", colorName:"Sage Leaf",     room:"Kitchen",     variant:2, height:"short",  tags:["Greens","Calm"] },
  { id:4,  title:"Plum Home Office",    color:"#5C3A5E", colorName:"Velvet Plum",   room:"Office",      variant:3, height:"medium", tags:["Statement","Focus"] },
  { id:5,  title:"Golden Dining Room",  color:"#D4A017", colorName:"Golden Hour",   room:"Dining Room", variant:4, height:"tall",   tags:["Warm","Luxe"] },
  { id:6,  title:"Ocean Breeze Bedroom",color:"#7BB8D4", colorName:"Ocean Breeze",  room:"Bedroom",     variant:1, height:"short",  tags:["Blues","Calm"] },
  { id:7,  title:"Ivory Linen Living",  color:"#EDE0CF", colorName:"Soft Linen",    room:"Living Room", variant:0, height:"medium", tags:["Whites","Minimal"] },
  { id:8,  title:"Hunter Green Kitchen",color:"#355E3B", colorName:"Hunter Green",  room:"Kitchen",     variant:2, height:"tall",   tags:["Greens","Bold"] },
  { id:9,  title:"Dusty Rose Bedroom",  color:"#D4898A", colorName:"Dusty Rose",    room:"Bedroom",     variant:1, height:"short",  tags:["Warm","Soft"] },
  { id:10, title:"Charcoal Office",     color:"#4A4A4A", colorName:"Charcoal",      room:"Office",      variant:3, height:"medium", tags:["Greys","Modern"] },
  { id:11, title:"Teal Dining Luxe",    color:"#1A6B73", colorName:"Teal Depth",    room:"Dining Room", variant:4, height:"tall",   tags:["Blues","Statement"] },
  { id:12, title:"Copper Glow Living",  color:"#CB7A4B", colorName:"Copper Glow",   room:"Living Room", variant:0, height:"short",  tags:["Warm","Earthy"] },
];

const FILTER_ROOMS = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Dining Room"];

// ── Gallery card ──────────────────────────────────────────────────────────────
function GalleryCard({
  item, index, onClick
}: {
  item: typeof GALLERY_ITEMS[0]; index: number; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const light = isLight(item.color);

  const aspectMap = { tall: "75%", medium: "66%", short: "58%" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="break-inside-avoid mb-5 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="relative rounded-3xl overflow-hidden cursor-pointer"
        style={{
          boxShadow: hovered
            ? `0 24px 56px ${item.color}35, 0 6px 18px rgba(0,0,0,0.1)`
            : "0 4px 16px rgba(0,0,0,0.07)",
          border: `1.5px solid ${hovered ? item.color + "40" : "rgba(0,0,0,0.05)"}`,
        }}
      >
        {/* Room scene */}
        <div style={{ paddingBottom: aspectMap[item.height as keyof typeof aspectMap], position: "relative" }}>
          <div className="absolute inset-0">
            <RoomScene wallColor={item.color} variant={item.variant} />
          </div>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col justify-end p-5"
              style={{ background: `linear-gradient(to top, ${item.color}ee 0%, ${item.color}88 40%, transparent 70%)` }}
            >
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.22, delay: 0.05 }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
                  style={{ color: light ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)" }}>
                  {item.room}
                </p>
                <h3 className="text-[17px] font-black leading-snug mb-2"
                  style={{ fontFamily: "'Georgia', serif", color: light ? "rgba(0,0,0,0.85)" : "white", letterSpacing: "-0.02em" }}>
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border-2 border-white/60 flex-shrink-0"
                      style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold" style={{ color: light ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)" }}>
                      {item.colorName}
                    </span>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                    style={{
                      background: light ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                      color: light ? "rgba(0,0,0,0.7)" : "white",
                    }}
                  >
                    View →
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-visible tags (top-right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {item.tags.slice(0, 1).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
              style={{
                background: "rgba(255,255,255,0.88)",
                color: "#292524",
                backdropFilter: "blur(6px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Card footer info */}
      <div className="px-1 pt-3 pb-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-stone-200"
            style={{ backgroundColor: item.color }} />
          <span className="text-[12px] font-bold text-stone-700 truncate" style={{ fontFamily: "'Georgia', serif" }}>
            {item.title}
          </span>
        </div>
        <span className="text-[11px] text-stone-400 font-medium flex-shrink-0">{item.room}</span>
      </div>
    </motion.div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  item, onClose, onPrev, onNext
}: {
  item: typeof GALLERY_ITEMS[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const light = isLight(item.color);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 32 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 32 }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
        className="relative w-full max-w-4xl max-h-[92vh] rounded-[28px] overflow-hidden flex flex-col lg:flex-row"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)` }}
      >
        {/* Room scene */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-0" style={{ background: item.color }}>
          <RoomScene wallColor={item.color} variant={item.variant} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom right, rgba(255,255,255,0.06), transparent)" }}/>
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-80 bg-white flex flex-col p-8 gap-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-all z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-400">{item.room}</span>
            <h2 className="text-2xl font-black text-stone-900 mt-1 leading-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>
              {item.title}
            </h2>
          </div>

          {/* Large color swatch */}
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: `0 8px 28px ${item.color}40` }}>
            <div className="h-28 relative" style={{ background: item.color }}>
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)" }}/>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <span className="text-sm font-black" style={{ color: light ? "rgba(0,0,0,0.7)" : "white" }}>
                  {item.colorName}
                </span>
                <span className="text-xs font-mono opacity-60" style={{ color: light ? "#000" : "#fff" }}>
                  {item.color.toUpperCase()}
                </span>
              </div>
            </div>
            {/* Tone strip */}
            <div className="flex h-8">
              {[1.25, 1.08, 1.0, 0.78, 0.55].map((f, i) => (
                <div key={i} className="flex-1" style={{ background: shade(item.color, f) }} />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: item.color + "18", color: item.color, border: `1px solid ${item.color}30` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Room info */}
          <div className="flex-1 flex flex-col gap-2 text-sm text-stone-500" style={{ fontFamily: "'Georgia', serif" }}>
            <p>A beautiful application of <strong className="text-stone-700">{item.colorName}</strong> in a {item.room.toLowerCase()} setting. The shade brings depth and character while remaining easy to live with.</p>
            <p className="text-xs text-stone-400">Available in Matte, Satin & Gloss finish.</p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              href="/#visualizer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 6px 18px rgba(217,119,6,0.35)", fontFamily: "'Georgia', serif" }}
              onClick={onClose}
            >
              🎨 Try This Color
            </Link>
            <button
              className="py-3.5 px-4 rounded-2xl border-2 border-stone-200 hover:border-stone-300 transition-colors text-sm font-bold text-stone-500"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex gap-3 justify-between border-t border-stone-100 pt-4">
            <button onClick={onPrev}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-stone-700 transition-colors">
              ← Prev
            </button>
            <button onClick={onNext}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-stone-700 transition-colors">
              Next →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main InspirationGallery ───────────────────────────────────────────────────
export default function InspirationGallery() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(headingRef, { once: true, margin: "-60px" });

  const filtered = GALLERY_ITEMS.filter(item =>
    activeRoom === "All" || item.room === activeRoom
  );
  const visible = showAll ? filtered : filtered.slice(0, 9);

  const openLightbox = useCallback((id: number) => {
    const idx = filtered.findIndex(i => i.id === id);
    setLightboxIdx(idx);
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevItem = useCallback(() =>
    setLightboxIdx(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null),
    [filtered.length]);
  const nextItem = useCallback(() =>
    setLightboxIdx(i => i !== null ? (i + 1) % filtered.length : null),
    [filtered.length]);

  return (
    <section
      ref={sectionRef}
      id="inspiration"
      className="relative py-24 overflow-hidden"
      style={{ background: "#f8f4ee" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #fed7aa 0%, transparent 70%)" }} />
        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs><pattern id="gdots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#78716c"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#gdots)"/>
        </svg>
        {/* Decorative paint blobs */}
        <svg className="absolute top-12 right-8 opacity-[0.07] w-48 h-48" viewBox="0 0 160 160">
          <path d="M20 80 Q40 20 80 40 Q120 60 140 100 Q120 140 80 130 Q40 120 20 80Z" fill="#d97706"/>
        </svg>
        <svg className="absolute bottom-12 left-8 opacity-[0.05] w-40 h-40" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" stroke="#d97706" strokeWidth="2" fill="none" strokeDasharray="10 6"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                  style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}
                >
                  Room Lookbook
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[clamp(2rem,4vw,3.4rem)] font-black text-stone-900 leading-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.04em" }}
              >
                Rooms That Inspire.
                <br />
                <span style={{ color: "#d97706" }}>Colors That Transform.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 text-[14.5px] text-stone-500 max-w-md leading-relaxed"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Browse 12 curated room scenes — click any to explore the color,
                see tone variants, and try it in the visualizer.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-stone-400 hidden lg:block text-right"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              <span className="font-bold text-stone-600">{filtered.length}</span> room{filtered.length !== 1 ? "s" : ""} shown
              <br />
              <span className="text-xs">Click any room to explore</span>
            </motion.div>
          </div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTER_ROOMS.map(room => (
            <motion.button
              key={room}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setActiveRoom(room); setShowAll(false); }}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: activeRoom === room ? "#1c1917" : "white",
                color: activeRoom === room ? "white" : "#78716c",
                border: `1.5px solid ${activeRoom === room ? "#1c1917" : "#e7e5e4"}`,
                boxShadow: activeRoom === room ? "0 4px 14px rgba(0,0,0,0.2)" : "none",
              }}
            >
              {room === "All" ? "All Rooms" : room}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid — CSS columns */}
        <motion.div
          layout
          className="gap-5"
          style={{ columnCount: 3, columnGap: "1.25rem" }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => openLightbox(item.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {filtered.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(v => !v)}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl border-2 border-stone-200 hover:border-stone-800 text-stone-600 hover:text-stone-900 font-bold text-sm transition-all bg-white/60 backdrop-blur-sm"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {showAll
                ? <><span>↑</span> Show Less</>
                : <><span>↓</span> Load More Rooms ({filtered.length - 9} more)</>}
            </motion.button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="text-stone-500 text-sm mb-5" style={{ fontFamily: "'Georgia', serif" }}>
            Love what you see? Recreate any of these looks in your own room.
          </p>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/#visualizer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-[15px] mx-auto"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 8px 28px rgba(217,119,6,0.38)",
                fontFamily: "'Georgia', serif",
              }}
            >
              🎨 Try Any Color in Your Room — Free
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            item={filtered[lightboxIdx]}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
# Wall Paint Color Visualizer — Setup Guide

## 📁 File Structure (what you got)

```
├── lib/
│   └── canvas-utils.ts              ← Core color tinting engine
├── data/
│   └── paint-colors.ts              ← Paint color palette data
├── components/
│   ├── shared/
│   │   ├── RoomCanvas.tsx           ← HTML5 Canvas rendering component
│   │   ├── ColorPalette.tsx         ← Color swatch picker with filter tabs
│   │   ├── FinishSelector.tsx       ← Matte / Satin / Gloss toggle
│   │   └── EnquiryModal.tsx         ← Lead capture modal with validation
│   └── home/
│       └── LiveVisualizerPreview.tsx ← Main homepage section (orchestrator)
└── app/
    └── api/
        └── enquiry/
            └── route.ts             ← Nodemailer API route
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install framer-motion gsap nodemailer
npm install -D @types/nodemailer
```

### 2. Add to your homepage
```tsx
// app/page.tsx
import LiveVisualizerPreview from "@/components/home/LiveVisualizerPreview";

export default function Home() {
  return (
    <main>
      {/* other sections */}
      <LiveVisualizerPreview />
    </main>
  );
}
```

### 3. Set up environment variables
Create `.env.local` in your project root:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=admin@yourcompany.com
```

> **Gmail tip**: Use an App Password (not your regular password).
> Google Account → Security → 2-Step Verification → App Passwords

---

## 🖼️ Room Image + Mask Setup (CRITICAL)

This is the most important setup step. You need **2 images**:

### Image 1: `public/images/room.jpg`
- Your room interior photo
- Recommended size: **1280×720px** or **1600×900px** (16:9 ratio)
- The full room with furniture, ceiling, floor — everything

### Image 2: `public/images/room-mask.png`
- A PNG version of the SAME room
- **White pixels** = the wall area (will be recolored)
- **Black pixels** = everything else (furniture, floor, ceiling)
- Must be **exactly the same dimensions** as room.jpg

### How to create the mask in Photoshop:
1. Open your room photo
2. Use **Magic Wand** or **Quick Selection Tool** to select the wall area
3. Create a **New Layer**, fill selection with **white** (#FFFFFF)
4. Fill the rest with **black** (#000000)
5. Export as `room-mask.png` (same size as original)

### How to create the mask in GIMP (free):
1. Open room photo
2. **Fuzzy Select** the wall area
3. Create new layer → fill selection white, rest black
4. Export as PNG

### Soft edges for realism:
- Apply a **1-2px Gaussian Blur** to the mask edges
- This prevents harsh color boundaries at wall edges

---

## ⚙️ Tailwind Config

Make sure your `tailwind.config.ts` includes the component paths:
```js
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
]
```

---

## 🎨 Adding/Editing Colors

Open `data/paint-colors.ts` and add entries:
```ts
{ id: "custom1", name: "My Color", hex: "#FF6B6B", family: "Warm" }
```

Available families: `Whites`, `Neutrals`, `Warm`, `Blues`, `Greens`, `Greys`, `Statement`
(or add your own — the filter tabs auto-populate from the data)

---

## 📱 Responsive Behavior
- **Desktop (lg+)**: Canvas on left, control panel sticky on right
- **Tablet (md)**: Stacked layout, panel below canvas
- **Mobile**: Full width stacked, color swatches in smaller grid

---

## 🔧 Key Component Props

### `<RoomCanvas />`
| Prop | Type | Description |
|------|------|-------------|
| `roomImageUrl` | string | Path to room photo |
| `maskImageUrl` | string | Path to mask PNG |
| `selectedColor` | PaintColor \| null | Currently active color |
| `finish` | "matte" \| "satin" \| "gloss" | Surface finish |
| `onLoad` | () => void | Fires when canvas is ready |

### `<ColorPalette />`
| Prop | Type | Description |
|------|------|-------------|
| `selectedColor` | PaintColor \| null | Currently active color |
| `onColorSelect` | (color) => void | Called when user picks a color |

---

## 🔬 How the Canvas Engine Works

```
Original Room Photo  ──┐
                       ├──► applyPaintColor() ──► Recolored Canvas
Wall Mask PNG        ──┘
```

For each pixel:
1. Check if mask pixel is **white** (wall area)
2. If yes: calculate original pixel **luminance** (brightness)
3. Multiply paint color by luminance → preserves shadows & highlights
4. Write result to output canvas
5. If mask is black: copy original pixel unchanged

This creates a realistic paint effect without AI.
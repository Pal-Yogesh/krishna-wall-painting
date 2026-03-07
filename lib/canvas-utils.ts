// lib/canvas-utils.ts
// Core HTML5 Canvas color tinting engine
// Uses wall mask technique: original image + mask image = selective wall recoloring

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  family: string;
  finish?: "matte" | "satin" | "gloss";
}

/**
 * Converts a hex color string to RGB components
 */
export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/**
 * Converts RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Applies paint color to canvas using mask-based technique.
 * Preserves original lighting/shadow by blending luminance from original pixel.
 *
 * @param ctx - CanvasRenderingContext2D of the display canvas
 * @param originalImageData - Pixel data from the original room image
 * @param maskImageData - Pixel data from the wall mask (white = paintable, black = not)
 * @param color - Paint color to apply
 * @param finish - Surface finish affecting opacity/brightness
 * @param maskThreshold - How strict the mask edge detection is (0-255)
 */
export function applyPaintColor(
  ctx: CanvasRenderingContext2D,
  originalImageData: ImageData,
  maskImageData: ImageData,
  color: PaintColor,
  finish: "matte" | "satin" | "gloss" = "matte",
  maskThreshold = 128
): void {
  const { width, height } = originalImageData;
  const outputImageData = ctx.createImageData(width, height);
  const origData = originalImageData.data;
  const maskData = maskImageData.data;
  const outData = outputImageData.data;

  const paintRgb = hexToRgb(color.hex);

  // Finish-based blending parameters
  const finishParams = {
    matte: { blend: 0.75, specular: 0 },
    satin: { blend: 0.65, specular: 0.15 },
    gloss: { blend: 0.55, specular: 0.35 },
  };
  const { blend, specular } = finishParams[finish];

  for (let i = 0; i < origData.length; i += 4) {
    const maskR = maskData[i];
    const isMasked = maskR > maskThreshold;

    if (isMasked) {
      // Original pixel
      const oR = origData[i];
      const oG = origData[i + 1];
      const oB = origData[i + 2];

      // Calculate luminance of original pixel (preserves shadows/highlights)
      const luminance = (0.299 * oR + 0.587 * oG + 0.114 * oB) / 255;

      // Normalized luminance mapped to a multiplier
      // Dark areas (shadow) stay dark; bright areas (highlight) lighten
      const luminanceFactor = luminance;

      // Blend paint color with original luminance
      const tintedR = paintRgb.r * luminanceFactor * blend + oR * (1 - blend);
      const tintedG = paintRgb.g * luminanceFactor * blend + oG * (1 - blend);
      const tintedB = paintRgb.b * luminanceFactor * blend + oB * (1 - blend);

      // Add specular highlight for gloss/satin
      const specularAdd = specular * 255 * (luminance > 0.8 ? luminance - 0.8 : 0);

      outData[i] = Math.min(255, tintedR + specularAdd);
      outData[i + 1] = Math.min(255, tintedG + specularAdd);
      outData[i + 2] = Math.min(255, tintedB + specularAdd);
      outData[i + 3] = origData[i + 3]; // preserve alpha
    } else {
      // Non-masked pixels: copy original unchanged
      outData[i] = origData[i];
      outData[i + 1] = origData[i + 1];
      outData[i + 2] = origData[i + 2];
      outData[i + 3] = origData[i + 3];
    }
  }

  ctx.putImageData(outputImageData, 0, 0);
}

/**
 * Loads an image from a URL and returns an HTMLImageElement
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Extracts ImageData from an image element using an offscreen canvas
 */
export function getImageData(img: HTMLImageElement): ImageData {
  const offscreen = document.createElement("canvas");
  offscreen.width = img.naturalWidth;
  offscreen.height = img.naturalHeight;
  const ctx = offscreen.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, offscreen.width, offscreen.height);
}
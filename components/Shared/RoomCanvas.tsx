"use client";

// components/shared/RoomCanvas.tsx
// Core HTML5 Canvas wall recoloring engine
// Accepts room image + mask image, renders color-tinted result in real time

import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { PaintColor, applyPaintColor, loadImage, getImageData } from "@/lib/canvas-utils";

export interface RoomCanvasHandle {
  resetToOriginal: () => void;
  exportImage: () => string | null;
}

interface RoomCanvasProps {
  /** URL of the original room interior photo */
  roomImageUrl: string;
  /** URL of the wall mask image (white = paintable wall area) */
  maskImageUrl: string;
  /** Currently selected paint color */
  selectedColor: PaintColor | null;
  /** Surface finish */
  finish?: "matte" | "satin" | "gloss";
  /** Called when canvas finishes loading */
  onLoad?: () => void;
  /** Called on any error */
  onError?: (err: Error) => void;
  className?: string;
}

const RoomCanvas = forwardRef<RoomCanvasHandle, RoomCanvasProps>(
  (
    {
      roomImageUrl,
      maskImageUrl,
      selectedColor,
      finish = "matte",
      onLoad,
      onError,
      className = "",
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // Store image data refs to avoid re-loading on every color change
    const originalDataRef = useRef<ImageData | null>(null);
    const maskDataRef = useRef<ImageData | null>(null);
    const naturalSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

    // ── Load both images once ──────────────────────────────────────
    useEffect(() => {
      let cancelled = false;

      const load = async () => {
        try {
          setIsLoading(true);
          setLoadError(null);

          const [roomImg, maskImg] = await Promise.all([
            loadImage(roomImageUrl),
            loadImage(maskImageUrl),
          ]);

          if (cancelled) return;

          const { naturalWidth: w, naturalHeight: h } = roomImg;
          naturalSizeRef.current = { w, h };

          originalDataRef.current = getImageData(roomImg);
          maskDataRef.current = getImageData(maskImg);

          // Set canvas dimensions to match image
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.width = w;
          canvas.height = h;

          // Draw original image first
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(roomImg, 0, 0);

          setIsLoading(false);
          onLoad?.();
        } catch (err) {
          if (cancelled) return;
          const error = err instanceof Error ? err : new Error("Failed to load images");
          setLoadError(error.message);
          setIsLoading(false);
          onError?.(error);
        }
      };

      load();
      return () => {
        cancelled = true;
      };
    }, [roomImageUrl, maskImageUrl, onLoad, onError]);

    // ── Apply color whenever selectedColor or finish changes ───────
    useEffect(() => {
      if (isLoading || loadError) return;
      const canvas = canvasRef.current;
      if (!canvas || !originalDataRef.current || !maskDataRef.current) return;

      const ctx = canvas.getContext("2d")!;

      if (!selectedColor) {
        // Reset to original
        ctx.putImageData(originalDataRef.current, 0, 0);
        return;
      }

      applyPaintColor(
        ctx,
        originalDataRef.current,
        maskDataRef.current,
        selectedColor,
        finish
      );
    }, [selectedColor, finish, isLoading, loadError]);

    // ── Expose imperative handle ───────────────────────────────────
    useImperativeHandle(ref, () => ({
      resetToOriginal() {
        const canvas = canvasRef.current;
        if (!canvas || !originalDataRef.current) return;
        const ctx = canvas.getContext("2d")!;
        ctx.putImageData(originalDataRef.current, 0, 0);
      },
      exportImage() {
        return canvasRef.current?.toDataURL("image/png") ?? null;
      },
    }));

    return (
      <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 z-10">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-stone-200" />
              <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 animate-spin" />
            </div>
            <p className="text-stone-500 text-sm font-medium tracking-wide">
              Loading room preview…
            </p>
          </div>
        )}

        {/* Error state */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 z-10 p-6">
            <svg
              className="w-10 h-10 text-red-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 text-sm text-center">{loadError}</p>
          </div>
        )}

        {/* The actual canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-auto block transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          aria-label="Room paint color visualizer"
        />

        {/* Color badge overlay */}
        {selectedColor && !isLoading && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <span
              className="w-4 h-4 rounded-full border border-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span className="text-xs font-semibold text-stone-700 tracking-wide">
              {selectedColor.name}
            </span>
            <span className="text-xs text-stone-400">{selectedColor.hex.toUpperCase()}</span>
          </div>
        )}
      </div>
    );
  }
);

RoomCanvas.displayName = "RoomCanvas";
export default RoomCanvas;
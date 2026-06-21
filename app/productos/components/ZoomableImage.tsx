"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

interface Props {
  src?: string;
  alt: string;
  categoryName: string;
}

export default function ZoomableImage({ src, alt, categoryName }: Props) {
  const [zoomStyle, setZoomStyle] = useState<{ transformOrigin: string; transform: string } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2.2)" });
  };

  const handleMouseLeave = () => { setZoomStyle(null); setIsZoomed(false); };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) { setZoomStyle(null); setIsZoomed(false); return; }
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2.2)" });
    setIsZoomed(true);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
      onMouseMove={isZoomed ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <ProductImage
        src={src} alt={alt} categoryName={categoryName}
        className="max-h-[380px] transition-transform duration-150 ease-out"
        style={zoomStyle || { transform: "scale(1)" }}
      />
    </div>
  );
}

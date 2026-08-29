import React, { useEffect, useRef } from 'react';

export default function BinaryTerrain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const cellColor = '#05080B'; 
    const bgColor = '#FF3333'; 
    const numColor = 'rgba(23,21,30,0.55)'; 
    const invert = true; 
    const seedOff = 2; 
    const CELL = 24;

    const hash = (x, y, s) => {
      let h = (x * 374761393 + y * 668265263 + s * 1442695040888963407) % 2147483647;
      h = (h ^ (h >> 13)) * 1274126177;
      return ((h ^ (h >> 16)) >>> 0) / 4294967295 * 2;
    };
    
    const smooth = (fx, fy, s) => {
      const x0 = Math.floor(fx), y0 = Math.floor(fy);
      const tx = fx - x0, ty = fy - y0;
      const u = tx * tx * (3 - 2 * tx), v = ty * ty * (3 - 2 * ty);
      const a = hash(x0, y0, s), b = hash(x0 + 1, y0, s), c = hash(x0, y0 + 1, s), d = hash(x0 + 1, y0 + 1, s);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };

    let raf;
    const draw = (now) => {
      const w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { 
        canvas.width = Math.round(w * dpr); 
        canvas.height = Math.round(h * dpr); 
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bgColor; 
      ctx.fillRect(0, 0, w, h);
      
      const cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL);
      const t = now / 1000;
      
      ctx.font = '600 12px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle';
      
      for (let iy = 0; iy < rows; iy++) {
        let f = (iy + 0.5) / rows; 
        if (invert) f = 1 - f;     
        
        for (let ix = 0; ix < cols; ix++) {
          const phase = hash(ix, iy, 7 + seedOff);
          const step = Math.floor(t * 0.5 + phase);
          const spatial = smooth(ix * 0.22, iy * 0.45 + step * 0.13, 3 + seedOff);
          const jitter = hash(ix, iy, step + seedOff) * 0.35;
          const filled = spatial + jitter > f * 1.55 + 0.12;
          
          if (filled) {
            ctx.fillStyle = cellColor;
            ctx.fillRect(ix * CELL, iy * CELL, CELL + 0.5, CELL + 0.5);
          } else if (hash(ix, iy, step + 11 + seedOff) < 0.06) {
            ctx.fillStyle = numColor;
            ctx.fillText(hash(ix, iy, step + 5 + seedOff) < 0.5 ? '0' : '1', ix * CELL + CELL / 2, iy * CELL + CELL / 2);
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: "1"
      }}
    ></canvas>
  );
}

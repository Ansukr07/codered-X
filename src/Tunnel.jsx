import React, { useEffect, useRef, useMemo } from 'react';
import './Tunnel.css';
import demoImg from './assets/demo.jpg';

const N_RINGS    = 35;
const COLS       = 3;
const ROWS       = 3;
const BASE_SPEED = 0.4;
const FAST_SPEED = 2.0;
const FOCAL      = 1.0;
const D_STEP     = 0.3;

const PALETTE = [
  '#0066FF', // Blue
  '#FF6600', // Orange
  '#00B33C', // Green
  '#9933FF', // Purple
  '#FF3333', // Red
  '#FFCC00', // Yellow
];
const EMPTY_COLOR = '#f5ede4';
const LINE_COLOR  = '#1a1a1a';

function buildLayouts(count) {
  const makeCell = () => {
    const r = Math.random();
    if (r < 0.15) return { type: 'image' };
    if (r < 0.45) return { type: 'color', color: PALETTE[Math.floor(Math.random() * PALETTE.length)] };
    return { type: 'empty' };
  };
  return Array.from({ length: count }, () => ({
    top:    Array.from({ length: COLS }, makeCell),
    bottom: Array.from({ length: COLS }, makeCell),
    left:   Array.from({ length: ROWS }, makeCell),
    right:  Array.from({ length: ROWS }, makeCell),
  }));
}

function drawTrap(ctx, img, cell, p0, p1, p2, p3, alpha = 1.0) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(p0[0], p0[1]);
  ctx.lineTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.lineTo(p3[0], p3[1]);
  ctx.closePath();
  ctx.clip();

  const xs = [p0[0], p1[0], p2[0], p3[0]];
  const ys = [p0[1], p1[1], p2[1], p3[1]];
  const bx = Math.min(...xs), by = Math.min(...ys);
  const bw = Math.max(...xs) - bx + 0.5;
  const bh = Math.max(...ys) - by + 0.5;

  if (cell.type === 'image' && img?.complete && img.naturalWidth > 0) {
    ctx.globalAlpha = alpha * 0.95;
    ctx.drawImage(img, bx, by, bw, bh);
  } else {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = cell.type === 'color' ? cell.color : EMPTY_COLOR;
    ctx.fillRect(bx, by, bw, bh);
  }
  ctx.restore();

  // Draw black cell lines matching reference
  ctx.beginPath();
  ctx.moveTo(p0[0], p0[1]);
  ctx.lineTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.lineTo(p3[0], p3[1]);
  ctx.closePath();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

function drawStrip(ctx, img, layout, o, inn, alpha = 1.0) {
  const { x: ox, y: oy, w: ow, h: oh } = o;
  const { x: ix, y: iy, w: iw, h: ih } = inn;

  // ── TOP ──
  for (let c = 0; c < COLS; c++) {
    const x0o = ox + (c / COLS) * ow,  x1o = ox + ((c + 1) / COLS) * ow;
    const x0i = ix + (c / COLS) * iw,  x1i = ix + ((c + 1) / COLS) * iw;
    drawTrap(ctx, img, layout.top[c], [x0o, oy], [x1o, oy], [x1i, iy], [x0i, iy], alpha);
  }
  // ── BOTTOM ──
  for (let c = 0; c < COLS; c++) {
    const x0o = ox + (c / COLS) * ow,  x1o = ox + ((c + 1) / COLS) * ow;
    const x0i = ix + (c / COLS) * iw,  x1i = ix + ((c + 1) / COLS) * iw;
    drawTrap(ctx, img, layout.bottom[c], [x0i, iy + ih], [x1i, iy + ih], [x1o, oy + oh], [x0o, oy + oh], alpha);
  }
  // ── LEFT ──
  for (let r = 0; r < ROWS; r++) {
    const y0o = oy + (r / ROWS) * oh,  y1o = oy + ((r + 1) / ROWS) * oh;
    const y0i = iy + (r / ROWS) * ih,  y1i = iy + ((r + 1) / ROWS) * ih;
    drawTrap(ctx, img, layout.left[r], [ox, y0o], [ix, y0i], [ix, y1i], [ox, y1o], alpha);
  }
  // ── RIGHT ──
  for (let r = 0; r < ROWS; r++) {
    const y0o = oy + (r / ROWS) * oh,  y1o = oy + ((r + 1) / ROWS) * oh;
    const y0i = iy + (r / ROWS) * ih,  y1i = iy + ((r + 1) / ROWS) * ih;
    drawTrap(ctx, img, layout.right[r], [ix + iw, y0i], [ox + ow, y0o], [ox + ow, y1o], [ix + iw, y1i], alpha);
  }
}

export default function Tunnel() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const imgRef    = useRef(null);
  const ringsRef  = useRef(null);
  const prevTsRef = useRef(null);
  const isFastRef = useRef(false);

  const layouts = useMemo(() => buildLayouts(N_RINGS * 2), []);

  useEffect(() => {
    const img = new Image();
    img.src = demoImg;
    imgRef.current = img;
  }, []);

  useEffect(() => {
    // Array of absolute depths (Z). Rings advance forward (Z decreases) over time.
    ringsRef.current = Array.from({ length: N_RINGS }, (_, i) => ({
      z: i * D_STEP,
      layout: layouts[i],
    }));
  }, [layouts]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function toScale(z) {
      return FOCAL / (FOCAL + z);
    }

    function makeRect(s, W, H) {
      const cx = W / 2, cy = H / 2;
      return { x: cx - s * W / 2, y: cy - s * H / 2, w: s * W, h: s * H };
    }

    function frame(ts) {
      if (prevTsRef.current === null) prevTsRef.current = ts;
      const dt = Math.min((ts - prevTsRef.current) / 1000, 0.05);
      prevTsRef.current = ts;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) { rafRef.current = requestAnimationFrame(frame); return; }

      const dpr = window.devicePixelRatio || 1;
      const targetW = Math.round(W * dpr);
      const targetH = Math.round(H * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width  = targetW;
        canvas.height = targetH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const currentSpeed = isFastRef.current ? FAST_SPEED : BASE_SPEED;
      const rings = ringsRef.current;

      // Advance rings. If a ring passes far enough behind the camera (so its scale 
      // covers the whole viewport), wrap it to the furthest back position.
      for (const ring of rings) {
        ring.z -= dt * currentSpeed;
        if (ring.z < -FOCAL * 0.8) {
          const maxZ = Math.max(...rings.map(r => r.z));
          ring.z = maxZ + D_STEP;
          ring.layout = layouts[Math.floor(Math.random() * layouts.length)];
        }
      }

      // Sort Far -> Near so we draw furthest strips first.
      const sorted = [...rings].sort((a, b) => b.z - a.z);

      ctx.fillStyle = EMPTY_COLOR;
      ctx.fillRect(0, 0, W, H);

      // Draw strips between consecutive rings
      for (let j = 0; j < sorted.length - 1; j++) {
        const farRing = sorted[j];
        const nearRing = sorted[j + 1];

        // Fade out rings far away to leave a clean white center
        const fadeStart = 3.5;
        const fadeEnd = 4.5;
        let alpha = 1.0;
        if (farRing.z > fadeStart) {
          alpha = Math.max(0, 1.0 - (farRing.z - fadeStart) / (fadeEnd - fadeStart));
        }

        if (alpha <= 0) continue;

        const sa = toScale(farRing.z);
        const sb = toScale(nearRing.z);

        const rectA = makeRect(sa, W, H); // smaller, further
        const rectB = makeRect(sb, W, H); // larger, closer

        drawStrip(ctx, imgRef.current, nearRing.layout, rectB, rectA, alpha);

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(rectA.x, rectA.y, rectA.w, rectA.h);
        ctx.globalAlpha = 1.0;
      }

      // Draw the closest ring's outline
      const closest = sorted[sorted.length - 1];
      const closestRect = makeRect(toScale(closest.z), W, H);
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(closestRect.x, closestRect.y, closestRect.w, closestRect.h);

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      prevTsRef.current = null;
    };
  }, [layouts]);

  return (
    <div className="tunnel-wrapper">
      <div 
        className="tunnel-container"
        onMouseDown={() => isFastRef.current = true}
        onMouseUp={() => isFastRef.current = false}
        onMouseLeave={() => isFastRef.current = false}
        onTouchStart={() => isFastRef.current = true}
        onTouchEnd={() => isFastRef.current = false}
      >
        <canvas ref={canvasRef} className="tunnel-canvas" />
      </div>
    </div>
  );
}

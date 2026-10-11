import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  mode: 'stars' | 'ambient';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  r: number;
  g: number;
  b: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth || 360);
    let height = (canvas.height = window.innerHeight || 640);

    const warmPalette = [
      { r: 247, g: 214, b: 216 }, // blush pink
      { r: 230, g: 160, b: 180 }, // rose
      { r: 244, g: 234, b: 212 }, // cream
      { r: 210, g: 130, b: 150 }, // warm muted rose
    ];

    const starPalette = [
      { r: 255, g: 255, b: 255 }, // pure star
      { r: 245, g: 225, b: 235 }, // soft blush star
      { r: 230, g: 215, b: 250 }, // subtle lavender
      { r: 255, g: 245, b: 220 }, // soft warm starlight
    ];

    const particles: Particle[] = [];
    const count = mode === 'stars' ? (width < 640 ? 50 : 85) : (width < 640 ? 30 : 50);

    const initParticles = () => {
      particles.length = 0;
      const palette = mode === 'ambient' ? warmPalette : starPalette;

      for (let i = 0; i < count; i++) {
        const isWarm = mode === 'ambient';
        const color = palette[Math.floor(Math.random() * palette.length)];
        const maxAlpha = 0.35 + Math.random() * 0.55;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (isWarm ? 2.5 : 1.6) + 0.6,
          speedX: (Math.random() - 0.5) * (isWarm ? 0.25 : 0.12),
          speedY: isWarm ? -(Math.random() * 0.3 + 0.08) : (Math.random() - 0.5) * 0.12,
          alpha: Math.random() * maxAlpha,
          maxAlpha,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          r: color.r,
          g: color.g,
          b: color.b,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 360;
      height = canvas.height = window.innerHeight || 640;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse brightness
        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.12) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Movement
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const safeAlpha = Math.max(0, Math.min(1, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${safeAlpha.toFixed(2)})`;
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 2.0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${(safeAlpha * 0.25).toFixed(2)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
      aria-hidden="true"
    />
  );
};

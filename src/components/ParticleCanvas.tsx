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
  color: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const count = mode === 'stars' ? (width < 640 ? 55 : 90) : (width < 640 ? 35 : 55);

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const isWarm = mode === 'ambient';
        const colors = isWarm
          ? [
              'rgba(247, 214, 216,', // blush pink
              'rgba(230, 160, 180,', // rose
              'rgba(244, 234, 212,', // cream
              'rgba(200, 120, 140,', // warm muted rose
            ]
          : [
              'rgba(255, 255, 255,', // pure star
              'rgba(240, 220, 230,', // soft blush star
              'rgba(220, 205, 245,', // subtle lavender
              'rgba(255, 245, 215,', // soft warm starlight
            ];

        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        const maxAlpha = 0.35 + Math.random() * 0.55;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (isWarm ? 2.8 : 1.8) + 0.6,
          speedX: (Math.random() - 0.5) * (isWarm ? 0.3 : 0.15),
          speedY: isWarm ? -(Math.random() * 0.35 + 0.1) : (Math.random() - 0.5) * 0.15,
          alpha: Math.random() * maxAlpha,
          maxAlpha,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          color: chosenColor,
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse brightness
        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.15) {
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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.fill();

        // Optional tiny glow for larger particles
        if (p.size > 2.0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${Math.max(0, p.alpha * 0.25)})`;
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

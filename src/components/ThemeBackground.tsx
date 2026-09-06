import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural Node Network Canvas animation
  useEffect(() => {
    if (theme !== 'neural' && theme !== 'matrix') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    if (theme === 'neural') {
      // Create subtle floating neural nodes
      const nodeCount = Math.min(Math.floor(width / 30), 45);
      const nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#c084fc' : '#38bdf8',
      }));

      const animateNeural = () => {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${0.25 * (1 - dist / 130)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = node.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        animationId = requestAnimationFrame(animateNeural);
      };

      animateNeural();
    } else if (theme === 'matrix') {
      // Create subtle terminal green rain drops
      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
      const chars = '01100101010101100100100100101010101';

      const animateMatrix = () => {
        ctx.fillStyle = 'rgba(2, 6, 4, 0.08)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        animationId = requestAnimationFrame(animateMatrix);
      };

      animateMatrix();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700">
      {/* 1. Canvas for Neural & Matrix active effects */}
      {(theme === 'neural' || theme === 'matrix') && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40 dark:opacity-50"
        />
      )}

      {/* 2. NEURAL MODE Ambient Gradients */}
      {theme === 'neural' && (
        <>
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[150px]" />
        </>
      )}

      {/* 3. MATRIX MODE Ambient Grid */}
      {theme === 'matrix' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6608_1px,transparent_1px),linear-gradient(to_bottom,#00ff6608_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
      )}

      {/* 4. TIMES MODE Editorial Paper Texture */}
      {theme === 'times' && (
        <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      )}

      {/* 5. DARK MODE Cyber Glows */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px]" />
        </>
      )}
    </div>
  );
};

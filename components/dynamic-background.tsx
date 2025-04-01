"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Particle 类保持不变
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvas: HTMLCanvasElement;
  theme: string;

  constructor(canvas: HTMLCanvasElement, theme: string) {
    this.canvas = canvas;
    this.theme = theme;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color =
      theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) this.x = 0;
    else if (this.x < 0) this.x = this.canvas.width;

    if (this.y > this.canvas.height) this.y = 0;
    else if (this.y < 0) this.y = this.canvas.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    // 初始化画布和粒子
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, theme ?? "light"));
    }

    // 调整画布大小的函数
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0; // 清空现有粒子
      const newParticleCount = Math.floor(
        (canvas.width * canvas.height) / 10000
      );
      for (let i = 0; i < newParticleCount; i++) {
        particles.push(new Particle(canvas, theme ?? "light"));
      }
    };

    window.addEventListener("resize", resizeCanvas);

    // 连接粒子的函数
    const connectParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(255, 255, 255, ${opacity * 0.2})`
                : `rgba(0, 0, 0, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // 动画函数
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw(ctx);
      }

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 清理函数
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />
  );
}

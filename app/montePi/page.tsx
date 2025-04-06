"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function MonteCarloPi() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [piEstimate, setPiEstimate] = useState(0);
  const [points, setPoints] = useState<
    { x: number; y: number; isInside: boolean }[]
  >([]);
  const [insideCount, setInsideCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const initializeCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1000;
      positions[i + 1] = (Math.random() - 0.5) * 1000;
      positions[i + 2] = (Math.random() - 0.5) * 1000;
      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = 1;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array intentional for mount-only effect

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      initializeCanvas(canvas);
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      const x = Math.random();
      const y = Math.random();
      const cx = x * width;
      const cy = y * height;
      const dx = x - 0.5;
      const dy = y - 0.5;
      const isInside = dx * dx + dy * dy <= 0.25;

      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, 2 * Math.PI);
      ctx.fillStyle = isInside ? "#60a5fa" : "#f87171";
      ctx.fill();

      setPoints((prev) => {
        const newPoints = [...prev, { x, y, isInside }];
        const newInsideCount = isInside ? insideCount + 1 : insideCount;
        setInsideCount(newInsideCount);
        setPiEstimate((4 * newInsideCount) / newPoints.length);
        return newPoints;
      });
    }, 10);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, insideCount]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setPoints([]);
    setInsideCount(0);
    setPiEstimate(0);

    const canvas = canvasRef.current;
    if (canvas) {
      initializeCanvas(canvas);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-600 overflow-hidden">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 max-w-md w-full p-6 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Monte Carlo π
        </h1>
        <div className="relative mb-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="rounded-lg border border-gray-300"
          />
          <div className="absolute top-2 left-2 bg-white/80 text-sm px-2 py-1 rounded shadow">
            Points: {points.length}
          </div>
        </div>
        <div className="text-center space-y-1 mb-4">
          <p className="text-blue-800 text-lg font-medium">
            Estimated π: <strong>{piEstimate.toFixed(5)}</strong>
          </p>
          <p className="text-gray-600 text-sm">Actual π: 3.14159</p>
          <p className="text-gray-600 text-sm">
            Inside/Total Points: {insideCount} / {points.length}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

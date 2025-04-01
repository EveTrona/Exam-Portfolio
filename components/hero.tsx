// components/hero.tsx
"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  useProgress,
  Html,
  Sphere,
  Text3D,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { FlipWords } from "@/components/ui/flip-words";

// 加载器组件
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% 加载中</Html>;
}

// 技能图标组件（漂浮的 3D 球体）
function SkillIcon({ position, color, label, scale = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y +=
        Math.sin(state.clock.getElapsedTime() + position[0]) * 0.02;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.5 * scale, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? color : "black"}
          emissiveIntensity={hovered ? 1 : 0}
        />
      </Sphere>
      <Html position={[0, 1, 0]} center>
        <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
          {label}
        </div>
      </Html>
    </group>
  );
}

// 粒子系统组件
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = 1;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] +=
          Math.sin(state.clock.getElapsedTime() + i) * 0.01;
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={particleCount}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  );
}

// 主场景组件
function Scene() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Particles />

      <SkillIcon
        position={[-3, -5, 0]}
        color="#ff5555"
        label="前端开发"
        scale={1.2}
      />
      <SkillIcon
        position={[0, -6, 0]}
        color="#55ff55"
        label="UI设计"
        scale={1.0}
      />
      <SkillIcon
        position={[3, -6, 2]}
        color="#5555ff"
        label="3D爱好者"
        scale={0.8}
      />

      {/* 使用 Text3D 组件替代 Text */}
      <Center>
        <Text3D
          position={[0, 2, 0]}
          font="/fonts/Nunito_Bold.json" // 确保字体文件存在
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Welcome to My Portfolio
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-between"
    >
      {mounted && (
        <div className="w-full h-1/2 z-10">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Suspense fallback={<Loader />}>
              <Scene />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <EffectComposer>
                <Bloom
                  intensity={1.0}
                  luminanceThreshold={0.5}
                  luminanceSmoothing={0.9}
                />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="container z-20 flex flex-col items-center text-center mb-16">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-8xl">H</span>i, I&apos;m
          <FlipWords
            className="text-blue-600 dark:text-blue-600"
            words={["刘家蓬", "EveTrona"]}
          />
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          前端开发工程师 / UI设计师 / 3D爱好者
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" asChild>
            <a href="#about">
              了解更多 <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

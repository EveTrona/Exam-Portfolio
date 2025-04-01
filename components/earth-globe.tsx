"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import type { Mesh } from "three";

function Earth() {
  const earthRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/assets/3d/texture_earth.jpg");

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />

      {/* 标注上海位置 */}
      <Html
        position={[0.8, 1.2, 1.6]}
        className="pointer-events-none"
        center
        distanceFactor={8}
      >
        <div className="bg-primary text-white px-2 py-1 rounded-md text-xs whitespace-nowrap">
          上海
        </div>
      </Html>
    </mesh>
  );
}

export default function EarthGlobe() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Earth />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

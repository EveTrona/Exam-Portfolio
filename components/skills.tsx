"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail, Float, Text3D } from "@react-three/drei";
import { Color, type Mesh, type Group } from "three";
import { useMobile } from "@/hooks/use-mobile";

interface Skill {
  name: string;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { name: "TailwindCss", level: 75, color: "#f38c26" },
  { name: "HTML/CSS", level: 75, color: "#e34c26" },
  { name: "JavaScript", level: 65, color: "#f0db4f" },
  { name: "React", level: 80, color: "#61dafb" },
  { name: "TypeScript", level: 65, color: "#007acc" },
  { name: "Three.js/WebGL", level: 55, color: "#049ef4" },
  { name: "Node.js", level: 70, color: "#3c873a" },
  { name: "UI/UX Design", level: 70, color: "#ff7eb6" },
  { name: "Next.js", level: 76, color: "#ffffff" },
];

interface SkillPlanetProps {
  skill: Skill;
  index: number;
  isHovered: boolean;
  onHover: (index: number) => void;
  onHoverEnd: () => void;
}

function SkillPlanet({
  skill,
  index,
  isHovered,
  onHover,
  onHoverEnd,
}: SkillPlanetProps) {
  const planetRef = useRef<Mesh>(null);
  const textRef = useRef<Group>(null);

  const totalSkills = skills.length;
  const orbitRadius = 3 + (skill.level / 100) * 2.5;
  const orbitSpeed = 0.15 - (index / totalSkills) * 0.07;
  const planetSize = 0.25 + (skill.level / 100) * 0.35;
  const planetColor = new Color(skill.color);

  const angle = (index / totalSkills) * Math.PI * 2;
  const initialX = Math.cos(angle) * orbitRadius;
  const initialZ = Math.sin(angle) * orbitRadius;

  useFrame((state, delta) => {
    if (planetRef.current) {
      const time = state.clock.getElapsedTime();
      const x = Math.cos(time * orbitSpeed + angle) * orbitRadius;
      const z = Math.sin(time * orbitSpeed + angle) * orbitRadius;

      planetRef.current.position.x = x;
      planetRef.current.position.z = z;
      planetRef.current.rotation.y += delta * 0.8;

      if (textRef.current) {
        textRef.current.position.x = x;
        textRef.current.position.z = z;
        textRef.current.position.y = planetSize + 0.7;
        textRef.current.lookAt(state.camera.position);
      }
    }
  });

  return (
    <>
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[orbitRadius - 0.05, orbitRadius + 0.05, 64]} />
        <meshBasicMaterial color={skill.color} opacity={0.3} transparent />
      </mesh>

      <group
        position={[initialX, 0, initialZ]}
        onPointerOver={() => onHover(index)}
        onPointerOut={onHoverEnd}
      >
        <mesh ref={planetRef}>
          <Trail
            width={isHovered ? 2 : 1}
            color={skill.color}
            length={isHovered ? 8 : 4}
            decay={1.5}
            attenuation={(width) => width * 0.5}
          >
            <sphereGeometry args={[planetSize, 32, 32]} />
            <meshStandardMaterial
              color={planetColor}
              metalness={0.6}
              roughness={0.3}
              emissive={isHovered ? planetColor : "#000000"}
              emissiveIntensity={isHovered ? 1 : 0.2}
            />
          </Trail>
        </mesh>
        {/* Glow effect for planets */}
        {isHovered && (
          <mesh>
            <sphereGeometry args={[planetSize * 1.3, 32, 32]} />
            <meshBasicMaterial color={skill.color} transparent opacity={0.4} />
          </mesh>
        )}
      </group>

      <group ref={textRef} position={[initialX, planetSize + 0.7, initialZ]}>
        <Text3D
          font="/fonts/Nunito_Bold.json"
          size={isHovered ? 0.35 : 0.25}
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          bevelOffset={0}
          /* bevelSegments Bởi 5} */
        >
          {skill.name}
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : skill.color}
            emissive={isHovered ? "#ffffff" : skill.color}
            emissiveIntensity={isHovered ? 0.8 : 0.2}
            metalness={0.5}
            roughness={0.4}
          />
        </Text3D>
      </group>
    </>
  );
}

function CentralSun() {
  const sunRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.3;
      sunRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh ref={sunRef}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial
            color="#8a2be2"
            metalness={0.4}
            roughness={0.2}
            emissive="#8a2be2"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.25} />
        </mesh>
      </Float>

      <Text3D
        position={[0, 1.8, 0]}
        font="/fonts/Nunito_Bold.json"
        size={0.6}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        SKILLS
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8a2be2"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </Text3D>
    </>
  );
}

interface ParticleProps {
  count?: number;
}

function Particles({ count = 200 }: ParticleProps) {
  const mesh = useRef<Group>(null);

  const particles = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
    ] as [number, number, number],
    size: Math.random() * 0.03 + 0.01,
  }));

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.015;
      mesh.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group ref={mesh}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function SkillsUniverse() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const isMobile = useMobile();

  const handleHover = (index: number) => {
    setHoveredSkill(index);
  };

  const handleHoverEnd = () => {
    setHoveredSkill(null);
  };

  return (
    <>
      <Particles count={isMobile ? 100 : 250} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#8a2be2" />
      <CentralSun />
      {skills.map((skill, index) => (
        <SkillPlanet
          key={skill.name}
          skill={skill}
          index={index}
          isHovered={hoveredSkill === index}
          onHover={handleHover}
          onHoverEnd={handleHoverEnd}
        />
      ))}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={!hoveredSkill}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={8}
        maxDistance={15}
      />
    </>
  );
}

export default function Skills() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const isHeadInView = useInView(headRef, { once: false, amount: 0.3 });

  const skillsRef = useRef<HTMLDivElement>(null);
  const isSkillsInView = useInView(skillsRef, { once: false, amount: 0.3 });

  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <section id="skills" className="">
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={headRef}
        >
          技能专长
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-6"
                ref={skillsRef}
              >
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <Progress
                  value={skill.level}
                  className="h-2 rounded-full"
                  style={
                    {
                      "--progress-background": skill.color,
                    } as React.CSSProperties
                  }
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isSkillsInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.8 }}
            className="h-[600px] w-full"
            ref={skillsRef}
          >
            <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
              <SkillsUniverse />
            </Canvas>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          ref={cardRef}
        >
          {[
            "Git",
            "Figma",
            "Tailwind CSS",
            "Framer Motion",
            "Webpack",
            "Vite",
          ].map((tool) => (
            <div
              key={tool}
              className="p-4 bg-blue-200 hover:bg-blue-400 dark:bg-gray-800 rounded-lg dark:hover:bg-gray-700 transition-colors mb-2 "
            >
              {tool}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

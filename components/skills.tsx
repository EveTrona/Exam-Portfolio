"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "HTML/CSS", level: 95, color: "#e34c26" },
  { name: "JavaScript", level: 90, color: "#f0db4f" },
  { name: "React", level: 88, color: "#61dafb" },
  { name: "TypeScript", level: 85, color: "#007acc" },
  { name: "Three.js/WebGL", level: 75, color: "#049ef4" },
  { name: "Node.js", level: 70, color: "#3c873a" },
  { name: "UI/UX Design", level: 80, color: "#ff7eb6" },
  { name: "Next.js", level: 82, color: "#000000" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id="skills" className="py-20">
      <div className="container max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          技能专长
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <Progress
                value={skill.level}
                className="h-2"
                /* indicatorClassName={`bg-[${skill.color}]`} */
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            "Git",
            "Figma",
            "Tailwind CSS",
            "GSAP",
            "Framer Motion",
            "Webpack",
            "Vite",
            "Jest",
          ].map((tool) => (
            <div
              key={tool}
              className="p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors"
            >
              {tool}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

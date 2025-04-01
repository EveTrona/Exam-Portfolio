"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          关于我
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="h-[400px] w-full">
            <Canvas>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Sphere args={[2, 100, 200]} scale={1.2}>
                <MeshDistortMaterial
                  color="#8a2be2"
                  attach="material"
                  distort={0.5}
                  speed={1.5}
                  roughness={0.2}
                  metalness={0.8}
                />
              </Sphere>
              <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">个人简介</h3>
              <p className="text-muted-foreground mb-6">
                我是一名充满激情的前端开发工程师，专注于创建美观且功能强大的用户界面。
                我热爱将设计转化为代码，并且对新技术充满好奇心。
                在过去的几年里，我参与了多个项目的开发，积累了丰富的经验。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">位置</h4>
                    <p className="text-muted-foreground">中国，上海</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">学历</h4>
                    <p className="text-muted-foreground">计算机科学学士</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">语言</h4>
                    <p className="text-muted-foreground">
                      中文（母语），英语（流利）
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">兴趣爱好</h4>
                    <p className="text-muted-foreground">3D建模，摄影，旅行</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

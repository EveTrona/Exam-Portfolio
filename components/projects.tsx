"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "3D产品展示平台",
    description:
      "基于Three.js开发的3D产品展示平台，支持产品360度旋转查看、材质更换等功能。",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Three.js", "WebGL", "GSAP"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "AI辅助设计工具",
    description:
      "结合AI技术的Web设计工具，可根据用户需求自动生成UI组件和布局方案。",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "TypeScript", "TensorFlow.js", "Tailwind CSS"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "响应式电商网站",
    description:
      "为某品牌开发的响应式电商网站，包含产品展示、购物车、支付等完整功能。",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "数据可视化仪表盘",
    description: "企业级数据可视化仪表盘，支持多种图表类型和实时数据更新。",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Vue.js", "D3.js", "Express", "Socket.io"],
    demoLink: "#",
    codeLink: "#",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          项目作品
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-[200px] object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      演示
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      代码
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

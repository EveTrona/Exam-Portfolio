"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "MontePi",
    description: "基于蒙特卡罗方法计算圆周率",
    image: "/images/montePi.png",
    tags: ["React", "TypeScript"],
    demoLink: "/montePi",
    codeLink: "#",
  },
  {
    title: "Pacman游戏",
    description: "吃豆人小游戏",
    image: "/images/pacman.png",
    tags: ["Next.js", "TypeScript"],
    demoLink: "/pacman",
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
                    className=" w-full h-[300px] object-cover transition-transform hover:scale-105 duration-300"
                    width={250}
                    height={350}
                    /* fill */
                    /* sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" */
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
                  {/*                   <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      代码
                    </a>
                  </Button> */}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

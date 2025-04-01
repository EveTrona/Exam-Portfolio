"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "高级前端开发工程师",
    company: "ABC科技有限公司",
    period: "2021 - 至今",
    description:
      "负责公司核心产品的前端架构设计和开发，优化用户体验和性能，指导初级开发人员。",
    skills: ["React", "TypeScript", "Next.js", "Three.js"],
  },
  {
    title: "前端开发工程师",
    company: "XYZ互联网公司",
    period: "2018 - 2021",
    description:
      "参与多个Web应用的开发，实现响应式设计，确保跨浏览器兼容性，与后端团队协作。",
    skills: ["JavaScript", "Vue.js", "SCSS", "Webpack"],
  },
  {
    title: "实习前端开发",
    company: "创新科技初创公司",
    period: "2017 - 2018",
    description: "协助开发公司网站和内部工具，学习前端技术栈，参与UI设计讨论。",
    skills: ["HTML", "CSS", "jQuery", "Bootstrap"],
  },
];

const education = [
  {
    degree: "计算机科学学士",
    school: "某知名大学",
    period: "2014 - 2018",
    description:
      "主修计算机科学，辅修交互设计。参与多个学生项目，获得优秀毕业生称号。",
  },
  {
    degree: "Web开发认证",
    school: "在线教育平台",
    period: "2017",
    description: "完成前端开发专业课程，学习现代Web开发技术和最佳实践。",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          工作经历与教育
        </motion.h2>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-8">工作经历</h3>
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary" />
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <h4 className="text-xl font-semibold">{exp.title}</h4>
                        <Badge variant="outline" className="mt-2 sm:mt-0 w-fit">
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-primary mb-4">{exp.company}</p>
                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8">教育背景</h3>
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary" />
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <h4 className="text-xl font-semibold">{edu.degree}</h4>
                        <Badge variant="outline" className="mt-2 sm:mt-0 w-fit">
                          {edu.period}
                        </Badge>
                      </div>
                      <p className="text-primary mb-4">{edu.school}</p>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

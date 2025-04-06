"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "前端开发",
    company: "LittleLongBao",
    period: "2025 - 至今",
    description:
      "作为核心前端开发人员，负责 School-FYI 平台的前端架构设计、功能开发、维护和优化。与后端工程师紧密合作，定义 API 接口，确保前后端数据交互的流畅性。与 UI/UX 设计师协作，将设计稿转化为高质量、可交互的前端页面。负责前端代码的质量，进行代码审查、单元测试和性能优化",
    skills: ["Next.js", "React.js", "Joy Ui", "Prisma"],
  },
  {
    title: "实习前端开发",
    company: "铵捷(上海)科技有限公司	",
    period: "2024 - 2024",
    description:
      "在前端开发项目中，负责开发一个论坛模块。项目使用Next.js作为框架，以确保高性能和SEO友好性。与后端数据库对接交互，将后端数据渲染到前端。负责完成微信登录，前后端的对接和交互和微信支付功能。",
    skills: ["Next.js", "TailwindCSS", "Shadcn"],
  },
];

const education = [
  {
    degree: "计算机科学学士",
    school: "齐齐哈尔大学",
    period: "2021 - 2025",
    description: "主修计算机科学，辅修交互设计",
  },
];

export default function Experience() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.2 });

  const experiencesRef = useRef(null);
  const experiencesInView = useInView(experiencesRef, {
    once: false,
    amount: 0.4,
  });

  const educationRef = useRef(null);
  const educationInView = useInView(educationRef, { once: false, amount: 0.4 });

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={headingRef}
        >
          工作经历与教育
        </motion.h2>

        <div className="space-y-16">
          {/* 工作经历 */}
          <div>
            <h3 className="text-2xl font-bold mb-8">工作经历</h3>
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              {experiences.map((exp, index) => {
                return (
                  <motion.div
                    key={index}
                    ref={experiencesRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={experiencesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary" />
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                          <h4 className="text-xl font-semibold">{exp.title}</h4>
                          <Badge
                            variant="outline"
                            className="mt-2 sm:mt-0 w-fit"
                          >
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
                );
              })}
            </div>
          </div>

          {/* 教育背景 */}
          <div>
            <h3 className="text-2xl font-bold mb-8">教育背景</h3>
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              {education.map((edu, index) => {
                return (
                  <motion.div
                    key={index}
                    ref={educationRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={educationInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary" />
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                          <h4 className="text-xl font-semibold">
                            {edu.degree}
                          </h4>
                          <Badge
                            variant="outline"
                            className="mt-2 sm:mt-0 w-fit"
                          >
                            {edu.period}
                          </Badge>
                        </div>
                        <p className="text-primary mb-4">{edu.school}</p>
                        <p className="text-muted-foreground">
                          {edu.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

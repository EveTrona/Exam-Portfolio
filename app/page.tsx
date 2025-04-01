import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import DynamicBackground from "@/components/dynamic-background";
import LoadingScreen from "@/components/loading-screen";

export default function Home() {
  return (
    <main className="relative">
      <DynamicBackground />
      <LoadingScreen />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}

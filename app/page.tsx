import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skill";
import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Project />
      <Experience />
      <Contact />

      {/* <section
        id="home"
        className="flex min-h-screen items-center justify-center bg-black"
      >
        <h1 className="text-4xl font-bold text-white">My Portfolio</h1>
      </section> */}
    </main>
  );
}

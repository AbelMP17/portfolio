import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    title: "Landing + Shop",
    description: "Una web moderna con React, Tailwind y animaciones con GSAP, lista para hacer pedidos a domicilio.",
    image: "/ksb.webp",
    tech: ["React", "Tailwind", "GSAP", "LocalStorage"],
    link: "https://kloesmashburger.com/",
  },
  {
    title: "Landing Simulada",
    description: "Reconstrucción de una landing como Apple Store",
    image: "/iphone.webp",
    tech: ["React", "Tailwind", "Three.js"],
    link: "https://apple-landing-rouge.vercel.app/",
  },
  {
    title: "Landing para empresa de Construcción",
    description: "Escaparate para empresa dedicada a la construcción y a reformas.",
    image: "/grupoasirel.webp",
    tech: ["React", "Tailwind", "GSAP"],
    link: "https://grupoasirel.vercel.app/",
  },
  {
    title: "Landing ficticia",
    description: "Experimento visual con scroll animado y efectos dinámicos.",
    image: "/brainwave.webp",
    tech: ["React", "Tailwind", "GSAP"],
    link: "https://ai-landing-silk.vercel.app/",
  },
];

// Extraer tecnologías únicas
const allTechs = [
  "Todos",
  ...Array.from(new Set(allProjects.flatMap((p) => p.tech))),
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeTech, setActiveTech] = useState("Todos");

  const filteredProjects =
    activeTech === "Todos"
      ? allProjects
      : allProjects.filter((p) => p.tech.includes(activeTech));

  // Scroll animation on mount
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animation when filter changes
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card", {
        y: -500,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeTech]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
  
    const preventScroll = (e) => e.preventDefault();
    const cards = document.querySelectorAll(".project-card");
  
    const lockScroll = () => (document.body.style.overflow = "hidden");
    const unlockScroll = () => (document.body.style.overflow = "");
  
    cards.forEach((card) => {
      card.addEventListener("touchstart", lockScroll);
      card.addEventListener("touchend", unlockScroll);
      card.addEventListener("touchmove", preventScroll, { passive: false });
    });
  
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("touchstart", lockScroll);
        card.removeEventListener("touchend", unlockScroll);
        card.removeEventListener("touchmove", preventScroll);
      });
    };
  }, [filteredProjects]);
  

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 py-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-cyan-400">Proyectos</span> destacados
      </h2>

      {/* Filtro de tecnologías */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setActiveTech(tech)}
            className={`px-4 py-2 rounded-full border text-sm transition-all ${
              activeTech === tech
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-white/5 text-white border-white/10 hover:border-cyan-400"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Tarjetas de proyectos */}
      <div key={activeTech} className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 md:gap-8">
        {filteredProjects.map((project) => (
          <a
            key={project.link}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.03}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              transitionSpeed={800}
              tiltReverse={true}
              style={{ borderRadius: "16px", overflow: "hidden" }}
            >
              <div className="project-card opacity-0 bg-white/5 rounded-[16px] border border-white/10 overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover pointer-events-none"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-cyan-400/10 text-cyan-300 px-2 py-1 rounded-md border border-cyan-400/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          </a>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Frontend Developer Jr.",
    company: "TechCorp",
    date: "2023 - Presente",
    description: "Desarrollo de interfaces responsivas con React, Tailwind y GSAP.",
  },
  {
    title: "Freelance Developer",
    company: "Proyectos personales",
    date: "2022 - 2023",
    description: "Creación de landings, portfolios y apps interactivas para clientes.",
  },
  {
    title: "Diseñador UX/UI",
    company: "Figma Studio",
    date: "2021 - 2022",
    description: "Diseño de interfaces modernas enfocadas en la experiencia de usuario.",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
      const dot = item.querySelector(".timeline-dot");

      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        dot,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full flex flex-col justify-center items-center mx-auto px-4 py-20 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        <span className="text-cyan-400">Experiencia</span> Profesional
      </h2>

      <div className="relative overflow-hidden ml-4 p-5">
        {/* Línea animada */}
        <div
          ref={lineRef}
          className="absolute top-0 left-3 w-0.5 h-full bg-white/20 origin-top scale-y-0"
        />

        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`timeline-item mb-12 relative pl-8`}
          >
            <div className="timeline-dot absolute left-[-14px] top-2 w-4 h-4 rounded-full bg-cyan-400" />
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <p className="text-cyan-300 text-sm mb-1">{exp.company} • {exp.date}</p>
            <p className="text-gray-300 text-sm">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

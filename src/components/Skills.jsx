import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import { SiTailwindcss, SiGreensock, SiThreedotjs } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger, Draggable);

const skills = [
  {
    name: "HTML5",
    icon: <FaHtml5 className="text-orange-500" />,
    glowColor: "rgba(251, 146, 60, 0.15)",
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt className="text-blue-500" />,
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    name: "JavaScript",
    icon: <FaJs className="text-yellow-400" />,
    glowColor: "rgba(250, 204, 21, 0.15)",
  },
  {
    name: "ReactJS",
    icon: <FaReact className="text-cyan-400" />,
    glowColor: "rgba(34, 211, 238, 0.15)",
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-teal-300" />,
    glowColor: "rgba(94, 234, 212, 0.15)",
  },
  {
    name: "GSAP",
    icon: <SiGreensock className="text-green-500" />,
    glowColor: "rgba(34, 197, 94, 0.15)",
  },
  {
    name: "Three.js",
    icon: <SiThreedotjs className="text-white" />,
    glowColor: "rgba(255, 255, 255, 0.1)",
  },
  {
    name: "Git",
    icon: <FaGitAlt className="text-red-500" />,
    glowColor: "rgba(239, 68, 68, 0.15)",
  },
  {
    name: "Figma",
    icon: <FaFigma className="text-pink-500" />,
    glowColor: "rgba(236, 72, 153, 0.15)",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fade general de la sección
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "bounce.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Fade + scale individual de cada skill
    const cards = gsap.utils.toArray(".skill-card");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [sectionRef]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 py-10 text-center text-white"
    >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card relative overflow-hidden group flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 transition-all duration-300 shadow-lg backdrop-blur-sm text-white"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const glow = card.querySelector(".glow");
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                glow.style.background = `radial-gradient(200px circle at ${x}px ${y}px, ${skill.glowColor}, transparent 70%)`;
                glow.style.transition = "background 0.4s ease";
              }}
              onMouseLeave={(e) => {
                const glow = e.currentTarget.querySelector(".glow");
                glow.style.background = "none";
              }}
            >
              <div className="glow absolute inset-0 rounded-xl opacity-50 transition duration-300 pointer-events-none" />
              <div className="text-4xl z-10">{skill.icon}</div>
              <span className="text-sm mt-2 z-10">{skill.name}</span>
            </div>
          ))}
        </div>
    </section>
  );
}

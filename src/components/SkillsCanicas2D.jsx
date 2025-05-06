import { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import { SiTailwindcss, SiGreensock, SiThreedotjs } from "react-icons/si";

const skills = [
  { icon: <FaHtml5 />, color: "#f97316" },
  { icon: <FaCss3Alt />, color: "#3b82f6" },
  { icon: <FaJs />, color: "#eab308" },
  { icon: <FaReact />, color: "#06b6d4" },
  { icon: <SiTailwindcss />, color: "#2dd4bf" },
  { icon: <SiGreensock />, color: "#22c55e" },
  { icon: <SiThreedotjs />, color: "#ffffff" },
  { icon: <FaGitAlt />, color: "#ef4444" },
  { icon: <FaFigma />, color: "#ec4899" },
];

export default function SkillsCanicas2D() {
  const dragRef = useRef(null);
  const canalRef = useRef(null);
  const ballRefs = useRef([]);
  const sectionRef = useRef(null);
  const rotations = useRef([]);
  const spacing = window.innerWidth < 640 ? 80 : 120;

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    const dragWidth = dragRef.current.offsetWidth;
    const canalWidth = canalRef.current.offsetWidth;
    const maxX = canalWidth - dragWidth;
    let lastX = 0;

    rotations.current = skills.map(() => 0);

    Draggable.create(dragRef.current, {
      type: "x",
      bounds: { minX: 0, maxX },
      inertia: true,
      onDrag: function () {
        const deltaX = this.x - lastX;
        lastX = this.x;

        skills.forEach((_, i) => {
          const el = ballRefs.current[i];
          if (!el) return;

          const ballX = this.x - spacing * (skills.length - i);

          if (ballX >= 0) {
            gsap.to(el, {
              x: ballX,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            rotations.current[i] += deltaX * 0.5;
            gsap.set(el, {
              rotate: rotations.current[i],
            });
          } else {
            gsap.to(el, {
              x: -40,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      },

      onRelease: function () {
        const bounce = (toX) => {
          gsap.to(this.target, {
            scale: 0.92,
            duration: 0.1,
            ease: "power1.out",
            onComplete: () => {
              gsap.to(this.target, {
                x: toX,
                scale: 1,
                duration: 0.2,
                ease: "back.out(1.7)",
              });
            },
          });
        };

        if (this.x <= 0) {
          bounce(0);
        } else if (this.x >= maxX) {
          bounce(maxX);
        }
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-20 overflow-hidden"
    >
      <div
        ref={canalRef}
        className="relative flex justify-center items-center mx-auto w-full px-4 sm:px-0 sm:max-w-[1220px] h-32 sm:h-36 bg-neutral-800 rounded-full overflow-hidden transform -skew-y-2 shadow-inner shadow-black"
      >
        <div className="text-neutral-600 text-[30px] font-bold select-none">
          SLIDE IT!
        </div>

        <div
          ref={dragRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-xl sm:text-2xl shadow-lg cursor-pointer z-10 border-2 border-white"
        >
          ➤
        </div>

        {skills.map((skill, i) => (
          <div
            key={i}
            ref={(el) => (ballRefs.current[i] = el)}
            className="canica absolute top-1/2 -translate-y-1/2 w-16 h-16 sm:w-28 sm:h-28 rounded-full shadow-md shadow-black flex items-center justify-center text-2xl sm:text-3xl opacity-0 cursor-pointer"
            style={{
              left: 0,
              backgroundColor: skill.color,
              color: skill.color === "#ffffff" ? "#000" : "#fff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}77`;
              e.currentTarget.style.transition = "box-shadow 0.3s ease";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 transparent";
            }}
          >
            {skill.icon}
          </div>
        ))}
      </div>
    </section>
  );
}

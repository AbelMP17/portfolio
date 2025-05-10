import { useRef, useState } from "react";
import SkillsClásicas from "./Skills";
import SkillsCanicas2D from "./SkillsCanicas2D";
import gsap from "gsap";

export default function SkillsSection() {
  const [modoCanica, setModoCanica] = useState(false);
  const sectionRef = useRef(null);

  gsap.fromTo(
    sectionRef.current,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  return (
    <section ref={sectionRef} id="skills" className="relative">
      {/* Botón toggle solo en desktop */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Mis <span className="text-cyan-400">Habilidades</span>
      </h2>
      <div className="hidden md:flex justify-center items-center">
        <button
          onClick={() => setModoCanica(!modoCanica)}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-full shadow-md transition"
        >
          Cambiar a vista {modoCanica ? "clásica" : "canal"}
        </button>
      </div>

      {modoCanica ? <SkillsCanicas2D /> : <SkillsClásicas />}
    </section>
  );
}

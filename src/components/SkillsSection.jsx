import { useEffect, useRef, useState } from "react";
import SkillsClásicas from "./Skills";
import SkillsCanicas2D from "./SkillsCanicas2D";
import gsap from "gsap";

export default function SkillsSection() {
  const [modoCanica, setModoCanica] = useState(false);
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
    setModoCanica(!modoCanica);

    // Remove ripple after 1s
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

useEffect(() => {
  if (!sectionRef.current) return;

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
}, []);

  return (
    <section ref={sectionRef} id="skills" className="relative">
      {/* Botón toggle solo en desktop */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Mis <span className="text-cyan-400">Habilidades</span>
      </h2>
      <div className="hidden md:flex justify-center items-center">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="relative overflow-hidden mb-6 px-6 py-3 rounded-full bg-cyan-600 text-white font-bold transition duration-300 hover:bg-cyan-700"
        >
          Cambiar a vista {modoCanica ? "clásica" : "canal"}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute block rounded-full bg-white opacity-30 pointer-events-none animate-ripple"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: 200,
                height: 200,
                marginTop: -100,
                marginLeft: -100,
              }}
            />
          ))}
        </button>
      </div>

      {modoCanica ? <SkillsCanicas2D /> : <SkillsClásicas />}
    </section>
  );
}

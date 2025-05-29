import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animación del bloque completo
    gsap.fromTo(
      sectionRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animación palabra por palabra
    const words = textRef.current.querySelectorAll("span");

    setTimeout(() => {
      gsap.fromTo(
        words,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, 1000);
  }, []);

  // Texto original
  const paragraph =
    "Soy un desarrollador web apasionado por crear interfaces modernas, animadas y atractivas. Me especializo en tecnologías como ReactJS, TailwindCSS, GSAP y Three.js para llevar las ideas a la realidad.";

  // Lo convertimos en spans
  const wrappedWords = paragraph.split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0 mr-[5px]">
      {word}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="about"
      className="max-w-5xl mx-auto px-4 py-20 text-center scroll-mt-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Sobre <span className="text-cyan-400">mí</span>
      </h2>
      <p
        ref={textRef}
        className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
      >
        {wrappedWords}
      </p>
    </section>
  );
}

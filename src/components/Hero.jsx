import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Beams from '../utils/Beams';

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-title", {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".hero-btn",
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.4"
        );

      gsap.to(imgRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const heightBeams = isMobile ? '1000px': '1200px';
    const widthBeams = isMobile ? '800px': '1600px';
  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-12 text-white bg-black overflow-hidden relative"
      style={{boxShadow: 'inset 0px 10px 30px black'}}
    >
      <div style={{ width: widthBeams, height: heightBeams, position: "absolute" }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.5}
          scale={0.2}
          rotation={45}
        />
      </div>
      {/* FONDO ILUMINADO <div className="absolute -top-64 left-[-200px] w-full md:w-[600px] h-[600px] rounded-full bg-white blur-3xl opacity-10 animate-light-pulse pointer-events-none z-0" />*/}
      
      {/* ILUSTRACIÓN */}
      <div className="flex justify-center mb-6 lg:mb-0 lg:flex-1 z-10">
        <img
          ref={imgRef}
          src="/heroIcon.webp"
          alt="Ilustración desarrollador"
          className="w-[200px] md:w-[380px] lg:w-[420px] h-auto pointer-events-none select-none"
        />
      </div>
      {/* TEXTOS */}
      <div className="lg:flex-1 text-center lg:text-left z-10">
        <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">
          Hola, soy <span className="text-cyan-400">Abel Martínez</span>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl max-w-xl mb-6 text-gray-300 mx-auto lg:mx-0">
          Desarrollador web especializado en crear experiencias modernas,
          intuitivas y dinámicas con React, Tailwind y GSAP.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <a
            href="#projects"
            className="hero-btn bg-cyan-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 transition"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="hero-btn border border-white/20 px-6 py-2 rounded-full text-white hover:border-cyan-400 transition"
          >
            Contacto
          </a>
        </div>
      </div>
      <div className="absolute w-[100%] h-[200px] bottom-0 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

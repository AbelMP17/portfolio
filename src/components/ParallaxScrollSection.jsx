import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGreensock } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

function LandModel({ rotationY, isMobile }) {
  const { scene } = useGLTF("object.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = rotationY.current;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={isMobile ? 0.6 : 1}
      rotation={[1, 1, 0]}
    />
  );
}

export default function ParallaxScrollSection() {
  const wrapperRef = useRef();
  const wrapperRef2 = useRef();
  const maskRef = useRef();
  const baseRef = useRef();
  const bubleRef = useRef();
  const bubleRef2 = useRef();
  const bubleRef3 = useRef();
  const textRef = useRef();
  const gsapRef = useRef();
  const rotationY = useRef(Math.PI / 4);
  const textRef2 = useRef();

  // Detectamos si es móvil
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let trigger;

    const ctx = gsap.context(() => {
      // Rotación del objeto 3D
      trigger = ScrollTrigger.create({
        trigger: wrapperRef2.current,
        start: "top 60%",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(rotationY, {
            current: Math.PI / 4 + progress * Math.PI * 2,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      // Movimiento del círculo negro (máscara)
      const xMove = isMobile ? 0 : 200;
      const yMove = isMobile ? 300 : -200;

      gsap.fromTo(
        maskRef.current,
        { x: 0, y: 0 },
        {
          x: xMove,
          y: yMove,
          scale: 0.8,
          filter: "drop-shadow(0px 0px 30px white)",
          background: "#fff",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "bottom top",
            scrub: true,
          },
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        gsapRef.current,
        { opacity: 0, y: 200 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "bottom top",
            scrub: true,
          },
          ease: "power2.out",
        }
      );

      // Sombra interna del círculo base
      gsap.fromTo(
        baseRef.current,
        { boxShadow: "inset 5px 5px 40px white" },
        {
          boxShadow: "inset -5px 5px 20px white",
          border: "10px",
          borderColor: "#22d3ee",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "bottom top",
            scrub: true,
          },
          ease: "power2.out",
        }
      );

      // Burbuja animada con opacidad
      const bubleAnimations = [
        {
          ref: bubleRef,
          x: isMobile ? -80 : -200,
          y: isMobile ? -200 : 200,
          scale: isMobile ? 0.4 : 0.6,
        },
        {
          ref: bubleRef2,
          x: isMobile ? 100 : -200,
          y: isMobile ? -300 : -50,
          scale: isMobile ? 0.2 : 0.2,
        },
        {
          ref: bubleRef3,
          x: isMobile ? 80 : -100,
          y: isMobile ? -200 : 200,
          scale: isMobile ? 0.1 : 0.1,
        },
      ];

      // Burbuja: scroll-trigger animation (sobre wrapper)
      bubleAnimations.forEach(({ ref, x, y, scale }) => {
        gsap.fromTo(
          ref.current,
          { x: 0, y: 0, scale: 1, autoAlpha: 0 },
          {
            x,
            y,
            scale,
            autoAlpha: 1,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 60%",
              end: "bottom top",
              scrub: true,
            },
            ease: "power2.out",
          }
        );
      });

      // Flotación idle (sobre inner)
      gsap.utils.toArray(".inner-bubble").forEach((el, i) => {
        gsap.to(el, {
          y: `+=${10 + i * 5}`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 2 + i,
          delay: i * 0.3,
        });
      });

      // Texto dentro de la burbuja: movimiento + escala tipo “pulso”
      gsap.to(textRef.current, {
        y: "+=5",
        x: "+=3",
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.4,
      });

      // Parallax del texto al hacer scroll
      gsap.to(textRef.current, {
        y: "+=10",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        ease: "none",
      });
    }, wrapperRef);

    // Animación palabra por palabra
    const words = textRef.current.querySelectorAll("span");

    setTimeout(() => {
      gsap.fromTo(
        words,
        { y: 20 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef2.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, 1000);

    return () => {
      ctx.revert();
      if (trigger) trigger.kill();
    };
  }, [isMobile]);

  const paragraph = "Interazción con objetos 3D";

  // Lo convertimos en spans
  const wrappedWords = paragraph.split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0 mr-[5px]">
      {word}
    </span>
  ));

  return (
    <div className="flex flex-col md:flex-row h-[300vh]">
      {/* IZQUIERDA / ARRIBA EN MÓVIL */}
      <div ref={wrapperRef} className="relative w-full md:w-1/2 h-full">
        <div className="sticky top-0 h-screen flex justify-center items-center px-4">
          <div className="relative w-[300px] h-[300px]">
            {/* Círculo base con texto */}
            <div
              ref={baseRef}
              className="absolute flex justify-center items-center inset-0 rounded-full bg-cyan-400/60 z-10 inner-bubble
               text-center p-4"
            >
              <p
                ref={textRef}
                className="uppercase font-bold leading-tight text-xl p-20"
                style={{ textShadow: "-2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Animaciones con <span className="text-cyan-400">GSAP</span>
              </p>
            </div>
            <div
              ref={bubleRef}
              className="absolute w-full h-full z-0 overflow-visible"
            >
              <div
                className="rounded-full bg-cyan-400/50 w-full h-full p-[140px] md:p-[155px] inner-bubble backdrop-blur-sm"
                style={{ boxShadow: "inset -5px 5px 20px white" }}
              />
            </div>

            <div
              ref={bubleRef2}
              className="absolute w-full h-full z-0 overflow-visible"
            >
              <div
                className="rounded-full bg-cyan-400/50 w-full h-full p-[140px] md:p-[155px] inner-bubble backdrop-blur"
                style={{ boxShadow: "inset -5px 5px 20px white" }}
              />
            </div>

            <div
              ref={bubleRef3}
              className="absolute w-full h-full z-0 overflow-visible"
            >
              <div
                className="rounded-full bg-cyan-400/50 w-full h-full p-[140px] md:p-[155px] inner-bubble backdrop-blur-sm"
                style={{ boxShadow: "inset -5px 5px 20px white" }}
              />
            </div>

            {/* Círculo negro que se desplaza */}
            <div
              ref={maskRef}
              className="absolute overflow-hidden flex justify-center items-center -top-1 -left-1 w-full h-full rounded-full bg-black z-20"
            >
              <SiGreensock
                className="text-green-500 text-[200px]"
                ref={gsapRef}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DERECHA / ABAJO EN MÓVIL */}
      <div className="relative w-full md:w-1/2 h-full">
        {/* Canvas sticky */}
        <div
          ref={wrapperRef2}
          className="sticky top-0 h-screen flex items-center justify-center flex-col pt-20 md:pt-40 z-0"
        >
          <Canvas
            dpr={[1, 1.5]}
            style={{ touchAction: "none", pointerEvents: "none", zIndex: 20 }}
            camera={{ position: [0, -6, 10], fov: 1 }}
          >
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            <directionalLight position={[-10, 0, 0]} intensity={1} />
            <LandModel rotationY={rotationY} isMobile={isMobile} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
          <p
            ref={textRef2}
            className="relative text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto text-center z-40"
          >
            {wrappedWords}
          </p>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("object.glb");

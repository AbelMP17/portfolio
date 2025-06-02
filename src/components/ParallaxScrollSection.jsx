import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiThreedotjs } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

function ShoeModel({ rotationY, isMobile }) {
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
  const tjsRef = useRef();
  const rotationY = useRef(Math.PI / 4);

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
        tjsRef.current,
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
          scale: isMobile ? 0.1 : 0.2,
        },
      ];

      bubleAnimations.forEach(({ ref, x, y, scale }) => {
        gsap.fromTo(
          ref.current,
          { x: 0, y: 0, scale: 1, autoAlpha: 0 },
          {
            x,
            y,
            scale,
            autoAlpha: 1,
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
      });

      // Animación flotante en bucle
      // Animación flotante en burbujas + base
      [bubleRef, bubleRef2, bubleRef3, baseRef].forEach((ref, i) => {
        gsap.to(ref.current, {
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

    return () => {
      ctx.revert();
      if (trigger) trigger.kill();
    };
  }, [isMobile]);

  return (
    <div className="flex flex-col md:flex-row h-[300vh]">
      {/* IZQUIERDA / ARRIBA EN MÓVIL */}
      <div ref={wrapperRef} className="relative w-full md:w-1/2 h-full">
        <div className="sticky top-0 h-screen flex justify-center items-center px-4">
          <div className="relative w-[300px] h-[300px]">
            {/* Círculo base con texto */}
            <div
              ref={baseRef}
              className="absolute flex justify-center items-center inset-0 rounded-full bg-cyan-400/60 z-10
               text-center p-4"
            >
              <p
                ref={textRef}
                className="uppercase font-bold leading-tight text-xl"
                style={{ textShadow: "-2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Manipulación de objetos 3D
              </p>
            </div>
            <div
              ref={bubleRef}
              className="absolute -top-1 -left-1 w-full h-full rounded-full bg-cyan-400/50 z-0 p-[140px] md:p-[155px]"
            ></div>

            <div
              ref={bubleRef2}
              className="absolute -top-1 -left-1 w-full h-full rounded-full bg-cyan-400/30 z-0 p-[100px] md:p-[120px]"
            ></div>

            <div
              ref={bubleRef3}
              className="absolute -top-1 -left-1 w-full h-full rounded-full bg-cyan-400/30 z-0 p-[100px] md:p-[120px]"
            ></div>

            {/* Círculo negro que se desplaza */}
            <div
              ref={maskRef}
              className="absolute overflow-hidden flex justify-center items-center -top-1 -left-1 w-full h-full rounded-full bg-black z-20"
            >
              <SiThreedotjs
                ref={tjsRef}
                className="text-black text-[200px] ml-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DERECHA / ABAJO EN MÓVIL */}
      <div className="relative w-full md:w-1/2 h-full">
        <div
          ref={wrapperRef2}
          className="sticky top-0 h-screen flex items-center justify-center pt-20 md:pt-40"
        >
          <Canvas
            dpr={[1, 1.5]} // mínimo 1, máximo 1.5
            style={{ touchAction: "none", pointerEvents: "none" }}
            camera={{ position: [0, -6, 10], fov: 1 }}
          >
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            <directionalLight position={[-10, 0, 0]} intensity={1} />
            <ShoeModel rotationY={rotationY} isMobile={isMobile} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("object.glb");

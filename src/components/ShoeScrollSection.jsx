import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function ShoeScrollSection() {
  const wrapperRef = useRef();
  const wrapperRef2 = useRef();
  const maskRef = useRef();
  const baseRef = useRef();
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

      // Movimiento del círculo negro
      const xMove = isMobile ? 0 : 200;
      const yMove = isMobile ? 300 : -200;

      gsap.fromTo(
        maskRef.current,
        { x: 0, y: 0 },
        {
          x: xMove,
          y: yMove,
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

      // Sombra interna del círculo base
      gsap.fromTo(
        baseRef.current,
        { boxShadow: "inset 5px 5px 40px black" },
        {
          boxShadow: "inset -5px 5px 20px black",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "bottom top",
            scrub: true,
          },
          ease: "power2.out",
        }
      );
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
              className="absolute flex justify-center items-center inset-0 rounded-full bg-gray-400 z-0 text-center p-4"
            >
              <p className="uppercase font-bold text-sm leading-tight" style={{ textShadow: "-2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                Manipulación de objetos 3D
              </p>
            </div>

            {/* Círculo negro que se desplaza */}
            <div
              ref={maskRef}
              className="absolute -top-1 -left-1 w-full h-full rounded-full bg-black z-10 p-[155px]"
            ></div>
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
          camera={{ position: [0, -6, 10], fov: 1 }}>
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

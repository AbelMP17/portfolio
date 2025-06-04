import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MetaBalls from "../utils/MetaBalls";


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
  const baseRef = useRef();
  const textRef = useRef();
  const gsapRef = useRef();
  const textRef2 = useRef();
  const canvasRef = useRef();
  const rotationY = useRef(Math.PI / 4);

  const [isMobile, setIsMobile] = useState(false);

  const paragraph = "Interacción con objetos 3D";

  const wrappedWords = paragraph.split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0 mr-[5px]">
      {word}
    </span>
  ));

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

      gsap.to(".inner-bubble", {
        y: `+=${10 * 5}`,
        boxShadow: "inset 5px -5px 40px white",
        borderTopWidth: "0px",
        borderRightWidth: "2px",
        borderBottomWidth: "2px",
        borderLeftWidth: "2px",
        borderColor: "white",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2,
        delay: 0.3,
      });

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

      // Animación del texto debajo del canvas
      gsap.fromTo(
        textRef2.current,
        { y: 0, boxShadow: "0px 0px 0px #22d3ee", borderWidth: "0px" },
        {
          y: -50,
          borderTopWidth: "0px",
          borderRightWidth: "2px",
          borderBottomWidth: "2px",
          borderLeftWidth: "2px",
          borderColor: "white",
          boxShadow: "0px 5px 15px #22d3ee",
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const wordSpans = textRef2.current.querySelectorAll("span");

      gsap.fromTo(
        wordSpans,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef2.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, wrapperRef);

    return () => {
      ctx.revert();
      if (trigger) trigger.kill();
    };
  }, [isMobile]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* IZQUIERDA */}
      <div ref={wrapperRef} className="relative w-full md:w-1/2 h-[300vh]">
        <div className="sticky top-0 h-screen flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center h-full pointer-events-none md:pointer-events-auto overflow-hidden">
            <div
              className="absolute top-20 w-[400px] m-auto rounded-full rounded-t-none flex justify-center items-center z-50 pointer-events-none"
              style={{ boxShadow: "0px 45px 25px white" }}
            >
              <div
                className="p-1 bg-white border-t-[5px] border-[#666] w-[300px] rounded-full"
                style={{ boxShadow: "0px 25px 30px white" }}
              />
            </div>
            <div
              ref={baseRef}
              className="absolute flex justify-center items-center inset-0 m-auto rounded-full bg-black/80 backdrop-blur-[3px] z-10 inner-bubble text-center p-4 w-[300px] h-[300px] pointer-events-none"
            >
              <p
                ref={textRef}
                className="uppercase font-bold leading-tight text-xl p-20"
                style={{ textShadow: "-2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Animaciones con <b className="text-cyan-400">GSAP</b>
              </p>
            </div>
            <MetaBalls
              color="#ffffff"
              cursorBallColor="#ffffff"
              cursorBallSize={2}
              ballCount={15}
              animationSize={30}
              enableMouseInteraction={true}
              enableTransparency={true}
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
            />
            <div
              className="absolute bottom-20 w-[400px] m-auto rounded-full rounded-b-none flex justify-center items-center z-50 pointer-events-none"
              style={{ boxShadow: "0px -45px 25px white" }}
            >
              <div
                className="p-1 bg-white border-b-[5px] border-[#666] w-[300px] rounded-full"
                style={{ boxShadow: "0px -25px 30px white" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DERECHA */}
      <div
        ref={wrapperRef2}
        className="relative w-full md:w-1/2 flex flex-col gap-40 items-center justify-start h-[300vh] pt-40"
      >
        <div className="sticky top-32 w-[80%] flex flex-col gap-5 rounded-xl h-[100vh]">
          <div
          ref={canvasRef}
            className="relative w-full h-[60vh] flex items-center justify-center bg-cyan-400 rounded-xl border-2 border-t-0 overflow-hidden"
            
          >
            <img
              src="cloud.png"
              alt="nube"
              className="absolute top-10 left-[-150px] w-40 cloud-animation cloud-slow z-30"
            />
            <img
              src="cloudv2.png"
              alt="nube"
              className="absolute top-[60%] left-[-200px] w-56 opacity-80 cloud-animation cloud-medium z-30"
            />
            <img
              src="cloud.png"
              alt="nube"
              className="absolute top-[30%] left-[-180px] w-48 opacity-60 cloud-animation cloud-fast"
            />
            <img
              src="cloudv2.png"
              alt="nube"
              className="absolute top-[40%] left-[-100px] w-56 opacity-50 cloud-animation cloud-medium"
            />
            <img
              src="cloud.png"
              alt="nube"
              className="absolute top-[50%] left-[-120px] w-48 opacity-60 cloud-animation cloud-fast z-30"
            />

            <Canvas
              dpr={[1, 1.5]}
              style={{ touchAction: "none", pointerEvents: "none", zIndex: 10 }}
              camera={{ position: [0, -6, 10], fov: 1 }}
            >
              <ambientLight intensity={0.5} />
              <Environment preset="city" />
              <directionalLight position={[0, 0, 0]} intensity={1} />
              <LandModel rotationY={rotationY} isMobile={isMobile} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </Canvas>
          </div>

          <p
            ref={textRef2}
            className="text-gray-300 text-lg leading-relaxed mx-auto text-center bg-black p-8 rounded-lg border-t-0 border-solid border-cyan-400"
          >
            {wrappedWords}
          </p>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("object.glb");

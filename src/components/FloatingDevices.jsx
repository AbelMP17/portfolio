import { useEffect, useRef } from "react";
import gsap from "gsap";
import Tilt from "react-parallax-tilt";

export default function FloatingDevices() {
  const floatRefs = useRef([]);

  useEffect(() => {
    floatRefs.current.forEach((ref, i) => {
      if (!ref) return;
      gsap.to(ref, {
        y: 10,
        duration: 2 + (i % 4) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: i * 0.2,
      });
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !floatRefs.current.includes(el)) {
      floatRefs.current.push(el);
    }
  };

  return (
    <section className="py-24 bg-[#1e1e1e] text-white px-4 border-y border-gray-700">
      <div className="w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* TEXT */}
        <div className="flex flex-col items-center md:items-end justify-center space-y-10 text-center lg:text-left">
          <div className="rounded-xl border border-white/20 px-6 py-4 shadow-xl bg-black/30 backdrop-blur">
            <p className="font-mono text-lg leading-relaxed">
              Making a <span className="text-purple-400 font-bold">BETTER</span>{" "}
              <span className="text-yellow-200 font-bold">USER EXPERIENCE</span>
              <br />
              With a{" "}
              <span className="text-purple-400 font-bold">
                INTUITIVE & MINIMALIST
              </span>{" "}
              <span className="text-yellow-200 font-bold">USER INTERFACE</span>
            </p>
          </div>
          <div className="rounded-full border border-white/20 px-6 py-3 shadow-xl bg-black/30 backdrop-blur inline-block">
            <p className="font-mono text-lg">
              FOR <span className="text-purple-400 font-bold">BIG</span> &{" "}
              <span className="text-yellow-200 font-bold">SMALL</span> DEVICES
            </p>
          </div>
        </div>

        {/* DEVICES */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-5">
          {/* MOBILE DEVICE */}
          <Tilt
            glareEnable
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glareBorderRadius="20px" // no hace efecto real
            tiltReverse="true"
            style={{
              borderRadius: "10px", // 🔥 esto sí funciona
              overflow: "hidden", // 🔥 fuerza el glare a quedarse dentro
            }}
          >
            <div className="w-[180px] h-[360px] bg-blue-950 rounded-[10px] shadow-xl p-3 flex flex-col gap-2 border border-blue-900">
              <div
                ref={addToRefs}
                className="w-full h-6 rounded-md bg-blue-300/40 shadow-md"
              />
              <div
                ref={addToRefs}
                className="w-full h-14 rounded-md bg-blue-400/40 shadow-md"
              />
              <div className="flex gap-2 w-full h-24">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`mobile-card-${i}`}
                    ref={addToRefs}
                    className="flex-1 rounded-md bg-blue-500/40 shadow-md"
                  />
                ))}
              </div>
              <div className="flex gap-2 w-full">
                <div
                  ref={addToRefs}
                  className="flex-1 h-10 rounded-md bg-blue-400/40 shadow-md"
                />
                <div
                  ref={addToRefs}
                  className="flex-1 h-10 rounded-md bg-blue-400/40 shadow-md"
                />
              </div>
              <div
                ref={addToRefs}
                className="w-full h-10 rounded-md bg-blue-300/40 shadow-md"
              />
              <div
                ref={addToRefs}
                className="w-full h-10 rounded-md bg-blue-200/40 shadow-md"
              />
            </div>
          </Tilt>

          {/* DESKTOP DEVICE */}
          <Tilt
            glareEnable
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glareBorderRadius="20px" // no hace efecto real
            tiltReverse="true"
            style={{
              borderRadius: "10px", // 🔥 esto sí funciona
              overflow: "hidden", // 🔥 fuerza el glare a quedarse dentro
            }}
          >
            <div className="w-[360px] md:w-[380px] h-[280px] bg-blue-950 rounded-[10px] shadow-xl p-4 flex flex-col gap-3 border border-blue-900">
              <div
                ref={addToRefs}
                className="w-full h-8 rounded-md bg-purple-300/40 shadow-md"
              />
              <div
                ref={addToRefs}
                className="w-full h-12 rounded-md bg-blue-400/40 shadow-md"
              />
              <div className="flex gap-3 w-full h-20">
                <div
                  ref={addToRefs}
                  className="flex-1 rounded-md bg-blue-500/40 shadow-md"
                />
                <div
                  ref={addToRefs}
                  className="flex-1 rounded-md bg-blue-500/40 shadow-md"
                />
              </div>
              <div className="flex gap-3 w-full">
                <div
                  ref={addToRefs}
                  className="flex-1 h-8 rounded-md bg-blue-300/40 shadow-md"
                />
                <div
                  ref={addToRefs}
                  className="w-[30%] h-8 rounded-md bg-blue-200/40 shadow-md"
                />
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

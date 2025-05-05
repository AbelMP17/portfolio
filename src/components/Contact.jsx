import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="max-w-3xl mx-auto px-4 py-20 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-cyan-400">Contáctame</span>
      </h2>

      <form
        action="https://formsubmit.co/abelmp890@gmail.com"
        method="POST"
        className="space-y-8"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://devabel.vercel.app/gracias" />

        {/* Nombre */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder=" "
            required
            className="peer w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:border-cyan-400"
          />
          <label
            className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-cyan-400 bg-black px-1"
          >
            Nombre
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder=" "
            required
            className="peer w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:border-cyan-400"
          />
          <label
            className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-cyan-400 bg-black px-1"
          >
            Email
          </label>
        </div>

        {/* Mensaje */}
        <div className="relative">
          <textarea
            name="message"
            placeholder=" "
            required
            rows="5"
            className="peer w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:border-cyan-400 resize-none"
          ></textarea>
          <label
            className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-cyan-400 bg-black px-1"
          >
            Mensaje
          </label>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-full font-semibold transition"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
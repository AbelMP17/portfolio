import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    const form = sectionRef.current.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");

    const validateForm = () => {
      const isValid = Array.from(inputs).every((input) => input.checkValidity());
      setIsFormValid(isValid);
    };

    inputs.forEach((input) => {
      const toggleFilled = () => {
        input.classList.toggle("filled", input.value.trim() !== "");
      };
      const markTouched = () => {
        input.classList.add("touched");
        toggleFilled();
        validateForm();
      };
      toggleFilled();
      input.addEventListener("input", toggleFilled);
      input.addEventListener("input", validateForm);
      input.addEventListener("blur", markTouched);
    });
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
        className="space-y-8 relative"
        noValidate
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
            className="floating-input peer w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:border-cyan-400"
          />
          <label className="floating-label">Nombre</label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder=" "
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            className="floating-input peer w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:border-cyan-400"
          />
          <label className="floating-label">Email</label>
        </div>

        {/* Mensaje */}
        <div className="relative">
          <textarea
            name="message"
            placeholder=" "
            required
            rows="5"
            className="floating-input peer w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:border-cyan-400 resize-none"
          ></textarea>
          <label className="floating-label">Mensaje</label>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-6 py-2 rounded-full font-semibold transition text-black ${
            isFormValid ? "bg-cyan-500 hover:bg-cyan-400" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

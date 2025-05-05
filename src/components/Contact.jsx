import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="max-w-3xl mx-auto px-4 py-20 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-cyan-400">Contáctame</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nombre */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder=" "
            required
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.message}
            onChange={handleChange}
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

        {submitted && (
          <p className="text-green-400 font-medium pt-4">Gracias, tu mensaje ha sido enviado.</p>
        )}
      </form>
    </section>
  );
}
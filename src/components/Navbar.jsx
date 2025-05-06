import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileMenuRef = useRef();
  const indicatorRef = useRef(null);
  const glowRef = useRef(null);
  const linkRefs = useRef([]);

  const navLinks = [
    { to: "#hero", label: "Inicio" },
    { to: "#about", label: "Sobre mí" },
    { to: "#skills", label: "Habilidades" },
    { to: "#projects", label: "Proyectos" },
    { to: "#experience", label: "Experiencia" },
    { to: "#contact", label: "Contacto" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = navLinks.map((link) => document.querySelector(link.to));
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const index = sections.findIndex((sec, i) => {
        const next = sections[i + 1];
        return sec && scrollPos >= sec.offsetTop && (!next || scrollPos < next.offsetTop);
      });
      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [navLinks, activeIndex]);

  useEffect(() => {
    const activeLink = linkRefs.current[activeIndex];
    if (activeLink && indicatorRef.current && glowRef.current) {
      const left = activeLink.offsetLeft - 24.5;
      const width = activeLink.offsetWidth;
      indicatorRef.current.style.opacity = "1";
      indicatorRef.current.style.left = `${left}px`;
      indicatorRef.current.style.width = `${width}px`;
      glowRef.current.style.opacity = "0.7";
      glowRef.current.style.left = `${left + width / 2 - 50}px`;
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 px-4 py-1 md:py-4 md:px-8 backdrop-blur-md border-b border-white/10 ${
        scrolled ? "bg-black/70 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#hero" className="text-cyan-400 font-bold text-xl">
          DevAbel
        </a>

        <div className="relative hidden md:flex space-x-6">
          {navLinks.map((link, i) => (
            <a
              key={link.to}
              href={link.to}
              ref={(el) => (linkRefs.current[i] = el)}
              className="text-white hover:text-cyan-400 transition relative z-10"
            >
              {link.label}
            </a>
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-cyan-400 transition-all duration-300 z-10 rounded-full"
            style={{ opacity: 0 }}
          />
          <div
            ref={glowRef}
            className="absolute -bottom-2 w-[100px] h-[20px] rounded-full bg-cyan-400 blur-2xl opacity-0 transition-all duration-500 z-0 pointer-events-none"
          />
        </div>

        <div className="md:hidden text-white">
          <button className="pt-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={`md:hidden bg-black/80 backdrop-blur-md rounded-lg mt-2 transform transition-all duration-300 text-center ease-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-cyan-400 transition border-b border-white/10 last:border-b-0 py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
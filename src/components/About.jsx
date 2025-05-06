import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="max-w-5xl mx-auto px-4 py-20 text-center scroll-mt-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Sobre <span className="text-cyan-400">mí</span>
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
        Soy un desarrollador web apasionado por crear interfaces modernas,
        animadas y atractivas. Me especializo en tecnologías como ReactJS,
        TailwindCSS, GSAP y Three.js para llevar las ideas al siguiente nivel.
      </p>
    </section>
  )
}

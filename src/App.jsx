import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import FloatingDevices from './components/FloatingDevices'
import Experience from './components/Experience'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <About />
        <FloatingDevices />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

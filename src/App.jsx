import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gracias from "./pages/Gracias.jsx";
import SkillsCanicas2D from "./components/SkillsCanicas2D.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ShoeScrollSection from "./components/ShoeScrollSection.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <SkillsSection />
              <ShoeScrollSection />
              <Projects />
              <Experience />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/gracias" element={<Gracias />} />
      </Routes>
    </Router>
  );
}

export default App;

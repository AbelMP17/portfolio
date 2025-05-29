import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Abel Martínez</h3>
          <p className="text-sm text-gray-400">
            &copy; {year} Todos los derechos reservados.
          </p>
        </div>

        {/* Social links */}
        <div className="flex space-x-6 text-gray-400">
          <a
            href="https://github.com/AbelMP17"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/abel-mart%C3%ADnez-peinado-868436259/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:abelmp890@gmail.com"
            className="hover:text-white transition"
            aria-label="Email"
          >
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
}

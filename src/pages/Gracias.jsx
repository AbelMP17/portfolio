import { Link } from 'react-router-dom'

export default function Gracias() {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 text-white bg-black text-center">
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">Gracias por tu mensaje</h1>
          <p className="text-lg text-gray-300">
            Me pondré en contacto contigo lo antes posible. Mientras tanto, puedes seguir navegando por el portfolio o volver al inicio.
          </p>
          <Link
            to="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2 rounded-full transition"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }
  
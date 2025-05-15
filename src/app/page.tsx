/* Esto es para utilizar hooks como useState o eventos de navegador.
Sin esto next.js los trata como codigo de servidor y fallaria */
"use client";

/* Link es un componente especial de Next.js para la navegacion sin recarga de pagina */
import Link from "next/link";

/* Aqui se declara el comonente principal de la pagina Home */
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold">🏆 DeportApp</h1>
        <p className="text-lg">
          Conecta con personas que aman el deporte. Encuentra compañeros, reserva canchas y entrena sin límites.
        </p>

        <div className="flex flex-col gap-4">
            <Link href="/login">
              <button className="w-full bg-white text-blue-700 font-semibold py-2 rounded hover:bg-gray-100 transition">
                Iniciar Sesión
              </button>
            </Link>

            <Link href="/register">
              <button className="w-full border border-white py-2 rounded hover:bg-white hover:text-blue-700 transition">
                Registrarse
              </button>
            </Link>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const balls = [
  { emoji: "⚽️", name: "Fútbol" },
  { emoji: "🏀", name: "Baloncesto" },
  { emoji: "🏈", name: "Fútbol Americano" },
  { emoji: "🎾", name: "Tenis" },
  { emoji: "🏐", name: "Vóleibol" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si no hay token, redirige a login
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });


        // Si la respuesta no es ok, redirige a login
        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error al cargar perfil", err);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

    // Cuando el usuario selecciona archivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);

        // Crear URL para preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    };

    // Limpiar URL cuando cambia el archivo para evitar leaks de memoria
    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
  }, [previewUrl]);

    const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex space-x-6 mb-8">
          {balls.map((ball, idx) => (
            <span
              key={idx}
              className="text-5xl inline-block animate-bounce-ball"
              style={{ animationDelay: `${idx * 0.3}s` }}
              title={ball.name}
            >
              {ball.emoji}
            </span>
          ))}
        </div>
        <p className="text-lg text-gray-600">Cargando perfil...</p>
          
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-12">
      <h1 className="text-3xl font-bold mb-4">
        ¡Bienvenido, {user?.username || user?.name || "Usuario" }!
      </h1>
      <p className="text-gray-700 mb-6">
        Tu correo: <span className="font-mono">{user?.email || "No diponible"}</span>
      </p>

      {/* Sección para subir imagen de perfil */}
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Actualizar Imagen de Perfil</h2>

        <div className="mb-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview de imagen seleccionada"
              className="w-32 h-32 object-cover rounded-full border"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              Sin imagen
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block mb-2"
        />

        {/* Por ahora, solo mostramos la imagen. El botón de subir no hace nada */}
        <button
          disabled={!selectedFile}
          className={`px-4 py-2 rounded text-white transition ${
            selectedFile ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => alert("Aquí enviarías la imagen al backend")}
        >
          Subir Imagen
        </button>
      </section>


      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">⚡ Sugerencias Deportivas ⚡</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            ⚽️ Participa en el torneo local de fútbol este fin de semana.
          </li>
          <li className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            🎾 Únete a la clase de tenis para principiantes los martes por la tarde.
          </li>
          <li className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            🏀 Prueba el nuevo gimnasio de baloncesto cerca de ti.
          </li>
        </ul>
      </section>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded transition"
      >
        Cerrar sesión
      </button>

    </div>

  );
}


// Este componente es un ejemplo básico de cómo manejar la autenticación y el perfil del usuario.
// Puedes expandirlo según tus necesidades. 
// Asegúrate de manejar los errores y la seguridad adecuadamente en una aplicación real.
// Recuerda que este es un ejemplo básico y no incluye manejo de errores ni validaciones.
// En una aplicación real, deberías manejar los errores y las validaciones adecuadamente.
// Además, asegúrate de que la API esté protegida y que los tokens se manejen de forma segura.
// También puedes considerar usar una librería de gestión de estado como Redux o Context API para manejar el estado del usuario en toda la aplicación.
// Si decides usar Redux o Context API, puedes almacenar el usuario en el estado global y acceder a él desde cualquier componente de tu aplicación.
// También puedes considerar usar una librería de enrutamiento como React Router para manejar la navegación en tu aplicación.




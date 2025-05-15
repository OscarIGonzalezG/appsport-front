/* Esto es para utilizar hooks como useState o eventos de navegador.
Sin esto next.js los trata como codigo de servidor y fallaria */
"use client";

/* Link es un componente especial de Next.js para la navegacion sin recarga de pagina */
/* el useState es un hook de react para manejar los estados, osea los valores de los inputs*/

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

            setLoading(true);// <-- inicia carga

            // Limpiar errores anteriores
            setEmailError("");
            setPasswordError("");
            setGeneralError("");

            // Validación básica de correo
            if (!email.includes("@")) {
                setEmailError("El correo electrónico no es válido");
                return; 
            }

            
            try {
                // Simular retardo artificial de 1.5 segundos
                await new Promise((resolve) => setTimeout(resolve, 1500));
                
                
                const res = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (res.ok) {

                    // Guardar el token en localStorage
                    localStorage.setItem("token", data.token);
                    
                    // Redirigir al perfil
                    router.push("/dashboard");
                    
                    } else {
                        if (data.field === "email") setEmailError(data.message);
                        else if (data.field === "password") setPasswordError(data.message);
                        else setGeneralError(data.message || "Credenciales incorrectas");
                    }    
                    
                } catch (error) {
                    console.error("Error al iniciar sesión:", error);
                    setGeneralError("Ocurrió un error al conectarse al servidor");
                }finally {
                    setLoading(false); // <-- termina carga
                }
    };
    

    return(
        <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                
                {loading && (
                    <div className="flex justify-center items-center space-x-3 mb-4">
                        {["⚽", "🏀", "🏈", "🎾", "🏐"].map((ball, i) => (
                        <span
                            key={i}
                            className="text-2xl animate-bounce-ball"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            {ball}
                        </span>
                        ))}
                    </div>
                )}

                <h2 className="text-2x1 font-bold text-center mb-6">Iniciar sesión</h2>

                {generalError && (
                  <p className="text-red-600 text-sm text-center mb-4">{generalError}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"    
                        />
                        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded-lg transition ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                        }`}
                    >
                          {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        ) : null}
                            {loading ? "Ingresando..." : "Iniciar Sesión"}

                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </main>
    );

}
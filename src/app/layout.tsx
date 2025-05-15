/* se importa los estilos*/
import "./globals.css";

/* Aqui muestran los datos del titulo y de lo que se trata la app, los metadatos.*/
export const metadata = {
  title: "DeportApp",
  description: "Conecta personas que practican deportes",
};

/* El parametro children es el contenido de cada pagina  como /login/page.tsx o /register/page.tsx */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  /* Aqui van cosas globales como fuentes. clases de tailwind un navbar o footer que se repitan en todas las paginas. */
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
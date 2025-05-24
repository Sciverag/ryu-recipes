import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ryu Recipes',
  description: 'Página de recetas y dietas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="cozytheme" lang="es">
      <body className="bg-base-100 text-primary">
        {children}
        <ul className="circles">
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
          <li>
            <div></div>
            <p></p>
          </li>
        </ul>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { AuthProvider } from '../context/AuthContext';

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
    <html lang="es">
      <body className="bg-base-100 text-primary">
        <AuthProvider>
          <Header />
        </AuthProvider>
        <AuthProvider>{children}</AuthProvider>
        <AuthProvider>
          <Footer></Footer>
        </AuthProvider>
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

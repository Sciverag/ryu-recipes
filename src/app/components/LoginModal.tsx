'use client';

import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-secondary shadow-xl p-6 w-[90%] max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5e4633] hover:text-[#a6714c]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-[#5e4633]">Inicia Sesión</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="p-2 rounded border border-[#d1bfa8] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-2 rounded border border-[#d1bfa8] focus:outline-none"
          />
          <button type="submit" className="btn btn-primary text-base">
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-[#5e4633] text-center">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="link">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}

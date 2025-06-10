'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';

export default function VerificacionCuenta() {
  const [estado, setEstado] = useState<'verificando' | 'exito' | 'error'>('verificando');
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setEstado('error');
      return;
    }

    const verificar = async () => {
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error('Falló verificación');
        setEstado('exito');
      } catch (err) {
        setEstado('error');
      }
    };

    verificar();
  }, [searchParams]);

  return (
    <main>
      <div className="flex flex-col items-center justify-center p-4 text-center bg-secondary">
        {estado === 'verificando' && (
          <p className="text-lg font-semibold">Verificando tu cuenta...</p>
        )}

        {estado === 'exito' && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-xl font-semibold">¡Cuenta verificada con éxito!</p>
          </div>
        )}

        {estado === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="w-12 h-12 text-red-500" />
            <p className="text-xl font-semibold text-red-600">Error al verificar la cuenta.</p>
          </div>
        )}
      </div>
    </main>
  );
}

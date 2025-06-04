'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', terms: false });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.terms) {
      setError('Completa todos los campos y acepta los términos.');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Error al registrar.');
    } else {
      alert('Cuenta creada 🎉');
      router.push('/');
    }
  };

  return (
    <main className="container md:max-w-3xl mx-auto mt-10 p-6 bg-secondary shadow-md">
      <h1 className="text-4xl font-cozy_title font-bold mb-8 text-center">Crear cuenta</h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre de usuario"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded border border-[#d1bfa8] focus:outline-none w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded border border-[#d1bfa8] focus:outline-none w-full"
          required
        />
        <input
          type="password"
          name="password"
          minLength={8}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="p-2 rounded border border-[#d1bfa8] focus:outline-none w-full"
          required
        />
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="checkbox border bg-[#fff2e2] mr-2"
          />
          <span className="label-text font-cozy_text text-secondary-content">
            Acepto los{' '}
            <Link href="/legal/terms" className="link" target="_blank">
              Términos de Uso
            </Link>{' '}
            y la{' '}
            <Link href="/legal/policy" className="link" target="_blank">
              Política de Privacidad
            </Link>
          </span>
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Registrarse
        </button>
      </form>
    </main>
  );
}

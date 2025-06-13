'use client';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './modify.css';
import AuthGuard from '@/app/components/AuthGuard';
import Link from 'next/link';
import { Check, Edit } from 'lucide-react';

export default function Modify() {
  const { user } = useAuth();
  const params = useParams();
  const id = params.id;
  const [infoUser, setInfoUser] = useState(user);
  const [email, setEmail] = useState(infoUser?.email);
  const [name, setName] = useState(infoUser?.name);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id === id) {
        try {
          const res = await fetch(`/api/user/${id}`);
          if (!res.ok) throw new Error('Usuario no encontrado');
          const data = await res.json();
          setInfoUser(data);
        } catch (err) {
          console.error(err);
          setInfoUser(null);
        }
      } else {
        router.back();
      }
    };

    fetchUser();
  }, [id, router, user]);

  const validate = () => {
    setError('');
    setEmailError(false);
    setNameError(false);

    if (name?.length === 0) {
      setError('El nombre es obligatorio');
      setNameError(true);
      return false;
    }

    if (email?.length === 0) {
      setError('El email es obligatorio');
      setEmailError(true);
      return false;
    }

    if (!email?.includes('@')) {
      setError('El formato del email es incorrecto');
      setEmailError(true);
      return false;
    }

    return true;
  };

  const uploadImage = () => {
    const imageImput = document.getElementById('imageImput');
    imageImput?.click();
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const maxsize = 2 * 1024 * 1024;

      if (image.size > maxsize) {
        setError('El tamaño de la imagen supera los 2MB');
        e.target.value = '';
      } else {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = reader.result as string;
          setInfoUser(prev => {
            if (!prev) return prev;

            return {
              ...prev,
              image: base64,
            };
          });
        };

        reader.readAsDataURL(image);
      }
    }
  };

  useEffect(() => {
    setIsValid(validate());
  }, [name, email]);

  const updateImage = async () => {
    setError('');
    const image = infoUser?.image;

    const res = await fetch(`/api/user/${id}/image`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ image }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Error al actualizar la imagen');
    } else {
      login(data.newtoken);
    }
  };

  const updateData = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ email, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Error al actualizar los datos');
    } else {
      alert('Datos actualizados correctamente');
      login(data.newtoken);
    }
  };

  return (
    <AuthGuard>
      <main className="flex flex-col md:flex-row bg-secondary container animate-fadeIn p-6 items-center justify-between">
        <div className="mx-auto">
          <Image
            src={infoUser?.image ?? '/images/default-user.jpg'}
            alt="Imagen de perfil"
            width={300}
            height={300}
            id="userImageUpdate"
            className="bg-secondary h-[200px] md:h-[300px] w-[200px] md:w-[300px]"
          ></Image>
          <div
            onClick={uploadImage}
            className="absolute transition-all opacity-0 cursor-pointer bg-[#0000004b] rounded-full top-6 h-[200px] md:h-[300px] w-[200px] md:w-[300px] flex justify-center items-center"
          >
            <Edit className="w-16 h-16 text-[#FDE3C0]"></Edit>
          </div>
          {user?.image !== infoUser?.image && (
            <button
              onClick={updateImage}
              className="relative btn-primary rounded-full p-2 md:p-3 left-[80px] bottom-[15px] md:left-[125px] md:bottom-[20px] animate-fadeIn"
            >
              <Check></Check>
            </button>
          )}
          <input
            id="imageImput"
            type="file"
            maxLength={10}
            accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
            className="hidden"
            onChange={changeImage}
          />
        </div>

        <form
          onSubmit={updateData}
          className="w-full md:w-1/2 flex flex-col mt-6 md:mt-0 mx-auto gap-4"
          action=""
        >
          <input
            type="text"
            value={name ?? ''}
            placeholder="Nombre de usuario"
            required
            name="name"
            className={`${nameError ? 'border-red-700 placeholder:text-red-700 text-red-700' : 'border-b-[#94764f] focus:border-b-[#7c5a2f]'} p-2 transition-all rounded border bg-[#FDE3C0] placeholder:text-[#94764f] border-[#d1bfa8] border-l-0 border-r-0 border-t-0 border-b-2 rounded-b-none focus:outline-none`}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            value={email ?? ''}
            placeholder="Correo electrónico"
            required
            name="email"
            className={`${emailError ? 'border-red-700 placeholder:text-red-700 text-red-700' : 'border-b-[#94764f] focus:border-b-[#7c5a2f]'} p-2 transition-all rounded border bg-[#FDE3C0] placeholder:text-[#94764f] border-[#d1bfa8] border-l-0 border-r-0 border-t-0 border-b-2 rounded-b-none focus:outline-none`}
            onChange={e => setEmail(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <button disabled={!isValid} type="submit" className="btn-primary p-2 w-full">
              Cambiar Datos
            </button>
            <Link className="w-full" href={`/profile/${id}/password`}>
              <button className="btn-primary p-2 w-full">Cambiar Contraseña</button>
            </Link>
          </div>

          {error && (
            <p className="animate-fadeIn text-red-700 font-cozy_text text-center md:text-left">
              {error}
            </p>
          )}
        </form>
      </main>
    </AuthGuard>
  );
}

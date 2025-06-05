'use client';
import Image from 'next/image';
import './profile.css';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { sendVerifyEmail } from '@/lib/emai';

export default function Perfil() {
  const { user } = useAuth();
  const params = useParams();
  const id = params.id;
  const [infoUser, setInfoUser] = useState(user);

  useEffect(() => {
    sendVerifyEmail('samuelciga2004@gmail.com', '1234');
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) throw new Error('Usuario no encontrado');
        const data = await res.json();
        setInfoUser(data);
      } catch (err) {
        console.error(err);
        setInfoUser(null);
      }
    };

    if (user?.id !== id) {
      fetchUser();
    }
  }, [id, user]);

  return (
    <main className="my-0 ">
      <section id="userBanner" className="w-screen"></section>
      <div id="userInfo" className="bg-secondary animate-fadeIn">
        <Image
          src={infoUser?.image ?? '/images/default-user.jpg'}
          alt="Imagen de perfil"
          width={300}
          height={300}
          id="userImage"
          className="bg-secondary md:ms-32"
        ></Image>
      </div>
    </main>
  );
}

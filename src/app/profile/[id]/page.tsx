'use client';
import Image from 'next/image';
import './profile.css';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarDays, Clock7Icon, PencilLine, Settings, StoreIcon } from 'lucide-react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AuthGuard from '@/app/components/AuthGuard';

export default function Perfil() {
  const { user } = useAuth();
  const params = useParams();
  const id = params.id;
  const [sameUser, setSameUser] = useState(false);
  const [infoUser, setInfoUser] = useState(user);
  const [createdAt, setCreated] = useState('- - -');
  const [updatedAt, setUpdated] = useState('- - -');
  const [selectedContent, setContent] = useState('recipes');
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/user/${id}/${selectedContent}`);
        if (!res.ok) throw new Error('El Usuario no tiene este contenido');
        const data = await res.json();
        setContentList(data);
      } catch (err) {
        console.error(err);
        setContentList([]);
      }
    };

    if (contentList.length === 0 && selectedContent !== 'settings') {
      fetchContent();
    }
  }, [selectedContent, contentList.length, id]);

  useEffect(() => {
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
    } else {
      setSameUser(true);
    }

    if (user?.createdAt) {
      const createdString = infoUser?.createdAt + '';
      const createdStringParts = createdString.substring(0, 10).split('-');
      setCreated(createdStringParts[2] + '/' + createdStringParts[1] + '/' + createdStringParts[0]);
    }

    if (user?.updatedAt) {
      const updatedString = infoUser?.updatedAt + '';
      const updatedStringParts = updatedString.substring(0, 10).split('-');
      setUpdated(updatedStringParts[2] + '/' + updatedStringParts[1] + '/' + updatedStringParts[0]);
    }
  }, [id, user, infoUser?.createdAt, infoUser?.updatedAt]);

  return (
    <AuthGuard>
      <main className="my-0 max-w-[100vw]">
        <section id="userBanner" className="w-[100vw] h-[200px] md:h-[400px]"></section>
        <div
          id="userInfo"
          className="bg-secondary flex flex-col md:flex-row items-center md:items-start animate-fadeIn"
        >
          <Image
            src={infoUser?.image ?? '/images/default-user.jpg'}
            alt="Imagen de perfil"
            width={300}
            height={300}
            id="userImage"
            className="bg-secondary md:ms-32 h-[150px] md:h-[300px] w-[150px] md:w-[300px]"
          ></Image>
          <div className="md:ms-10 mt-[-110px] md:mt-10 flex flex-col gap-4">
            <h1 className="text-5xl font-cozy_title">{infoUser?.name ?? '- - -'}</h1>
            <h2 className="font-cozy_text">{infoUser?.email ?? '- - -'}</h2>
            <div className="flex flex-col md:flex-row mt-2 gap-5 font-cozy_text text-yellow-900 items-center *:flex *:gap-2">
              <p>
                <Clock7Icon className="w-6 h-6"></Clock7Icon>
                {createdAt}
              </p>
              <p>
                <PencilLine className="w-6 h-6"></PencilLine>
                {updatedAt}
              </p>
            </div>
          </div>
        </div>
        <section id="userContent" className="animate-fadeIn">
          <nav className="max-w-7xl mx-auto rounded-xl my-8 shadow-lg">
            <ul className="text-center flex justify-evenly gap-6 p-2  *:font-cozy_text *:flex *:flex-col-reverse *:justify-center *:items-center">
              <li
                onClick={() => setContent('recipes')}
                className={selectedContent === 'recipes' ? 'active' : ''}
              >
                <StoreIcon className="w-10 h-10"></StoreIcon>
                <span className="opacity-0 font-cozy_text text-lg">Recetas</span>
                <div className="dot w-20 h-20"></div>
              </li>
              <li
                onClick={() => setContent('diets')}
                className={selectedContent === 'diets' ? 'active' : ''}
              >
                <CalendarDays className="w-10 h-10"></CalendarDays>
                <span className="opacity-0 font-cozy_text text-lg">Dietas</span>
                <div className="dot w-20 h-20"></div>
              </li>
              <li
                onClick={() => setContent('comments')}
                className={selectedContent === 'comments' ? 'active' : ''}
              >
                <ChatBubbleBottomCenterTextIcon className="w-10 h-10"></ChatBubbleBottomCenterTextIcon>
                <span className="opacity-0 font-cozy_text text-lg">Comentarios</span>
                <div className="dot w-20 h-20"></div>
              </li>
              {sameUser && (
                <li
                  onClick={() => setContent('settings')}
                  className={selectedContent === 'settings' ? 'active' : ''}
                >
                  <Settings className="w-10 h-10"></Settings>
                  <span className="opacity-0 font-cozy_text text-lg">Ajustes</span>
                  <div className="dot w-20 h-20"></div>
                </li>
              )}
            </ul>
          </nav>
          <main className="bg-secondary container mt-[3.5rem] min-h-16 text-center">
            {contentList.length === 0 && selectedContent !== 'settings' && (
              <h1 className="text-5xl m-20 font-cozy_title">
                El Usuario aun no a publicado nada en esta sección
              </h1>
            )}
            {contentList.length !== 0 && selectedContent !== 'settings' && <section></section>}
            {selectedContent === 'settings' && (
              <section id="settingsButtons" className="flex flex-col gap-10 p-6">
                <Link className=" w-full md:w-1/3 m-auto" href={`/profile/${id}/modify`}>
                  <button className="btn-primary p-3 w-full animate-fadeIn">
                    Modificar perfil
                  </button>
                </Link>
                <Link className=" w-full md:w-1/3 m-auto" href={`/profile/${id}/premium`}>
                  <button className="btn-primary p-3 w-full animate-fadeIn">
                    Cambiar plan de cuenta
                  </button>
                </Link>
                <Link className=" w-full md:w-1/3 m-auto" href={`/profile/${id}/delete`}>
                  <button className="btn-primary p-3 w-full animate-fadeIn">Eliminar perfil</button>
                </Link>
              </section>
            )}
          </main>
        </section>
      </main>
    </AuthGuard>
  );
}

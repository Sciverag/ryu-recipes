'use client';
import Image from 'next/image';
import './profile.css';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarDays, Clock7Icon, PencilLine, Settings, StoreIcon } from 'lucide-react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

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
  }, [selectedContent]);

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
      setCreated(createdString.substring(0, 10));
    }

    if (user?.updatedAt) {
      const updatedString = infoUser?.updatedAt + '';
      setUpdated(updatedString.substring(0, 10));
    }
  }, [id, user, infoUser]);

  return (
    <main className="my-0">
      <section id="userBanner" className="w-[100vw]"></section>
      <div id="userInfo" className="bg-secondary flex animate-fadeIn">
        <Image
          src={infoUser?.image ?? '/images/default-user.jpg'}
          alt="Imagen de perfil"
          width={300}
          height={300}
          id="userImage"
          className="bg-secondary md:ms-32"
        ></Image>
        <div className="ms-10 mt-10 flex flex-col gap-4">
          <h1 className="text-5xl font-cozy_title">{infoUser?.name ?? '- - -'}</h1>
          <h2 className="font-cozy_text">{infoUser?.email ?? '- - -'}</h2>
          <div className="flex mt-2 gap-5 font-cozy_text text-yellow-900 *:flex *:gap-2">
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
        <main className="bg-secondary container mt-[3.5rem] min-h-16"></main>
      </section>
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import './header.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  CalendarIcon,
  HomeIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';
import LoginModal from '../LoginModal';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const isInLanding = pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();
  const { user } = useAuth();

  if (isInLanding) {
    return null;
  }

  return (
    <header className="bg-secondary flex items-center justify-between p-3 top-0 sticky">
      <Link className="mx-2" href="/">
        <button id="logo">
          <Image src={'/images/logo.png'} alt="Ryu Recipes" width={75} height={75}></Image>
        </button>
      </Link>

      <div className="md:flex justify-center gap-8 lg:gap-16 text-lg lg:text-2xl text-center hidden">
        <Link className="headerLink flex items-center gap-1" href="/">
          <HomeIcon className="h-6 w-6"></HomeIcon>
          <button className="w-max">Inicio</button>
        </Link>
        <Link className="headerLink flex items-center gap-1" href="/recipes">
          <BuildingStorefrontIcon className="h-6 w-6"></BuildingStorefrontIcon>
          <button className="w-max">Recetas</button>
        </Link>
        <Link className="headerLink flex items-center gap-1" href="/diets">
          <CalendarIcon className="h-6 w-6"></CalendarIcon>
          <button className="w-max">Dietas</button>
        </Link>
        {isLoggedIn && (
          <Link className="headerLink flex items-center gap-1" href="/menu">
            <BookOpenIcon className="h-6 w-6"></BookOpenIcon>
            <button className="w-max">Mi Menú</button>
          </Link>
        )}
      </div>

      {!isLoggedIn && (
        <button
          onClick={() => setShowLogin(true)}
          className="btn btn-primary text-base md:flex hidden"
        >
          Iniciar Sesión
        </button>
      )}

      {isLoggedIn && (
        <div className="md:flex justify-center gap-8 mx-4 text-center hidden">
          <Link className="headerLink flex items-center gap-1" href={'/profile/' + user?.id}>
            <UserCircleIcon className="h-10 w-10" title="Tu perfil"></UserCircleIcon>
          </Link>
          <button onClick={logout} className="headerLink flex items-center gap-1">
            <ArrowLeftEndOnRectangleIcon
              className="h-10 w-10"
              title="Cerrar sesión"
            ></ArrowLeftEndOnRectangleIcon>
          </button>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden btn btn-primary">
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)}></LoginModal>

      {isOpen && (
        <div
          id="dropdownMenu"
          className="md:hidden mt-4 flex flex-col gap-3 bg-secondary px-6 py-4 shadow-inner rounded-b-xl absolute w-full animate-fadeOut"
        >
          <Link
            onClick={() => setIsOpen(!isOpen)}
            className="headerLink flex items-center gap-1"
            href="/"
          >
            <HomeIcon className="h-6 w-6"></HomeIcon>
            <button className="w-max">Inicio</button>
          </Link>
          <Link
            onClick={() => setIsOpen(!isOpen)}
            className="headerLink flex items-center gap-1"
            href="/recipes"
          >
            <BuildingStorefrontIcon className="h-6 w-6"></BuildingStorefrontIcon>
            <button className="w-max">Recetas</button>
          </Link>
          <Link
            onClick={() => setIsOpen(!isOpen)}
            className="headerLink flex items-center gap-1"
            href="/diets"
          >
            <CalendarIcon className="h-6 w-6"></CalendarIcon>
            <button className="w-max">Dietas</button>
          </Link>

          {isLoggedIn && (
            <>
              <Link
                onClick={() => setIsOpen(!isOpen)}
                className="headerLink flex items-center gap-1"
                href="/menu"
              >
                <BookOpenIcon className="h-6 w-6"></BookOpenIcon>
                <button className="w-max">Mi Menú</button>
              </Link>
              <Link
                onClick={() => setIsOpen(!isOpen)}
                className="headerLink flex items-center gap-1"
                href={'/profile/' + user?.id}
              >
                <UserCircleIcon className="h-6 w-6"></UserCircleIcon>
                <button className="w-max">Tu Perfil</button>
              </Link>
              <button onClick={logout} className="headerLink flex items-center gap-1">
                <ArrowLeftEndOnRectangleIcon className="h-6 w-6"></ArrowLeftEndOnRectangleIcon>
                <p className="w-max">Cerrar Sesión</p>
              </button>
            </>
          )}

          {!isLoggedIn && (
            <button onClick={() => setShowLogin(true)} className="btn btn-primary text-base">
              Iniciar Sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}

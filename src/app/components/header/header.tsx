'use client';

import React, { useState } from 'react';
import './header.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  BookOpenIcon,
  CalendarIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';
import LoginModal from '../loginModal';

export default function Header() {
  const pathname = usePathname();
  const isInLanding = pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

      <div className="md:flex justify-center gap-8 text-lg lg:text-2xl text-center hidden">
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
        <Link className="headerLink flex items-center gap-1" href="/menu">
          <BookOpenIcon className="h-6 w-6"></BookOpenIcon>
          <button className="w-max">Mi Menú</button>
        </Link>
      </div>

      <button
        onClick={() => setShowLogin(true)}
        className="btn btn-primary text-base md:flex hidden"
      >
        Iniciar Sesión
      </button>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden btn btn-primary">
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)}></LoginModal>

      {isOpen && (
        <div
          id="dropdownMenu"
          className="md:hidden mt-4 flex flex-col gap-3 bg-secondary px-6 py-4 shadow-inner rounded-b-xl absolute w-full animate-fadeOut"
        >
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
          <Link className="headerLink flex items-center gap-1" href="/menu">
            <BookOpenIcon className="h-6 w-6"></BookOpenIcon>
            <button className="w-max">Mi Menú</button>
          </Link>

          <button onClick={() => setShowLogin(true)} className="btn btn-primary text-base">
            Iniciar Sesión
          </button>
        </div>
      )}
    </header>
  );
}

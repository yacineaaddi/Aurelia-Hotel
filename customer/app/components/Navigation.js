"use client";

import SignOutButton from "./SignOutButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

export default function Navigation({ session }) {
  const sideMenuRef = useRef();
  const router = useRouter();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(0)";
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(100%)";
  };

  const handleMenu = () => {
    closeMenu();
    router.push("/");
  };

  return (
    <>
      <nav className="z-10 text-xl">
        <ul className="hidden md:flex gap-16 items-center justify-center">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <img
                  className="h-8 rounded-full"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
                Guest area
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Sign in
              </Link>
            )}
          </li>
          {session?.user && (
            <li>
              <SignOutButton />
            </li>
          )}
        </ul>
        <div onClick={openMenu} className="md:hidden cursor-pointer">
          <Image height="28" width="28" src="/menu-white.png" alt="" />
        </div>
      </nav>

      <div
        ref={sideMenuRef}
        className={`fixed inset-0 z-50 translate-x-[100%] h-dvh w-screen bg-white text-gray-800 shadow-2xl transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div onClick={handleMenu}>
            <Image
              src="/logo-light.png"
              height="60"
              width="60"
              alt="Aurelia Hotel"
            />
          </div>

          <button onClick={closeMenu} aria-label="Close menu">
            <Image
              height="23"
              width="23"
              src="/close-white.png"
              alt=""
              className="invert"
            />
          </button>
        </div>

        {/* Navigation links */}
        <ul className="flex flex-col gap-4 p-6 items-center">
          {[
            ["Home", "/"],
            ["Rooms", "/cabins"],
            ["About", "/about"],
            ["Guest area", "/account"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                onClick={closeMenu}
                className="block rounded-lg px-5 py-3 text-base transition-colors hover:bg-gray-100 hover:text-accent-400"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

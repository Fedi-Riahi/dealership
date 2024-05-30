"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  UserIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";
import { Context } from "@/app/context/page";

const Navbar = () => {
  const { status, data: session } = useSession();
  const { cartItems } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userName, setUserName] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated") {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
          try {
            const response = await fetch(`/api/user/${userId}`);
            const data = await response.json();
            if (data?.user?.firstName && data?.user?.lastName) {
              setUserName(`${data.user.firstName} ${data.user.lastName}`);
            } else {
              setUserName("MercEnthusiast");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchUser();
  }, [status]);

  return (
    <nav className="bg-black text-white sticky z-50 top-0 left-0">
      <div className="mx-auto flex justify-between items-center py-4 px-4 md:px-10 w-full">
        {/* Profile icon on the left for mobile */}
        <div className="flex items-center md:hidden">
          <UserIcon
            className="h-6 w-6 cursor-pointer text-white"
            onClick={toggleDropdown}
          />
        </div>

        {/* Logo in the center for mobile */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Link href="/">
            <Image
              src="/log.png"
              alt="Silver Star Sfax"
              width={190}
              height={80}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Centered links (hidden on mobile) */}
        <div className="hidden md:flex flex-1">
          <ul className="flex space-x-8 items-center justify-center w-full">
            <li>
              <Link href="/" className="hover:text-gray-200">
                Acceuil
              </Link>
            </li>
            <li>
              <Link href="/listing" className="hover:text-gray-200">
                Modèles
              </Link>
            </li>
            <li>
              <Link href="/carpart" className="hover:text-gray-200">
                Achats
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-gray-200">
                Nous connaître
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Icons and button on the right */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <Link className="text-white" href="/">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </Link>
          <Link href="/cart" className="relative text-white">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItems.length > 0 && (
              <div className="absolute h-5 flex items-center justify-center w-5 -top-2 left-5 px-2 bg-blue-500 rounded-full text-white text-xs">
                {cartItems.length}
              </div>
            )}
          </Link>

          <div className="relative">
            <UserIcon
              className="h-6 w-6 cursor-pointer text-white"
              onClick={toggleDropdown}
            />
            {status === "authenticated" && (
              <CheckCircleIcon className="text-blue-500 h-5 w-5 absolute -top-3 -right-3" />
            )}
            {status === "authenticated" && isDropdownOpen && (
              <div className="absolute top-8 right-2 bg-white text-zinc px-6 py-4 rounded-md flex flex-col items-start w-48 z-50">
                <p className="text-2xl">
                  Bonjour, {userName || "MercEnthusiast"}
                </p>
                <Link className="text-gray-600 mt-2" href="/profile">
                  Mon Compte
                </Link>
                <div className="border border-gray-100 w-full my-3" />
                <button
                  className="text-zinc mt-2 px-8 py-3 border border-zinc w-full text-md"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            )}
            {status === "unauthenticated" && isDropdownOpen && (
              <div className="absolute top-8 right-2 bg-white text-zinc px-6 py-4 rounded-md flex flex-col items-start w-48 z-50">
                <Link className="text-zinc mt-2" href="/signin">
                  Sign In
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/appointment"
            className="text-white bg-blue-500 hover:bg-blue-500/90 py-2 px-4"
          >
            Reserver un rendez-vous
          </Link>
        </div>

        {/* Mobile burger menu on the right */}
        <div className="md:hidden">
          <button onClick={toggleDropdown}>
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 9a1 1 0 100 2h12a1 1 0 100-2H3zm13 3a1 1 0 11-2 0 1 1 0 012 0zM5 13a1 1 0 100 2h10a1 1 0 100-2H5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown menu (visible on mobile when toggled) */}
        {isDropdownOpen && (
          <div className="md:hidden absolute top-16 right-0 z-40 bg-white border border-gray-300 w-full  px-5">
            <ul className="text-black p-4">
              {status === "authenticated" ? (
                <>
                  <li className="text-zinc text-2xl font-mercedes-bold mb-2">
                    Bonjour, {userName || "MercEnthusiast"}
                  </li>
                  <li className="my-4">
                    <Link
                      href="/profile"
                      className="block py-2 px-3 hover:text-gray-800 border-b border-blue-500"
                    >
                      Mon Compte
                    </Link>
                  </li>
                  <li className="my-4">
                    <button
                      onClick={() => signOut()}
                      className="block py-2 px-3 hover:text-gray-800 border-b border-blue-500 w-full text-start"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/signin"
                    className="block py-2 px-3 hover:text-gray-800"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

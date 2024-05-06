"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { UserIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";
import { Context } from "@/app/context/page";

const Navbar = () => {
  const { status, data: session } = useSession();
  const { cartItems } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userName, setUserName] = useState("");

  // Function to toggle the dropdown
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
    <nav>
      <div className="mx-auto bg-black flex justify-between items-center py-4 px-4 md:px-10 w-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Silver Star Sfax"
              width={60}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="text-white flex space-x-8 rtl:space-x-reverse">
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
                Achat et services
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
            <li>
              <Link href="/cart" className="relative hover:text-gray-200">
                <div className="relative">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <div className="absolute h-5 flex items-center justify-center w-5 -top-2 left-5 px-2 bg-blue-500 rounded-full text-white text-xs">
                      {cartItems.length}
                    </div>
                  )}
                </div>
              </Link>
            </li>

            <li>
              <div className="relative">
                <UserIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {status === "authenticated" && isDropdownOpen && (
                  <div className="absolute top-8 right-2 bg-white font-lmedium text-zinc px-6 py-4 rounded-md flex flex-col items-start w-[400px] z-50">
                    <p className="text-zinc text-2xl">
                      Bonjour, {userName || "MercEnthusiast"}
                    </p>
                    <Link className="text-gray-600 mt-10" href="/profile">
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
                  <div className="absolute top-8 right-2 bg-white font-lmedium text-zinc px-6 py-4 rounded-md flex flex-col items-start w-[400px] z-50">
                    <Link className="text-zinc mt-10" href="/signin">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link
                href="/appointment"
                className="border hover:text-gray-200 hover:bg-gray-100/10 py-4 px-6"
              >
                Reserver un rendez-vous
              </Link>
            </li>
          </ul>
        </div>
        {/* Mobile Navigation */}
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
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="md:hidden absolute top-16 right-0 z-40 bg-white w-full">
            <ul className="text-white p-4">
              <li>
                <Link href="/" className="block py-2 px-3 hover:text-gray-200">
                  Acceuil
                </Link>
              </li>
              <li>
                <Link
                  href="/listing"
                  className="block py-2 px-3 hover:text-gray-200"
                >
                  Modèles
                </Link>
              </li>
              <li>
                <Link
                  href="/carpart"
                  className="block py-2 px-3 hover:text-gray-200"
                >
                  Achat et services
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="block py-2 px-3 hover:text-gray-200"
                >
                  Nous connaître
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 hover:text-gray-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="block py-2 px-3 hover:text-gray-200"
                >
                  Cart
                </Link>
              </li>
              {status === "authenticated" ? (
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 hover:text-gray-200"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href="/signin"
                    className="block py-2 px-3 hover:text-gray-200"
                  >
                    Sign Up
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

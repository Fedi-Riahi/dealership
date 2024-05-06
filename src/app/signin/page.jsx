"use client"
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInButton from "@/components/signinbutton/SignInButton";
import Link from "next/link";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();

      const user = userData.users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        setError("Invalid email or password");
        return;
      }

      // If a user is found, sign them in and store their ID in session storage
      const userId = user._id;
      sessionStorage.setItem("userId", userId);
      console.log("User ID stored in session storage:", userId);

      // Sign in the user
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Sign-in failed");
        return;
      }

      router.replace("/profile"); // Redirect to the profile page after successful sign-in
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex max-h-screen my-auto">
      <div className="flex-1 relative">
        {/* Your image goes here */}
        <img
          src="/signup.png"
          alt="Registration Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>
      <form
        className="flex-1 flex flex-col justify-center items-stretch w-full px-20 pt-20"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="w-full flex items-center justify-evenly my-1">
          <div className="border-t border-gray-300 my-6 flex-grow" />
          <span className="text-2xl font-semibold text-gray-800 mx-4">
            Log In
          </span>
          <div className="border-t border-gray-300 my-6 flex-grow" />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 py-3 border border-gray-300 rounded-md w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 py-3 border border-gray-300 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <button
            type="submit"
            className="w-full py-5 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Créer un compte
          </button>
          <div className="w-full flex items-center justify-evenly my-1">
            <div className="border-t border-gray-300 my-6 flex-grow" />
            <span className="text-xl font-normal text-gray-800 mx-4">Or</span>
            <div className="border-t border-gray-300 my-6 flex-grow" />
          </div>
          <span className="text-md mb-2">You don't have an account ? <Link href='/signup' className="text-blue-500 font-medium">Sign Up</Link></span>
          <SignInButton />
        </div>
      </form>
    </div>
  );
}
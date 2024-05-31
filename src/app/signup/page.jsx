"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignInButton from "@/components/signinbutton/SignInButton";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      // Redirect user to verification pending page
      router.push("/");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen my-auto">
      <form
        className="flex-1 flex flex-col justify-center items-stretch w-full px-20 pt-20 my-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="w-full flex items-center justify-evenly my-1">
          <div className="border-t border-gray-300 my-6 flex-grow" />
          <span className="text-2xl font-mercedes-bold text-gray-800 mx-4">
            Créer un compte utilisateur
          </span>
          <div className="border-t border-gray-300 my-6 flex-grow" />
        </div>
        <span className="text-center">
          L'email est utilisé pour vous connecter avec votre compte. Nous vous
          enverrons un code de confirmation à ce email pour vérification.
        </span>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            className="mt-1 py-3 border border-gray-300 rounded-md w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Nom de famille
          </label>
          <input
            type="text"
            id="lastName"
            className="mt-1 py-3 border border-gray-300 rounded-md w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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

        <div className="mb-6 flex items-center gap-2">
          <input type="checkbox" id="agree" className="rounded" required />
          <label
            htmlFor="agree"
            className="block text-sm font-medium text-gray-700"
          >
            J'accepte les conditions suivantes
          </label>
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
          <span className="text-md mb-2">You already have an account ? <Link href='/signin' className="text-blue-500 font-medium">Sign In</Link></span>
          <SignInButton />
        </div>
      </form>
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-10 p-8">
          <div className="absolute z-10 flex flex-col justify-center items-center">

            <img
              src="/log_res.png"
              alt="Logo"
              className="w-48 mb-4"
            />
            <h1 className="text-4xl w-4/5 font-mercedes-bold my-4 text-center">
              S'inscrire
              à sfax silver star
            </h1>
          </div>
        </div>
        <img
          src="/signup.png"
          alt="Registration Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>
    </div>
  );
};

export default Register;

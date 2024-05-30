import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Sfax Silver Star</h2>
          <p className="mt-2">
            Recevez des mises à jour, des conseils d’achat et plus encore!{" "}
          </p>
        </div>

        {/* Newsletter Input */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4 gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-zinc px-4 py-3 w-full sm:w-auto"
            />
            <button className="bg-blue-500 text-white px-8 py-3 ">
              Subscribe
            </button>
          </div>
        </div>

        {/* Section with flex */}
        <div className="flex flex-wrap justify-center -mx-4">
          {/* Section 1 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 text-center">
            <h3 className="text-lg font-semibold mb-4">Société</h3>
            <ul>
              <li>
                <Link href="/about">Nous connaître</Link>
              </li>
              <li>
                <Link href="/models">Modèles</Link>
              </li>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/services">Achat et services</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 text-center">
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul>
              <li>
                <Link href="/contact">Entrer en contact</Link>
              </li>
              <li>
                <Link href="/help">Help center</Link>
              </li>
              <li>
                <Link href="/live-chat">Live chat</Link>
              </li>
              <li>
                <Link href="/how-it-works">Comment ça marche</Link>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 text-center">
            <h3 className="text-lg font-semibold mb-4">Type de véhicules</h3>
            <ul>
              <li>
                <Link href="/sedan">Sedan</Link>
              </li>
              <li>
                <Link href="/suvs">SUVs</Link>
              </li>
              <li>
                <Link href="/convertible">Convertible</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

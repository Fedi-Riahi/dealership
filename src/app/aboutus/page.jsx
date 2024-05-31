import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 md:mx-20">
      {/* Header Section with image and overlay */}
      <section className="relative" style={{ height: "60vh" }}>
        <div className="absolute inset-0 bg-cover bg-center z-10 w-full h-full">
          <Image
            src="/about-bg.png"
            alt=""
            className="w-full h-full object-cover"
            layout="fill"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-white text-center w-4/5 md:w-1/2 px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Sfax Silver Star</h1>
            <p className="text-base md:text-lg text-center mt-4">
              Sfax Silver Star est une concession automobile de renom offrant
              une large gamme de services à sa clientèle, comprenant l'achat de
              véhicules, l'acquisition de pièces détachées et la prise de
              rendez-vous pour des contrôles de maintenance des véhicules
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4 md:px-0">
        <div className="container mx-auto">
          <span className="text-2xl md:text-3xl font-mercedes-bold">Nos services</span>
          <div className="flex flex-col md:flex-row justify-center mt-10 gap-10">
            <div className="w-full md:w-1/3">
              <img
                src="ser1.png"
                alt="Service 1"
                className="w-full h-auto rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4 text-center">
                Entretien du voiture
              </h2>
            </div>
            <div className="w-full md:w-1/3">
              <img
                src="ser2.png"
                alt="Service 2"
                className="w-full h-auto rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4 text-center">
                Vente des voitures
              </h2>
            </div>
            <div className="w-full md:w-1/3">
              <img
                src="ser3.png"
                alt="Service 3"
                className="w-full h-auto rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4 text-center">
                Vente des pièces voitures
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance and Repairs Section */}
      <section className="py-12 px-4 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <video
              src="/sl1.mp4" // Replace with the path to your video file
              autoPlay
              loop
              muted
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            <h2 className="text-2xl md:text-3xl font-mercedes-bold mb-4">
              Entretien et réparations
            </h2>
            <p className="text-base md:text-lg mb-4">
              Planifiez votre rendez-vous dès maintenant et profitez d’un
              traitement VIP pour votre précieuse voiture. Nos experts sont
              prêts à vous accueillir.
            </p>
            <button className="bg-blue-500 text-white px-6 md:px-8 py-2 md:py-3 w-fit">
              Reserver un rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* Official Partner Section */}
      <section className="py-16 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-mercedes-bold mb-4">
            Notre partenaire officiel
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-start mt-10">
            <img src="/pixel.png" alt="Partner" className="w-full md:w-1/2 h-auto" />
            <div className="flex flex-col justify-center items-center gap-10 md:gap-20 mt-10 md:mt-0 md:ml-8">
              <p className="text-lg md:text-xl">
                <span className="text-zinc font-semibold">Mercedes-Benz</span>{" "}
                incarne l'excellence et l'innovation dans l'industrie automobile
                depuis des décennies. Chaque modèle est synonyme de luxe, de
                qualité et de performance. Que ce soit par son design élégant,
                son confort incomparable, ou ses technologies de pointe,
                Mercedes-Benz repousse constamment les limites de l'ingénierie
                automobile.
              </p>
              <p className="text-lg md:text-xl">
                Avec une histoire riche et un héritage prestigieux, les
                véhicules Mercedes-Benz représentent l'essence du savoir-faire
                allemand et sont un symbole de statut et de sophistication. Que
                vous recherchiez une berline élégante, un SUV robuste ou une
                voiture de sport exaltante, Mercedes-Benz offre une expérience
                de conduite inégalée pour ceux qui exigent le meilleur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-mercedes-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <details className="mb-4">
              <summary className="cursor-pointer bg-white py-2 px-4 border-b border-gray-300 my-4">
                Quelle est la fréquence recommandée pour l'entretien de mon
                véhicule?
              </summary>
              <p className="bg-white py-2 px-4 border-b border-gray-300 my-4">
                La fréquence d'entretien dépend du modèle et de l'année de votre
                véhicule. En général, il est recommandé de faire un entretien
                complet tous les 15 000 km ou une fois par an. Consultez votre
                manuel du propriétaire ou contactez-nous pour des
                recommandations spécifiques.
              </p>
            </details>
            <details className="mb-4">
              <summary className="cursor-pointer bg-white py-2 px-4 border-b border-gray-300 my-4">
                Quels types de services de maintenance offrez-vous?
              </summary>
              <p className="bg-white py-2 px-4 border-b border-gray-300 my-4">
                Nous offrons une gamme complète de services de maintenance, y
                compris les vidanges, les changements de freins, l'inspection
                générale du véhicule, le remplacement de pneus, et plus encore.
                Nos techniciens qualifiés utilisent des pièces d'origine pour
                garantir la qualité et la fiabilité.
              </p>
            </details>
            <details className="mb-4">
              <summary className="cursor-pointer bg-white py-2 px-4 border-b border-gray-300 my-4">
                Proposez-vous des options de financement?
              </summary>
              <p className="bg-white py-2 px-4 border-b border-gray-300 my-4">
                Oui, nous proposons diverses options de financement pour l'achat
                de véhicules neufs et d'occasion. Nos conseillers financiers
                peuvent vous aider à trouver la solution de financement qui
                correspond le mieux à votre budget.
              </p>
            </details>
            {/* Add more FAQs as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

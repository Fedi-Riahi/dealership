import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      {/* Section with image and overlay */}
      <section className="relative " style={{ height: "100vh" }}>
        <div className="absolute inset-0 bg-cover bg-center z-10">
          <Image src="/appointment-image.png" alt="" layout="fill" />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-20 h1/2"></div>
        <div className="absolute inset-0 flex items-center justify-center z-30">
          {/* Text overlay */}
          <div className="text-white text-center w-1/2">
            <h1 className="text-4xl font-bold">Sfax Silver Star</h1>
            <p className="text-lg text-center mt-4">
              Sfax Silver Star est une concession automobile de renom offrant
              une large gamme de services à sa clientèle, comprenant l'achat de
              véhicules, l'acquisition de pièces détachées et la prise de
              rendez-vous pour des contrôles de maintenance des véhicules
            </p>
          </div>
        </div>
      </section>

      {/* Section with flex services */}
      <section className="py-12">
        <div className="container mx-auto">
          <span className="text-2xl font-medium">Nos services</span>
          <div className="flex justify-center mt-10 gap-10">
            {/* Service 1 */}
            <div className="w-1/3">
              <img
                src="appointment-image.png"
                alt="Service 1"
                className="w-full h-auto  rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4">
                Entretien du voiture
              </h2>
            </div>
            {/* Service 2 */}
            <div className="w-1/3">
              <img
                src="appointment-image.png"
                alt="Service 2"
                className="w-full h-auto  rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4">Vente des voitures</h2>
            </div>
            {/* Service 3 */}
            <div className="w-1/3">
              <img
                src="appointment-image.png"
                alt="Service 3"
                className="w-full h-auto  rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4">
                vente des pieces voitures
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Section for video */}
      <section className="py-16 mt-16 bg-white">
        <div>
          <span className="text-2xl font-medium mx-48">Description</span>
          <p className="text-justify mt-8 mx-48">
            L'un des principaux services offerts par Sfax Silver Star est
            l'achat de véhicules. Le concessionnaire dispose d'un vaste
            inventaire de voitures neuves et d'occasion provenant de certains
            des plus grands fabricants au monde. Que tu sois à la recherche
            d'une berline de luxe, d'un VUS robuste ou d'une voiture à hayon
            efficace, Sfax Silver Star a un véhicule qui répondra à tes besoins
            et à ton budget.
          </p>
        </div>
      </section>
      {/* Section for video */}

      <section className="py-16">
        <div
          className="px-40 w-full my-20 rounded-xl"
          style={{  width: "100%" }}
        >
          <video
            src="/sl1.mp4" // Replace "/video.mp4" with the path to your video file
            autoPlay
            loop
            className="w-full rounded-xl h-full"
          ></video>
        </div>
      </section>

      {/* Section with title, description, and button */}
      <section className="py-16">
        <div className="container mx-auto flex flex-col gap-10">
          <h2 className="text-3xl font-bold mb-4">
            Planifiez votre rendez-vous{" "}
          </h2>
          <p className="text-lg mb-4 w-2/5">
            Nous sommes là pour vous ! Prenez rendez-vous dès maintenant et
            profitez d’un traitement VIP pour votre précieuse voiture. Nos
            experts sont prêts à vous accueillir.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 w-fit">
            Reserver un rendez-vous
          </button>
        </div>
      </section>

      {/* Section for partners */}
      <section className="py-16">
        <div className="container mx-auto">
          {/* Image and text for partners */}
          <span className="text-3xl font-bold mb-4">
            Notre partenaire officiel
          </span>
          <div className="flex justify-center items-start mt-10">
            <img
              src="/intro_cover.jpg"
              alt="Partner"
              className="w-1/2 h-auto"
            />
            <div className="flex flex-col justify-between gap-20">
              <p className="ml-8 text-xl">
                <span className="text-zinc font-bold">Mercedes-Benz</span>{" "}
                incarne l'excellence et l'innovation dans l'industrie automobile
                depuis des décennies. Chaque modèle est synonyme de luxe, de
                qualité et de performance. Que ce soit par son design élégant,
                son confort incomparable, ou ses technologies de pointe,
                Mercedes-Benz repousse constamment les limites de l'ingénierie
                automobile.
              </p>
              <p className="ml-8 text-xl">
                {" "}
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

      {/* Section for FAQs */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          {/* FAQs dropdown list */}
          <div>
            {/* FAQ 1 */}
            <details className="mb-4">
              <summary className="cursor-pointer bg-white py-2 px-4 border-b border-gray-300">
                Question 1
              </summary>
              <p className="bg-white py-2 px-4 border-b border-gray-300">
                Answer 1
              </p>
            </details>
            {/* FAQ 2 */}
            <details className="mb-4">
              <summary className="cursor-pointer bg-white py-2 px-4 border-b border-gray-300">
                Question 2
              </summary>
              <p className="bg-white py-2 px-4 border-b border-gray-300">
                Answer 2
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

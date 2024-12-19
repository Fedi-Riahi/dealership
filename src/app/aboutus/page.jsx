"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const AboutUs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const ServiceCard = ({ src, alt, title, description }) => {
    const [ref, inView] = useInView({ triggerOnce: false });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, type: "Tween", stiffness: 120 }}
        className="rounded-lg"
      >
        <Image
          src={src}
          alt={alt}
          className="w-full h-auto rounded-md"
          width={500}
          height={300}
        />
        <h3 className="text-xl font-semibold mt-10">{title}</h3>
        <p className="mt-2">{description}</p>
      </motion.div>
    );
  };
  return (
    <div className=" ">
      {/* Header Section with image and overlay */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "Tween", stiffness: 120 }}
        className="flex flex-col items-center justify-center bg-cover bg-center h-screen relative"
      >
        <Image
          src="/MStore.jpg"
          alt=""
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-bt opacity-50"></div>
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="w-full bg-black bg-opacity-70 text-white text-center px-4 py-8 z-10 flex flex-col items-center rounded-lg">
            <Image src="/benz.png" alt="" width={90} height={90} />
            <p className="text-base md:text-2xl text-center my-24 w-1/2">
              Silver Star est une concession automobile de renom offrant
              une large gamme de services à sa clientèle, comprenant
              l&apos;achat de véhicules, l&apos;acquisition de pièces détachées
              et la prise de rendez-vous pour des contrôles de maintenance des
              véhicules
            </p>
          </div>
        </div>
      </motion.section>

      {/* Service Cards Section */}
      <section className="py-12 px-4 md:px-0 my-24">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-5xl font-mercedes-bold mb-20">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <ServiceCard
              src="/ser1.png"
              alt="Service 1"
              title="Entretien du voiture"
              description="Description of service 1 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            {/* Service Card 2 */}
            <ServiceCard
              src="/ser2.png"
              alt="Service 2"
              title="Vente des voitures"
              description="Description of service 2 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            {/* Service Card 3 */}
            <ServiceCard
              src="/ser3.png"
              alt="Service 3"
              title="Vente des pièces voitures"
              description="Description of service 3 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "Tween", stiffness: 120 }}
        className="py-12 px-4 md:px-24 bg-back relative mt-24"
      >
        <h2 className="text-2xl md:text-5xl font-mercedes-bold mb-20 px-20 ">
          Entretien et réparations
        </h2>
        <div className="container mx-auto flex flex-col gap-10">
          <div className="w-full mb-4 md:mb-0">
            <video
              src="/maint.mp4" // Replace with the path to your video file
              autoPlay
              loop
              muted
              className="w-full h-full rounded-md"
            />
          </div>
          <div className="flex items-center justify-center w-full  gap-14 my-28">
            {" "}
            {/* Add relative positioning here */}
            <div className="flex-1">
              <Image
                src="/appointment-image.png"
                alt="pixel"
                width={800}
                height={400}
              />
            </div>
            <div className="w-full md:w-1/2  flex flex-col justify-center  ">
              <h2 className="text-2xl md:text-5xl font-mercedes-bold mb-4">
                Entretien et réparations
              </h2>
              <p className="text-base md:text-lg my-4">
                Planifiez votre rendez-vous dès maintenant et profitez d’un
                traitement VIP pour votre précieuse voiture. Nos experts sont
                prêts à vous accueillir.
              </p>
              <Link
                href="/appointment"
                className="bg-blue-500 text-white px-6 md:px-8 py-2 md:py-3 w-fit my-4"
              >
                Reserver un rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Official Partner Section */}
      <section className="py-16 px-4 md:px-0 ">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-5xl font-mercedes-bold mb-20">
            Notre partenaire officiel
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-start mt-10 gap-20">
            <Image
              src="/pixel.png"
              alt="Partner"
              className="w-full md:w-1/2 h-auto"
              width={800}
              height={800}
            />
            <div className="flex flex-col justify-center items-center gap-10 md:gap-20 mt-10 md:mt-0 md:ml-8">
              <p className="text-lg md:text-xl">
                <span className="text-zinc font-semibold">Mercedes-Benz</span>{" "}
                incarne l&apos;excellence et l&apos;innovation dans
                l&apos;industrie automobile depuis des décennies. Chaque modèle
                est synonyme de luxe, de qualité et de performance. Que ce soit
                par son design élégant, son confort incomparable, ou ses
                technologies de pointe, Mercedes-Benz repousse constamment les
                limites de l&apos;ingénierie automobile.
              </p>
              <p className="text-lg md:text-xl">
                Avec une histoire riche et un héritage prestigieux, les
                véhicules Mercedes-Benz représentent l&apos;essence du
                savoir-faire allemand et sont un symbole de statut et de
                sophistication. Que vous recherchiez une berline élégante, un
                SUV robuste ou une voiture de sport exaltante, Mercedes-Benz
                offre une expérience de conduite inégalée pour ceux qui exigent
                le meilleur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div
        id="accordion-open"
        data-accordion="open"
        className="md:px-44 flex flex-col gap-4 my-24"
      >
        <h2 className="text-2xl md:text-5xl font-mercedes-bold mb-20">
          Frequently Asked Questions
        </h2>
        <h2 id="accordion-open-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right bg-blue-50 text-gray-500 hover:bg-blue-200 focus:bg-blue-200 gap-3"
            data-accordion-target="#accordion-open-body-1"
            aria-expanded={activeAccordion === 1}
            aria-controls="accordion-open-body-1"
            onClick={() => toggleAccordion(1)}
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Quelle est la fréquence recommandée pour l&apos;entretien de mon
              véhicule?
            </span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 ${
                activeAccordion === 1 ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-1"
          className={`${
            activeAccordion === 1 ? "block" : "hidden"
          } p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900`}
          aria-labelledby="accordion-open-heading-1"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            La fréquence d&apos;entretien dépend du modèle et de l&apos;année de
            votre véhicule. En général, il est recommandé de faire un entretien
            complet tous les 15 000 km ou une fois par an. Consultez votre
            manuel du propriétaire ou contactez-nous pour des recommandations
            spécifiques.
          </p>
        </div>

        <h2 id="accordion-open-heading-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right bg-blue-50 text-gray-500 hover:bg-blue-200 focus:bg-blue-200 gap-3"
            data-accordion-target="#accordion-open-body-2"
            aria-expanded={activeAccordion === 2}
            aria-controls="accordion-open-body-2"
            onClick={() => toggleAccordion(2)}
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Quels types de services de maintenance offrez-vous?
            </span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 ${
                activeAccordion === 2 ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-2"
          className={`${
            activeAccordion === 2 ? "block" : "hidden"
          } p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900`}
          aria-labelledby="accordion-open-heading-2"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Nous offrons une gamme complète de services de maintenance, y
            compris les vidanges, les changements de freins, l&apos;inspection
            générale du véhicule, le remplacement de pneus, et plus encore. Nos
            techniciens qualifiés utilisent des pièces d&apos;origine pour
            garantir la qualité et la fiabilité.
          </p>
        </div>
        {/* Additional Accordion Section */}
        <h2 id="accordion-open-heading-3">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right bg-blue-50 text-gray-500 hover:bg-blue-200 focus:bg-blue-200 gap-3"
            data-accordion-target="#accordion-open-body-3"
            aria-expanded={activeAccordion === 3}
            aria-controls="accordion-open-body-3"
            onClick={() => toggleAccordion(3)}
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Proposez-vous des options de financement?
            </span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 ${
                activeAccordion === 3 ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-3"
          className={`${
            activeAccordion === 3 ? "block" : "hidden"
          } p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900`}
          aria-labelledby="accordion-open-heading-3"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Oui, nous proposons diverses options de financement pour
            l&apos;achat de véhicules neufs et d&apos;occasion. Nos conseillers
            financiers peuvent vous aider à trouver la solution de financement
            qui correspond le mieux à votre budget.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

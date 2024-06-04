import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AboutService() {
  const [ref, inView] = useInView({ triggerOnce: false });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="./imageService.png"
            alt="Car"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right side: Title, Description, Button */}
        <div className="w-full md:w-1/2 md:px-20 px-10 py-10 bg-gray-900 flex items-start justify-center flex-col">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: inView ? 0.5 : 0 }}
            className="text-4xl md:text-6xl py-5 font-mercedes-bold mb-4 text-white text-start md:text-left overflow-hidden"
          >
            Vous avez besoin d’un service pour votre Mercedes ?
          </motion.h2>
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: inView ? 0.5 : 0 }}
            className="text-md md:text-xl mb-4 py-5 text-gray-200 text-start md:text-left overflow-hidden"
          >
            Nous sommes là pour vous ! Prenez rendez-vous dès maintenant et
            profitez d’un traitement VIP pour votre précieuse voiture. Nos
            experts sont prêts à vous accueillir.
          </motion.p>
          <Link
            href="/appointment"
            className="text-white border px-10 py-3 hover:bg-gray-400/10"
          >
            Reserver
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutService;

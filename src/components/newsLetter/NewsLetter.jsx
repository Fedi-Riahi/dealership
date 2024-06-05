import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Newsletter() {
  const [ref, inView] = useInView({ triggerOnce: false });

  const bgImageStyle = {
    backgroundImage: `url('/bg-news.png')`, // Specify the URL of the background image
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      ref={ref}
      className="flex items-center justify-center py-10 w-full md:px-20 px-4 overflow-x-hidden"
      style={bgImageStyle}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-8">
        {/* Left side: Image */}
        <motion.div
          initial={{ x: 800 }}
          animate={inView ? { x: 100 } : { x: 800 }}
          transition={{
            duration: 0.5,
            type: "Tween",
            stiffness: 120,
            delay: inView ? 1 : 0,
          }}
          className="hidden md:block w-full md:w-1/2 order-1 md:order-2 overflow-hidden"
          style={{ overflow: "hidden" }}
        >
          <img src="/car-news.png" alt="Newsletter" className="w-full h-auto" />
        </motion.div>
        {/* Right side: Title, Text, and Newsletter Input */}
        <motion.div
          initial={{ x: -800 }}
          animate={inView ? { x: 0 } : { x: -800 }}
          transition={{
            duration: 0.5,
            type: "Tween",
            stiffness: 120,
            delay: inView ? 1 : 0,
          }}
          className="w-full md:w-1/2 order-2  md:order-1"
        >
          <div className="mb-4">
            <h2 className="text-5xl font-mercedes-bold py-4 text-white  w-3/4">
              Voulez-vous recevoir des offres spéciales ?
            </h2>
            <p className="text-gray-300 w-full md:w-3/4 py-4 text-lg">
              Soyez le premier à recevoir toutes les informations sur nos
              produits et nos nouvelles voitures par e-mail en vous inscrivant à
              notre liste de diffusion.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 my-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Entrez votre adresse email"
              className="px-4 py-5 w-full md:w-2/4"
            />
            <motion.button
              initial={{ x: -800 }}
              animate={inView ? { x: 0 } : { x: -800 }}
              transition={{
                duration: 0.5,
                type: "Tween",
                stiffness: 120,
                delay: inView ? 1 : 0,
              }}
              className="bg-black text-white text-lg px-10 py-5 hover:bg-zinc transition duration-300 mt-4 md:mt-0 "
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.5 }}
              >
                Subscribe
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Newsletter;

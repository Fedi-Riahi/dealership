"use client"
import { motion } from "framer-motion";
import React, { useRef } from "react";
import Hero from "@/components/hero/Hero";
import Intro from "@/components/intro/Intro";
import AboutService from "@/components/aboutservice/AboutService";
import Latest from "@/components/latest/Latest";
import ContactUs from "@/components/contactus/ContactUs";
import Featured from "@/components/Featured/Featured";
import Newsletter from "@/components/newsLetter/NewsLetter";
import styles from "./features.module.css"; // Import the CSS module
import { useInView } from "react-intersection-observer";

const AnimatedComponent = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100 }}
      animate={{ y: inView ? 0 : 100 }}
      transition={{ duration: 2, ease: "linear"}}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="">
      <Hero />
      <main className="flex flex-col items-center justify-between pt-40">
        <div className="w-full">
          <AnimatedComponent>
            <Intro />
          </AnimatedComponent>
        </div>
        <div className="flex items-center justify-center flex-col mt-20">
          <AnimatedComponent>
            <AboutService />
          </AnimatedComponent>
        </div>
        <div className="flex items-start justify-start flex-col mt-20">
          <h1 className="md:text-5xl font-mercedes-bold px-4 py-8 text-2xl">
            Explorez Plus de Fonctionnalités
          </h1>
          <AnimatedComponent>
            <Featured />
          </AnimatedComponent>
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <AnimatedComponent>
            <Latest />
          </AnimatedComponent>
        </div>
        <div className="flex items-center justify-center w-full mt-20">
          <AnimatedComponent>
            <Newsletter />
          </AnimatedComponent>
        </div>
        <div className="flex items-center justify-center w-full mt-20 ">
          <AnimatedComponent>
            <ContactUs />
          </AnimatedComponent>
        </div>
      </main>
    </div>
  );
}

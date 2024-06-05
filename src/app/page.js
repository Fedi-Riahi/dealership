"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useRef, useEffect } from "react";
import Hero from "@/components/hero/Hero";
import Intro from "@/components/intro/Intro";
import AboutService from "@/components/aboutservice/AboutService";
import Latest from "@/components/latest/Latest";
import ContactUs from "@/components/contactus/ContactUs";
import Featured from "@/components/Featured/Featured";
import Newsletter from "@/components/newsLetter/NewsLetter";
import { useInView } from "react-intersection-observer";
import VoiceAssistant from "@/components/voiceAssistant/VoiceAssistant";

const AnimatedComponent = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="">

      <Hero />
      <main className="flex flex-col items-center justify-between pt-28">
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

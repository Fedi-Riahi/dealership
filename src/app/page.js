import Intro from "@/components/intro/Intro";
import AboutService from "@/components/aboutservice/AboutService";
import Latest from "@/components/latest/Latest";
import ContactUs from "@/components/contactus/ContactUs";
import Featured from "@/components/Featured/Featured";
import Newsletter from "@/components/newsLetter/NewsLetter";
import Hero from "@/components/hero/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <main className="flex flex-col items-center justify-between pt-40">
        <div className="w-full">
          {" "}
          {/* Make this div full width */}
          <Intro />
        </div>
        <div className="flex items-center justify-center flex-col mt-20">
          <AboutService />
        </div>
        <div className="flex items-start justify-start flex-col mt-4">
          <h1 className="md:text-4xl font-mercedes-bold px-4 text-2xl">Explorez Plus de Fonctionnalités</h1>
          <Featured />
          
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <Latest />
        </div>
        <div className="flex items-center justify-center w-full mt-20">
          <Newsletter />
        </div>

        <div className="flex items-center justify-center w-screen mt-20 ">
          <ContactUs />
        </div>
      </main>
    </div>
  );
}

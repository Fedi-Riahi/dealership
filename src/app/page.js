import Navbar from "@/components/navbar/Navbar";
import Hero from '@/components/hero/Hero';
import Intro from '@/components/intro/Intro';
import AboutService from '@/components/aboutservice/AboutService';
import Latest from "@/components/latest/Latest";

import ContactUs from "@/components/contactus/ContactUs";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <main className=" flex flex-col items-center justify-between pt-40">
        <div className="w-full"> {/* Make this div full width */}
          <Intro />
        </div>
        <div className="flex items-center justify-center flex-col mt-20">
          <AboutService />
        </div>
        <div className="flex items-center justify-center w-full mt-20">
          <Latest />
        </div>
        <div className="flex items-center justify-center w-full mt-20">
          <ContactUs />
        </div>
      </main>
    </div>
  );
}

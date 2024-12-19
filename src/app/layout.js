import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import GlobalState from "./context/page";
import { NextAuthProvider } from "./Providers";
import Footer from "@/components/footer/Footer";
import VoiceAssistant from "@/components/voiceAssistant/VoiceAssistant";


const inter = Inter({ subsets: ["latin"]});


export const metadata = {
  title: "Mercedes-Benz : Silver Star",
  description: "Discover Silver Star’s official online platform, a comprehensive destination for all things Mercedes-Benz in Tunisia. Our website offers an effortless way to browse and purchase Mercedes-Benz cars, explore genuine parts, and access essential after-sales services. Designed with both enthusiasts and owners in mind, the platform provides a seamless, user-friendly experience, featuring secure online transactions, real-time support, and a responsive interface. Elevate your Mercedes-Benz ownership experience with us today.",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <GlobalState>
        <html lang="en">
          <body className="mx-auto max-w-screen-4xl bg-back relative">
            <Navbar />
            <div className="top-50 right-10 absolute z-40">
              <VoiceAssistant />
              </div>
            <div className="">
              
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </GlobalState>
    </NextAuthProvider>
  );
}

"use client";
import React, { useRef, useState, useEffect } from "react";

function Hero() {
  const videoRef = useRef(null);
  const [showTextAndButtons, setShowTextAndButtons] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Play failed:", error.message);
      });
    }

    const timeout = setTimeout(() => {
      setShowTextAndButtons(true);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex-grow w-full bg-black">
      <video
        ref={videoRef}
        className="w-full h-screen lg:h-auto object-cover"
        muted
      >
        <source src="/fn_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showTextAndButtons && (
        <div className="absolute bottom-60 lg:bottom-60 left-1/2 transform -translate-x-1/2 text-center px-4 w-full">
          <h3 className="text-white font-mercedes-light z-10 relative text-3xl lg:text-6xl">
            <span className="block">Mercedes New E-Class</span>
          </h3>
          <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 lg:px-10 lg:py-4 mt-8 z-10 relative text-sm lg:text-md">
            En savoir plus
          </button>
        </div>
      )}
    </div>
  );
}

export default Hero;

"use client";
import React, { useRef, useState, useEffect } from "react";

function Hero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Set initial state to false
  const [showTextAndButtons, setShowTextAndButtons] = useState(false); // State to control the visibility of text and buttons

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Play failed:", error.message);
        });
        setShowTextAndButtons(true); // Show text and buttons when video starts playing
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };

  useEffect(() => {
    // Play the video when the component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Play failed:", error.message);
      });
    }

    // Set a timeout to show the text and buttons after some time (e.g., 3 seconds)
    const timeout = setTimeout(() => {
      setShowTextAndButtons(true);
    }, 6000); // Adjust the delay as needed

    // Clean up the timeout when component unmounts or when the video starts playing
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex-grow w-full  bg-black">
      <video ref={videoRef} className="w-full object-cover" muted>
        <source src="/fn_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Conditionally render title and buttons */}
      {showTextAndButtons && (
        <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h3 className="text-white font-mercedes-light z-10 relative text-6xl">
            <span className="block">Mercedes New E-Class</span>
          </h3>
          <button className="bg-blue-500 text-white hover:bg-blue-600  px-10 py-4 mt-8 z-10 relative text-md">
            En savoir plus
          </button>
        </div>
      )}

      {/* Conditionally render play/pause button */}
      {isPlaying && (
        <div className="absolute bottom-32 right-10">
          <button
            onClick={handleTogglePlay}
            className="rounded-xl p-2 flex justify-center items-center border border-white"
          >
            <PauseIcon className="h-8 w-8 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Hero;

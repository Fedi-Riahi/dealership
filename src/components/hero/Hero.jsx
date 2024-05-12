"use client"
import React, { useRef, useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

function Hero() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true); // Set initial state to true for autoplay

    const handleTogglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play()
                    .catch(error => {
                        console.error('Autoplay failed:', error.message);
                    });
            }
            setIsPlaying(!isPlaying); // Toggle play/pause state
        }
    };

    useEffect(() => {
        // Add event listener to the video to handle when it ends
        const handleVideoEnd = () => {
            setIsPlaying(false); // Set isPlaying to false when video ends
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handleVideoEnd);
        }

        // Clean up the event listener when component unmounts
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, []);

    return (
        <div className="relative flex-grow w-full h-full">
            {/* For desktop */}
            <video
                ref={videoRef}
                className="w-full max-h-screen object-cover hidden md:block" // Hide on mobile
                loop
                muted
                autoPlay
            >
                <source src="/cinematic-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* For mobile */}
            <img
                src="/appointment-image.png"
                alt="Mercedes New E-Class"
                className="w-full h-auto md:hidden mt-20" // Hide on desktop and add margin top
                style={{ marginTop: '5rem' }} // Add margin top
            />

            {/* Conditionally render for mobile screens */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center md:hidden">
                <h3 className="text-white font-mercedes-light z-10 relative text-2xl">
                    <span className="block">Mercedes New E-Class</span>
                </h3>
                <span className="block text-white font-thin text-sm">Jusqu'au 28 mars, profitez de nos offres sur une sélection de modèles Mercedes-Benz.</span>
                <button className="border border-200 hover:bg-border-200/[0.2] hover:bg-gray-200/[0.2] text-white px-4 py-2 mt-4 z-10 relative text-xs">
                  Découvrez la nouvelle Mercedes-Benz Classe E
                </button>
            </div>

            {/* For desktop */}
            <div className="absolute bottom-32 right-10 md:block hidden">
                <button onClick={handleTogglePlay} className=" rounded-xl p-2 flex justify-center items-center border border-white">
                    {isPlaying ? (
                        <PauseIcon className="h-8 w-8 text-white" />
                    ) : (
                        <PlayIcon className="h-8 w-8 text-white" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Hero;

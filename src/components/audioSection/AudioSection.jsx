"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoPlayOutline } from "react-icons/io5";

const AudioSection = ({ model }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const intervalRef = useRef(null);

  const handleMouseDown = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleMouseUp = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    clearInterval(intervalRef.current);
    setSpeed(0);
  };

  useEffect(() => {
    if (isPlaying) {
      const audioDuration = audioRef.current.duration;
      const maxSpeed = model.maxSpeed || 220; // Default max speed if not provided
      const intervalTime = (audioDuration / maxSpeed) * 1000; // Calculate interval based on audio duration and max speed
      intervalRef.current = setInterval(() => {
        setSpeed((prevSpeed) => {
          const newSpeed = prevSpeed + 1;
          return newSpeed >= maxSpeed ? maxSpeed : newSpeed;
        });
      }, intervalTime);
    } else {
      clearInterval(intervalRef.current);
      setSpeed(0);
    }

    return () => {
      clearInterval(intervalRef.current);
      setSpeed(0);
    };
  }, [isPlaying, model.maxSpeed]);

  return (
    <div className="flex flex-col items-center justify-center -">
      <audio ref={audioRef} src={model.audio[0]} />

      <div className="relative h-96 w-96 mt-5">
        <div className="absolute inset-0 z-10 flex items-center justify-center mt-1">
          <svg
            className="h-full w-full hidden md:block"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="0.6"
          >
            <circle cx="12" cy="12" r="10" className="text-gray-300"></circle>
            {speed >= 280 ? (
              <circle
                cx="12"
                cy="12"
                r="10"
                className="text-red-500 stroke-current"
                strokeDasharray={`${
                  (speed / model.maxSpeed || 220) * 40.7
                }, 63`}
                transform="rotate(176 12 12)"
              ></circle>
            ) : (
              <circle
                cx="12"
                cy="12"
                r="10"
                className="text-red-500 stroke-current"
                strokeDasharray={`${
                  (speed / model.maxSpeed || 220) * 40.7
                }, 63`}
                transform="rotate(176 12 12)"
                strokeWidth="0.6"
              ></circle>
            )}
          </svg>
          <div className="absolute flex flex-col items-center justify-center gap-1 z-50">
            <div
              className={`md:text-6xl text-5xl text-white font-medium ${
                isPlaying ? "" : "opacity-50" // Apply opacity based on isPlaying state
              }`}
            >
              {speed}
            </div>
            <div
              className={`md:text-lg text-sm text-white ${
                isPlaying ? "" : "opacity-50" // Apply opacity based on isPlaying state
              }`}
            >
              km/h
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 z-40">
        <button
          ref={buttonRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="bg-white font-medium text-zinc py-4 px-10 rounded flex items-center justify-center hover:bg-gray-100 gap-2"
        >
          <IoPlayOutline className="h-5 w-5 text-zinc" />
          Attendez pour le son
        </button>
      </div>
    </div>
  );
};

export default AudioSection;

"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GiSpeedometer } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { PiArrowUpRightThin } from "react-icons/pi";
import Image from 'next/image';

const Intro = ({ introTitle }) => {
  const [carModels, setCarModels] = useState([]);
  const [selectedType, setSelectedType] = useState('SUV'); // Default selected type is Sedan
  const [isMounted, setIsMounted] = useState(false); // State to track component mount

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await fetch("/api/carmodels");
        if (!response.ok) {
          throw new Error("Failed to fetch car models");
        }
        const data = await response.json();
        setCarModels(data.carListing);
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
    };

    fetchCarModels();
  }, []);

  useEffect(() => {
    // Set the mounted state to true after component mounts
    setIsMounted(true);
  }, []);

  const renderCarCards = () => {
    const filteredModels = carModels.filter(car => car.type === selectedType); // Filter car models based on selected type
    return filteredModels.map(car => (
      <div className={`max-w-md bg-white relative flex flex-col transition-transform duration-500 rounded-lg transform ${
          isMounted ? 'translate-y-0 opacity-100 animate-slideUp' : 'translate-y-10 opacity-0'
        }`} key={car._id}>
        <div className="flex flex-col items-start justify-center w-full">
          <div className="px-5 py-2">
            <div className="flex items-start flex-col justify-start gap-2">
              <h3 className="text-gray-900 font-semibold text-xl cursor-pointer">
                {car.listingTitle}
              </h3>
              <p className="text-gray-500 font-medium text-xl cursor-pointer">{car.model}</p>
            </div>
            <Image
              src={car.cardImages[0]}
              alt={car.listingTitle}
              width={280}
              height={280}
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col px-4 my-2 w-full">
            <div className="flex flex-col justify-start items-center text-gray-700">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <GiSpeedometer className="h-7 w-7 text-zinc" />
                  <p className="text-lg font-normal mt-1 text-gray-700 pb-1">{car.maxSpeed} Km/h</p>
                </div>
                <div className="flex items-center gap-2">
                  <LuFuel className="h-7 w-7 text-zinc" />
                  <p className="text-lg font-normal mt-1 text-gray-700">{car.powerKw} kW {car.powerPs}</p>
                </div>
                <div className="flex items-center gap-2">
                  <GiGearStickPattern className="h-7 w-7 text-zinc" />
                  <p className="text-lg font-normal mt-1 text-gray-700 pb-1">{car.acceleration}s</p>
                </div>
              </div>
            </div>
            <Link className='w-full py-4 px-auto text-center bg-blue-500 hover:bg-blue-600 my-4 text-white' href={`/listing/${car._id}`}>
              Détails techniques
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  const carTypes = ['Sedan', 'SUV', 'Convertible']; // Example car types

  return (
    <div className="px-4 md:px-20"> {/* Add padding for mobile screens */}
      <div className='flex items-center justify-between w-full'>
        {introTitle && <h2 className="text-3xl font-mercedes-light mb-4 animate-fadeIn">{introTitle}</h2>} {/* Adjust font size for mobile */}
        {!introTitle && <h2 className="text-5xl font-mercedes-bold mb-4 animate-fadeIn">Explorez tous les véhicules</h2>} {/* Adjust font size for mobile */}
        <Link href='/listing' className='md:flex items-center justify-center cursor-pointer hidden'>
          <p className='text-zinc font-medium animate-fadeIn'>Voir les détails</p>
          <PiArrowUpRightThin className='h-6 w-6 text-zinc ' />
        </Link>
      </div>
      <div className="flex justify-center gap-6 mt-8 flex-wrap"> {/* Updated to wrap items for smaller screens */}
        {/* Render tabs for each car type */}
        {carTypes.map(type => {
          const filteredModels = carModels.filter(car => car.type === type);
          const latestCardImage = filteredModels.length > 0 ? filteredModels[0].cardImages[0] : null;

          return (
            <div 
              key={type} 
              className={`cursor-pointer font-medium text-center ${selectedType === type ? 'border-b-2 border-blue-500' : ''} animate-fadeIn`} // Apply underline style for the selected type
              onClick={() => setSelectedType(type)} // Update selected type on click
            >
              {/* Display the car type name and the latest card image */}
              <div>
                <p>{type}</p>
                {latestCardImage && <img src={latestCardImage} alt={type} className="object-contain w-20 h-20" />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-300 mb-16" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1"> {/* Adjust spacing for mobile */}
        {renderCarCards()}
      </div>
    </div>
  );
};

export default Intro;

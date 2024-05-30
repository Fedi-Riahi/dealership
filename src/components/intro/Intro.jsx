"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GiSpeedometer } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { PiArrowUpRightThin } from "react-icons/pi";
import Image from 'next/image';
const Intro = ({ introTitle }) => {
  const [carModels, setCarModels] = useState([]);
  const [selectedType, setSelectedType] = useState('Sedan'); // Default selected type is Sedan

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

  const renderCarCards = () => {
    const filteredModels = carModels.filter(car => car.type === selectedType); // Filter car models based on selected type
    return filteredModels.map(car => (
      <div className="max-w-md bg-white relative flex flex-col transition-transform duration-500 rounded-lg" key={car._id}>
      <div className="flex flex-col items-start justify-center w-full">
        <div className="px-5 py-2">
          <div className="flex items-start flex-col justify-start gap-2">

        <h3 className="text-gray-900 font-semibold text-xl  cursor-pointer">
            {car.listingTitle}
          </h3>
          <p className="text-gray-500 font-medium text-xl cursor-pointer">{car.model} </p>
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

          {/* <div className="border-t border-gray-200 my-4 " /> */}
          {/* Display this section on both desktop and mobile screens */}
          <div className="flex flex-col justify-start items-center text-gray-700 ">
            <div className="flex items-center justify-between  w-full ">
              <div className="flex  items-center gap-2">
                <GiSpeedometer className="h-7 w-7  text-zinc" />
                <p className="text-lg font-normal mt-1  text-gray-700 pb-1">{car.maxSpeed} Km/h</p>
              </div>
  

              <div className="flex items-center gap-2 ">
                <LuFuel className="h-7 w-7 text-zinc" />
                <p className="text-lg font-normal mt-1 text-gray-700">{car.powerKw} kW {car.powerPs}</p>
              </div>


              <div className="flex items-center gap-2 ">
                <GiGearStickPattern className="h-7 w-7 text-zinc" />
                <p className="text-lg font-normal mt-1 text-gray-700 pb-1">{car.acceleration}s</p>
              </div>


            </div>
          </div>

          {/* <div className="border-t border-gray-300 my-4 w-full" /> */}
          <div className="flex items-center w-full  justify-center gap-4 mt-6">
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <p className="bg-blue-500 text-white hover:bg-blue-500/90 py-3 px-14 font-normal">Configure</p>
              {/* <PiArrowUpRightThin className="h-6 w-6 text-blue-600" /> */}
            </div>
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <p className="text-zinc border border-zinc py-3 md:px-10 font-normal hover:bg-gray-50 sm:text-sm px-6">Technical Details</p>
              {/* <PiArrowUpRightThin className="h-6 w-6 text-blue-600" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    ));
  };

  const carTypes = ['Sedan', 'SUV', 'Convertible']; // Example car types

return (
  <div className="px-4 md:px-20"> {/* Add padding for mobile screens */}
    <div className='flex items-center justify-between w-full'>
      {introTitle && <h2 className="text-3xl font-mercedes-light mb-4">{introTitle}</h2>} {/* Adjust font size for mobile */}
      {!introTitle && <h2 className="text-3xl font-mercedes-light mb-4">Explorez tous les véhicules</h2>} {/* Adjust font size for mobile */}
      <Link href='/listing' className='md:flex items-center justify-center cursor-pointer hidden'>
        <p className='text-zinc font-medium '>View Details</p>
        <PiArrowUpRightThin className='h-6 w-6 text-zinc ' />
      </Link>
    </div>
    <div className="flex justify-center gap-6 mt-8 flex-wrap"> {/* Updated to wrap items for smaller screens */}
      {/* Render tabs for each car type */}
      {carTypes.map(type => {
        // Filter car models based on the current type
        const filteredModels = carModels.filter(car => car.type === type);
        // Find the latest card image for the current type
        const latestCardImage = filteredModels.length > 0 ? filteredModels[0].cardImages[0] : null;

        return (
          <div 
            key={type} 
            className={`cursor-pointer font-medium text-center ${selectedType === type ? 'border-b-2 border-blue-500' : ''}`} // Apply underline style for the selected type
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
    <div className="border-t border-gray-300 mt-4" />
    <div className="flex flex-col justify-center gap-6 mt-4 md:flex-row md:flex-wrap"> {/* Adjust spacing for mobile */}
      {renderCarCards()}
    </div>
  </div>
);

};

export default Intro;

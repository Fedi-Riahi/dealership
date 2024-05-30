"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const TypeFilter = ({ selectedTypes = [], onChange }) => {
  const [carTypes, setCarTypes] = useState([]);
  const [carData, setCarData] = useState(null); // State to store fetched car data

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carmodels");
        if (!response.ok) {
          throw new Error("Failed to fetch car models");
        }
        const data = await response.json();
        const allCarTypes = data.carListing.map((listing) => listing.type);
        const uniqueTypes = Array.from(new Set(allCarTypes));
        setCarTypes(uniqueTypes); // Exclude "All" option
        setCarData(data); // Store fetched data
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, []);

  const getLastModelCardImage = (type) => {
    if (!carData) return null; // Return null if carData is not available yet
    const lastModel = carData.carListing.find(
      (listing) => listing.type === type
    );
    return lastModel ? lastModel.cardImages[1] : null;
  };

  const handleTypeChange = (event, carType) => {
    const isChecked = event.target.checked;
    const updatedTypes = isChecked
      ? [...selectedTypes, carType]
      : selectedTypes.filter((type) => type !== carType);
    onChange(updatedTypes);
  };

  return (
    <div>
      <ul className="flex flex-col items-start justify-center gap-2">
        {carTypes.map((carType, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`car-type-${index}`}
              value={carType}
              checked={selectedTypes.includes(carType)}
              onChange={(event) => handleTypeChange(event, carType)}
              className="hidden"
            />
            <label
              htmlFor={`car-type-${index}`}
              className={`inline-flex text-sm items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: "100%" }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(carType)}
                onChange={(event) => handleTypeChange(event, carType)}
                className="accent-blue-500 w-6 h-6 text-white border-gray-300 rounded   mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />

              {/* Display last model's card image */}
              {getLastModelCardImage(carType) && (
                <Image
                  src={getLastModelCardImage(carType)}
                  alt={`Card image of ${carType}`}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              )}
              <span className="text-md font-medium pl-4">{carType}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeFilter;

"use client"
import React, { useState, useEffect } from 'react';

const TransmissionFilter = ({ selectedTypes = [], onChange }) => {
  const [transmissionTypes, setTransmissionTypes] = useState([]);

  useEffect(() => {
    const fetchTransmissionTypes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carmodels");
        if (!response.ok) {
          throw new Error("Failed to fetch transmission types");
        }
        const data = await response.json();
        const allTransmissionTypes = data.carListing.map(listing => listing.transmission);
        const uniqueTypes = Array.from(new Set(allTransmissionTypes));
        setTransmissionTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching transmission types:", error);
      }
    };

    fetchTransmissionTypes();
  }, []);

  const handleTypeChange = (event, transmissionType) => {
    const isChecked = event.target.checked;
    const updatedTypes = isChecked
      ? [...selectedTypes, transmissionType]
      : selectedTypes.filter(type => type !== transmissionType);
    onChange(updatedTypes);
  };

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {transmissionTypes.map((transmissionType, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`transmission-type-${index}`}
              value={transmissionType}
              checked={selectedTypes.includes(transmissionType)}
              onChange={(event) => handleTypeChange(event, transmissionType)}
              className="hidden"
            />
            <label
              htmlFor={`transmission-type-${index}`}
              className={`inline-flex text-sm items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: '100%' }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(transmissionType)}
                onChange={(event) => handleTypeChange(event, transmissionType)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded   mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />
              <span className="text-md font-medium">{transmissionType}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransmissionFilter;

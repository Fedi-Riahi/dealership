// ModelFilter Component
"use client"
import React, { useState, useEffect } from 'react';

const ModelFilter = ({ selectedModels = [], onChange }) => {
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await fetch("/api/carmodels");
        if (!response.ok) {
          throw new Error("Failed to fetch car models");
        }
        const data = await response.json();
        const allCarModels = data.carListing.map(listing => listing.model);
        const uniqueModels = Array.from(new Set(allCarModels));
        setCarModels(uniqueModels); // Exclude "All" option
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
    };

    fetchCarModels();
  }, []);

  const handleModelChange = (event, model) => {
    const isChecked = event.target.checked;
    const updatedModels = isChecked
      ? [...selectedModels, model]
      : selectedModels.filter(selectedModel => selectedModel !== model);

    onChange(updatedModels);
  };

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {carModels.map((model, index) => (
          <li key={index}>
            <label
              htmlFor={`model-${index}`}
              className={`inline-flex items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: '100%' }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                id={`model-${index}`}
                value={model}
                checked={selectedModels.includes(model)}
                onChange={(event) => handleModelChange(event, model)}
                className="accent-blue-500 w-6 h-6 text-white border-gray-300 rounded   mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />
              <span className="text-sm font-medium">{model}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelFilter;

"use client"
import React, { useState, useEffect } from 'react';

const CompatibleCarModelsFilter = ({ onChange }) => {
  const [compatibleCarModels, setCompatibleCarModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    const fetchCompatibleCarModels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carparts");
        if (!response.ok) {
          throw new Error("Failed to fetch compatible car models");
        }
        const data = await response.json();
        const allCompatibleCarModels = data.carParts.flatMap(part => part.compatibleCarModels);
        const uniqueModels = Array.from(new Set(allCompatibleCarModels));
        setCompatibleCarModels(uniqueModels);
      } catch (error) {
        console.error("Error fetching compatible car models:", error);
      }
    };

    fetchCompatibleCarModels();
  }, []);

  const handleModelChange = (model) => {
    const updatedModels = selectedModels.includes(model)
      ? selectedModels.filter(selectedModel => selectedModel !== model)
      : [...selectedModels, model];
    setSelectedModels(updatedModels);
  };

  useEffect(() => {
    onChange(selectedModels);
  }, [selectedModels]);

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {compatibleCarModels.map((model, index) => (
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
                onChange={() => handleModelChange(model)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded mr-2"
              />
              <span className="text-md font-medium">{model}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompatibleCarModelsFilter;

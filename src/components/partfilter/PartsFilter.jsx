"use client"
import React, { useState, useEffect } from 'react';

const PartsFilter = ({ onChange }) => {
  const [partsCategories, setPartsCategories] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);

  useEffect(() => {
    const fetchPartsCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carparts");
        if (!response.ok) {
          throw new Error("Failed to fetch parts categories");
        }
        const data = await response.json();
        const allPartsCategories = data.carParts.map(part => part.category);
        const uniqueCategories = Array.from(new Set(allPartsCategories));
        setPartsCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching parts categories:", error);
      }
    };

    fetchPartsCategories();
  }, []);

  const handleTypeChange = (categoryType) => {
    const updatedTypes = selectedParts.includes(categoryType)
      ? selectedParts.filter(type => type !== categoryType)
      : [...selectedParts, categoryType];
    setSelectedParts(updatedTypes);
  };

  useEffect(() => {
    onChange(selectedParts);
  }, [selectedParts]);

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {partsCategories.map((categoryType, index) => (
          <li key={index}>
            <label
              htmlFor={`category-type-${index}`}
              className={`inline-flex items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: '100%' }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                id={`category-type-${index}`}
                value={categoryType}
                checked={selectedParts.includes(categoryType)}
                onChange={() => handleTypeChange(categoryType)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded mr-2"
              />
              <span className="text-md font-medium">{categoryType}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartsFilter;

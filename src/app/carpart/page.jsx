"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CarPartCard from "@/components/carpartcard/CarPartCard";
import PartsFilter from "@/components/partfilter/PartsFilter";
import CompatibleCarModelsFilter from "@/components/compatibleFilter/CompatibleCarModelsFilter ";

const CarParts = () => {
  const [carParts, setCarParts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [displayedCarParts, setDisplayedCarParts] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryFilterChange = (selectedCategories) => {
    setFilteredCategories(selectedCategories);
  };

  const handleModelFilterChange = (selectedModels) => {
    setFilteredModels(selectedModels);
  };

  useEffect(() => {
    const getCarParts = async () => {
      try {
        const res = await fetch("/api/carparts");

        if (!res.ok) {
          throw new Error("Failed to fetch car parts");
        }

        const data = await res.json();

        let filteredCarParts = data.carParts;

        if (filteredCategories.length > 0) {
          filteredCarParts = filteredCarParts.filter((part) =>
            filteredCategories.includes(part.category)
          );
        }

        if (filteredModels.length > 0) {
          filteredCarParts = filteredCarParts.filter((part) =>
            part.compatibleCarModels.some((model) =>
              filteredModels.includes(model)
            )
          );
        }

        setCarParts(filteredCarParts);
      } catch (error) {
        console.log("Error loading car parts", error);
      }
    };

    getCarParts();
  }, [filteredCategories, filteredModels]);

  const loadMoreCarParts = () => {
    setDisplayedCarParts((prev) => prev + 8);
    // Scroll down to the bottom of the car parts container
    const carPartsContainer = document.getElementById("car-parts-container");
    if (carPartsContainer) {
      carPartsContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCarParts = carParts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:px-20 sm:px-5 my-20">
      <div className="flex items-center justify-between w-full mt-4 mb-5 px-4">
        <h3 className="font-mercedes-bold md:w-3/5 md:text-4xl text-2xl w-full">
          Liste des Pièces Automobiles
        </h3>
        <div className="flex flex-col gap-1 w-2/5">
          <div className="md:flex items-center justify-center gap-4 hidden">
            <input
              type="text"
              placeholder="Rechercher un modèle"
              className="w-[900px] px-4 py-3 border border-zinc bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="bg-blue-500 text-white px-8 py-3 hover:bg-blue-500/90">
              Chercher
            </button>
          </div>
          {/* Filter button for mobile */}
          <button
            className="block md:hidden bg-blue-500 text-white py-2 px-4"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>
        </div>
      </div>
      {/* Filter section for mobile */}
      {showFilters && (
        <div>
          {/* Overlay with blur effect */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-10"></div>
          {/* Filter popup */}
          <div className="fixed z-20 inset-10 left-5 right-5 top-10 bottom-10 flex items-center justify-center ">
            <div className="bg-white p-8 rounded-lg max-h-[700px] w-screen overflow-x-scroll">
              <h2 className="text-2xl font-bold mb-4">Filters</h2>
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Catégorie</h3>
                <PartsFilter onChange={handleCategoryFilterChange} />
              </div>
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Modèles Compatibles</h3>
                <CompatibleCarModelsFilter onChange={handleModelFilterChange} />
              </div>
              <button onClick={() => setShowFilters(false)} className="bg-blue-500 text-white py-2 px-4 mt-4">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mx-auto my-15 gap-5">
        {/* Filters section for desktop */}
        <div className="w-1/5 hidden md:block bg-white">
          <div className="mb-2">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">Catégorie</h3>
              <PartsFilter onChange={handleCategoryFilterChange} />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">Modèles Compatibles</h3>
              <CompatibleCarModelsFilter onChange={handleModelFilterChange} />
            </div>
          </div>
        </div>
        {/* Car parts listing section */}
        <div className="w-full flex items-center flex-col mb-40" id="car-parts-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full justify-center items-center">
            {filteredCarParts.slice(0, displayedCarParts).map((part) => (
              <div key={part._id} className="flex justify-center  w-full">
                <CarPartCard part={part} id={part._id} />
              </div>
            ))}
          </div>
          {/* Load More Button */}
          {displayedCarParts < filteredCarParts.length && (
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-8 rounded"
              onClick={loadMoreCarParts}
            >
              Voir Plus
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarParts;

"use client";
import React, { useState, useEffect } from "react";

const CompatibleCarModelsFilter = ({ onChange }) => {
  const [compatibleCarModels, setCompatibleCarModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const fetchCompatibleCarModels = async () => {
      try {
        const response = await fetch("/api/carparts");
        if (!response.ok) {
          throw new Error("Failed to fetch compatible car models");
        }
        const data = await response.json();
        const allCompatibleCarModels = data.carParts.flatMap(
          (part) => part.compatibleCarModels
        );
        const uniqueModels = Array.from(new Set(allCompatibleCarModels));
        setCompatibleCarModels(uniqueModels);
      } catch (error) {
        console.error("Error fetching compatible car models:", error);
      }
    };

    fetchCompatibleCarModels();
  }, []);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  useEffect(() => {
    onChange(selectedModel);
  }, [selectedModel]);

  return (
    <div>
      <select
        value={selectedModel}
        onChange={handleModelChange}
        className="w-full p-2 font-normal text-gray-900 cursor-pointer border border-zinc rounded"
      >
        <option
          value=""
          className="w-full p-2 font-normal text-gray-900 cursor-pointer border border-zinc rounded"
        >
          Sélectionnez un modèle de voiture
        </option>
        <option
          value=""
          className="w-full p-2 font-normal text-gray-900 cursor-pointer border border-zinc rounded"
        >
          Tous les modèles
        </option>
        {compatibleCarModels.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompatibleCarModelsFilter;

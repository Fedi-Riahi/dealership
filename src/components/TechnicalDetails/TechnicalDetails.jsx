// components/TechnicalDetailsModal.jsx
import React from "react";
import Image from "next/image";

const TechnicalDetailsModal = ({ model, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-2/4 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0 backdrop-blur-md" : "translate-x-full backdrop-blur-md"
      } z-50`}
    >
      <div className="p-6 h-full overflow-y-auto ">
        <button
          className="bg-white hover:bg-zinc/10 text-zinc border border-zinc  px-8 py-3 float-right my-4"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
        <div className="my-10">
          <Image src='/dim.webp' alt="e" width={800} height={100} className="object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Model:</span>
            <span>{model.model}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Acceleration:</span>
            <span>{model.acceleration.toFixed(1)} s</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Power:</span>
            <span>
              {model.powerKw} kW / {model.powerPs} PS
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Top Speed:</span>
            <span>{model.maxSpeed} km/h</span>
          </div>
          {/* Add other technical details as needed */}
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsModal;

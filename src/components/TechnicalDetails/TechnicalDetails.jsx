// components/TechnicalDetailsModal.jsx
import React from "react";
import Image from "next/image";

const TechnicalDetailsModal = ({ model, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="p-6">
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 float-right"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
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

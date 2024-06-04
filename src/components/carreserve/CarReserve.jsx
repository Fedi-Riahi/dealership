"use client";
import { useState } from "react";

const CarReserve = ({ isOpen, onClose, carId }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    date: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          date: formData.date,
          phoneNumber: formData.phoneNumber,
          carId: carId,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Reservation submitted successfully!");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        const errorMessage = await response.text();
        console.error("Failed to submit reservation:", errorMessage);
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full">
        <div className="bg-white p-8  w-[550px] relative backdrop-blur-md rounded-lg">
          <span
            className="close text-zinc font-medium rounded-full py-1 w-fit px-3 flex items-center justify-center absolute right-4 top-4 cursor-pointer text-xl"
            onClick={onClose}
          >
            X
          </span>

          <h2 className="text-2xl md:text-4xl font-mercedes-bold mb-4">Demande de Devis</h2>
          {successMessage && (
            <div className="bg-green-100 text-green-900 p-3 mb-3 rounded">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-600 mb-4">
              Pour prendre rendez-vous dans notre salle d'exposition, merci de
              remplir ce formulaire et nous te contacterons dans les plus brefs
              délais.
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-4 flex-1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nom & Prénom"
                  className="border border-gray-300  px-4 py-3 w-full"
                />
              </div>
              <div className="space-y-4 flex-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border border-gray-300  px-4 py-3 w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-4 flex-1">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  className="border border-gray-300  px-4 py-3 w-full"
                />
              </div>
              <div className="space-y-4 flex-1">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Date"
                  className="border border-gray-300  px-4 py-3 w-full"
                />
              </div>
            </div>

            <button className="w-full py-3 px-auto bg-blue-500 my-10 text-white">
              Confirmer
            </button>
            <p className="text-xs">
              En soumettant ce formulaire, vous fixerez un rendez-vous de
              service sans engagement et serez contacté dans les 48 heures par
              un conseiller de service.
            </p>
          </form>
        </div>
      </div>
    )
  );
};

export default CarReserve;

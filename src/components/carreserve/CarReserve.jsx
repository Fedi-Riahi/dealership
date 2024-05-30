"use client"
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
        // Reservation submitted successfully
        setSuccessMessage("Reservation submitted successfully!");
        // Optionally, you can close the modal after a delay
        setTimeout(() => {
          onClose();
          setSuccessMessage(""); // Clear the success message after closing the modal
        }, 2000); // Close the modal after 2 seconds (2000 milliseconds)
      } else {
        // If there was an error, log the error message
        const errorMessage = await response.text();
        console.error("Failed to submit reservation:", errorMessage);
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  
  

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full backdrop-blur-sm">
        <div className="bg-white p-8 w-2/5 relative">
          <span
            className="close text-zinc font-medium rounded-full py-1 w-fit px-3 flex items-center justify-center absolute right-4 top-4 cursor-pointer text-xl"
            onClick={onClose}
          >
            X
          </span>

          <h2 className="text-2xl font-bold mb-4">Showroom rendez vous</h2>
          {successMessage && (
            <div className="bg-green-100 text-green-900 p-3 mb-3 rounded">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-4">
              Pour prendre rendez-vous dans notre salle d&apos;exposition, merci de
              remplir ce formulaire et nous te contacterons dans les plus brefs
              délais.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between w-full gap-5">
                <div className="flex flex-1 flex-col space-y-2">
                  <label htmlFor="firstName" className="text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="border border-gray-300  px-4 py-3"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <label htmlFor="email" className="text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-gray-300  px-4 py-3"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-full gap-5">
                <div className="flex flex-1 flex-col space-y-2">
                  <label htmlFor="phoneNumber" className="text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="border border-gray-300  px-4 py-3"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <label htmlFor="date" className="text-gray-700">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Date"
                    className="border border-gray-300  px-4 py-3"
                  />
                </div>
              </div>
            </div>
            <button className="w-full py-3 px-auto flex items-center justify-center bg-blue-500 my-10 text-white">
              Confirm
            </button>
            <p className="text-sm">
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

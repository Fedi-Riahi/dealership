"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Appointment() {
  const [vin, setVin] = useState("");
  const [carModel, setCarModel] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentSummary, setAppointmentSummary] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(""); // Define selectedDate
  const [selectedTime, setSelectedTime] = useState(""); // Define selectedTime
  const [mobilityOption, setMobilityOption] = useState("");
  const [formData, setFormData] = useState({
    // Define formData
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/service")
      .then((response) => response.json())
      .then((data) => {
        setServices(data.services);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleVinChange = (event) => {
    setVin(event.target.value);
  };

  const handleContinueClick = () => {
    if (!vin.trim()) {
      alert("Please provide a VIN.");
      return;
    }

    fetch(`http://localhost:3000/api/carmodels`)
      .then((response) => response.json())
      .then((data) => {
        const matchingCarModel = data.carListing.find((car) => car.vin === vin);
        if (!matchingCarModel) {
          alert("Car model not found for the provided VIN.");
          return;
        }
        setCarModel(matchingCarModel);
        setCurrentStep(currentStep + 1);
      })
      .catch((error) => console.error("Error fetching car models:", error));
  };

  const handleServiceSelection = (service) => {
    const isServiceSelected = selectedServices.includes(service);

    if (isServiceSelected) {
      const updatedSelectedServices = selectedServices.filter(
        (selectedService) => selectedService !== service
      );
      setSelectedServices(updatedSelectedServices);
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleConfirmAppointment = () => {
    const summary = {
      carModel: carModel,
      services: selectedServices,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      mobilityOption: mobilityOption,
    };
    setAppointmentSummary(summary);
    setCurrentStep(currentStep + 1);
  };

  const handleContactFormSubmit = async () => {
    try {
      const { firstName, lastName, email, phoneNumber } = formData;

      if (!firstName || !lastName || !email || !phoneNumber) {
        alert("Please fill out all the fields.");
        return;
      }

      if (!appointmentSummary) {
        alert("Appointment summary is missing.");
        return;
      }

      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          carVIN: vin,
          ...appointmentSummary, // Include appointment summary data
          status: "Pending", // Assuming default status is "Pending"
        }),
      });

      if (response.ok) {
        console.log("Appointment created successfully");
        // Proceed with further logic, such as redirecting or showing a success message
      } else {
        console.error("Failed to create appointment:", response.statusText);
        // Handle error, show error message to user, etc.
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Background Image */}
      <img
        src="./appointment-image.png"
        alt="Background"
        className="absolute inset-0 object-cover h-full"
      />
      {currentStep === 1 && (
        <div className="z-10 bg-white py-6 px-8 flex flex-col">
          <h2 className="text-3xl font-medium">
            Réservation SAV en quelques clics.
          </h2>
          <span className="text-sm font-normal w-3/5 my-4">
            Planifiez facilement vos entretiens, réparations et autres services
            avec un réparateur Mercedes-Benz près de chez vous.
          </span>
          <span className="mt-2">
            Numéro d’identification du véhicule (VIN)
          </span>
          <input
            type="text"
            placeholder="Enter VIN"
            value={vin}
            onChange={handleVinChange}
            className="w-3/4 py-3 px-2 border border-gray-300 mt-2"
          />
          <span className="text-blue-500 font-medium text-sm mt-2">
            ou puis-je trouver mon VIN?
          </span>
          <button
            onClick={handleContinueClick}
            className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5"
          >
            Continue
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="z-10 bg-white h-screen w-screen py-40 px-40">
          <h2>Sélectionnez une ou plusieurs prestation(s) de service.</h2>
          {services.map((category) => (
            <div key={category._id} className="mt-14">
              <h3 className="text-blue-500 font-semibold text-2xl">
                {category.categoryName}
              </h3>
              <div className="border-t border-gray-300 my-6 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {category.services.map((service) => (
                  <div
                    key={service._id}
                    className={` p-4 rounded-md border border-gray-300 cursor-pointer ${
                      selectedServices.includes(service)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleServiceSelection(service)}
                  >
                    <div className="py-3flex items-center justify-start">{service.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setCurrentStep(3)}
            className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5"
          >
            Continue
          </button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="z-10 bg-white h-screen w-screen py-40 px-40 flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full">
            <div className="flex-1 md:mr-8">
              <h2 className="text-lg font-semibold mb-20">
                Profitez de nos solutions de mobilité. Cette prestation peut
                être payante.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                <div
                  className={`mobility-option ${
                    mobilityOption === "agency" ? "selected" : ""
                  }`}
                  onClick={() => setMobilityOption("agency")}
                >
                  <div className="p-4 rounded-md border border-gray-300 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                        {mobilityOption === "agency" && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <label htmlFor="agency" className="ml-2 cursor-pointer">
                        Come to Agency with Car
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={`mobility-option ${
                    mobilityOption === "tow" ? "selected" : ""
                  }`}
                  onClick={() => setMobilityOption("tow")}
                >
                  <div className="p-4 rounded-md border border-gray-300 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                        {mobilityOption === "tow" && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <label htmlFor="tow" className="ml-2 cursor-pointer">
                        Request Tow Truck
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5"
              >
                Continue
              </button>
            </div>
            <div className="flex-1 flex justify-center items-center mt-8">
              <img
                src="/tow.png"
                alt="Your Image"
                className="object-cover"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      )}

{currentStep === 4 && (
  <div className="z-10 bg-white h-screen w-screen py-12 px-8 flex justify-center items-center">
    <div className="max-w-4xl w-full flex justify-between">
      {/* Left side: Inputs */}
      <div className="flex-1 mr-8">
        <h2 className="text-xl font-bold mb-4">
          Consultez les dates de rendez-vous disponibles et choisissez
          celui qui convient à votre emploi du temps.
        </h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 py-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time:
            </label>
            <input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-1 py-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleConfirmAppointment}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Date & Time
        </button>
      </div>
      {/* Right side: Display available dates */}
      <div className="flex-1">
        <div className=" border border-gray-300 px-6 py-4 rounded-md">
          <h3 className="text-lg font-semibold mb-4">Opening hours</h3>
          <ul className="flex flex-col justify-between items-start gap-4">
            {/* Your available date items */}
            <li className="flex items-center">
                    <span className="mr-2">Saturday</span>
                    <span className="text-zinc font-semibold">
                      10:00 - 17:00
                    </span>
                  </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)}


      {currentStep === 5 && (
        <div className="z-10 bg-white">
          <h2 className="text-xl font-bold mb-4">
            Step 5: Appointment Summary
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold">Appointment Summary:</h3>
            {appointmentSummary && (
              <div className="mb-4">
                <p>
                  Car Model:{" "}
                  {appointmentSummary.carModel
                    ? appointmentSummary.carModel.model
                    : ""}
                </p>
                <p>
                  Selected Services:{" "}
                  {appointmentSummary.services
                    .map((service) => service.name)
                    .join(", ")}
                </p>
                <p>Date and Time: {appointmentSummary.dateTime}</p>
                <p>Date and Time: {appointmentSummary.mobilityOption}</p>
              </div>
            )}
          </div>
          <h3 className="font-semibold mb-2">Contact Information:</h3>
          <form onSubmit={handleContactFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name:
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name:
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone:
              </label>
              <input
                id="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Appointment;

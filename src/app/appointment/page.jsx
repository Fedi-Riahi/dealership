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
  const [bookedDates, setBookedDates] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]); // Define bookedTimes state
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
  const handleDateSelection = (day) => {
    setSelectedDate(day); // Update selectedDate directly with the day string
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time); // Update selectedTime directly with the time string
  };

  const selectedDateString = selectedDate.toString();
  const selectedTimeString = selectedTime.toString();
  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, email, phoneNumber } = formData;

      if (!firstName || !lastName || !email || !phoneNumber) {
        alert("Please fill out all the fields.");
        return;
      }

      if (
        !carModel ||
        !selectedServices.length ||
        !selectedDate ||
        !selectedTime ||
        !mobilityOption
      ) {
        alert("Please complete the appointment details.");
        return;
      }

      const response = await fetch("api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carVIN: vin,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          carModel: carModel,
          services: selectedServices,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          mobilityOption: mobilityOption,
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/appointment");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const appointments = data.appointments;
        const times = appointments.map(
          (appointment) => appointment.selectedTime
        );
        setBookedTimes(times); // Populate bookedTimes state with fetched data
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen relative ">
      {/* Background Image */}
      <img
        src="./appointment-image.png"
        alt="Background"
        className="absolute inset-0 object-cover h-full"
      />
      {currentStep === 1 && (
        <div className="z-10 bg-white py-6 px-8 md:mx-20 mx-4 flex flex-col">
          <h2 className="text-3xl font-medium">
            Réservation SAV en quelques clics.
          </h2>
          <span className="text-sm font-normal md:w-3/5 my-4">
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
        <div className="absolute z-10 bg-white h-screen overflow-y-auto md:my-10 w-screen md:py-40 md:px-40 py-20 px-10">
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
                    <div className="py-3flex items-center justify-start">
                      {service.name}
                    </div>
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
        <div className="z-10 bg-white h-screen w-screen md:py-40 md:px-40 px-10 my-20 flex justify-center items-center">
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
        <div className="z-10 bg-white h-screen w-screen md:py-12 px-8 flex justify-center items-center">
          <div className="max-w-screen flex justify-center items-center mx-auto px-auto">
            {/* Left side: Inputs */}
            <div className="flex-1 mr-8">
              <h2 className="text-xl font-bold mb-4">
                Consultez les dates de rendez-vous disponibles et choisissez
                celui qui convient à votre emploi du temps.
              </h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <div
                        key={day}
                        className={`flex items-center justify-center rounded-md py-2 px-4 border border-gray-300 cursor-pointer ${
                          bookedDates.includes(day) ? "bg-gray-200" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          id={`day-${day}`}
                          name="day"
                          value={day}
                          checked={selectedDate === day}
                          onChange={(e) => handleDateSelection(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor={`day-${day}`}>{day}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {Array.from(Array(5)).map((_, index) => {
                      const hour = 8 + index;
                      const timeString = `${hour}:00`;

                      return (
                        <div
                          key={index}
                          className={`flex items-center rounded-md py-2 px-4 border border-gray-300 cursor-pointer ${
                            bookedTimes.includes(timeString)
                              ? "bg-gray-200"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            id={`time-${hour}`}
                            name="time"
                            value={timeString}
                            checked={selectedTime === timeString}
                            onChange={(e) =>
                              handleTimeSelection(e.target.value)
                            }
                            className="mr-2"
                          />
                          <label htmlFor={`time-${hour}`}>{timeString}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                onClick={handleConfirmAppointment}
                className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5"
              >
                Confirm Date & Time
              </button>
            </div>
            {/* Right side: Display available dates */}
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="z-10 bg-white  md:py-12   my-60 py-40 px-40 h-screen w-screen flex justify-center items-start">
          {/* Left side - Form */}
          <div className="flex-1 mr-8">
            <h2 className="text-xl font-bold mb-4">Détails personnels</h2>
            <h3 className="py-8">
              Ces détails nous aideront à comprendre les meilleurs services pour
              votre véhicule.
            </h3>
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
                  className="md:w-3/4 w-full py-3 px-2 border border-gray-300 mt-2"
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
                  className="md:w-3/4 w-full py-3 px-2 border border-gray-300 mt-2"
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
                  className="md:w-3/4 w-full py-3 px-2 border border-gray-300 mt-2"
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
                  className="md:w-3/4 w-full py-3 px-2 border border-gray-300 mt-2"
                />
              </div>
              <button
                type="submit"
                className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right side - Appointment Summary */}
          <div className="flex-1">
            <div>
              <h3 className="font-semibold">Appointment Summary:</h3>
              {appointmentSummary && (
                <div className="mb-4">
                  <div className="flex items-start justify-center flex-col gap-1 my-4">
                    <span className="text-blue-500">Véhicule</span>
                    <p>
                      {appointmentSummary.carModel
                        ? appointmentSummary.carModel.model
                        : ""}
                    </p>
                    <p>
                      {appointmentSummary.carModel
                        ? appointmentSummary.carModel.vin
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-start justify-center flex-col gap-1 my-4">
                    <span className="text-blue-500">Services</span>
                    <p>
                      {appointmentSummary.services
                        .map((service) => service.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="flex items-start justify-center flex-col gap-1 my-4">
                    <span className="text-blue-500">Date and Time</span>
                    <p> {appointmentSummary.selectedDate}</p>
                    <p> {appointmentSummary.selectedTime}</p>
                  </div>
                  <div className="flex items-start justify-center flex-col gap-1 my-4">
                    <span className="text-blue-500">Mobility</span>
                    <p> {appointmentSummary.mobilityOption}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;

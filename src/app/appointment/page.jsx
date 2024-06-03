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
    fetch("/api/service")
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

    fetch(`/api/carmodels`)
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
  const totalSteps = 4; // Total number of steps
  const progressPercent = ((currentStep - 1) / totalSteps) * 100;
  return (
    <div className="flex justify-center items-center h-screen relative ">
      {/* Background Image */}
      <Image
        src="/appointment-image.png"
        alt="Background"
        className="absolute inset-0 object-cover h-full"
        layout="fill"
      />
      {/* Progress Bar */}
      {currentStep > 1 && (
        <div className="fixed md:-top-2 -top-4 left-2 right-2 h-2 z-40  md:mx-36 mx-4 my-20 bg-gray-100">
          <div className="w-full flex items-center justify-between py-4 bg-gray-100 ">
            <span className="py-2 px-4 text-sm md:text-lg">Services</span>
            <span className="py-2 px-4 text-sm md:text-lg">Mobilité</span>
            <span className="py-2 px-4 text-sm md:text-lg">Date et heure</span>
            <span className="py-2 px-4 text-sm md:text-lg">
              Détails personnels
            </span>
          </div>
          <div
            className="h-full bg-blue-500 z-40 absolute top-0 left-0 "
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
      {currentStep === 1 && (
        <div className="z-10 bg-white py-6 px-8 md:mx-20 mx-4 flex flex-col">
          <h2 className="text-4xl font-mercedes-bold">
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
        <div className="absolute z-10 bg-white h-screen overflow-y-auto md:my-10 w-screen md:py-40 md:px-40 my-32 py-36 px-10">
          <h2 className="text-3xl font-mercedes-bold mb-20">Services</h2>
          <h2 className="text-lg  mb-20">
            Sélectionnez une ou plusieurs prestation(s) de service.
          </h2>
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
                        ? "bg-blue-100 text-blue-500"
                        : "bg-white text-gray-700"
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
          <div className="flex items-center gap-10">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex py-3 px-8 border border-zinc w-fit text-zinc hover:bg-zinc/10 mt-5"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5 hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="z-10 bg-white h-screen w-screen md:py-40 md:px-40 px-10 my-20 flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full">
            <div className="flex-1 md:mr-8">
              <h2 className="text-3xl font-mercedes-bold mb-20">Mobilité</h2>
              <h2 className="text-lg mb-20">
                Profitez de nos solutions de mobilité. Cette prestation peut
                être payante.
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                <div
                  class={`mobility-option ${
                    mobilityOption === "agency" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="agency"
                    name="mobility"
                    value="agency"
                    checked={mobilityOption === "agency"}
                    onChange={() => setMobilityOption("agency")}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="agency"
                    className={`py-4 md:px-40 px-4 px-auto w-full rounded-md border border-gray-300 cursor-pointer inline-flex items-center justify-start ${
                      mobilityOption === "agency"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span class=" cursor-pointer text-center ">
                      No , merci (sauter)
                    </span>
                  </label>
                </div>
                <div
                  class={`mobility-option ${
                    mobilityOption === "tow" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="tow"
                    name="mobility"
                    value="tow"
                    checked={mobilityOption === "tow"}
                    onChange={() => setMobilityOption("tow")}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="tow"
                    className={`py-4  md:px-32 px-4 px-auto w-full rounded-md border border-gray-300 cursor-pointer inline-flex items-center justify-start ${
                      mobilityOption === "tow"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span class=" cursor-pointer">
                      Vehicule de remplacement
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-10 my-10">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex py-3 px-8 bg-white border border-zinc  hover:bg-zinc/10 w-fit text-zinc mt-5"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex py-3 px-8 bg-blue-500 hover:bg-blue-600  w-fit text-white mt-5"
                >
                  Continue
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center mt-8">
              <Image
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
          <div className="w-screen flex justify-center items-center md:mx-32 px-auto">
            {/* Left side: Inputs */}
            <div className="flex-1 ">
            <h2 className="text-3xl font-mercedes-bold mb-20">
            Date et heure
          </h2>
              <h2 className="text-lg font-semibold mb-20 w-full ">
                Consultez les dates de rendez-vous disponibles et choisissez
                celui qui convient à votre emploi du temps.
              </h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-5">Choose a Date</h3>
                  <div className="flex items-center justify-start w-full flex-wrap md:gap-4 gap-4">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <div key={day}>
                        <input
                          type="radio"
                          id={`day-${day}`}
                          name="day"
                          value={day}
                          checked={selectedDate === day}
                          onChange={(e) => handleDateSelection(e.target.value)}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={`day-${day}`}
                          className={`inline-flex md:px-4 px-4 py-3  items-center justify-center w-full  text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-5">Choose a Time</h3>
                  <div className="flex items-center justify-start w-full flex-wrap md:gap-4 gap-4">
                    {Array.from(Array(5)).map((_, index) => {
                      const hour = 8 + index;
                      const timeString = `${hour}:00`;

                      return (
                        <div key={index}>
                          <input
                            type="radio"
                            id={`time-${hour}`}
                            name="time"
                            value={timeString}
                            checked={selectedTime === timeString}
                            onChange={(e) =>
                              handleTimeSelection(e.target.value)
                            }
                            className="hidden peer"
                          />
                          <label
                            htmlFor={`time-${hour}`}
                            className={`inline-flex md:px-4 px-4 py-3 items-center justify-center w-full  text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
                          >
                            {timeString}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex py-3 px-8 bg-white hover:bg-zinc/10 border border-zinc w-fit text-zinc mt-5"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmAppointment}
                  className="flex py-3 px-8 bg-blue-500 w-fit text-white mt-5"
                >
                  Next
                </button>
              </div>
            </div>
            {/* Right side: Display available dates */}
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="z-10 bg-white md:h-screen w-screen  md:py-32  px-8 md:px-36 flex flex-col md:flex-row justify-start items-start">
          {/* Left side - Form */}
          <div className="flex-1 md:mr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-mercedes-bold">Détails personnels</h2>
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
                  className="w-full py-3 px-2 border border-gray-300 mt-2"
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
                  className="w-full py-3 px-2 border border-gray-300 mt-2"
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
                  className="w-full py-3 px-2 border border-gray-300 mt-2"
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
                  className="w-full py-3 px-2 border border-gray-300 mt-2"
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mt-8">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex py-3 px-8 bg-white hover:bg-zinc/10 w-full md:w-auto text-zinc border border-zinc"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex py-3 px-8 bg-blue-500 hover:bg-blue-600 w-full md:w-auto text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Right side - Appointment Summary */}
          <div className="flex-1">
            <div>
              <h3 className="text-3xl font-mercedes-bold">
                Appointment Summary
              </h3>
              {appointmentSummary && (
                <div className="mb-4">
                  <div className="flex flex-col gap-1 my-4">
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
                  <div className="flex flex-col gap-1 my-4">
                    <span className="text-blue-500">Services</span>
                    <p>
                      {appointmentSummary.services
                        .map((service) => service.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 my-4">
                    <span className="text-blue-500">Date and Time</span>
                    <p> {appointmentSummary.selectedDate}</p>
                    <p> {appointmentSummary.selectedTime}</p>
                  </div>
                  <div className="flex flex-col gap-1 my-4">
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

"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyModel from "@/components/model/Model";
import MyCarousel from "@/components/mycarousel/MyCarousel";
import AudioSection from "@/components/audioSection/AudioSection";
import ElecCarousel from "@/components/mycarousel/ElecCarousel";
import TechnicalDetailsModal from "@/components/TechnicalDetails/TechnicalDetails";
import CarReserve from "@/components/carreserve/CarReserve";
import { GiSpeedometer } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";

const ModelDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const isDesktop = useRef(window.innerWidth >= 1024);
  const [model, setModel] = useState(null);
  const [similarModels, setSimilarModels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenReserve, setIsModalOpenReserve] = useState(false);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const modelResponse = await fetch(`/api/carmodels/${id}`);
        if (!modelResponse.ok) {
          throw new Error("Failed to fetch model data");
        }
        const modelData = await modelResponse.json();
        setModel(modelData.model);

        const allModelsResponse = await fetch(`/api/carmodels`);
        if (!allModelsResponse.ok) {
          throw new Error("Failed to fetch all car models");
        }
        const allModelsData = await allModelsResponse.json();

        const similarModelsFiltered = allModelsData.carListing.filter(
          (similarModel) =>
            similarModel.year === modelData.model.year &&
            similarModel._id !== id
        );
        setSimilarModels(similarModelsFiltered);
      } catch (error) {
        console.error("Error fetching model:", error);
        // Handle the error
      }
    };

    fetchModelData();
  }, [id]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpenReserve = () => {
    setIsModalOpenReserve(true);
  };

  const handleModalCloseReserve = () => {
    setIsModalOpenReserve(false);
  };

  if (!model) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className=" flex flex-col items-center justify-center h-full">
        {/* Display the cardImages[2] */}
        <div className="w-full flex flex-col items-center justify-center ">
          <h1
            className={`font-mercedes-bold md:text-8xl text-4xl absolute md:top-16 top-10 text-center opacity-70 pb-80 -z-10 pt-20 transition-all duration-500 w-full  bg-gradient-to-t from-black/10 to-transparent`}
          >
            Mercedes-Benz
          </h1>
          <Image
            src={model.cardImages[1]}
            alt="Car Image"
            width={1100}
            height={1100}
            quality={100}
          />
          {/* Display the h1 elements under the image */}
          <div className="relative flex flex-col items-center justify-center  gap-5 w-full">
            <h1 className="md:text-4xl font-normal mt-4 absolute md:-top-64 -top-28">
              {model.model}
            </h1>
            <h1 className="md:text-7xl text-2xl font-normal px-4 py-2  absolute md:-top-48 -top-16">
              {model.listingTitle}
            </h1>
            <h1 className="md:text-2xl text-md font-normal px-4 py-2  absolute md:-top-24 -top-2">
              À partir de {model.price} DT TTC.
            </h1>
            <div className="absolute md:-top-10 top-10 flex items-center justify-center gap-4">
              {/* Technical Details button */}

              {/* Demand a quote button */}
              <button
                className="md:text-xl text-md font-normal px-8 py-3 text-zinc border border-zinc bg-back   hover:bg-gray-100/20"
                onClick={handleModalOpenReserve}
              >
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </div>
      <CarReserve
        isOpen={isModalOpenReserve}
        onClose={handleModalCloseReserve}
        carId={id}
      />
      <TechnicalDetailsModal
        model={model}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      {/* Specs*/}
      <div className="flex items-center justify-center w-full gap-20 md:px-60 px-auto  mt-20 md:my-80 my-auto py-auto ">
        {/* Details */}
        <div className="flex flex-col md:gap-10 gap-10 my-20">
          <div className="flex flex-col gap-2">
            <h1 className="font-normal md:text-9xl text-6xl mb-4 text-center">
              {model.acceleration.toFixed(1)}
              <span className="font-normal text-2xl"> S </span>
            </h1>
            <span className="text-center">
              Accélération 0 - 100 km/h avec Launch Control
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-normal md:text-9xl text-6xl mb-4 text-center">
              {model.powerKw}
              <span className="font-normal text-2xl"> kW </span> {model.powerPs}
            </h1>
            <span className="text-center">
              Puissance jusqu&apos;à (kW)/Puissance jusqu&apos;à (PS)
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-normal md:text-9xl text-6xl mb-4 text-center">
              {model.maxSpeed}
              <span className="font-normal text-2xl">km/h</span>
            </h1>
            <span className="text-center">Vitesse maximale</span>
          </div>
          <button
            className="md:text-xl text-md font-normal px-8 py-3 text-zinc border border-zinc   bg-back hover:bg-zinc/10"
            onClick={handleModalOpen}
          >
            Détails techniques
          </button>
        </div>
        {/* Image */}
        <div className="w-full hidden md:block">
          <Image
            src={model.cardImages[0]}
            alt="Details Image"
            width={1200}
            height={1100}
            className="ml-14 w-full object-cover h-full"
          />
        </div>
      </div>

      <div className="md:flex flex-col items-center justify-center w-full px-auto mt-20 bg-zinc relative hidden">
        {/* <div className="w-full h-1/2  hidden md:block">
          <Image
            src={model.exteriorImages[3]}
            alt={model.model}
            width={1920} // Set the width of the image
            height={400} // Set a lower height for the image
            className="object-cover "
          />
        </div> */}

        {/* Text */}
        <div className=" flex items-center justify-center flex-col text-center  my-10 relative">
          <span className="md:text-justify mx-auto md:text-6xl text-xl text-start  mt-6 absolute bottom-56 font-mercedes-bold z-20 text-zinc">
            {model.listingTitle}
          </span>
          <span className="text-center mx-auto text-xl w-1/2 py-10  text-white">
            Les rêves sont la motivation la plus forte. Avec le {model.model},
            nous avons transposé cette conviction dans le domaine de
            l&apos;électromobilité et avons ouvert un nouveau chapitre
          </span>
        </div>
      </div>

      <div
        className="md:flex hidden flex-col items-center justify-center w-full px-40 bg-zinc  relative"
        style={{ height: "50vh" }}
      >
        {/* Carousel */}
        <div className="w-full absolute md:-bottom-32">
          <ElecCarousel model={model} />
        </div>
      </div>

      <div className="px-auto md:pt-10 md:my-36  md:h-screen ">
        <h1 className="md:text-4xl text-xl  text-zinc text-center font-mercedes-bold flex items-center justify-center md:mb-20 mb-10">
          {model.listingTitle} Points forts.
        </h1>
        <MyCarousel model={model} />
      </div>
      <div
        className={`px-auto md:py-10 py-4 md:w-full flex h-full items-center flex-col justify-center relative ${
          isDesktop ? "h-full" : "" // Apply the style only if it”s a desktop
        }`}
        style={{ height: isDesktop ? "100vh" : "60vh" }} // Adjust height for desktop
      >
        <h1 className="md:text-4xl text-2xl  w-fit text-zinc x-4 py-2 font-mercedes-bold text-center flex items-center justify-center mt-4 absolute md:-top-16 top-20 md:left-50 z-10">
          L”extérieur de l”{model.listingTitle}
        </h1>
        <MyModel />
      </div>
      <div className="md:px-40 w-full md:my-20   rounded-xl px-4">
        <video
          src={model.videos} // Replace "/video.mp4" with the path to your video file
          autoPlay
          loop
          muted
          className="w-full rounded-xl h-full"
        ></video>
      </div>
      <div className=" flex items-center justify-center w-full">
        <div
          className="py-28 my-20 w-full flex items-center flex-col justify-center relative bg-black "
          style={{ height: "650px" }}
        >
          <div className="absolute top-10 z-20 flex flex-col items-center justify-center gap-5 ">
            <h1 className="text-white md:text-6xl text-2xl font-medium">
              Donner le ton
            </h1>
            <span className="text-white md:text-xl font-normal text-center">
              Découvrez le son inimitable de la {model.listingTitle} dès
              maintenant
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10 w-full ">
            <div className="flex justify-center items-center relative">
              <div className="mx-4 absolute -z-20 mt-20">
                <Image
                  src="/dash.avif" // Check the image path
                  alt="Dashboard"
                  width={900}
                  height={800}
                  className="object-cover"
                />
              </div>
              <div className="mx-4 mt-20">
                <Image
                  src="/steer.avif" // Check the image path
                  alt="Steering"
                  width={1250}
                  height={800}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-14">
            <AudioSection model={model} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-auto my-20">
        <h1 className="text-4xl font-mercedes-bold mb-8 text-left w-full px-20">
          Modèles de voitures similaires
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {similarModels.slice(0, 4).map((similarModel) => (
            <div
              className="flex flex-col items-start justify-center w-full"
              key={similarModel._id}
            >
              <div className="px-5 py-2">
                <div className="flex items-start flex-col justify-start gap-2">
                  <h3 className="text-gray-900 font-semibold text-xl  cursor-pointer">
                    {similarModel.listingTitle}
                  </h3>
                  <p className="text-gray-500 font-medium text-xl cursor-pointer">
                    {similarModel.model}{" "}
                  </p>
                </div>
                <Image
                  src={similarModel.cardImages[0]}
                  alt={similarModel.listingTitle}
                  width={280}
                  height={280}
                  className="w-full object-cover"
                />
              </div>
              <div className="flex flex-col px-4 my-2 w-full">
                {/* <div className="border-t border-gray-200 my-4 " /> */}
                {/* Display this section on both desktop and mobile screens */}
                <div className="flex flex-col justify-start items-center text-gray-700 ">
                  <div className="flex items-center justify-between  w-full ">
                    <div className="flex  items-center gap-2">
                      <GiSpeedometer className="h-7 w-7  text-zinc" />
                      <p className="text-lg font-normal mt-1  text-gray-700 pb-1">
                        {similarModel.maxSpeed} Km/h
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <LuFuel className="h-7 w-7 text-zinc" />
                      <p className="text-lg font-normal mt-1 text-gray-700">
                        {similarModel.powerKw} kW {similarModel.powerPs}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <GiGearStickPattern className="h-7 w-7 text-zinc" />
                      <p className="text-lg font-normal mt-1 text-gray-700 pb-1">
                        {similarModel.acceleration}s
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-1 cursor-pointer w-full mt-10 ">
                  <p className="text-white bg-blue-500 py-4 md:px-10 font-normal hover:bg-blue-600 text-md sm:text-sm px-6 w-full text-center">
                    Détails techniques
                  </p>
                  {/* <PiArrowUpRightThin className="h-6 w-6 text-blue-600" /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;

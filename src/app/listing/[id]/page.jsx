"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import MyModel from "@/components/model/Model";
import MyCarousel from "@/components/mycarousel/MyCarousel";
import AudioSection from "@/components/audioSection/AudioSection";
import ElecCarousel from "@/components/mycarousel/ElecCarousel";

const ModelDetails = () => {
  const pathname = usePathname();
  const isDesktop = window.innerWidth >= 1024;
  const id = pathname.split("/").pop();

  if (!id) {
    return <div className="text-center">No ID provided</div>;
  }

  const [model, setModel] = useState(null);
  const [similarModels, setSimilarModels] = useState([]);
  const scrollContainerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState([]);

  const [topPosition, setTopPosition] = useState("-top-40");
  const [acceleration, setAcceleration] = useState(0);
  const [kw, setKw] = useState(0);
  const [ps, setPs] = useState(0);
  const [topSpeed, setTopSpeed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopPosition("top-28");
    }, 500); // Adjust the delay time as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []); // This effect will run only once on component mount

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        // Fetch details of the current model
        const modelResponse = await fetch(
          `http://localhost:3000/api/carmodels/${id}`
        );
        if (!modelResponse.ok) {
          throw new Error("Failed to fetch model data");
        }
        const modelData = await modelResponse.json();
        setModel(modelData.model);

        // Fetch all car models
        const allModelsResponse = await fetch(
          `http://localhost:3000/api/carmodels`
        );
        if (!allModelsResponse.ok) {
          throw new Error("Failed to fetch all car models");
        }
        const allModelsData = await allModelsResponse.json();

        // Filter similar models based on the year of the current model
        const similarModelsFiltered = allModelsData.carListing.filter(
          (similarModel) =>
            similarModel.year === modelData.model.year &&
            similarModel._id !== id
        );
        setSimilarModels(similarModelsFiltered);

        // Set the current image once the model data is fetched
        setCurrentImage(modelData.model.exteriorImages[0]);
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchModelData();
  }, [id]);

  if (!model) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className=" flex flex-col items-center justify-center h-full">
        {/* Display the cardImages[2] */}
        <div className="w-full flex flex-col items-center justify-center ">
          <h1
            className={`font-mercedes-light md:text-8xl text-4xl absolute md:top-20 top-16 text-center opacity-70 pb-80 -z-10 pt-20 transition-all duration-500 w-full  bg-gradient-to-t from-black/10 to-transparent`}
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
            <h1 className="md:text-4xl font-normal mt-4 absolute md:-top-60 -top-28">
              {model.model}
            </h1>
            <h1 className="md:text-7xl text-2xl font-normal px-4 py-2  absolute md:-top-44 -top-16">
              {model.listingTitle}
            </h1>
            <h1 className="md:text-2xl text-md font-normal px-4 py-2  absolute md:-top-20 -top-2">
              From {model.price} DT including VAT.
            </h1>
          </div>
        </div>
      </div>
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
              Acceleration 0 - 100 km/h with Launch Control
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-normal md:text-9xl text-6xl mb-4 text-center">
              {model.powerKw}
              <span className="font-normal text-2xl"> kW </span> {model.powerPs}
            </h1>
            <span className="text-center">
              Power up to (kW)/Power up to (PS)
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-normal md:text-9xl text-6xl mb-4 text-center">
              {model.maxSpeed}
              <span className="font-normal text-2xl">km/h</span>
            </h1>
            <span className="text-center">Top speed</span>
          </div>
        </div>
        {/* Image */}
        <div className="w-full hidden md:block">
          <Image
            src={model.cardImages[2]}
            alt="Details Image"
            width={1200}
            height={1100}
            className="ml-14 w-full object-cover h-full"
          />
        </div>
      </div>

      <div className="md:flex flex-col items-center justify-center w-full px-auto mt-20 bg-zinc relative hidden">
        <div className="w-full  hidden md:block">
          <Image
            src={model.exteriorImages[3]}
            alt={model.model}
            layout="responsive"
            width={1920} // Set the width of the image
            height={600} // Set a lower height for the image
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className=" flex items-center justify-center flex-col text-center text-white my-10">
          <span className="md:text-justify mx-auto md:text-4xl text-xl text-start  mt-6">
            {model.listingTitle}
          </span>
          <span className="text-center mx-auto max-w-2xl mt-6">
            Les rêves sont la motivation la plus forte. Avec le {model.model},
            nous avons transposé cette conviction dans le domaine de
            l’électromobilité et avons ouvert un nouveau chapitre
          </span>
        </div>
      </div>

      <div
        className="md:flex hidden flex-col items-center justify-center w-full px-auto bg-zinc  relative"
        style={{ height: "60vh" }}
      >
        {/* Carousel */}
        <div className="w-full absolute md:bottom-4">
          <ElecCarousel model={model} />
        </div>
      </div>

      <div className="px-auto md:pt-10 my-10  md:h-screen ">
        <h1 className="md:text-4xl text-xl  text-zinc text-center font-medium flex items-center justify-center md:mb-20 mb-10">
          {model.listingTitle} Highlights.
        </h1>
        <MyCarousel model={model} />
      </div>
      <div
        className={`px-auto md:py-10 md:w-full flex items-center flex-col justify-center relative ${
          isDesktop ? "h-1/2" : "" // Apply the style only if it's a desktop
        }`}
        style={{ height: isDesktop ? "120vh" : "80vh" }} // Adjust height for desktop
      >
        <h1 className="md:text-3xl text-2xl md:bg-zinc w-fit md:text-white px-4 py-2 font-medium text-center flex items-center justify-center mt-4 absolute md:-top-16 top-20 md:left-50 z-10">
          Experience the SL legend, retold at top speed by Mercedes-AMG
        </h1>
        <MyModel />
      </div>
      <div className="md:px-40 w-full md:my-20  rounded-xl px-4">
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
              Setting the tone
            </h1>
            <span className="text-white md:text-xl font-normal text-center">
              Discover the unmistakable sound of the {model.listingTitle} now
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
    </div>
  );
};

export default ModelDetails;

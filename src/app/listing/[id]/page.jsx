"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CiShoppingTag } from "react-icons/ci";
import { IoCarSportOutline } from "react-icons/io5";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiGasPump } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { PiSteeringWheelLight } from "react-icons/pi";
import { PiEngineLight } from "react-icons/pi";
import { IoColorFillOutline } from "react-icons/io5";
import { IoIosBarcode } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
import { PiCylinder } from "react-icons/pi";
import { GiSpeedometer } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { PiArrowUpRightThin } from "react-icons/pi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import MyModel from "@/components/model/Model";
import Carousel from "@/components/mycarousel/MyCarousel";
import MyCarousel from "@/components/mycarousel/MyCarousel";
import AudioSection from "@/components/audioSection/AudioSection";

const ModelDetails = () => {
  const pathname = usePathname();
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
            className={`font-mercedes-light text-8xl absolute top-20 text-center opacity-70 pb-80 -z-10 pt-20 transition-all duration-500 w-full  bg-gradient-to-t from-black/10 to-transparent`}
          >
            Mercedes-Benz
          </h1>
          <Image
            src={model.cardImages[1]}
            alt="Car Image"
            width={1200}
            height={1080}
          />
          {/* Display the h1 elements under the image */}
          <div className="relative flex flex-col items-center justify-center  gap-5 w-full">
            <h1 className="text-2xl font-normal mt-4 absolute -top-60">
              {model.model}
            </h1>
            <h1 className="text-7xl font-normal px-4 py-2  absolute -top-44">
              {model.listingTitle}
            </h1>
          </div>
        </div>
      </div>
      {/* Specs*/}
      <div
        className="flex items-center justify-between w-full px-60 mt-20 my-60 "
      >
        {/* Details */}
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="font-normal text-9xl">
              {model.acceleration.toFixed(1)}
            </h1>
            <span>Acceleration 0 - 100 km/h with Launch Control</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-normal text-9xl">
              {model.powerKw}
              <span className="font-normal text-2xl">kW /</span> {model.powerPs}
              <span className="font-normal text-2xl">PS</span>
            </h1>
            <span className="mb-5">Power up to (kW)/Power up to (PS)</span>
            <span>
              Pour plus de précisions sur la méthode de mesure des valeurs
              spécifiées, voir www.porsche.com/gtr21
            </span>
          </div>
          <div>
            <h1 className="font-normal text-9xl">
              {model.maxSpeed}
              <span className="font-normal text-2xl">km/h</span>
            </h1>
            <span>Top speed</span>
          </div>
        </div>
        {/* Image */}
        <div className="ml-auto">
          <Image
            src={model.cardImages[0]}
            alt="Details Image"
            width={900}
            height={200}
          />
        </div>
      </div>
      <div className="flex mx-auto items-center justify-center gap-20 my-60  " style={{ height: "100vh" }}>
        {/* Last Image */}
        <div className="relative">
          <Image
            src={model.exteriorImages[model.exteriorImages.length - 1]} // Accessing the last image
            alt="Image"
            width={800}
            height={800}
            className="rounded-xl shadow-xl object-cover"
          />
          <div className="absolute -top-44 left-0 z-10">
            <p className="text-zinc text-4xl">Up to</p>
            <p className="text-zinc text-9xl">{model.torque} <span className="text-zinc text-4xl">Nm</span></p>
          </div>
        </div>
        {/* Second-to-Last Image */}
        <div className="relative">
          <Image
            src={model.exteriorImages[model.exteriorImages.length - 2]} // Accessing the second-to-last image
            alt="Image"
            width={800}
            height={800}
            className="rounded-xl shadow-xl mb-28 object-cover"
          />
           <div className="absolute -top-44 left-0 z-10">
            <p className="text-zinc text-4xl">Up to</p>
            <p className="text-zinc text-9xl">{model.horsePower} <span className="text-zinc text-4xl">HP</span></p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full gap-20 px-auto my-80 bg-zinc h-screen relative">
        <h1 className="absolute -top-60 font-mercedes-light text-8xl opacity-45  transition-all duration-500">
          Mercedes-Benz
        </h1>
        {/* First image */}
        <div className="absolute -top-28 left-40 transition-all duration-500 transform hover:scale-105">
          <Image
            src="/m1.avif"
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-xl object-cover"
          />
        </div>
        {/* Second image */}
        <div className="absolute -bottom-40 right-28 transition-all duration-500 transform hover:scale-105">
          <Image
            src="/m2.avif"
            alt="Image"
            width={600}
            height={600}
            className="rounded-xl mb-38 object-cover"
          />
        </div>
        {/* Third image */}
        <div className="absolute -bottom-60 left-68 transition-all duration-500 transform hover:scale-105">
          <Image
            src="/m3.avif"
            alt="Image"
            width={400}
            height={600}
            className="rounded-xl object-cover mt-40"
          />
        </div>
        <div className="absolute left-40 bottom-48 ">
          <h1 className="text-white text-6xl w-1/2">Timeless inspiration</h1>
          <p className="text-white  w-1/3 text-justify mt-10 ">
            The SL stands for performance at its most elegant. It’s a blend of
            pure comfort, raw emotion and formidable power – words that can only
            begin to capture the essence of the SL experience. To truly grasp
            it, you have to drive it for yourself. Then you’ll see why the SL
            has remained a class-leading star for generations.
          </p>
        </div>
      </div>

      <div
        className="px-auto pt-20  h-screen "
        style={{ height: "105vh" }}
      >
        <h1 className="text-4xl  text-zinc text-center font-medium flex items-center justify-center mb-20">
          {model.listingTitle} Highlights.
        </h1>
        <MyCarousel model={model} />
      </div>
      <div
        className="px-auto py-10 w-full flex items-center flex-col justify-center relative "
        style={{ height: "120vh" }}
      >
        <h1 className="text-xl text-gray-800/30 font-medium text-center flex items-center justify-center mb-10 absolute top-16 left-28 z-10">
          360
        </h1>
        <h1 className="text-3xl text-white+ font-medium text-center flex items-center justify-center mb-10 absolute top-24 left-28 z-10">
          Experience the SL legend, retold at top speed by Mercedes-AMG
        </h1>
        <MyModel />
      </div>
      <div
        className="px-40 w-full my-20 rounded-xl"
        style={{ height: "890px" }}
      >
        <video
          src={model.videos} // Replace "/video.mp4" with the path to your video file
          autoPlay
          loop
          muted
          className="w-full rounded-xl h-full"
        ></video>
      </div>
      <div className="px-40 flex items-center justify-center">
        <div
          className="py-28 my-20 w-full flex items-center flex-col justify-center relative bg-black rounded-xl"
          style={{ height: "650px" }}
        >
          <div className="absolute top-10 z-20 flex flex-col items-center justify-center gap-5 ">
            <h1 className="text-white text-6xl font-medium">
              Setting the tone
            </h1>
            <span className="text-white text-xl font-normal text-center">
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
            <AudioSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;

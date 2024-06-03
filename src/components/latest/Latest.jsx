"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Importing ChevronLeftIcon and ChevronRightIcon from Heroicons
import { PiArrowUpRightThin } from "react-icons/pi";
import Link from "next/link";
const Latest = () => {
  const newsData = [
    {
      id: 1,
      title: "Classe S Berline 1",
      description: "Configurez le véhicule de vos rêves.",
      image:
        "https://www.mercedes-benz.com/content/dam/brandhub/assets/vehicles/mercedes-maybach/mercedes-maybach-s-class-z223/teaser/11-2020/images/mercedes-maybach-s-class-z223-teaser-image-2560x1440-11-2020.cbv20230517105538.jpg/_jcr_content/renditions/mq8-original-aspect.jpeg",
    },
    {
      id: 2,
      title: "Classe S Berline 2",
      description: "Configurez le véhicule de vos rêves.",
      image:
        "https://www.mercedes-benz.com/content/dam/brandhub/assets/innovation/milestones/history/D814465-2560x1440.cbv20240423102814.jpg/_jcr_content/renditions/mq8-original-aspect.jpeg",
    },
    {
      id: 3,
      title: "Classe S Berline 3",
      description: "Configurez le véhicule de vos rêves.",
      image:
        "https://www.mercedes-benz.com/content/dam/brandhub/assets/innovation/concept-cars/vision-one-eleven/stage/06-2023/images/mercedes-benz-vision-111-stage-3840x2160-06-2023.cbv20230606193723.jpg/_jcr_content/renditions/mq8-original-aspect.jpeg",
    },
    {
      id: 4,
      title: "Classe S Berline 4",
      description: "Configurez le véhicule de vos rêves.",
      image:
        "https://www.mercedes-benz.com/content/dam/brandhub/assets/sustainability/responsibility/300-slr/02-mercedes-benz-classic-300-slr-article-2022-2560x1440.cbv20230517110045.jpg/_jcr_content/renditions/mq8-original-aspect.jpeg",
    },
    // other news data...
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % newsData.length);
  };

  const prevSlide = () => {
    const newIndex =
      currentSlide - 1 < 0 ? newsData.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const visibleNews = [
    newsData[currentSlide],
    newsData[(currentSlide + 1) % newsData.length],
  ];

  return (
    <div className="latest-news pb-20 md:mx-20 mx-5">
      {" "}
      {/* Added margin on left and right sides */}
      <div className="flex items-center justify-between w-full my-6">
        <h2 className="text-5xl font-mercedes-bold mb-4">Actualité</h2>
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <Link href="/news" className="text-zinc font-medium">
            Voir Plus
          </Link>
          <PiArrowUpRightThin className="h-6 w-6 text-zinc" />
        </div>
      </div>
      <div className="relative my-6">
        <div className="flex overflow-hidden relative">
          {visibleNews.map((news) => (
            <div key={news.id} className="w-1/2 px-2">
              {" "}
              {/* Adjust card width */}
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-auto"
              />
              <div className="absolute bottom-24 left-2 w-1/4 h-full bg-gradient-to-r from-black opacity-50 my-4"></div>
              <div className="absolute bottom-24 right-2 w-1/4 h-full bg-gradient-to-l from-black opacity-50 my-4"></div>
              <h3 className="text-4xl font-mercedes-bold px-4 cursor-pointer pt-4 ">
                {news.title}
              </h3>
              <p className="text-2xl text-gray-500 px-4 cursor-pointer py-3 ">
                {news.description}
              </p>
            </div>
          ))}
        </div>
        <button
          className="prev-btn absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 mx-4 hover:bg-gray-300 transition duration-300 focus:outline-none"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800 " />
        </button>
        <button
          className="next-btn absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 mx-4 hover:bg-gray-300 transition duration-300 focus:outline-none"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Latest;

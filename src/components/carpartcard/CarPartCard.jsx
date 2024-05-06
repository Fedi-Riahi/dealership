"use client"
import React, { useState, useEffect, Suspense, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { Context } from "@/app/context/page";

const CarPartCard = ({ part }) => {
  const { handleAddToCart } = useContext(Context);
  const addToCart = () => {
    handleAddToCart(part);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-sm relative flex flex-col transition-transform duration-500 border border-gray-300">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!part) {
    return null;
  }

  return (
    <div className="max-w-xs h-full bg-white relative flex flex-col transition-transform duration-500 border border-gray-200">
      <div className="w-full flex flex-col items-start justify-center px-4 py-4 gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full h-48 mb-4">
              <Image
                src={part.images[0]}
                alt={part.name}
                className="object-cover w-full h-full"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} // Set width and height
                width={200}
                height={200}
              />
          </div>
        </Suspense>
        <p className="text-white mb-2 cursor-pointer bg-blue-500 px-3 py-1 w-fit absolute top-5 left-5">
          {part.category}
        </p>
        <div className="w-full flex flex-col relative">
        <Link href={`/carpart/${part._id}`}>
            <h3 className="text-gray-900 font-semibold mb-2 cursor-pointer" style={{ maxHeight: "3.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {part.name}
            </h3>
          </Link>
          <p className="text-zinc font-semibold text-xl ">{part.price} DT</p>
          <div className="flex items-center justify-center gap-1 cursor-pointer  px-6 py-3 mt-5 text-blue-500 border border-blue-500 hover:bg-blue-600 hover:text-white " onClick={addToCart}>
            <CiShoppingCart className="h-6 w-6" />
            <p className=" font-normal sm:text-sm">Ajouter au panier</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPartCard;

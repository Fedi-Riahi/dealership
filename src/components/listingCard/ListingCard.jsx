"use client";
import React, { useState, useEffect } from "react";
import { GiSpeedometer } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { PiArrowUpRightThin } from "react-icons/pi";
import Image from "next/image";
import CarReserve from "@/components/carreserve/CarReserve";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const ListingCard = ({ listing }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (!session) {

      setIsModalOpen(true);
    
  };
}

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      <div className="max-w-md relative flex flex-col transition-transform duration-500 border border-gray-300">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  return (
    <div className="max-w-md bg-white relative flex flex-col transition-transform duration-50 mx-4">
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" py-2">
          <Image
            src={listing.cardImages[0]}
            alt={listing.listingTitle}
            width={300}
            height={300}
            className="w-full object-cover"
          />
          <div className="flex flex-col  my-4 w-full">
            <div className="flex items-center justify-start gap-5 sm:gap-2">
              <Link
                key={listing._id}
                href={`/listing/${listing._id}`}
                className="cursor-default"
              >
                <h3 className="text-gray-900 font-semibold text-xl   cursor-pointer">
                  {listing.listingTitle}
                </h3>
              </Link>
            </div>
            <p className="text-gray-500 font-medium text-xl cursor-pointer">
              {listing.model}
            </p>
          </div>
          {/* <div className="border-t border-gray-200 my-4 " /> */}
          {/* Display this section on both desktop and mobile screens */}
          <div className="flex flex-col justify-start items-center text-gray-700 ">
            <div className="flex flex-col  w-full ">
              <div className="flex  items-center gap-2">
                <GiSpeedometer className="h-5 w-5  text-zinc" />
                <p className="font-normal mt-1  text-gray-700 pb-1">
                  {listing.maxSpeed} Km/h
                </p>
              </div>
              <p className="text-sm">Vitesse maximale</p>
              <div className="w-full border-t border-gray-200 my-2" />
              <div className="flex items-center gap-2 ">
                <LuFuel className="h-5 w-5 text-zinc" />
                <p className="font-normal mt-1 text-gray-700">
                  {listing.powerKw} kW /  {listing.powerKw ? 'PS' : ''}
                </p>
              </div>
              <p className="text-sm">Puissance jusqu'à (kW)/Puissance jusqu'à (PS)</p>
              <div className="w-full border-t border-gray-200 my-2" />
              <div className="flex items-center gap-2 ">
                <GiGearStickPattern className="h-5 w-5 text-zinc" />
                <p className="font-normal mt-1 text-gray-700 pb-1">
                  {listing.acceleration}s
                </p>
              </div>
              <p className="text-sm">
              Accélération 0 - 100 km/h avec Launch Control
              </p>
            </div>
          </div>

          {/* <div className="border-t border-gray-300 my-4 w-full" /> */}
          <div className="flex items-center w-full  justify-between mt-6 gap-5">
            <div className=" flex items-center justify-center gap-1 cursor-pointer w-full">
              <Link
              href={`/listing/${listing._id}`}
                className="bg-blue-500 text-white  py-3 px-8 font-normal w-full text-center"
              >
                Détails techniques
              </Link>
              {/* <PiArrowUpRightThin className="h-6 w-6 text-blue-600" /> */}
            </div>
          </div>
          {/* Modal overlay */}
          <CarReserve isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

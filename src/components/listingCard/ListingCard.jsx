"use client";
import React, { useState, useEffect } from "react";
import { GiSpeedometer } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { PiArrowUpRightThin } from "react-icons/pi";
import Image from "next/image";

const ListingCard = ({ listing }) => {
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
    <div className="max-w-md bg-white relative flex flex-col transition-transform duration-500 rounded-lg">
      <div className="flex flex-col items-start justify-center w-full">
        <div className="px-5 py-2">
          <Image
            src={listing.cardImages[0]}
            alt={listing.listingTitle}
            width={300}
            height={300}
            className="w-full object-cover"
          />
          <div className="flex items-center justify-start gap-5">

        <h3 className="text-gray-900 font-semibold text-xl  cursor-pointer">
            {listing.listingTitle}
          </h3>
          <p className="text-gray-500 font-medium text-xl cursor-pointer">{listing.model}</p>
          </div>
        </div>
        <div className="flex flex-col px-4 my-4 w-full">

          {/* <div className="border-t border-gray-200 my-4 " /> */}
          {/* Display this section on both desktop and mobile screens */}
          <div className="flex flex-col justify-start items-center text-gray-700 ">
            <div className="flex flex-col  w-full ">
              <div className="flex  items-center gap-2">
                <GiSpeedometer className="h-5 w-5  text-zinc" />
                <p className="font-normal mt-1  text-gray-700 pb-1">220 Km/h</p>
              </div>
                <p className="text-sm">Top speed</p>
                <div className="w-full border-t border-gray-200 my-2"/>
              <div className="flex items-center gap-2 ">
                <LuFuel className="h-5 w-5 text-zinc" />
                <p className="font-normal mt-1 text-gray-700">320 kW / 424 PS</p>
              </div>
              <p className="text-sm">power up to (kW) power up to (PS)</p>
              <div className="w-full border-t border-gray-200 my-2"/>
              <div className="flex items-center gap-2 ">
                <GiGearStickPattern className="h-5 w-5 text-zinc" />
                <p className="font-normal mt-1 text-gray-700 pb-1">4.7s</p>
              </div>
              <p className="text-sm">Acceleration from 0 to 100 Km/h with launch control</p>

            </div>
          </div>

          {/* <div className="border-t border-gray-300 my-4 w-full" /> */}
          <div className="flex items-center w-full  justify-between mt-6">
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <p className="text-white bg-zinc py-3 px-10 font-normal">Configure</p>
              {/* <PiArrowUpRightThin className="h-6 w-6 text-blue-600" /> */}
            </div>
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <p className="text-zinc border border-zinc py-3 px-4 font-normal">Technical Details</p>
              {/* <PiArrowUpRightThin className="h-6 w-6 text-blue-600" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

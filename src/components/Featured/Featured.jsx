import React from "react";
import Link from "next/link";

function FeatureSection() {
  return (
    <div className="flex flex-col items-center justify-center py-10 relative my-4 mx-5 md:mx-24 lg:mx-40 xl:mx-96">
      <img
        src="/featured.png"
        alt="Feature"
        className="w-full md:w-4/5 h-auto mb-8 -z-10"
      />
      <div className="w-full h-full flex items-center justify-center">
        {/* First Feature */}
        <div className="absolute top-10 md:top-40 left-4 md:left-12 text-center z-20 bg-gray-500 px-6 md:px-10 py-2">
          <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-white">
            800 kW
          </h3>
          <p className="text-xs md:text-base text-white">Power in kW</p>
        </div>
        {/* Second Feature */}
        <div className="absolute top-28 md:top-28 right-4 md:right-28 text-center z-20 bg-gray-500 px-6 md:px-10 py-2">
          <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-white">
            Twin Turbo
          </h3>
          <p className="text-xs md:text-base text-white">Turbo Charged</p>
        </div>
        {/* Third Feature */}
        <div className="absolute bottom-72 md:bottom-48 left-8 md:left-24 text-center z-20 bg-gray-500 px-6 md:px-10 py-2">
          <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-white">
            915 PH
          </h3>
          <p className="text-xs md:text-base text-white">Horse Power</p>
        </div>
      </div>
      <Link
        href="/listing"
        className="text-center px-10 py-3 border border-zinc text-zinc font-medium hover:bg-zinc/10  md:mt-0 mt-10"
      >
        Voir Plus
      </Link>
    </div>
  );
}

export default FeatureSection;

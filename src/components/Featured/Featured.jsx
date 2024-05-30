import React from 'react';

function FeatureSection() {
  return (
    <div className=" flex flex-col items-center justify-center py-10 relative">
      <img src="/featured.png" alt="Feature" className="w-4/5 h-auto mb-8 -z-10" /> {/* Set width to half and height to auto */}
      <div className="  w-full h-full flex items-center justify-center ">
        {/* First Feature */}
        <div className="absolute md:top-40 md:left-12 top-2 text-center z-20 bg-gray-500 px-10 py-2 ">
          <h3 className="text-lg font-bold mb-2 text-white">800 kW</h3>
          <p className="text-white">Power in kW</p>
        </div>
        {/* Second Feature */}
        <div className="absolute md:top-28 md:right-28  right-2  top-40 z-20 bg-gray-500 px-10 py-2 text-center">
          <h3 className="text-lg font-bold mb-2 text-white">Twin Turbo</h3>
          <p className="text-white">Turbo Charged</p>
        </div>
        {/* Third Feature */}
        <div className="absolute md:bottom-48 z-20 md:left-24 left-8 bottom-10 text-center bg-gray-500 px-10 py-2">
          <h3 className="text-lg font-bold mb-2 text-white">915 PH</h3>
          <p className="text-white">Horse Power</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;

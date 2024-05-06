import React from 'react';

function AboutService() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side: Image */}
        <div className="w-full md:w-1/2">
          <img src="./imageService.png" alt="Car" className="w-full h-auto" />
        </div>
        {/* Right side: Title, Description, Button */}
        <div className="w-full md:w-1/2 px-10 py-10 bg-gray-900 flex items-start justify-center flex-col"> {/* Change background color here */}
          <h2 className="text-4xl md:text-6xl py-5 font-mercedes-light mb-4 text-white text-center md:text-left">Vous avez besoin d’un service pour votre Mercedes ?</h2>
          <p className="text-lg md:text-xl mb-4 py-5 text-white text-center md:text-left">
            Nous sommes là pour vous ! Prenez rendez-vous dès maintenant et profitez d’un traitement VIP pour votre précieuse voiture. Nos experts sont prêts à vous accueillir.
          </p>
          <button className="text-white border px-8 py-3 hover:text-gray-600">Reserver</button>
        </div>
      </div>
    </div>
  );
}

export default AboutService;

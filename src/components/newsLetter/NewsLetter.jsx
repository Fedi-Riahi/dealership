import React from "react";

function Newsletter() {
  const bgImageStyle = {
    backgroundImage: `url('/bg-news.png')`, // Specify the URL of the background image
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="flex items-center justify-center py-10 w-full md:px-20 px-4"
      style={bgImageStyle}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-8">
        {/* Left side: Image */}
        <div className="hidden md:block w-full md:w-1/2 order-1 md:order-2 animate-slideLeft">
          <img src="/car-news.png" alt="Newsletter" className="w-full h-auto" />
        </div>
        {/* Right side: Title, Text, and Newsletter Input */}
        <div className="w-full md:w-1/2 order-2  md:order-1 animate-slideRight">
          <div className="mb-4">
            <h2 className="text-5xl font-mercedes-bold py-4 text-white  w-3/4">
              Voulez-vous recevoir des offres spéciales ?
            </h2>
            <p className="text-gray-300 w-full md:w-3/4 py-4 text-lg">
              Soyez le premier à recevoir toutes les informations sur nos produits et nos nouvelles voitures par e-mail en vous inscrivant à notre liste de diffusion.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 my-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Entrez votre adresse email"
              className="px-4 py-5 w-full md:w-2/4"
            />
            <button className="bg-black text-white text-lg px-10 py-5 hover:bg-zinc transition duration-300 mt-4 md:mt-0 ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;

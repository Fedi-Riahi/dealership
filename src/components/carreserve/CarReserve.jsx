import React from "react";

const CarReserve = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full backdrop-blur-sm">
        <div className="bg-white p-8 w-2/5 relative">
        <span className="close text-zinc  font-medium rounded-full py-1 w-fit px-3 flex items-center justify-center absolute right-4 top-4 cursor-pointer text-xl" onClick={onClose}>X</span>
          
          <h2 className="text-2xl font-bold mb-4">Showroom rendez vous </h2>
          <p className="text-gray-600 mb-4">
            Pour prendre rendez-vous dans notre salle d'exposition, merci de
            remplir ce formulaire et nous te contacterons dans les plus brefs
            délais.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full gap-5">
              <div className="flex flex-1 flex-col space-y-2">
                <label htmlFor="input1" className="text-gray-700">
                  Full Name
                </label>
                <input
                  id="input1"
                  type="text"
                  placeholder="Full name"
                  className="border border-gray-300  px-4 py-3"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2">
                <label htmlFor="input2" className="text-gray-700">
                  Email
                </label>
                <input
                  id="input2"
                  type="text"
                  placeholder="email"
                  className="border border-gray-300  px-4 py-3"
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-full gap-5">
              <div className="flex flex-1 flex-col space-y-2">
                <label htmlFor="input1" className="text-gray-700">
                  Phone Number
                </label>
                <input
                  id="input1"
                  type="text"
                  placeholder="+216"
                  className="border border-gray-300  px-4 py-3"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2">
                <label htmlFor="input2" className="text-gray-700">
                  Date
                </label>
                <input
                  id="input2"
                  type="date"
                  placeholder="Input 2"
                  className="border border-gray-300  px-4 py-3"
                />
              </div>
            </div>
          </div>
          <button className="w-full py-3 px-auto flex items-center justify-center bg-blue-500 my-10 text-white">Confirm</button>
          <p className="text-sm">En soumettant ce formulaire, vous fixerez un rendez-vous de service sans engagement et serez contacté dans les 48 heures par un conseiller de service.</p>
        </div>
      </div>
    )
  );
};

export default CarReserve;

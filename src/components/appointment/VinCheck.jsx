// VinCheck.js
import React from 'react';

function VinCheck({ vin, onChange, onClick }) {
  return (
    <div className=''>
      <h2 className="text-2xl font-bold mb-4">Réservation SAV en quelques clics.</h2>
      <p className="mb-4 w-2/3">Planifiez facilement vos entretiens, réparations et autres services avec un réparateur Mercedes-Benz près de chez vous.</p>
      <div className="mb-4">
        <label htmlFor="appointmentInput" className="block text-sm font-medium text-gray-700 mb-1">Numéro d’identification du véhicule (VIN)</label>
        <input type="text" id="appointmentInput" placeholder="Numéro d’identification du véhicule (VIN)" className="border border-gray-300 px-4 py-2 mb-2 rounded-md w-full focus:outline-none focus:border-blue-400" onChange={onChange} value={vin} />
        <span className="text-blue-600 font-medium text-sm cursor-pointer">ou puis-je trouver mon VIN?</span>
      </div>
      <button className="bg-blue-500 text-white px-8 py-2  hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={onClick}>Continue</button>
    </div>
  );
}

export default VinCheck;

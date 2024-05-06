// Services.js

import React from 'react';

function Services({ services, onSelectService, onClick }) {
  const isContinueDisabled = services.length === 0;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Choose Services</h2>
      <div className="w-full h-full overflow-auto">
        <div className="max-w-screen-xl mx-auto p-4">
          {services.map(category => (
            <div key={category._id}>
              <h3 className="text-xl font-bold mb-2">{category.categoryName}</h3>
              {category.services.map(service => (
                <div key={service._id}>
                  <input
                    type="checkbox"
                    id={service._id}
                    onChange={() => onSelectService(service.name)}
                  />
                  <label htmlFor={service._id}>{service.name} - ${service.price}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Continue button */}
      <button className="bg-blue-500 text-white px-8 py-2  hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={onClick} disabled={isContinueDisabled}>Continue</button>
    </div>
  );
}

export default Services;

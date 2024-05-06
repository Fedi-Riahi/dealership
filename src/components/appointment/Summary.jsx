// Summary.js
import React from 'react';

function Summary({ appointmentSummary, onSubmit }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <form onSubmit={onSubmit}>
        {/* Your contact form fields here */}
        <button type="submit" className="bg-blue-500 text-white px-8 py-2  hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
      </form>
      {/* Display appointment summary */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Appointment Summary:</h3>
        {appointmentSummary && (
          <div>
            <p>Car Model: {appointmentSummary.carModel.listingTitle}</p>
            <p>Selected Services:</p>
            <ul>
              {appointmentSummary.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <p>Date and Time: {appointmentSummary.dateTime.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;

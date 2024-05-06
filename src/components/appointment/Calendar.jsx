// Calendar.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar({ selectedDateTime, onChangeDateTime, onClick }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Choose Date and Time</h2>
      <DatePicker
        selected={selectedDateTime}
        onChange={onChangeDateTime}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="block w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
        customInput={<input className="border border-gray-300 px-4 py-2 mb-2 rounded-md w-full focus:outline-none focus:border-blue-400" />}
      />
      <button className="bg-blue-500 text-white px-8 py-2  hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={onClick}>Continue</button>
    </div>
  );
}

export default Calendar;

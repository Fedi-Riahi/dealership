// CheckboxItem.js
"use client"
import React from 'react';

const SafetyFeatures = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className="relative z-0 mb-5 group">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={id}
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="block">
          <div className="w-full text-md font-semibold">{label}</div>
        </div>
      </label>
    </div>
  );
};

export default SafetyFeatures;

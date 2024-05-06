'use client'
import React, { useState, useEffect } from 'react';
import ModelCard from '@/components/aboutservice/AboutService';

function ModelList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/carmodels')
      .then(response => response.json())
      .then(data => setModels(data.carListing.slice(0, 4))) // Fetch only the first 4 models
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  return (
    <>
        <h3 className='p-4 mb-20 text-4xl font-semibold text-zinc'>Models</h3>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
        {models.map(model => (
            <ModelCard key={model._id} model={model} />
            ))}
        </div>
    </>
  );
}

export default ModelList;

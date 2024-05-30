"use client"
import React, { useState, useEffect } from 'react';
import ListingCard from "@/components/listingCard/ListingCard";
import ModelFilter from "@/components/modelFilter/ModelFilter";
import TypeFilter from "@/components/typefilter/TypeFilter";
import Link from 'next/link';
import TransmissionFilter from '@/components/transmissionFilter/TransmissionFilter';


const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [filteredTransmissions, setFilteredTransmissions] = useState([]);
  const [displayedListings, setDisplayedListings] = useState(6);
  const [showFilters, setShowFilters] = useState(false); // Initially hide filters on mobile

  const handleTypeFilterChange = (selectedTypes) => {
    setFilteredTypes(selectedTypes);
  };

  const handleModelFilterChange = (selectedModels) => {
    setFilteredModels(selectedModels);
  };

  const handleTransmissionFilterChange = (selectedTransmissions) => {
    setFilteredTransmissions(selectedTransmissions);
  };

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/carmodels");
  
        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }
  
        const data = await res.json();
  
        let filteredListings = data.carListing;
  
        if (filteredTypes.length > 0) {
          filteredListings = filteredListings.filter(listing => filteredTypes.includes(listing.type));
        }
        if (filteredModels.length > 0) {
          filteredListings = filteredListings.filter(listing => filteredModels.includes(listing.model));
        }
  
        if (filteredTransmissions.length > 0) {
          filteredListings = filteredListings.filter(listing => filteredTransmissions.includes(listing.transmission));
        }
  
        setListings(filteredListings);
      } catch (error) {
        console.log("Error loading listings", error);
      }
    };
  
    getListings();
  }, [filteredTypes, filteredTransmissions, filteredModels]);

  const loadMoreListings = () => {
    setDisplayedListings(prev => prev + 6);
    const listingsContainer = document.getElementById('listings-container');
    if (listingsContainer) {
      listingsContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div className="md:px-20 sm:px-5 my-28">
      {/* <div className='flex items-center pt-20 mt-20 cursor-pointer'>
        <ArrowLongLeftIcon className='h-6 w-6 text-zinc' />
        <h3 className='text-md hover:bg-gray-300 px-2 py-1'>Retour à la sélection de la gamme de modèles</h3>
      </div> */}
      <div className='flex items-center justify-between w-full mt-4 mb-5'>
        <h3 className=' md:w-3/5 md:text-4xl sm:text-lg w-full mx-4'>Sélectionnez votre Mercedes-Benz de rêve</h3>
        <div className='flex flex-col gap-1 w-2/5'>
          <div className='md:flex items-center justify-center gap-4 hidden'>
            <input type='text' placeholder='Rechercher un modèle' className='w-[500px] px-4 py-3 border border-zinc bg-transparent' />
            <button className='bg-blue-500 text-white px-8 py-3 hover:bg-blue-500/90'>Search</button>
          </div>
                  {/* Filter button for mobile */}
        <button
          className="block md:hidden bg-zinc text-white py-2 px-4 mx-4"
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>
        </div>
      </div>
      {/* Filter section for mobile */}
      {showFilters && (
        <div className="absolute top-14  z-10  inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-x-scroll">
          <div className="bg-white p-12 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
              <h3 className="text-lg font-semibold mb-2">Types</h3>
              <TypeFilter selectedTypes={filteredTypes} onChange={handleTypeFilterChange} />
            </div>
            <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
              <h3 className="text-lg font-semibold mb-2">Models</h3>
              <ModelFilter selectedModels={filteredModels} onChange={handleModelFilterChange} />
            </div>
            <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
              <h3 className="text-lg font-semibold mb-2">Transmission</h3>
              <TransmissionFilter selectedTypes={filteredTransmissions} onChange={handleTransmissionFilterChange} />
            </div>
            <button onClick={() => setShowFilters(false)} className="bg-zinc text-white py-2 px-4 mt-4">Close</button>
          </div>
        </div>
      )}
      <div className="flex items-start justify-between mx-auto my-20 gap-5">
        {/* Filter section for desktop */}
        <div className="hidden md:block w-1/5">
          <div className="bg-white mb-2">
            <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
              <h3 className="text-lg font-semibold mb-2">Types</h3>
              <TypeFilter selectedTypes={filteredTypes} onChange={handleTypeFilterChange} />
            </div>
            <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
              <h3 className="text-lg font-semibold mb-2">Models</h3>
              <ModelFilter selectedModels={filteredModels} onChange={handleModelFilterChange} />
            </div>
            <div className='p-5 border-b border-gray-200 dark:border-gray-700'>
              <h3 className="text-lg font-semibold mb-2">Transmission</h3>
              <TransmissionFilter selectedTypes={filteredTransmissions} onChange={handleTransmissionFilterChange} />
            </div>
          </div>
        </div>

        {/* Listings section */}
        <div className=" w-full flex items-center justify-center flex-col mb-40" id="listings-container">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 w-full">
            {listings.slice(0, displayedListings).map((listing) => (

                <ListingCard listing={listing} id={listing._id} key={listing._id}/>

            ))}
          </div>
          {/* Load More Button */}
          {displayedListings < listings.length && (
            <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={loadMoreListings}>
              Charger plus
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings
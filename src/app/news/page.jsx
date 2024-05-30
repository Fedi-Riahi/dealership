// src/components/NewsComponent.js
import React from 'react';

const newsData = [
  {
    id: 1,
    date: 'avril 20, 2023',
    title: 'Cette technologie tant attendue pourrait enfin changer le monde',
    imageUrl: '/news1.png',
  },
  {
    id: 2,
    date: 'avril 20, 2023',
    title: 'Cette technologie tant attendue pourrait enfin changer le monde',
    imageUrl: '/news2.png',
  },
  {
    id: 3,
    date: 'avril 20, 2023',
    title: 'Cette technologie tant attendue pourrait enfin changer le monde',
    imageUrl: '/news3.png',
  },
  {
    id: 4,
    date: 'avril 20, 2023',
    title: 'Comment économiser sur les coûts de carburant de votre voiture – Le guide',
    imageUrl: '/news4.png',
  },
  {
    id: 5,
    date: 'avril 20, 2023',
    title: 'Vendre une voiture modifiée : comment obtenir le meilleur prix',
    imageUrl: '/news5.png',
  },
  {
    id: 6,
    date: 'avril 20, 2023',
    title: 'Les recherches de véhicules électriques d\'occasion à Londres augmentent',
    imageUrl: '/news6.png',
  },
];

const News = () => {
  return (
    <div className="md:mx-20 mx-5 my-20">
      <h1 className="text-4xl  mb-4 font-mercedes-bold">Actualité</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {newsData.map((news) => (
          <div key={news.id} className=" overflow-hidden relative">
            <img src={news.imageUrl} alt={news.title} className="w-full h-54 object-cover rounded-lg" />
            <div className="p-4">
              <span className="bg-white text-zinc text-md px-4 py-2  absolute top-4 left-4">News</span>
              <p className="text-gray-600 text-md mt-2">{news.date}</p>
              <h2 className="text-lg font-semibold mt-2">{news.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

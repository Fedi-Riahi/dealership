"use client"
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import { Context } from "@/app/context/page";

const PartDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  if (!id) {
    return <div className="text-center">No ID provided</div>;
  }

  const [part, setPart] = useState(null);
  const [similarParts, setSimilarParts] = useState([]);
  const { handleAddToCart } = useContext(Context);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/carparts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch part data");
        }
        const data = await response.json();
        setPart(data.part);

        const similarResponse = await fetch(`http://localhost:3000/api/carparts?category=${data.part.category}`);
        if (!similarResponse.ok) {
          throw new Error("Failed to fetch similar parts");
        }
        const similarData = await similarResponse.json();
        setSimilarParts(similarData.parts);
      } catch (error) {
        console.error("Error fetching part data:", error);
      }
    };

    fetchPartData();
  }, [id]);

  if (!part) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto my-40 w-full px-4">
      <span className="text-4xl font-mercedes-bold">Pièces Automobiles</span>
      <div className="flex flex-col md:flex-row items-start gap-10 my-16 w-full">
        <div className="">
          <Image
            src={part.images[0]}
            alt={part.name}
            width={700}
            height={600}
            className="object-cover bg-gray-100 border-2"
          />
          <div className="flex mt-2 gap-2">
            {/* Additional images can be displayed here */}
          </div>
        </div>
        <div className="md:w-1/4 md:ml-8 w-full">
          <div className="flex flex-col items-start justify-between px-auto py-8 w-full ">
            <h2 className="font-medium text-4xl mb-4 w-full">{part.name}</h2>
            <h2 className="text-zinc/90 font-semibold text-2xl mb-4">
              ${part.price}
            </h2>
            <h2 className="text-zinc/90 font-medium text-md">
              {part.stock} in stock
            </h2>
            <div className="flex items-center gap-2 mt-6">
              <p className="font-medium text-gray-500">SKU</p>
              <h2 className="font-medium">{part.modelNumber}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium text-gray-500">Category</p>
              <h2 className="font-medium">{part.category}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium text-gray-500">Manufacturer</p>
              <h2 className="font-medium">{part.manufacturer}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2 w-full justify-between">
              <p className="font-medium text-gray-500">Compatible Models</p>
              {part.compatibleCarModels.map((model, index) => (
                <h2 key={index} className="font-medium text-blue-500 w-full">
                  {model}
                </h2>
              ))}
            </div>
            {Object.keys(part.specifications).length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-gray-500">Specifications</p>
                {Object.entries(part.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <p className="font-medium">{key}:</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              className="text-white hover:underline mt-5 w-full text-center mx-auto px-8 py-4 bg-blue-500 flex items-center justify-center gap-2"
              onClick={() => handleAddToCart(part)}
            >
              <CiShoppingCart className="h-6 w-6" />
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-[600px] mt-10 px-6 py-8">
        <h2 className="font-semibold text-xl pb-3 text-blue-500 underline underline-offset-8">
          Description
        </h2>
        <h2 className="font-semibold text-xl py-3 text-zinc">Details</h2>
        <p className="text-zinc">{part.description}</p>
      </div>
      <div className="mt-10 px-4 md:px-0">
        <h2 className="font-semibold text-2xl pb-3 text-blue-500 underline underline-offset-8">
          Similar Parts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {similarParts && similarParts.length > 0 ? (
            similarParts.map((similarPart) => (
              <div key={similarPart.id} className="border p-4 rounded-md">
                <Image
                  src={similarPart.images[0]}
                  alt={similarPart.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-40"
                />
                <h2 className="font-semibold text-lg mt-2">
                  {similarPart.name}
                </h2>
                <p className="text-gray-500">${similarPart.price}</p>
                <button
                  className="text-white bg-blue-500 hover:underline mt-2 w-full py-2 flex items-center justify-center gap-2"
                  onClick={() => handleAddToCart(similarPart)}
                >
                  <CiShoppingCart className="h-5 w-5" />
                  Ajouter au panier
                </button>
              </div>
            ))
          ) : (
            <div>No similar parts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartDetails;

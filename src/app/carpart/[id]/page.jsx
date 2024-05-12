"use client";
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
  // Replace this with your logic to fetch part data
  const [part, setPart] = useState(null);

  const { handleAddToCart } = useContext(Context);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        // Fetch details of the current part
        const response = await fetch(
          `http://localhost:3000/api/carparts/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch part data");
        }
        const data = await response.json();
        setPart(data.part);
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
    <div className="container mx-auto my-40 w-full">
      <div className="flex sm:flex-col md:flex-row items-start gap-10 my-8  w-full">
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

          {/* Other sections can be added here (e.g., features, specifications) */}
        </div>
        <div className="md:w-1/4 md:ml-8 w-full">
          <div className="flex flex-col items-start justify-between px-auto py-8 w-full ">
            <h2 className="font-bold text-4xl mb-4 w-full">{part.name}</h2>
            <h2 className="text-zinc/90 font-semibold text-2xl mb-4">${part.price}</h2>
            <h2 className="text-zinc/90 font-medium text-md">{part.stock} in stock</h2>
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

            {/* Add functionality to add part to cart */}
            <button
              className="text-white hover:underline mt-5 w-full text-center mx-auto px-8 py-4 bg-blue-500 flex items-center justify-center gap-2"
              onClick={() => handleAddToCart(part)}
            >
              <CiShoppingCart className="h-6 w-6" />
              Ajouter au panier
            </button>
          </div>
          {/* Additional details about the part can be displayed here */}
        </div>
      </div>
      <div className=" md:w-[600px] mt-10  px-6 py-8">
        <h2 className="font-semibold text-xl pb-3 text-blue-500 underline underline-offset-8">
          Description
        </h2>
        <h2 className="font-semibold text-xl py-3 text-zinc">Details</h2>
        <p className="text-zinc">{part.description}</p>
      </div>
      {/* Section for displaying similar parts */}
      {/* Similar parts can be displayed here */}
    </div>
  );
};

export default PartDetails;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const Receipt = () => {
  const [order, setOrder] = useState(null);
  const router = useRouter()
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Fetch orders data from the API
        const response = await fetch("/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();

        // Filter the orders array to find the last pending order for the current user
        const userId = sessionStorage.getItem("userId");
        const userOrders = data.orders.filter(
          (order) => order.userId === userId && order.status === "pending"
        );
        const lastOrder = userOrders[userOrders.length - 1];

        setOrder(lastOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
        // Handle error scenario
      }
    };
    const redirectToHome = () => {
        router.replace("/"); // Redirect to the home page
        clearCartItems();
      };
      const clearCartItems = () => {
        localStorage.removeItem("cartItems"); // Clear cartItems from local storage
      };
  
      const delay = 10000; // 5 seconds delay
      const timeoutId = setTimeout(redirectToHome, delay); // Set timeout to redirect after delay
    fetchOrder();

    return () => clearTimeout(timeoutId);
  }, []); // Fetch order data only once when the component mounts

  return (
    <div className=" flex justify-between items-center bg-gray-100 mx-20 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Your Order is pending</h2>
        {order ? (
          <div className="flex flex-col">
            <div className="mb-4 bg-blue-100 px-10 py-4 border border-dashed border-blue-400 flex items-center justify-between h-40">
              <div className="flex flex-col items-start justify-center">
                <span>Order Code</span>
                <span className="font-medium">{order.code}</span>
              </div>
              <div className="flex flex-col items-start justify-center">
                <span>Date</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center">
                <span>Time</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center">
                <span>Payment Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
            </div>
            {/* Render items summary */}
            <div className="border border-gray-300 flex flex-col px-8 py-10">
              <h3 className="text-lg font-semibold mb-2 mt-4">Order Summary</h3>
              <h4 className="mt-4">Products</h4>
              <div className="border-t border-gray-300 my-2 w-full" />
              <ul>
                {order.items.map((item) => (
                  <div className="flex items-center justify-between my-2">
                    <li key={item._id} className="mb-2">
                      <span className="text-blue-500 font-medium">
                        {item.itemName}
                      </span>
                    </li>
                    <span className="text-blue-500 font-medium">
                      {item.quantity} x {item.price} DT
                    </span>
                  </div>
                ))}
              </ul>
              {/* Render subtotal, fees, and total */}
              <div className="mt-10">
                <div className="flex items-center justify-between my-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-blue-500 font-medium">
                    {order.totalPrice - 7} DT
                  </span>
                </div>
                <div className="border-t border-gray-300 my-4 w-full" />
                <div className="flex items-center justify-between my-2">
                  <span className="font-medium">Fees</span>
                  <span className="text-blue-500 font-medium">
                    7.00 DT
                  </span>
                </div>
                <div className="border-t border-gray-300 my-4 w-full" />
                <div className="flex items-center justify-between my-2">
                  <span className="font-medium">Total</span>
                  <span className="text-blue-500 font-medium">
                    {order.totalPrice} DT
                  </span>
                </div>
                
            
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Receipt;

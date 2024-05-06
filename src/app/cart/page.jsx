'use client'
import React, { useContext, useState } from "react";
import { Context } from "../context/page";
import { PlusIcon, MinusIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Cart() {
  const { cartItems, handleAddToCart, handleRemoveItem } = useContext(Context);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (item, newQuantity) => {
    // Ensure the new quantity is at least 1
    newQuantity = Math.max(1, newQuantity);

    // Calculate the difference between the new quantity and the current quantity
    const quantityDifference = newQuantity - item.quantity;
    // Call handleAddToCart with the calculated difference
    handleAddToCart(item, quantityDifference);
  };

  // Calculate total amount of items in the cart
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCouponApply = () => {
    // Assume the coupon code "DISCOUNT10" gives a 10% discount
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1 * cartSubtotal);
    } else {
      // Invalid coupon code, reset discount
      setDiscount(0);
    }
  };

  const cartTotal = cartSubtotal - discount;


  return (
    <div className="my-40 mx-40">
      <h2 className="text-3xl text-zinc font-medium mb-4">Panier d'achat</h2>
      <div className="flex items-start justify-between">
        <div className="w-3/4 mr-4">
          {cartItems && cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex border border-gray-200 mb-4 mt-5 gap-10 p-6"
                >
                  <div className="w-1/4 flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="object-cover w-32 h-full"
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-between">
                    <div>
                      <h2 className="font-medium">{item.name}</h2>
                      <p className="text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-green-500 hover:text-green-600 cursor-pointer">
                        <ArrowPathIcon className="h-5 w-5 " />
                        <p>Compare with similar parts</p>
                      </div>
                      <div className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleRemoveItem(item._id)}>
                        <TrashIcon className="h-5 w-5" />
                        <p>Remove</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                    >
                      <MinusIcon className="h-7 w-7 text-zinc border border-zinc p-1" />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value))
                      }
                      className="w-12 text-center mx-2"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                    >
                      <PlusIcon className="h-7 w-7 text-zinc border border-zinc p-1" />
                    </button>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="font-bold text-xl">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">Your cart is empty</div>
          )}
        </div>
         <div className="w-1/4 mt-5">
          <div className="border border-gray-300 p-4">
            <h2 className="text-xl font-medium mb-2">Order Summary</h2>
            <p className="text-lg text-gray-500 font-normal">
              Subtotal:{" "}
              <span className="text-zinc font-medium text-xl pl-2">
                {cartSubtotal} TD
              </span>
            </p>
            <p className="text-lg text-gray-500 font-normal">
              Delivery Fees:
              <span className="text-zinc font-medium text-xl pl-2">
                7.500 TD
              </span>
            </p>
            <div className="border-t border-gray-300 my-6" />
            <div className="flex justify-between items-center mt-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-4/5"
              />
              <button
                onClick={handleCouponApply}
                className="bg-zinc text-white text-sm px-4 ml-1 py-3 hover:bg-zinc/95 "
              >
                Apply
              </button>
            </div>
            <div className="border-t border-gray-300 my-6" />
            <p className="text-lg text-gray-500 font-normal">
              Total:
              <span className="text-zinc font-medium text-xl pl-2">
                {cartTotal.toFixed(2)} TD
              </span>
            </p>
            <Link href='/billing' className="bg-blue-500 text-white px-4 py-2 mt-4 hover:bg-blue-600 w-full">
              Proceed to Checkout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;

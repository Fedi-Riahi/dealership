"use client";
import React, { useContext, useState, useEf } from "react";
import { Context } from "../context/page";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Cart() {
  const { cartItems, handleAddToCart, handleRemoveItem } = useContext(Context);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (item, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);
    const quantityDifference = newQuantity - item.quantity;
    handleAddToCart(item, quantityDifference);
  };


  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCouponApply = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1 * cartSubtotal);
    } else {
      setDiscount(0);
    }
  };

  

  const cartTotal = cartSubtotal - discount;

  return (
    <div className="my-28 mx-4 lg:mx-40">
      <h2 className="text-3xl text-zinc font-medium mb-4">Panier d&apos;achat</h2>
      <div className="flex flex-col lg:flex-row justify-between my-10">
        <div className="w-full lg:w-3/4">
          {cartItems && cartItems.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="">
                  <th className="bg-blue-100 text-blue-500 px-3 py-3 text-start font-medium">
                    Product
                  </th>
                  <th className="bg-blue-100 text-blue-500 p-3 font-medium">Price</th>
                  <th className="bg-blue-100 text-blue-500 p-3 font-medium">Quantity</th>
                  <th className="bg-blue-100 text-blue-500 p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="">
                    <td className="p-2">
                      <div className="flex items-center">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="object-cover w-20 h-20 mr-2"
                        />
                        <span className="line-clamp-3">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center">{item.price} DT</td>
                    <td className="p-2">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          <MinusIcon className="h-5 w-5 text-zinc p-1" />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                          className="w-12 text-center mx-2"
                        />
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          <PlusIcon className="h-5 w-5 text-zinc p-1" />
                        </button>
                      </div>
                    </td>
                    <td className="flex items-center justify-center py-10">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 flex items-center justify-center"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">Your cart is empty</div>
          )}
        </div>
        <div className="w-full lg:w-1/4 mt-10 lg:mt-0 lg:ml-10">
          <div className="flex flex-col justify-between">
            <h2 className="px-2 py-3 mb-2 text-blue-500 bg-blue-100 font-medium">
              Order Summary
            </h2>
            <p className="text-lg font-normal flex items-center justify-between my-2">
              Subtotal
              <span className="text-zinc font-medium text-xl pl-2">
                {cartSubtotal} TD
              </span>
            </p>
            <p className="text-lg font-normal flex items-center justify-between">
              Delivery Fees
              <span className="text-zinc font-medium text-xl pl-2">7.500 TD</span>
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
                className="bg-zinc text-white text-sm px-4 ml-1 py-3 hover:bg-zinc/95"
              >
                Apply
              </button>
            </div>
            <div className="border-t border-gray-300 my-6" />
            <p className="text-lg font-normal pb-10 flex items-center justify-between my-2">
              Total
              <span className="text-zinc font-medium text-xl pl-2">
                {cartTotal.toFixed(2)} TD
              </span>
            </p>
            <Link
              href="/billing"
              className="bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 text-center w-full"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

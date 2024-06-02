"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PiArrowUpRightThin } from "react-icons/pi";
import { v4 as uuidv4 } from 'uuid';

const BillingDetails = () => {
  const { data: session, status } = useSession();
  const orderCode = uuidv4();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card', // Default to card payment
    cardNumber: '',
    expiryDate: '',
    ccv: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [fees, setFees] = useState(7);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (status === "unauthenticated") {
        router.replace('/signin');
      } else if (status === "authenticated") {
        try {
          const userId = sessionStorage.getItem('userId');
          if (!userId) {
            throw new Error('User ID not found in session storage');
          }
          const response = await fetch(`/api/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setFormData({
            firstName: userData.user.firstName || '',
            lastName: userData.user.lastName || '',
            email: userData.user.email || '',
            phone: userData.user.phone || '',
            address: userData.user.address || '',
            state: userData.user.state || '',
            city: userData.user.city || '',
            zipCode: userData.user.zipCode || '',
            paymentMethod: 'card', // Default to card payment
            cardNumber: '',
            expiryDate: '',
            ccv: '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
      }
    };

    checkAuthentication();
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem('userId');
      const requestBody = {
        userId: userId,
        code: orderCode,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        state: formData.state,
        city: formData.city,
        zipCode: formData.zipCode,
        paymentMethod: formData.paymentMethod,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        ccv: formData.ccv,
        items: cartItems.map(item => ({
            itemId: item._id,
            itemName: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        totalPrice: cartSubtotal + fees,
        status: 'pending', // Assuming initial status is pending
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      console.log('Order created successfully:', data);
      // Handle success scenario, e.g., redirect to thank you page
      router.replace('/receipt');
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error scenario, e.g., display error message to the user
    }
  };

  // Calculate total amount of items in the cart
  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow mx-4 flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-3/4 md:w-3/4 p-4">
          <h2 className="text-3xl font-semibold mb-4">Paiement</h2>
          <h2 className="text-lg font-normal mb-4">"Détails de facturation"</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  Nom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder='Nom'
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 py-3 px-2 border border-gray-300  w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Prenom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Prenom'
                  className="mt-1 py-3 px-2 border border-gray-300  w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='email'
                className="mt-1 py-3 px-2 border border-gray-300  w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">
                Telephone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='Telephone'
                className="mt-1 py-3 px-2 border border-gray-300  w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium">
                Addresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder='Addresse'
                value={formData.address}
                onChange={handleChange}
                className="mt-1 py-3 px-2 border border-gray-300  w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium">
                Pays
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder='Pays'
                value={formData.state}
                onChange={handleChange}
                className="mt-1 py-3 px-2 border border-gray-300  w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium">
                Ville
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder='Ville'
                className="mt-1 py-3 px-2 border border-gray-300  w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zipCode" className="block text-sm font-medium">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1 py-3 px-2 border border-gray-300  w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-12 py-3 flex items-center gap-1 mt-5">
              Confirm
              <PiArrowUpRightThin className="h-6 w-6 text-white" />
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/4 md:w-1/4 p-8 mt-24 0 flex flex-col gap-10">
          <div className=" py-6 px-4 bg-white">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="py-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-semibold text-blue-500">{item.name}</p>
                    <p className="text-gray-500">{item.price} DT x {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-blue-500">{item.price * item.quantity} DT</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <p className="font-semibold">Subtotal</p>
              <p className="font-semibold">{cartSubtotal} DT</p>
            </div>
            <div className="border-t border-gray-300 my-6 w-full" />
            <div className="flex justify-between mt-4">
              <p className="font-semibold">Fees</p>
              <p className="font-semibold">7.00 DT</p>
            </div>
            <div className="border-t border-gray-300 my-6 w-full" />
            <div className="flex justify-between mt-4">
              <p className="font-semibold text-blue-500">Total</p>
              <p className="font-semibold">{cartSubtotal + fees} DT</p>
            </div>
          </div>
          <div className=" py-6 px-4 bg-white p-8">
            <div className="w-full px-4 py-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 py-3 px-2 border border-gray-300  w-full"
                >
                  <option value="card">Credit Card</option>
                  <option value="delivery">Payment on Delivery</option>
                </select>
              </div>
              {formData.paymentMethod === 'card' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder='Numéro de la cart'
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="mt-1 py-3 px-2 border border-gray-300  w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder='MM/YY'
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="mt-1 py-3 px-2 border border-gray-300  w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">CCV</label>
                    <input
                      type="text"
                      name="ccv"
                      placeholder='CVC'
                      value={formData.ccv}
                      onChange={handleChange}
                      className="mt-1 py-3 px-2 border border-gray-300  w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingDetails;

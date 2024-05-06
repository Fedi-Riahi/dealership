"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import withAuth from '@/utils/withAuth';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'purchases', 'appointments'
  const [userOrders, setUserOrders] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const { data: session, status } = useSession();



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user ID from session storage
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
          throw new Error('User ID not found in session storage');
        }

        // Fetch user details using the user ID
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserData(userData.user); // Accessing user details from 'user' key

        // Fetch orders for the user
        const ordersResponse = await fetch(`/api/order?userId=${userId}`);
        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch user orders');
        }
        const ordersData = await ordersResponse.json();
        setUserOrders(ordersData.orders);

        // Fetch appointments for the user
        const appointmentsResponse = await fetch(`/api/appointment?userId=${userId}`);
        if (!appointmentsResponse.ok) {
          throw new Error('Failed to fetch user appointments');
        }
        const appointmentsData = await appointmentsResponse.json();
        setUserAppointments(appointmentsData.appointments);

        // Fetch services
        const servicesResponse = await fetch('/api/service');
        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services');
        }
        const servicesData = await servicesResponse.json();
        setServices(servicesData.services);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getServiceNames = (serviceIds) => {
    const appointmentServices = [];
  
    // Iterate through each service ID
    serviceIds.forEach(serviceId => {
      // Find the service category from the services state using its ID
      const serviceCategory = services.find(category => category.services.find(service => service._id === serviceId));
      if (serviceCategory) {
        // Find the service within the category and add its name to the list
        const service = serviceCategory.services.find(service => service._id === serviceId);
        appointmentServices.push(service.name);
      }
    });
  
    // Join the service names into a comma-separated string
    return appointmentServices.join(', ');
  };
  
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderProfileTab = () => (
    <div>
      {userData && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="phone"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="state"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.state}
              onChange={(e) => setUserData({ ...userData, state: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="city"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">address</label>
            <input
              type="address"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="zipCode"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userData.zipCode}
              onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
            />
          </div>
          
          {/* Add more user details here */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleProfileUpdate}>
            Update Profile
          </button>
        </>
      )}
    </div>
  );
  

  const handleProfileUpdate = async () => {
    try {
      // Perform API request to update user details
      const response = await fetch(`/api/user/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      // Optionally, handle success feedback to the user
    } catch (error) {
      console.error(error);
      // Optionally, handle error feedback to the user
    }
  };

  const renderPurchasesTab = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Purchases</h3>
        {userOrders.map((order) => (
          <div key={order._id} className="border border-gray-300 rounded-md p-4 mb-4">
            <div>
              <p className="font-semibold text-gray-800">Order ID: {order._id}</p>
              <p className="text-gray-700">Date: {order.createdAt}</p>
              <p className="text-gray-700">Status: {order.status}</p>
              <p className="text-gray-700">Items:</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id} className="text-gray-700">
                    {item.itemName} - Quantity: {item.quantity} - Price: {item.price}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700">Total Price: {order.totalPrice}</p>
            </div>
          </div>
        ))}
        {userOrders.length === 0 && <p className="text-gray-700">No purchases found.</p>}
      </div>
    );
  };
  
  
  const renderAppointmentsTab = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Appointments</h3>
        {userAppointments.map((appointment) => (
          <div key={appointment._id} className="border rounded-md p-4 mb-4">
            <div>
              <p className="font-semibold">Appointment ID: {appointment._id}</p>
              <p>Services: {getServiceNames(appointment.services)}</p>
              <p>Date: {new Date(appointment.selectedDate).toLocaleDateString()}</p>
              <p>Time: {appointment.selectedTime}</p>
              <p>Car VIN: {appointment.carVIN}</p>
              <p>Status: {appointment.status}</p>
            </div>
          </div>
        ))}
        {userAppointments.length === 0 && <p>No appointments found.</p>}
      </div>
    );
  };
  


  

  return (
    <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
      <div className="flex">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabChange('profile')}>Profile</button>
        <button className={`tab-btn ${activeTab === 'purchases' ? 'active' : ''}`} onClick={() => handleTabChange('purchases')}>Purchases</button>
        <button className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => handleTabChange('appointments')}>Appointments</button>
      </div>
      <div className="mt-4">
        <div className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
          {activeTab === 'profile' && renderProfileTab()}
        </div>
        <div className={`tab-content ${activeTab === 'purchases' ? 'active' : ''}`}>
          {activeTab === 'purchases' && renderPurchasesTab()}
        </div>
        <div className={`tab-content ${activeTab === 'appointments' ? 'active' : ''}`}>
          {activeTab === 'appointments' && renderAppointmentsTab()}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);

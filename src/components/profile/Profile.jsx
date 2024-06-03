"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import withAuth from "@/utils/withAuth";
import Link from "next/link";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // 'profile', 'purchases', 'appointments'
  const [userOrders, setUserOrders] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user ID from session storage
        const userId = sessionStorage.getItem("userId");
  
        if (!userId) {
          throw new Error("User ID not found in session storage");
        }
  
        // Fetch user details using the user ID
        const userResponse = await fetch(`/api/user/${userId}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        setUserData(userData.user);
  
        // Fetch orders for the user with userId
        const ordersResponse = await fetch(`/api/order?userId=${userId}`);
        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch user orders");
        }
        const ordersData = await ordersResponse.json();
        // Filter orders based on userId
        const filteredOrders = ordersData.orders.filter(order => order.userId === userId);
        setUserOrders(filteredOrders);
  
        // Fetch appointments for the user's email
        const appointmentsResponse = await fetch(
          `/api/appointment?email=${userData.user.email}`
        );
        if (!appointmentsResponse.ok) {
          throw new Error("Failed to fetch user appointments");
        }
        const appointmentsData = await appointmentsResponse.json();
        // Filter appointments based on user's email
        const filteredAppointments = appointmentsData.appointments.filter(appointment => appointment.email === session.user.email);
        setUserAppointments(filteredAppointments);
  
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, session]); // Ensure to include session in the dependency array
  

  const getServiceNames = (serviceIds) => {
    const appointmentServices = [];

    // Iterate through each service ID
    serviceIds.forEach((serviceId) => {
      // Find the service category from the services state using its ID
      const serviceCategory = services.find((category) =>
        category.services.find((service) => service._id === serviceId)
      );
      if (serviceCategory) {
        // Find the service within the category and add its name to the list
        const service = serviceCategory.services.find(
          (service) => service._id === serviceId
        );
        appointmentServices.push(service.name);
      }
    });
    // Join the service names into a comma-separated string
    return appointmentServices.join(", ");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderProfileTab = () => (
    <div>
      {userData && (
        <>
          <div className="mb">
            <h2 className="font-mercedes-bold text-xl">Profile</h2>
            <span>Mettez à jour vos informations personnelles ici.</span>
            <div className="w-full border border-gray-200 my-4" />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="mb-4 w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-400">
                Nom
              </label>
              <input
                type="text"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </div>
            <div className="mb-4 w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-400">
                Prenom
              </label>
              <input
                type="text"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="mb-4 w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4 w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-400">
                Telephone
              </label>
              <input
                type="phone"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="mb-4 w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-400">
                Pays
              </label>
              <input
                type="state"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.state}
                onChange={(e) =>
                  setUserData({ ...userData, state: e.target.value })
                }
              />
            </div>
            <div className="mb-4 w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-400">
                Ville
              </label>
              <input
                type="city"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.city}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
            </div>
            <div className="mb-4 w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-400">
                address
              </label>
              <input
                type="address"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
              />
            </div>
            <div className="mb-4 w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-400">
                Code postal
              </label>
              <input
                type="zipCode"
                className="mt-2 py-3 px-4 border border-gray-300 rounded-md w-full"
                value={userData.zipCode}
                onChange={(e) =>
                  setUserData({ ...userData, zipCode: e.target.value })
                }
              />
            </div>
          </div>

          {/* Add more user details here */}
          <button
            className="bg-blue-500 text-white px-8 py-3 hover:bg-blue-600 mt-10"
            onClick={handleProfileUpdate}
          >
            Sauvegarder
          </button>
        </>
      )}
    </div>
  );

  const handleProfileUpdate = async () => {
    try {
      // Perform API request to update user details
      const response = await fetch(`/api/user/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      // Optionally, handle success feedback to the user
    } catch (error) {
      console.error(error);
      // Optionally, handle error feedback to the user
    }
  };

  const renderPurchasesTab = () => (
    <div className="p-4 rounded-md overflow-hidden">
      <h3 className="text-xl font-semibold mb-4">Achats</h3>
      <div className="overflow-x-auto">
        {userOrders.length > 0 ? (
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Produit
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Prix Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Quantité
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) =>
                order.items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.itemName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/purchase/${order._id}`}
                        className="bg-blue-500 text-white px-10 py-3 hover:bg-blue-600 mt-10"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No purchases found.</p>
        )}
      </div>
    </div>
  );

  const renderAppointmentsTab = () => (
    <div className="p-4 rounded-md overflow-hidden">
      <h3 className="text-xl font-semibold mb-4">Rendez-vous</h3>
      <div className="overflow-x-auto">
        {userAppointments.length > 0 ? (
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Rendez-vous ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Services
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Heure
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Voiture VIN
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                >
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getServiceNames(appointment.services)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(appointment.selectedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.selectedTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.carVIN}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">Aucun rendez-vous trouvé.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl  text-gray-800 mb-6 font-mercedes-bold">
        Paramètres
      </h2>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg
                  ${
                    activeTab === "profile"
                      ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-5000"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
              onClick={() => handleTabChange("profile")}
            >
              Mes Details
            </button>
          </li>
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                activeTab === "purchases"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              onClick={() => handleTabChange("purchases")}
            >
              Achat
            </button>
          </li>
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                activeTab === "appointments"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              onClick={() => handleTabChange("appointments")}
            >
              Rendez-vous
            </button>
          </li>
          {/* Add more tabs as needed */}
        </ul>
      </div>
      <div className="mt-4">
        <div
          className={`tab-content ${activeTab === "profile" ? "active" : ""}`}
        >
          {activeTab === "profile" && renderProfileTab()}
        </div>
        <div
          className={`tab-content ${activeTab === "purchases" ? "active" : ""}`}
        >
          {activeTab === "purchases" && renderPurchasesTab()}
        </div>
        <div
          className={`tab-content ${
            activeTab === "appointments" ? "active" : ""
          }`}
        >
          {activeTab === "appointments" && renderAppointmentsTab()}
        </div>
        {/* Add more tab contents as needed */}
      </div>
    </div>
  );
};

export default withAuth(Profile);

import React from "react";

const ContactUs = () => {
  return (
    <section className="py-12 my-10 md:px-28 px-4 w-full">
      <div className="container flex flex-col md:flex-row items-center justify-center w-full">
        {/* Image */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex-1">
          <img
            src="/contact.png"
            alt="Contact"
            className="w-full md:w-[600px] h-auto md:rounded-xl"
          />
        </div>
        {/* Form */}
        <div className="w-full md:w-1/2 h-full">
          <h2 className="text-2xl md:text-5xl font-mercedes-bold mb-6">
            Vous avez d’autres questions? N’hésitez pas à nous contacter
          </h2>
          <span className="my-4 block">Vous avez des questions? N’hésitez pas à nous contacter</span>
          <form className="max-w-screen ">
            <div className="flex  mb-6 gap-2">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-4 px-4 md:px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Nom"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Prenom
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-4 px-2 md:px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Prenom"
                />
              </div>
            </div>
            <div className="flex  mb-6 gap-2">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-4 px-4 md:px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Email"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-4 px-4 md:px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Telephone"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-3 px-4 md:px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Message"
                
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-10 py-4 hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

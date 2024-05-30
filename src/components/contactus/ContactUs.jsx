import React from 'react';

const ContactUs = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-20 ">
        {/* Image */}
        <div className="w-full mb-6 md:mb-0">
          <img src="/intro_cover.jpg" alt="Contact" className="w-full h-auto md:rounded-xl" />
        </div>
        {/* Form */}
        <div className="md:w-1/2 w-full ">
          <h2 className="text-3xl font-semibold mb-6">Vous avez d’autres questions?  N’hésitez pas à nous contacter</h2>
          <form className="w-full max-w-lg">
            <div className="flex mb-6 gap-2">
              <div className="w-full md:w-1/2">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input type="text" id="firstName" className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-3 px-8 mb-3 leading-tight focus:outline-none focus:bg-white" />
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input type="text" id="lastName" className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-3 px-8 mb-3 leading-tight focus:outline-none focus:bg-white" />
              </div>
            </div>
            <div className="flex mb-6 gap-2">
            <div className="w-full md:w-1/2">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-3 px-8 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
              <input type="text" id="phone" className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-3 px-8 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea id="message" rows="4" className="w-full bg-white text-zinc border border-gray-300 rounded-lg py-3 px-8 mb-3 leading-tight focus:outline-none focus:bg-white"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-10 py-4  hover:bg-blue-600">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;

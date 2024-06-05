import React from "react";

const Contact = () => {
  return (
    <div className="my-10 mx-4 md:mx-20">
      <h1 className="text-5xl text-zinc font-mercedes-bold my-8 text-left">Contact us</h1>
      <div className="contact-page flex flex-col items-center">
        <div className="map-container w-full ">
          {/* Your map component here */}
          {/* You can use an iframe with a map embedded from a service like Google Maps */}
          <iframe
            className="map w-full h-96 md:h-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.2929490420383!2d10.768433712689216!3d34.7482126171773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d3fad8270c49%3A0x6c925dffb8665a28!2sMercedes-Benz%20-%20Sfax%20Silver%20Star%20-%20Agent%20agr%C3%A9%C3%A9%20Le%20Moteur!5e0!3m2!1sen!2stn!4v1714640109944!5m2!1sen!2stn"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-info-container w-full mt-8 flex flex-col md:flex-row justify-center">
          <div className="contact-form w-full md:w-1/2 md:mr-8">
            {/* Your contact form component here */}
            {/* Example form */}
            <h1 className="text-zinc my-2 text-xl text-center md:text-left">
              Vous avez des questions? N’hésitez pas à nous contacter
            </h1>
            <form className="my-6">
              {/* Form fields */}
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 mb-2  border border-gray-300"
                  placeholder="Nom"
                />
              </div>
              <div className="flex flex-col mb-4">
                <input
                  type="email"
                  className="w-full px-4 py-3 mb-2  border border-gray-300"
                  placeholder="Adresse e-mail"
                />
              </div>
              <div className="flex flex-col mb-4">
                <textarea
                  className="w-full px-4 py-3 mb-2  border border-gray-300"
                  placeholder="Message"
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-3">
                Send
              </button>
            </form>
          </div>
          <div className="company-info w-full md:w-1/2 border border-gray-300 mt-2 md:mt-0 px-6 py-6 bg-gray-100">
            {/* Company info */}
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
              Coordonnées de contact
            </h2>
            <p className="my-4 text-center md:text-left">
              Etiam pharetra egestas interdum blandit viverra morbi consequat mi
              non bibendum egestas quam egestas nulla.
            </p>
            <div className="mb-4">
              <p className="text-xl font-normal">Address</p>
              <p className="text-md text-gray-500">
                Rue Jameleddine El Afghani ZI Poudrière 3000 Sfax - Tunisie
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xl font-normal">Email</p>
              <p className="text-md text-gray-500">contact@agence3s.tn</p>
            </div>
            <div>
              <p className="text-xl font-normal">Phone</p>
              <p className="text-md text-gray-500">+216 70 286 974</p>
            </div>
            {/* You can add more info here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

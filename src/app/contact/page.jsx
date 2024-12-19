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
            className="map w-full h-100 md:h-100"
             src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d102319.00233324752!2d10.352825808819768!3d36.735316393321646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1734638499731!5m2!1sen!2stn"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-info-container w-full my-20 flex flex-col md:flex-row justify-center gap-10">
          <div className="contact-form w-full md:w-1/2 md:mr-8">
            {/* Your contact form component here */}
            {/* Example form */}
            <h1 className="text-zinc my-2 text-xl text-center md:text-left">
              Vous avez des questions? N&apos;hésitez pas à nous contacter
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
                Envoyer
              </button>
            </form>
          </div>
          <div className="company-info w-full md:w-1/2 border border-gray-300 mt-2 md:mt-0 px-6 py-6 bg-white">
  {/* Company info */}
  <h2 className="text-3xl font-mercedes-bold mb-4 text-center md:text-left">
    Coordonnées de contact
  </h2>
  <p className="my-4 text-center md:text-left">
    Nous sommes à votre disposition pour répondre à toutes vos demandes concernant nos services, produits et assistance.
  </p>
  <div className="mb-4">
    <p className="text-xl font-normal">Address</p>
    <p className="text-md text-gray-500">
      123 Rue de l&apos;Innovation, 75000 Tunis - Tunisie
    </p>
  </div>
  <div className="mb-4">
    <p className="text-xl font-normal">Email</p>
    <p className="text-md text-gray-500">contact@silverstar.com</p>
  </div>
  <div>
    <p className="text-xl font-normal">Phone</p>
    <p className="text-md text-gray-500">+216 20 123 456</p>
  </div>
  {/* You can add more info here */}
</div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

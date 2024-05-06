import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Sfax Silver Star</h2>
          <p className="mt-2">
            Recevez des mises à jour, des conseils d’achat et plus encore!{" "}
          </p>
        </div>

        {/* Newsletter Input */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4 gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-zinc px-4 py-3 w-1/5"
            />
            <button className="bg-blue-500 text-white px-8 py-3 ">
              Subscribe
            </button>
          </div>
        </div>

        {/* Section with flex */}
        <div className="flex flex-wrap justify-center -mx-4">
          {/* Section 1 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Section 1</h3>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Section 2</h3>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Section 3</h3>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Section 4</h3>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

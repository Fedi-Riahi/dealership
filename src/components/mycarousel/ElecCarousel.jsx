"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.8,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ElecCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 464);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define image URLs here
  const imagesData = [
    { url: "/engine.png", feature: "Feature 1" },
    { url: "/axel.png", feature: "Feature 2" },
    { url: "/engine.png", feature: "Feature 1" },
    { url: "/axel.png", feature: "Feature 2" },
    { url: "/engine.png", feature: "Feature 1" },
    { url: "/axel.png", feature: "Feature 2" },
    // Add more objects for additional images
  ];

  return (
    <Carousel
      swipeable={isMobile}
      draggable={isMobile}
      minimumTouchDrag={50}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={false}
      autoPlay={false} // Autoplay only for mobile devices
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 500ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container md:pl-60"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className="cursor-pointer"
    >
      {imagesData.map((imageData, index) => (
        <div className="px-4 py-4 relative ">
          <div key={index} className=" bg-white w-fit px-16 py-10 shadow-md rounded-md ">
          <div
              style={{ width: "500px", height: "300px", paddingRight: "10px" }}
            >
              <Image
                src={imageData.url}
                alt={`Image ${index}`}
                width={400}
                height={400}
                className="object-cover px-5 flex items-center justify-center mx-auto px-auto"
              />
            </div>
            <div className=" flex  flex-col items-start justify-between ">
              <span className="text-zinc text-center text-3xl flex items-end  pb-2">
                {imageData.feature}
              </span>
              <span className="text-zinc text-justify md:text-lg hidden md:flex items-end   w-full  my-4">
                Les moteurs Mercedes sont réputés pour leur performance
                exceptionnelle, leur fiabilité et leur technologie avancée.
                Conçus avec une précision d&apos;ingénierie allemande, ils offrent
                une puissance remarquable tout en garantissant une efficacité
                énergétique optimale.
              </span>
            </div>
           
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ElecCarousel;

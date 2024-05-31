"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
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

const MyCarousel = ({ model }) => {
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
      {model.exteriorImages.map((image, index) => (

        <div key={index} className="px-4 relative w-full">
          <div className="absolute inset-0 z-10 flex items-end px-5">
            <div className="w-full bg-gradient-to-t from-black to-black/50  md:h-1/3 h-1/6 backdrop-blur-sm">
              <span className="text-white text-center text-3xl h-full flex items-end py-2  absolute md:bottom-32 left-10">
                {model.features[index]}
              </span>
              <span className="text-gray-200 text-start md:text-lg hidden h-full md:flex items-end left-10 absolute bottom-12 w-2/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
                ipsam sapiente.
              </span>
            </div>
          </div>
          <div style={{ width: "600px", height: "600px", paddingRight: "10px" }}>
            <Image src={image} alt={`Image ${index}`} layout="fill" className="object-cover px-5" />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;

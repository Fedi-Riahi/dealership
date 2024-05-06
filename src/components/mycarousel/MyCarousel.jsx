import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const MyCarousel = ({ model }) => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      minimumTouchDrag={50}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={false}
      autoPlay={false}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 500ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container pl-60 "
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className="cursor-pointer"
    >
      {model.exteriorImages.map((image, index) => (
        <div key={index} className="px-4 relative w-full">
          <div className="absolute inset-0 z-10 flex items-end  px-5">
            <div className="w-full bg-gradient-to-t from-black to-transparent">

            <span className=" text-white text-center text-4xl pt-10  h-full flex items-end pl-5">
              {model.features[index]}
            </span>
            <span className="text-white text-center text-lg py-5 h-full flex items-end pl-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ipsam sapiente.</span>
            </div>
          </div>
          <div style={{ width: "550px", height: "550px", paddingRight: "10px" }}>
            <Image
              src={image}
              alt={`Image ${index}`}
              layout="fill"
              className="cover px-5"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;

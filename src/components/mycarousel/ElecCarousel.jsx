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
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ElecCarousel = ({model}) => {
  // Define an array of image URLs
  const images = [
    "/engine.avif",
    "/battery.avif",
    "/suspension.avif",
    "/axel.avif",
  ];

  // Define custom dimensions and positions for each image
  const imageDimensions = [
    { width: 300, height: 400, position: "absolute", top: 0, left: 0 },
    { width: 600, height: 400, position: "absolute", top: 0, left: 0 },
    { width: 200, height: 500, position: "absolute", bottom: 0, left: 0 },
    { width: 600, height: 350, position: "absolute", top: 0, left: 0 },
  ];

  // Define custom positions for each h1 element
  const h1Positions = [
    { position: "absolute", bottom: 90, left: 20 },
    { position: "absolute", bottom: 90, left: 20 },
    { position: "absolute", bottom: 90, left: 240 },
    { position: "absolute", bottom: 90, left: 20 },
  ];
  // Define custom positions for each h1 element
  const divPositions = [
    { position: "absolute", bottom: 90, left: 20 },
    { position: "absolute", bottom: 90, left: 20 },
    { position: "absolute", bottom: 90, left: 240 },
    { position: "absolute", bottom: 90, left: 20 },
  ];

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
      containerClass="carousel-container md:pl-60 md:pr-80"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className="cursor-pointer"
    >
      {images.map((image, index) => (
        <div key={index} className="relative w-full my-10">
          <div
            className="flex items-center justify-between relative"
            style={{ width: "500px", height: "500px", backgroundColor: "#EDEFF3" }}
          >
            {/* Using Next.js Image component with custom dimensions and position */}
            <Image
              src={image}
              alt={`Image ${index}`}
              width={imageDimensions[index].width}
              height={imageDimensions[index].height}
              style={{
                width: imageDimensions[index].width,
                height: imageDimensions[index].height,
                position: imageDimensions[index].position,
                top: imageDimensions[index].top,
                bottom: imageDimensions[index].bottom,
                left: imageDimensions[index].left,
              }}
              className="object-cover"
            />

            {/* Render h1 with custom position */}
            <h1 style={{ ...h1Positions[index] }}>Porsche E Performance.</h1>
            <div style={{ ...divPositions[index] }}>
                <span>{model.maxSpeed}</span>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ElecCarousel;

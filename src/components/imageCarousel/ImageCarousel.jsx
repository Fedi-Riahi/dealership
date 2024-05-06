"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper';
import Image from 'next/image';
import { useState } from 'react';


// Initialize Swiper core with Autoplay
SwiperCore.use([Autoplay]);

const ImageCarousel = ({ listing }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleMouseEnter = () => {
    if (swiperInstance && swiperInstance.autoplay && swiperInstance.autoplay.start) {
      swiperInstance.autoplay.start();
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance && swiperInstance.autoplay && swiperInstance.autoplay.stop) {
      swiperInstance.autoplay.stop();
    }
  };

  return (
    <div
      className="w-full h-48 rounded-t relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className="h-full"
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Add autoplay configuration
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {listing.cardImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt="" fill className="w-full h-48 object-contain rounded-t" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;

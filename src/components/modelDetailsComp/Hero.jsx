import Image from "next/image";

const Hero = ({ src, model }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative ">
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full -z-20">
        {model && (
          <div className="text-center">
            <h1 className="text-2xl font-normal mt-4 py-2">{model.model}</h1>
            <h1 className="text-7xl font-normal px-4 py-2 ">
              {model.listingTitle}
            </h1>
          </div>
        )}
        <Image src={src} alt="Car Image" width={1400} height={800} />
      </div>
    </div>
  );
};

export default Hero;

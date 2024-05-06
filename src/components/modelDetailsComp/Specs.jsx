const Specs = ({ model }) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-normal mt-4">{model.model}</h1>
        <h1 className="text-7xl font-normal px-4 py-2">{model.listingTitle}</h1>
      </div>
    );
  };
  
  export default Specs;
  
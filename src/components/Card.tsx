export const Card = ({ image, title, description, rating, price }) => {
  return (
    <>
      <div className="flex flex-row gap-5 group">
        <div
          className="relative w-[300px] group-hover:shadow-2xl group-hover:shadow-slate-100/15
                 group-hover:drop-shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
        >
          <img className="w-full h-full rounded-xl" src={image} alt="" />

          {/* Layers over the image */}
          <span className="absolute bottom-0 left-0 w-full h-full rounded-lg backdrop-brightness-90" />
          <span
            className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 h-0 group-hover:h-1/3 bg-purple-600/95 
                rounded-b-xl transition-all duration-500 ease-out"
          >
            <h3 className="text-white font-extrabold">{title}</h3>
            <p className="text-white">{description}</p>
            <h3>{rating}</h3>
            <h3>{price}</h3>
          </span>
        </div>
      </div>
    </>
  );
};

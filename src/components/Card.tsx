import React from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

interface CardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  price: number;
}
export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  rating,
  price,
}) => {
  return (
    <>
      <div className="flex flex-row gap-5 group mx-auto">
        <div
          className="relative w-[300px] h-[400px] group-hover:shadow-2xl group-hover:shadow-slate-100/15
                 group-hover:drop-shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer overflow-hidden"
        >
          <img
            className="w-[150px] min-h-[100px] mx-auto mt-5 rounded-xl object-cover"
            src={image}
            alt={title}
          />

          {/* Layers over the image */}
          <span className="absolute bottom-0 left-0 w-full h-full rounded-lg backdrop-brightness-90" />
          <span
            className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 h-0 group-hover:h-1/2 bg-purple-600/25 
                rounded-b-xl transition-all duration-500 ease-out overflow-hidden p-4 flex flex-col backdrop-blur-lg"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 ease-out">
              <h3 className="text-white font-extrabold line-clamp-1">
                {title}
              </h3>
              <span className="text-yellow-400 mr-2">
                ★ <p className="inline-block text-white">{rating}</p>
              </span>

              <p className="text-white text-sm line-clamp-2">{description}</p>
              <h3 className="text-white mt-3 font-bold">{price}₽</h3>
            </div>
            <div className="p-2">
              <button>
                <FcLikePlaceholder />
              </button>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

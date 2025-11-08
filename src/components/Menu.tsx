import React from "react";
import { TbMenu2, TbMenu3 } from "react-icons/tb";

interface menu {
  isOn: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
}
export const Menu: React.FC<menu> = ({ setIsOn, isOn, setLiked, liked }) => {
  return (
    <>
      <button
        onClick={() => setIsOn((prev) => !prev)}
        className={`relative bg-purple-500 text-white md:text-xl 
            ${
              isOn
                ? "w-full h-full rounded-0 p-2 -translate-x-3"
                : "rounded-full p-2"
            }
            transition-all duration-300 ease-in-out`}
      >
        {isOn ? <TbMenu3 /> : <TbMenu2 />}
      </button>

      {isOn && (
        <div
          className={`bg-purple-500 absolute top-6 rounded-full
            ${isOn ? "opacity-100 translate-y-1" : "opacity-0"}
            transition-all duration-300 ease-linear`}
        >
          <button
            onClick={() => setLiked((prev) => !prev)}
            className="text-white hover:text-white/50 transition-colors duration-300 ease-linear"
          >
            <p
              className={`text-lg p-2 ${liked ? "text-red-300" : "text-white"}`}
            >
              Favorites
            </p>
          </button>
        </div>
      )}
    </>
  );
};
import React from "react";
import { TbMenu2, TbMenu3 } from "react-icons/tb";

interface menu {
  isOn: boolean;
  setLikes: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Menu: React.FC<menu> = ({ isOn, setLikes }) => {
  return (
    <>
      <button
        className={`relative bg-purple-500 text-white text-xl 
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
            onClick={() => setLikes(true)}
            className="text-white hover:text-white/50 transition-colors duration-300 ease-linear"
          >
            <p className="text-lg p-2">Favorites</p>
          </button>
        </div>
      )}
    </>
  );
};

import React from "react";
import { TbMenu2, TbMenu3 } from "react-icons/tb";

interface menu {
  isOn: boolean;
}
export const Menu: React.FC<menu> = ({ isOn }) => {
  return (
    <>
      <button
        className={`relative bg-purple-500 text-white text-xl 
            ${isOn ? "w-full h-full rounded-0 p-2" : "rounded-full p-2"}`}
      >
        {isOn ? <TbMenu3 /> : <TbMenu2 />}
      </button>

      {isOn && <div className="bg-purple-500 absolute top-6">hello</div>}
    </>
  );
};

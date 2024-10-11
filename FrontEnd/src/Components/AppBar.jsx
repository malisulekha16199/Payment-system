import { useEffect, useState } from "react";
import { Profile } from "./Profile";
import { useRecoilState } from "recoil";
import { fName } from "../Data/Data";
export const Appbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [FName, setFName] = useRecoilState(fName);
  const [chr, setChr] = useState("");
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };
  useEffect(() => {
    setFName(localStorage.getItem("fName"));
    setChr(FName[0]); // Set the first letter of fName in the state
  }, [FName]);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="font-bold flex flex-col justify-center text-lg h-full ml-4">
        PayTM App
      </div>
      <div className="flex">
        <div className="font-semibold text-lg flex flex-col justify-center mr-4 h-full">
          Hello,
        </div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-2 mr-2">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center h-10 text-l"
          >
            {chr}
          </button>
        </div>
        {menuVisible && <Profile />}
      </div>
    </div>
  );
};

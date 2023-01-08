/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef, useContext } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import ProfileContext from "../contexts/ProfileContext";

export default function profile() {
  const { changeProfileInfo } = useContext(ProfileContext);
  const inputImageRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  const onImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const performImageInput = () => {
    inputImageRef.current.click();
  };

  const updateProfile = () => {
    const now = new Date();
    changeProfileInfo({ firstname: `Change First ${now.toISOString()}`, lastname: "Change Last", imgUrl: "Chage url" });
  };

  return (
    <div className="ml-[0px] sm:ml-[0px] md:ml-[250px] lg:ml-[250px]">
      <div className="w-full flex justify-center">
        <div className="rounded overflow-hidden shadow-lg px-4 py-4 mt-4">
          <p className="common-header">Update Your Profile</p>
          <div className="flex justify-center mt-4">
            <div className="z-10 rounded-full bg-white relative justify-center items-center ">
              <div className="overflow-hidden border border-green-400  rounded-full w-[90px] h-[90px]">
                {/*        <img className="w-[90px] h-[90px]" src="icons/user-placholder.png" alt="user-placeholder z-30" /> */}
                <img className="w-[90px] h-[90px]" src="icons/raiden.png" alt="user-placeholder z-30" />
              </div>
              <div onClick={performImageInput} className="absolute bottom-1 right-1 z-40 rounded-full w-[20px] h-[20px] cursor-pointer bg-blue-400 flex justify-center items-center">
                <PencilIcon className={"h-3 w-3"}></PencilIcon>
              </div>
              <input ref={inputImageRef} className="hidden" type="file" accept="image/*" onChange={onImageChange} />
            </div>
          </div>
          <button onClick={updateProfile} className="bg-red-500 mt-5">
            TEST
          </button>
        </div>
      </div>
    </div>
  );
}

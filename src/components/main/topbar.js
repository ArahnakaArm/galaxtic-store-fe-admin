import React, { useEffect, useState, useRef, useContext } from "react";
import { ChevronDownIcon, UserCircleIcon, LockOpenIcon } from "@heroicons/react/24/solid";

import { Outlet, Link } from "react-router-dom";

import ProfileContext from "../../contexts/ProfileContext";

export default function TopBar(props) {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const { profile } = useContext(ProfileContext);

  const dropdownRef = useRef();

  const checkOpen = () => {
    if (!isOpenUserMenu) setIsOpenUserMenu(true);
    else {
      setIsOpenUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (!dropdownRef.current.contains(e.target)) {
      setIsOpenUserMenu(false);
    }
  };

  const openSidebar = () => {
    props.openSideBar();
  };

  return (
    <div>
      <div className="px-2 sm:px-2 md:px-8 lg:px-8  py-3 bg-sidebar-bg w-full text-white transition-all duration-[690ms] ">
        <div className="ml-[0px] sm:ml-[0px] md:ml-[250px] lg:ml-[250px] flex justify-between items-center">
          <div className="cursor-pointer" onClick={openSidebar}>
            <img className="w-[35px] h-[35px] block sm:block md:hidden lg:hidden" src="icons/hamberger-menu.png" alt="hamberger-menu" />
          </div>
          <div className="flex gap-x-[6px] items-center ">
            <div>
              <div className="bg-white rounded-full w-[35px] h-[35px] overflow-hidden flex justify-center items-center">
                {/*      <img className="w-[35px] h-[30px]" src="icons/user-placholder.png" alt="user-placeholder" /> */}
                <img className="w-[35px] h-[35px]" src="icons/raiden.png" alt="user" />
              </div>
            </div>
            <div>
              <p className="font-bold">
                {profile.firstname ?? ""} {profile.lastname ?? ""}
              </p>
            </div>
            <div ref={dropdownRef} className="flex justify-end relative">
              <div>
                <ChevronDownIcon onClick={checkOpen} className={"h-7 w-7 mr-1 mt-1 float-right cursor-pointer"}></ChevronDownIcon>
              </div>
              {isOpenUserMenu && (
                <div className="absolute mt-8 whitespace-pre  rounded-md shadow-md -left-200  bg-white max-w-[200px]  z-50 text-black">
                  <div className="px-2  py-2 rounded-md  hover:bg-blue-200 cursor-pointer">
                    <Link to="/profile">
                      <div onClick={() => setIsOpenUserMenu(false)} className="w-full flex justify-start items-center">
                        <UserCircleIcon className={"h-7 w-7 mr-1 float-right cursor-pointer"}></UserCircleIcon>
                        <p className="">Change Profile</p>
                      </div>
                    </Link>
                  </div>

                  <div className="px-2  py-2 rounded-md  hover:bg-blue-200 cursor-pointer">
                    <div className="w-full flex justify-start items-center">
                      <LockOpenIcon className={"h-7 w-7 mr-2 float-right cursor-pointer"}></LockOpenIcon>
                      <p className="">Log Out</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

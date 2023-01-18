/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { sidebarMenus } from "../../shared/sidebar/menus";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Sidebar(props) {
  const [isOpenSideBar, setIsOpenSideBar] = useState(null);
  const [isOpens, setIsOpens] = useState([]);
  const [menus, setMenus] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef();
  const [isInit, setIsInit] = useState(false);
  const [isPreventLayout, setIsPreventLayout] = useState(true);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") setIsPreventLayout(true);
    else setIsPreventLayout(false);
  }, [location]);

  useEffect(() => {
    const { width } = getWindowDimensions();
    if (width < 768) {
      setIsMobile(true);
      setIsOpenSideBar(false);
    } else {
      setIsMobile(false);
      setIsOpenSideBar(true);
    }

    setIsInit(true);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setIsOpenSideBar(false);
    } else {
      setIsMobile(false);
      setIsOpenSideBar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    setMenus(sidebarMenus());
  }, []);

  useEffect(() => {
    if (isInit) setIsOpenSideBar(!isOpenSideBar);
  }, [props]);

  useEffect(() => {
    let count = 0;
    menus.map((item) => {
      count += item.subMenus.length;
      return null;
    });

    if (count !== 0) {
      const initStateOpen = [];
      for (let i = 0; i < count; i++) {
        initStateOpen.push(false);
      }
      setIsOpens([...initStateOpen]);
    }
  }, [menus]);

  const openDiv = (index) => {
    const newState = [...isOpens];
    newState[index] = !newState[index];
    setIsOpens(newState);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (isPreventLayout) return;
    if (!sidebarRef.current.contains(e.target) && isOpenSideBar && isMobile) {
      setIsOpenSideBar(false);
    }
  };

  return (
    <div className="">
      {!isPreventLayout && (
        <div ref={sidebarRef} className={"fixed z-20 bottom-0 left-0 top-0 bg-sidebar-bg w-[250px]  transition-all duration-700  lg:translate-x-[0%] md:translate-x-[0%]  sm:-translate-x-[100%]  -translate-x-[100%] " + `${isOpenSideBar === true ? "transition-all duration-700 translate-x-[0%] sm:translate-x-[0%]" : "transition-all duration-700 -translate-x-[100%] sm:-translate-x-[100%]"}`}>
          <div className="py-4 border-b-2 border-sidebar-border">
            <Link to="/">
              <p className="mb-0 text-white text-2xl inline-block">GALAXTIC STORE</p>
            </Link>
          </div>

          <div className="flex py-4 px-10 border-b-2 border-sidebar-border justify-center">
            <p className="mb-0 text-white text-base inline-block font-[600]">DASHBOARD</p>
          </div>
          <div className="grid gap-y-2.5 list p-2 ">
            {menus &&
              menus.map((menu, menuIndex) => (
                <div key={menuIndex} className="grid gap-y-1.5 items">
                  <p className="text-start mb-0 text-xl text-white mx-2">{menu.main}</p>
                  {menu.subMenus &&
                    menu.subMenus.map((subMenu, subMenuIndex) => (
                      <div key={subMenuIndex}>
                        {subMenu.child.length === 0 && (
                          <Link to={subMenu.url}>
                            <div className="flex px-2 py-1 text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
                              <subMenu.icon className="h-6 w-6 mr-1"></subMenu.icon>
                              <p className="mb-0 text-lg">{subMenu.title}</p>
                            </div>
                          </Link>
                        )}
                        {subMenu.child.length !== 0 && (
                          <div className={"transition-all duration-500 overflow-hidden px-2 py-1 cursor-pointer  " + (isOpens[subMenuIndex] ? "max-h-[20rem]" : "max-h-[38px]")}>
                            <div onClick={() => openDiv(subMenuIndex)} className="flex text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
                              <subMenu.icon className="h-6 w-6 mr-1 "></subMenu.icon>
                              <p className="mb-0 text-lg ">{subMenu.title}</p>
                              <div className="flex justify-end w-32">
                                <ChevronDownIcon className={"h-6 w-6 mr-1 mt-1 float-right " + (isOpens[subMenuIndex] ? "transition-transform duration-500 -rotate-180" : "transition-transform duration-500 rotate-0")}></ChevronDownIcon>
                              </div>
                            </div>

                            <div className="text-start py-2">
                              <div className="grid gap-y-1.5">
                                {subMenu.child.map((child, childIndex) => (
                                  <div key={childIndex} onClick={() => {}} className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">
                                    {child.title}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                  {/* <div onClick={() => openDiv(0)} className={"transition-all duration-500 overflow-hidden px-2 py-1 cursor-pointer  " + (isOpens[0] ? "max-h-[20rem]" : "max-h-[38px]")}>
                <div className="flex   text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
                  <ShoppingBagIcon className="h-6 w-6 mr-1 "></ShoppingBagIcon>
                  <p className="mb-0 text-lg ">Products</p>
                  <div className="flex justify-end w-32">
                    <ChevronDownIcon className={"h-6 w-6 mr-1 mt-1 float-right " + (isOpens[0] ? "transition-transform duration-500 -rotate-180" : "transition-transform duration-500 rotate-0")}></ChevronDownIcon>
                  </div>
                </div>

                <div className="text-start py-2">
                  <div className="grid gap-y-1.5">
                    <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">Top Products</div>
                    <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">Anything</div>
                    <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">ML</div>
                  </div>
                </div>
              </div>

              <div className="flex px-2 py-1 text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
                <Squares2X2Icon className="h-6 w-6 mr-1"></Squares2X2Icon>
                <p className="mb-0 text-lg">Categories</p>
              </div> */}
                </div>
              ))}
            {/*   <div className="grid gap-y-1.5 items">
          <p className="text-start mb-0 text-xl text-white mx-2">Managements</p>
          <div className="flex px-2 py-1 text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
            <Squares2X2Icon className="h-6 w-6 mr-1"></Squares2X2Icon>
            <p className="mb-0 text-lg">Categories</p>
          </div>
          <div onClick={() => openDiv(0)} className={"transition-all duration-500 overflow-hidden px-2 py-1 cursor-pointer  " + (isOpens[0] ? "max-h-[20rem]" : "max-h-[38px]")}>
            <div className="flex   text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
              <ShoppingBagIcon className="h-6 w-6 mr-1 "></ShoppingBagIcon>
              <p className="mb-0 text-lg ">Products</p>
              <div className="flex justify-end w-32">
                <ChevronDownIcon className={"h-6 w-6 mr-1 mt-1 float-right " + (isOpens[0] ? "transition-transform duration-500 -rotate-180" : "transition-transform duration-500 rotate-0")}></ChevronDownIcon>
              </div>
            </div>

            <div className="text-start py-2">
              <div className="grid gap-y-1.5">
                <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">Top Products</div>
                <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">Anything</div>
                <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">ML</div>
              </div>
            </div>
          </div>

          <div className="flex px-2 py-1 text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
            <Squares2X2Icon className="h-6 w-6 mr-1"></Squares2X2Icon>
            <p className="mb-0 text-lg">Categories</p>
          </div>
        </div>

        <div onClick={() => openDiv(1)} className={"transition-all duration-500 overflow-hidden px-2 py-1 cursor-pointer  " + (isOpens[1] ? "max-h-[20rem]" : "max-h-[38px]")}>
          <div className="flex   text-white cursor-pointer hover:text-blue-500  transition-all duration-300">
            <ShoppingBagIcon className="h-6 w-6 mr-1 "></ShoppingBagIcon>
            <p className="mb-0 text-lg ">Products</p>
            <div className="flex justify-end w-32">
              <ChevronDownIcon className={"h-6 w-6 mr-1 mt-1 float-right " + (isOpens[1] ? "transition-transform duration-500 -rotate-180" : "transition-transform duration-500 rotate-0")}></ChevronDownIcon>
            </div>
          </div>

          <div className="text-start py-2">
            <div className="grid gap-y-1.5">
              <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">Top Products</div>
              <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">Anything</div>
              <div className="hover:text-blue-500 mb-0 text-base ml-2 text-white text-start">ML</div>
            </div>
          </div>
        </div>
 */}
          </div>
        </div>
      )}
    </div>
  );
}

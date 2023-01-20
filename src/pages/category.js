/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import RouteInfo from "../components/main/routeInfo";
import { httpClient } from "../services/httpClient";
import { ToastSuccess, ToastError } from "../services/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
const apiUrl = process.env.REACT_APP_API_URL;

export default function category() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res = await httpClient.post(`${apiUrl}`, {
        query: `query {
          categories(offset : 0 , limit : 10){
            main_category_id
            main_category_name
            is_active
            updated_at
          }
        }`,
      });
      if (res.status === 200) {
        setCategories(res.data.data.categories);
      }
    } catch (e) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const toggleSwitch = async (cateId) => {
    if (isLoadingStatus) return;
    setIsLoadingStatus(true);
    let newArr = [...categories];
    const foundIndex = newArr.findIndex((item) => {
      return item.main_category_id === cateId;
    });
    await updateCategoryStatus(cateId, !newArr[foundIndex].is_active);
    newArr[foundIndex].is_active = !newArr[foundIndex].is_active;
    setCategories(newArr);
    setIsLoadingStatus(false);
  };

  const updateCategoryStatus = async (cateId, status) => {
    try {
      let res = await httpClient.post(`${apiUrl}`, {
        query: `mutation {
          putCategory(main_category_id: "${cateId}", is_active : ${status}){
            main_category_id
            main_category_name
            is_active
            updated_at
          }
        }`,
      });
      if (res.status === 200) {
        ToastSuccess("Update Success.");
      }
    } catch (e) {
      ToastError("Error Occurred,Plese try again.");
    }
  };

  return (
    <div className="ml-[0px] sm:ml-[0px] md:ml-[250px] lg:ml-[250px]">
      <RouteInfo currentRoute={"Category"}></RouteInfo>
      <div className="mt-4 flex justify-center px-4 ">
        <ToastContainer className="mt-12" />
        <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 w-full">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-x-auto my-4">
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className="table-header-name border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Gategory Name</th>
                    <th className="table-header-name border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Last Edited</th>
                    <th className="table-header-name border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">Status</th>
                    <th className="table-header-name border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-start">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                  {!isLoading &&
                    categories !== [] &&
                    categories.map((cate) => (
                      <tr key={cate.main_category_id}>
                        <td className="text-start border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{cate.main_category_name}</td>
                        <td className="text-start border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{cate.updated_at}</td>
                        <td className="flex justify-center items-center h-full p-4">
                          <div className="flex items-center justify-center h-full">
                            <div onClick={() => toggleSwitch(cate.main_category_id)} className="relative cursor-pointer">
                              <input type="checkbox" className="sr-only" />
                              <div className={"w-10 h-4  rounded-full shadow-inner " + `${cate.is_active === true ? "bg-green-500 " : "bg-gray-400"}`}></div>
                              <div className={"absolute w-6 h-6 rounded-full shadow -left-1 -top-1 " + `${cate.is_active === true ? "transition translate-x-[100%] bg-blue-500" : "transition translate-x-[0] bg-white "}`}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex text-start p-4 gap-2">
                            <PencilIcon className="text-[#6c757d] h-6 w-6 cursor-pointer"></PencilIcon>
                            <TrashIcon className="text-[#6c757d] h-6 w-6 cursor-pointer"></TrashIcon>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from "react";
import RouteInfo from "../components/main/routeInfo";
import { httpClient } from "../services/httpClient";
import { ToastSuccess, ToastError } from "../services/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import CommonPaginate from "../components/main/paginate";
const apiUrl = process.env.REACT_APP_API_URL;

export default function category() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [categories, setCategories] = useState([]);
  /*  const [searchText, setSearchText] = useState(""); */
  const searchText = useRef("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? searchParams.get("page") : 1);
  const itemsPerPage = 10;
  const [isSearching, setIsSerarching] = useState(false);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const searchValueFromQuery = searchParams.get("search");
    if (searchValueFromQuery) {
      searchText.current.value = searchValueFromQuery;
    }
  }, []);

  const fetchData = async (offset = 0, limit = 10) => {
    setIsLoading(true);
    try {
      let res = await httpClient.post(`${apiUrl}`, {
        query: `query {
          categories(offset : ${offset} , limit : ${limit} , search : "${searchText.current.value}"){
          data{
              main_category_id
              main_category_name
              is_active,
              order,
              updated_at
          }  
          rowCount
          }
        }`,
      });
      if (res.status === 200) {
        const rowCount = res.data.data.categories.rowCount;
        /* setMaxPage(parseInt(rowCount / itemsPerPage)); */
        setMaxPage(rowCount / itemsPerPage);
        setCategories(res.data.data.categories.data);
      }
    } catch (e) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  /*   useEffect(() => {
    console.log(maxPage);
  }, [maxPage]); */

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

  const searchData = async () => {
    if (isLoading) return;
    setIsSerarching(true);
    setCurrentPage(1);
    await fetchData(0, itemsPerPage);
    setIsSerarching(false);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await searchData();
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    const queryOptions = {
      page: currentPage,
    };
    if (searchText.current.value !== "") queryOptions.search = searchText.current.value;
    setSearchParams(queryOptions);
    if (isSearching) return;
    fetchData((currentPage - 1) * itemsPerPage, itemsPerPage);
  }, [currentPage]);

  return (
    <div className="ml-[0px] sm:ml-[0px] md:ml-[250px] lg:ml-[250px]">
      <div className="grid grid-cols-12">
        <div className="lg:col-span-9 md:col-span-8 sm:col-span-8 col-span-6 flex items-center">
          <RouteInfo currentRoute={"Category"}></RouteInfo>
        </div>

        <div className="lg:col-span-3 md:col-span-4 sm:col-span-4 col-span-6 px-4 py-2 flex items-center">
          <div className="relative">
            <input onKeyDown={handleKeyPress} ref={searchText} className={" border-2 pr-[45px] border-[#6c757d] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#6c757d] "} id="search" type="text" placeholder="Search..." />
            <div onClick={searchData} className="absolute right-0 top-0 bg-[#6c757d] h-full border-r-2 border-t-2 border-b-2 border-[#6c757d] rounded-r">
              <div className="w-full h-full flex items-center justify-center px-2">
                <MagnifyingGlassIcon className="text-white h-6 w-6 cursor-pointer "></MagnifyingGlassIcon>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  {isLoading && (
                    <tr>
                      <td colSpan={4} className="py-2">
                        <div className="flex w-full justify-center">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 100 100">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isLoading && categories.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-2">
                        <div className="flex w-full justify-center">
                          <p>Data not found.</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    categories.length !== 0 &&
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
      {!isLoading && categories.length !== 0 && (
        <div className="flex justify-center">
          <CommonPaginate className="mt-2" nextLabel=">" previousLabel="<" pageCount={maxPage} pageRangeDisplayed={3} onPageChange={handlePageClick} forcePage={currentPage - 1} />
        </div>
      )}
    </div>
  );
}

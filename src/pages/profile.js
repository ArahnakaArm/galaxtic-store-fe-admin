/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef, useContext } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import ProfileContext from "../contexts/ProfileContext";
import { httpClient } from "../services/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteInfo from "../components/main/routeInfo";
import { ToastSuccess, ToastError } from "../services/toast";
const apiUrl = process.env.REACT_APP_API_URL;

export default function profile() {
  const { changeProfileInfo } = useContext(ProfileContext);
  const inputImageRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstname: null,
    lastname: null,
    imgUrl: null,
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      let res = await httpClient.post(`${apiUrl}`, {
        query: `query {
          userByMe{
            user_id
            email
            first_name
            last_name
          }
        }`,
      });
      if (res.status === 200) {
        setProfile({
          firstname: res.data.data.userByMe.first_name,
          lastname: res.data.data.userByMe.last_name,
          imgUrl: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleFirstnameChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      firstname: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      lastname: e.target.value,
    }));
  };

  const onSubmitEdit = async () => {
    SetIsLoading(true);
    let res = await httpClient.post(`${apiUrl}`, {
      query: `mutation {
        putUserByMe(first_name: "${profile.firstname}", last_name: "${profile.lastname}"){
          user_id
          email
          first_name
          last_name
        }
      }`,
    });
    SetIsLoading(false);
    if (res.status === 200) {
      notifySuccess();
      changeProfileInfo({ firstname: profile.firstname, lastname: profile.lastname, imgUrl: profile.imgUrl });
    } else {
      notifyError();
    }
  };

  const validate = () => {
    if (profile.firstname === "" || profile.lastname === "") return;
    onSubmitEdit();
  };

  const notifySuccess = () => {
    ToastSuccess("Update Success!");
  };

  const notifyError = () => {
    ToastError("Update Failed Please Try Again Later!");
  };

  return (
    <div className="ml-[0px] sm:ml-[0px] md:ml-[250px] lg:ml-[250px]">
      <RouteInfo currentRoute={"Profile"}></RouteInfo>
      <div className="w-full flex justify-center">
        <ToastContainer className="mt-12" />
        <div className="rounded overflow-hidden shadow-lg px-4 py-4 mt-12">
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
          {/*   <button onClick={updateProfile} className="bg-red-500 mt-5">
            TEST
          </button> */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="firstname">
                Firstname
              </label>
              <input value={profile.firstname} onChange={handleFirstnameChange} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 "} id="firstname" type="text" placeholder="Firstname" />
              {profile.firstname === "" && <p className="mt-1 text-red-500 text-xs italic text-start">Please enter firstname.</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="lastname">
                Lastname
              </label>
              <input value={profile.lastname} onChange={handleLastnameChange} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 "} id="lastname" type="text" placeholder="Lastname" />
              {profile.lastname === "" && <p className="mt-1 text-red-500 text-xs italic text-start">Please enter lastname.</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={validate} className={"min-h-[40px] flex justify-center items-center  mt-4 shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded " + `${isLoading ? "cursor-not-allowed" : "cursor-allowed"}`} type="button">
              {!isLoading && <p>Update</p>}
              {isLoading && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 100 100">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

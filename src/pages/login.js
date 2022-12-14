/* eslint-disable no-useless-concat */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { saveToken, getToken } from "../services/common";

export default function login() {
  const [username, SetUsername] = useState("");
  const [errorUsernameText, SetErrorUsernameText] = useState("");
  const [password, SetPassword] = useState("");
  const [errorPasswordText, SetErrorPasswordText] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const [isShowPassword, SetIsShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateUsername(username);
  }, [username]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handleUsernameChange = (e) => {
    SetUsername(e.target.value);
  };

  const validateUsername = (text) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(text) && text.length !== 0) {
      SetErrorUsernameText("Invalid Username.");
    } else {
      SetErrorUsernameText("");
    }
  };

  const validatePassword = (text) => {
    if (text.length < 8 && text.length !== 0) {
      SetErrorPasswordText("Password must be atleast 8 characters.");
    } else {
      SetErrorPasswordText("");
    }
  };

  const checkEmptyUsername = () => {
    if (username === "") {
      SetErrorUsernameText("Please Enter Username.");
    } else {
      validateUsername(username);
    }
  };

  const handlePasswordChange = (e) => {
    SetPassword(e.target.value);
  };

  const checkEmptyPassword = () => {
    if (password === "") {
      SetErrorPasswordText("Please Enter Password.");
    } else {
      validatePassword(password);
    }
  };

  const login = () => {
    if (username === "") {
      SetErrorUsernameText("Please Enter Username.");
    }
    if (password === "") {
      SetErrorPasswordText("Please Enter Password.");
    }
    if (username === "" || password === "") return;
    if (errorUsernameText !== "" || errorPasswordText !== "") return;

    SetIsLoading(true);

    setTimeout(() => {
      SetIsLoading(false);
      saveToken("sadasdasdassd");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="overflow-hidden shadow-xl px-4 py-6 rounded-sm">
        <p className="common-header">GALAXTICSTORE DASHBOARD</p>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="username">
            Username
          </label>
          <input onBlur={checkEmptyUsername} onChange={handleUsernameChange} value={username} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 " + `${errorUsernameText === "" ? "focus:border-blue-500" : "focus:border-red-700 border-red-700"}`} id="username" type="text" placeholder="Username" />
          {errorUsernameText !== "" && <p className="mt-1 text-red-500 text-xs italic text-start">{errorUsernameText}</p>}
        </div>
        <div className="mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input onBlur={checkEmptyPassword} onChange={handlePasswordChange} value={password} className={"pr-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 " + `${errorPasswordText === "" ? "focus:border-blue-500" : "focus:border-red-700 border-red-700"}`} id="password" type={`${isShowPassword ? "text" : "password"}`} placeholder="Password" />
            <div className="absolute top-0 right-0 h-full">
              <div className="flex justify-center items-center h-full px-2">
                {!isShowPassword && <EyeIcon onClick={() => SetIsShowPassword(true)} className={"h-6 w-6 cursor-pointer"}></EyeIcon>}
                {isShowPassword && <EyeSlashIcon onClick={() => SetIsShowPassword(false)} className={"h-6 w-6 cursor-pointer"}></EyeSlashIcon>}
              </div>
            </div>
          </div>

          {errorPasswordText !== "" && <p className="mt-1 text-red-500 text-xs italic text-start">{errorPasswordText}</p>}
        </div>
        <button onClick={login} className={"min-h-[40px] flex justify-center items-center w-full mt-4 shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded " + `${isLoading ? "cursor-not-allowed" : "cursor-allowed"}`} type="button">
          {!isLoading && <p>Sign In</p>}
          {isLoading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 100 100">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

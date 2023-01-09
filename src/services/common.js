import CryptoJS from "crypto-js";
const secretPass = process.env.REACT_APP_ENCRYPTSECRET;

export const saveToken = (token) => {
  const data = CryptoJS.AES.encrypt(JSON.stringify(token), secretPass).toString();
  localStorage.setItem("token", data);
};

export const getToken = () => {
  const text = localStorage.getItem("token");
  const decryptedText = CryptoJS.AES.decrypt(text, secretPass).toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

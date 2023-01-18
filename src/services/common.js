import CryptoJS from "crypto-js";
const secretPass = process.env.REACT_APP_ENCRYPTSECRET;

export const saveToken = (token) => {
  const data = CryptoJS.AES.encrypt(JSON.stringify(token), secretPass).toString();
  localStorage.setItem("token", data);
};

export const saveProfile = (firstname, lastname) => {
  localStorage.setItem("firstname", firstname);
  localStorage.setItem("lastname", lastname);
};

export const getToken = () => {
  const text = localStorage.getItem("token") || "";
  const decryptedText = CryptoJS.AES.decrypt(text, secretPass).toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const createGraphqlQuery = (opName, query) => {
  const graphqlQuery = {
    operationName: "fetchAuthor",
    query: `query fetchAuthor { author { id name } }`,
    variables: {},
  };
};

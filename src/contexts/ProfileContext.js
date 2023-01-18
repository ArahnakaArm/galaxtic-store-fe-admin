import { createContext, useState, useEffect } from "react";
import { httpClient } from "../services/httpClient";
const apiUrl = process.env.REACT_APP_API_URL;
const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    firstname: null,
    lastname: null,
    imgUrl: null,
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const firstname = localStorage.getItem("firstname") || null;
    const lastname = localStorage.getItem("lastname") || null;
    try {
      /*  let res = await httpClient.post(`${apiUrl}`, {
        query: `query {
          userByMe{
            user_id
            email
            first_name
            last_name
          }
        }`,
      }); */

      setProfile({
        firstname: firstname,
        lastname: lastname,
        imgUrl: "",
      });

      /*       console.log(res.data.data.userByMe); */
    } catch (e) {
      console.log(e);
    }
  };

  const changeProfileInfo = (info) => {
    setProfile(info);
  };

  return <ProfileContext.Provider value={{ profile, changeProfileInfo }}>{children}</ProfileContext.Provider>;
}

export default ProfileContext;

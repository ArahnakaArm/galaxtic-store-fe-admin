import { createContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    firstname: "Teetawat",
    lastname: "Thanapakornkul",
    imgUrl: "testUrll",
  });

  const changeProfileInfo = (info) => {
    setProfile(info);
  };

  return <ProfileContext.Provider value={{ profile, changeProfileInfo }}>{children}</ProfileContext.Provider>;
}

export default ProfileContext;

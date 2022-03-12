import { createContext, useState } from "react";
import { deleteToken } from "../helpers/auth-helpers";
import axiosInstance from "../helpers/axios-helpers";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function logout() {
    try {
      deleteToken();
      await axiosInstance.get("/users/delete/token/");
      setUser(null);
      window.location.href = "/";
    } catch (e) {
      console.log(e);
    }
  }

  const data = { user, setUser, logout };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;

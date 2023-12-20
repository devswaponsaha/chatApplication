import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(null);

  const [registerInfo, setInfoRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo,setLoginInfo] = useState({
    email:"",
    password:"",
  })

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('User'));
    setUser(user)
  },[])

  const updateRegisterInfo = useCallback((info) => {
    setInfoRegister(info);
  }, []);

  const updateLoginInfo = useCallback((info)=>{
    setLoginInfo(info)
  },[])

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseUrl}user/register`,
        JSON.stringify(registerInfo)
      );
      setIsRegisterLoading(false);
      if (response.message) {
        return setRegisterError(response.message)
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const loginUser = useCallback(async(e)=>{
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);
    const response = await postRequest(
      `${baseUrl}user/login`,
      JSON.stringify(loginInfo)
    );
    setIsLoginLoading(false);
    if (response.message) {
      return setLoginError(response.message);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  },[loginInfo])

  const logoutUser = useCallback(async()=>{
    localStorage.removeItem('User');
    setUser(null)
  },[])

  return (
    <AuthContext.Provider
      value={{
        user,
        loginInfo,
        setLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        updateLoginInfo,
        registerInfo,
        setInfoRegister,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

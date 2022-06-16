import { LoginFormData } from "auth/views/Login";
import { AxiosError, AxiosResponse } from "axios";
import AppStateContext from "context/appState/context";
import useAxios from "hooks/useAxios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "./api";
import { setToken, isAuthenticated, removeTokens } from "./handlers";

interface AuthContextInterface {
  userLogin: (data: LoginFormData) => {
    data: AxiosResponse<any, any> | any;
    error: AxiosError<any, any> | any;
  };
  isAuthenticated: () => void | any;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextInterface | any>({
  isAuthenticated,
  logout: () => null,
  userLogin: () => ({
    data: undefined,
    erorr: undefined
  })
});

interface AuthContextProvideProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProvideProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const { usePost } = useAxios();
  const { dispatch } = useContext(AppStateContext);

  const userLogin: any = async (formData: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await usePost(
        {
          data: formData,
          method: "POST",
          url: LOGIN
        },
        dispatch
      );

      setToken(data?.token);
      navigate("/");

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error?.response?.data };
    }
  };

  const logout = () => {
    removeTokens();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, userLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return {
    isAuthenticated: auth?.isAuthenticated(),
    logout: auth.logout,
    userLogin: auth?.userLogin
  };
};

export default AuthContext;

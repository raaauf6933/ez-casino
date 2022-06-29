import { LoginFormData } from "auth/views/Login";
import { AxiosError, AxiosResponse } from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "./api";
import { setToken, isAuthenticated, removeTokens, getToken } from "./handlers";
import jwt_decode from "jwt-decode";
import { UserTypeEnum } from "types";
import makeHttpPost from "hooks/makeHttpPost";

interface AuthContextInterface {
  userLogin: (data: LoginFormData) => {
    data: AxiosResponse<any, any> | any;
    error: AxiosError<any, any> | any;
  };
  isAuthenticated: () => void | any;
  logout: () => void;
}

interface UseUserInterface {
  club_id: number;
  first_name: string;
  iat: number;
  last_name: string;
  username: string;
  usertype: UserTypeEnum;
  _id: number;
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
  const [login] = makeHttpPost({
    onComplete: e => {
      setToken(e?.data?.token);
      navigate("/");
    }
  });

  const userLogin: any = async (formData: {
    username: string;
    password: string;
  }) => {
    const error = await login({
      data: formData,
      method: "POST",
      url: LOGIN
    });

    return error;
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

export const useUser = (): UseUserInterface | null => {
  const token = getToken();
  return token ? jwt_decode(token) : null;
};

export default AuthContext;

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import AppStateContext from "context/appState/context";
import { useAuth } from "context/auth/context";
import { getTokens } from "context/auth/handlers";
import { useContext, useState } from "react";
import { AppStateActionType } from "types";

// default configs
axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

interface MakeHttpPostInterface {
  onComplete?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
}

type MakeHttpPostReturnType = [
  (params: AxiosRequestConfig) => Promise<unknown>,
  {
    response: AxiosResponse;
    error: AxiosError;
    loading: boolean;
  }
];

const makeHttpPost = (props: MakeHttpPostInterface): MakeHttpPostReturnType => {
  const user = useAuth();
  const { onComplete, onError } = props;
  const { dispatch } = useContext(AppStateContext);
  const [response, setResponse] = useState<AxiosResponse | any>(undefined);
  const [error, setError] = useState<AxiosError | any>();
  const [loading, setloading] = useState<boolean>(false);

  const token = getTokens().token;

  const callFn = async (params: AxiosRequestConfig): Promise<unknown> => {
    dispatch({ type: AppStateActionType.START_LOADING });
    setloading(true);
    // params config
    const axiosParams: AxiosRequestConfig = {
      ...params,
      headers: {
        Authorization: token
      },
      method: "POST"
    };

    try {
      const result = await axios.request({ ...axiosParams, timeout: 120000 });
      setResponse(result);
      if (onComplete && result) {
        onComplete(result);
      }
    } catch (err) {
      const typedError = err as AxiosError;
      setError(typedError);

      if (typedError.response?.data.data?.code === "TOKEN_EXPIRED") {
        user.logout();
      } else if (typedError.response?.data.data?.code === "INVALID_TOKEN") {
        user.logout();
      }

      if (onError && err) {
        onError(typedError);
      }
      return err;
    } finally {
      setloading(false);
      dispatch({ type: AppStateActionType.FINISH_LOADING });
    }
  };
  const Opts = {
    error,
    loading,
    response
  };

  return [callFn, Opts];
};

export default makeHttpPost;

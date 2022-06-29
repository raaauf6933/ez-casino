import { useState, useEffect, useContext } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import AppStateContext from "context/appState/context";
import { AppStateActionType } from "types";
import { getToken } from "context/auth/handlers";
axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

interface useFetchReturnType {
  error: AxiosError | undefined;
  response: AxiosResponse | undefined;
  loading: boolean;
  refetch: () => Promise<void>;
}

interface OptionsInterface {
  skip?: boolean;
}

const useFetch = (
  axiosParams: AxiosRequestConfig,
  options?: OptionsInterface
): useFetchReturnType => {
  const { dispatch } = useContext(AppStateContext);
  const [response, setResponse] = useState<AxiosResponse | undefined>(
    undefined
  );
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [loading, setloading] = useState<boolean>(false);
  const token = getToken();

  const params: AxiosRequestConfig = {
    ...axiosParams,
    headers: {
      Authorization: token
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetchData = async () => {
    dispatch({ type: AppStateActionType.START_LOADING });
    setloading(true);
    try {
      const result = await axios.request(params);
      setResponse(result);
    } catch (err) {
      const typedError = err as AxiosError;
      setError(typedError);
    } finally {
      dispatch({ type: AppStateActionType.FINISH_LOADING });
      setloading(false);
    }
  };

  useEffect(() => {
    console.log("useEffectCalled");
    if (!options?.skip) {
      fetchData();
    }
  }, [options?.skip]); // execute once only

  return { error, loading, refetch: fetchData, response };
};

export default useFetch;

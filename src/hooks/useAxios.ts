import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { AppStateActionType } from "types";
axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

interface useAxiosType {
  usePost: (
    params: AxiosRequestConfig,
    dispatch: (data: any) => void
  ) => Promise<AxiosResponse<any, any>>;
  useFetch: (axiosParams: AxiosRequestConfig) => {
    error: AxiosError | undefined;
    response: AxiosResponse | undefined;
    loading: boolean;
  };
  makePost: (params: AxiosRequestConfig) => any;
}

export const useAxios = (): useAxiosType => {
  const usePost = (
    params: AxiosRequestConfig,
    dispatch: (data: any) => void
  ): Promise<AxiosResponse<any, any>> | any | any => {
    dispatch({ type: AppStateActionType.START_LOADING });

    return new Promise((resolve, reject) => {
      params.method = "POST";
      axios
        .request(params)
        .then(result => {
          resolve(result);
          dispatch({ type: AppStateActionType.FINISH_LOADING });
        })
        .catch(err => {
          const typedError = err as AxiosError;
          reject(typedError);
          dispatch({ type: AppStateActionType.FINISH_LOADING });
        });
    });
  };

  const makePost = (params: AxiosRequestConfig) => {
    const [response, setResponse] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const callMethod = async () => {
      setLoading(true);
      const result = await axios.request(params);

      setLoading(false);
      setResponse(result);
    };

    return [callMethod, { ...response, loading }];
  };

  const useFetch = (axiosParams: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse | undefined>(
      undefined
    );
    const [error, setError] = useState<AxiosError | undefined>(undefined);
    const [loading, setloading] = useState<boolean>(true);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchData = async (params: AxiosRequestConfig) => {
      try {
        const result = await axios.request(params);
        setResponse(result);
      } catch (err) {
        const typedError = err as AxiosError;
        setError(typedError);
      } finally {
        setloading(false);
      }
    };

    useEffect(() => {
      fetchData(axiosParams);
    }, []); // execute once only

    return { error, loading, response };
  };

  return { makePost, useFetch, usePost };
};
export default useAxios;

// import { useState, useEffect } from "react";
// import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

// interface UseAxiosType {
//   response: AxiosResponse | undefined;
//   error: AxiosError | undefined;
//   loading: boolean;
// }

// const useAxios = (axiosParams: AxiosRequestConfig): UseAxiosType => {
//   const [response, setResponse] = useState<AxiosResponse | undefined>(
//     undefined
//   );
//   const [error, setError] = useState<AxiosError | undefined>(undefined);
//   const [loading, setloading] = useState<boolean>(true);

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   const fetchData = async (params: AxiosRequestConfig) => {
//     try {
//       const result = await axios.request(params);
//       setResponse(result);
//     } catch (err) {
//       const typedError = err as AxiosError;
//       setError(typedError);
//     } finally {
//       setloading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(axiosParams);
//   }, []); // execute once only

//   return { error, loading, response };
// };

// export default useAxios;

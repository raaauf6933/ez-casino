export const TOKEN_KEY = "auth_token";
export const CSRF_KEY = "csrf_token";

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token !== null) {
    return true;
  } else {
    return false;
  }
};

export const getTokens = (): {
  token: string;
  refreshToken: string;
} => {
  const token = localStorage.getItem(TOKEN_KEY);
  const refreshToken = localStorage.getItem(CSRF_KEY);
  return {
    refreshToken: refreshToken ? refreshToken : "",
    token: token ? token : ""
  };
};

export const setToken = (token: string, csrf: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CSRF_KEY, csrf);
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CSRF_KEY);
};

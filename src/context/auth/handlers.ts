export const TOKEN_KEY = "auth_token";

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token !== null) {
    return true;
  } else {
    return false;
  }
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};

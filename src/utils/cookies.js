import Cookies from 'js-cookie';

const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
};

const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
};

const cookies = {
  getAccessToken: () => {
    return Cookies.get(TOKEN_KEYS.ACCESS);
  },
  
  getRefreshToken: () => {
    return Cookies.get(TOKEN_KEYS.REFRESH);
  },
  
  setTokens: (tokens) => {
    Cookies.set(TOKEN_KEYS.ACCESS, tokens.access, cookieOptions);
    Cookies.set(TOKEN_KEYS.REFRESH, tokens.refresh, cookieOptions);
  },
  
  removeTokens: () => {
    Cookies.remove(TOKEN_KEYS.ACCESS);
    Cookies.remove(TOKEN_KEYS.REFRESH);
  },
  
  hasAuthTokens: () => {
    return !!Cookies.get(TOKEN_KEYS.ACCESS);
  }
};

export default cookies;
import Cookies from 'js-cookie';

const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
};

const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  domain: '.sequence.app.br' 
};

// Funções para armazenamento duplo (cookies e localStorage)
const storeInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Erro ao armazenar ${key} no localStorage:`, e);
  }
};

const getFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const cookies = {
  getAccessToken: () => {
    const tokenFromCookie = Cookies.get(TOKEN_KEYS.ACCESS);
    const tokenFromStorage = getFromLocalStorage(TOKEN_KEYS.ACCESS);
    
    return tokenFromCookie || tokenFromStorage;
  },
  
  getRefreshToken: () => {
    const tokenFromCookie = Cookies.get(TOKEN_KEYS.REFRESH);
    const tokenFromStorage = getFromLocalStorage(TOKEN_KEYS.REFRESH);
    
    return tokenFromCookie || tokenFromStorage;
  },
  
  setTokens: (tokens) => {
    if (!tokens) {
      return;
    }
    
    Cookies.set(TOKEN_KEYS.ACCESS, tokens.access, cookieOptions);
    Cookies.set(TOKEN_KEYS.REFRESH, tokens.refresh, cookieOptions);
    
    storeInLocalStorage(TOKEN_KEYS.ACCESS, tokens.access);
    storeInLocalStorage(TOKEN_KEYS.REFRESH, tokens.refresh);
  },
  
  removeTokens: () => {
    Cookies.remove(TOKEN_KEYS.ACCESS, { ...cookieOptions });
    Cookies.remove(TOKEN_KEYS.REFRESH, { ...cookieOptions });
    
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
  },
  
  hasAuthTokens: () => {
    return !!(Cookies.get(TOKEN_KEYS.ACCESS) || getFromLocalStorage(TOKEN_KEYS.ACCESS));
  }
};

export default cookies;
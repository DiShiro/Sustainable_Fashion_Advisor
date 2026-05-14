import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('fashion_user');
    const savedFavs = localStorage.getItem('fashion_favorites');
    const savedHistory = localStorage.getItem('fashion_history');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('fashion_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('fashion_history', JSON.stringify(searchHistory.slice(0, 10)));
  }, [searchHistory]);

  const login = (email, password) => {
    if (email && password) {
      const userData = {
        id: Date.now(),
        username: email.split('@')[0],
        email: email,
      };
      setUser(userData);
      localStorage.setItem('fashion_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (username, email, password) => {
    if (username && email && password) {
      const userData = {
        id: Date.now(),
        username: username,
        email: email,
      };
      setUser(userData);
      localStorage.setItem('fashion_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fashion_user');
  };

  const addToFavorites = (brandId) => {
    if (!favorites.includes(brandId)) {
      setFavorites([...favorites, brandId]);
    }
  };

  const removeFromFavorites = (brandId) => {
    setFavorites(favorites.filter(id => id !== brandId));
  };

  const isFavorite = (brandId) => favorites.includes(brandId);

  const addToHistory = (brandId) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(id => id !== brandId);
      return [brandId, ...filtered];
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      favorites,
      searchHistory,
      login,
      register,
      logout,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addToHistory
    }}>
      {children}
    </AuthContext.Provider>
  );
};
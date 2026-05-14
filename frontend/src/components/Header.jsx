import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, favorites } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-bold">
            EcoFashion<span className="text-green-400">Checker</span>
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link to="/" className="hover:text-green-400 transition"> Поиск</Link>
          <Link to="/compare" className="hover:text-green-400 transition"> Сравнение</Link>
          <Link to="/education" className="hover:text-green-400 transition"> Обучение</Link>
          
          {user && (
            <Link to="/profile" className="relative hover:text-green-400 transition">
               Профиль
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          )}
        </nav>


        {user ? (
          <div className="flex items-center gap-3 bg-gray-800 px-3 py-1.5 rounded-full">
            <span className="text-green-400 text-sm">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1 rounded-full text-sm transition"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-full text-sm transition">
              Вход
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full text-sm transition">
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
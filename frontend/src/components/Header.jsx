import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllBrands } from '../data/brands';

const Header = () => {
  const { user, logout, favorites } = useAuth();
  const navigate = useNavigate();
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const allBrands = getAllBrands();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBrandsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const getGradeColor = (grade) => {
    const colors = {
      'A': 'bg-green-100 text-green-700',
      'A-': 'bg-green-100 text-green-700',
      'B': 'bg-blue-100 text-blue-700',
      'B+': 'bg-blue-100 text-blue-700',
      'B-': 'bg-blue-100 text-blue-700',
      'C': 'bg-yellow-100 text-yellow-700',
      'C+': 'bg-yellow-100 text-yellow-700',
      'D': 'bg-red-100 text-red-700',
      'D+': 'bg-red-100 text-red-700'
    };
    return colors[grade] || 'bg-gray-100 text-gray-700';
  };

  const filteredBrands = searchTerm.trim() === ''
    ? [...allBrands].sort((a, b) => a.name.localeCompare(b.name))
    : allBrands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).sort((a, b) => a.name.localeCompare(b.name));

  const navLinks = (
    <>
      <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-400 transition whitespace-nowrap">Поиск</Link>
      <Link to="/compare" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-400 transition whitespace-nowrap">Сравнение</Link>
      <Link to="/education" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-400 transition whitespace-nowrap">Обучение</Link>
      {user && (
        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="relative hover:text-green-400 transition whitespace-nowrap">
          Профиль
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Link>
      )}
    </>
  );

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition flex-shrink-0">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold">
              EcoFashion<span className="text-green-400">Checker</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navLinks}
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-full text-sm transition flex items-center gap-2 whitespace-nowrap"
              >
                <span>Все бренды</span>
                <span className={`text-xs transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isBrandsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b bg-gray-50">
                    <input
                      type="text"
                      placeholder="Поиск бренда..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-900"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {filteredBrands.length === 0 ? (
                      <p className="text-center text-gray-400 py-8 text-sm">Брендов не найдено</p>
                    ) : (
                      filteredBrands.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => {
                            navigate(`/brand/${brand.id}`);
                            setIsBrandsOpen(false);
                            setSearchTerm('');
                          }}
                          className="w-full p-3 text-left hover:bg-gray-50 transition border-b last:border-b-0 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-medium text-gray-800 text-sm">{brand.name}</span>
                            <p className="text-xs text-gray-400">{brand.country}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getGradeColor(brand.grade)}`}>
                            {brand.grade}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3 bg-gray-800 px-3 py-1 rounded-full">
                <span className="text-green-400 text-sm">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white px-3 py-0.5 rounded-full text-sm transition"
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-0.5 bg-white rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 bg-white rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 bg-white rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-700 flex flex-col gap-3 text-sm font-medium">
            {navLinks}
            
            <button
              onClick={() => setIsBrandsOpen(!isBrandsOpen)}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-full text-sm transition flex items-center justify-between w-full"
            >
              <span>Все бренды</span>
              <span className={`text-xs transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isBrandsOpen && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-1">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Поиск бренда..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-900"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredBrands.slice(0, 10).map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => {
                        navigate(`/brand/${brand.id}`);
                        setIsBrandsOpen(false);
                        setIsMobileMenuOpen(false);
                        setSearchTerm('');
                      }}
                      className="w-full p-3 text-left hover:bg-gray-50 transition border-t flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-gray-800 text-sm">{brand.name}</span>
                        <p className="text-xs text-gray-400">{brand.country}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getGradeColor(brand.grade)}`}>
                        {brand.grade}
                      </span>
                    </button>
                  ))}
                  {filteredBrands.length > 10 && (
                    <p className="p-2 text-center text-xs text-gray-400">и ещё {filteredBrands.length - 10} брендов...</p>
                  )}
                </div>
              </div>
            )}

            {user ? (
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-full">
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
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-full text-sm transition">
                  Вход
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full text-sm transition">
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
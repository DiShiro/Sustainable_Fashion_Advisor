import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBrandById, getAllBrands } from '../data/brands';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, favorites, searchHistory, addToFavorites, removeFromFavorites } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');

  const getGradeColor = (grade) => {
    const colors = {
      'A': 'bg-green-100 text-green-700',
      'B': 'bg-blue-100 text-blue-700',
      'C': 'bg-yellow-100 text-yellow-700',
      'C+': 'bg-yellow-100 text-yellow-700',
      'D': 'bg-red-100 text-red-700'
    };
    return colors[grade] || 'bg-gray-100 text-gray-700';
  };

  const favoriteBrands = favorites
    .map(id => getBrandById(id))
    .filter(brand => brand !== undefined);

  const historyBrands = searchHistory
    .map(id => getBrandById(id))
    .filter(brand => brand !== undefined);


  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Войдите в аккаунт</h1>
          <p className="text-gray-500 mb-6">
            Чтобы видеть избранное и историю поиска, пожалуйста, войдите в профиль.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Привет, {user.username}!
            </h1>
            <p className="text-gray-500 mt-1">
              Добро пожаловать в ваш личный кабинет. Здесь хранятся избранные бренды и история поиска.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              {favoriteBrands.length} в избранном
            </p>
            <p className="text-sm text-gray-400">
              {historyBrands.length} в истории
            </p>
          </div>
        </div>
      </div>


      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 px-4 text-sm font-medium transition ${
            activeTab === 'favorites'
              ? 'text-green-700 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
        Избранное ({favoriteBrands.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-4 text-sm font-medium transition ${
            activeTab === 'history'
              ? 'text-green-700 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
        История поиска ({historyBrands.length})
        </button>
      </div>

      {activeTab === 'favorites' && (
        <>
          {favoriteBrands.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center">

              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Пока нет избранных брендов
              </h3>
              <p className="text-gray-500 mb-4">
                Добавляйте бренды в избранное, чтобы они появлялись здесь.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm transition"
              >
                Найти бренды
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {favoriteBrands.map(brand => (
                <div
                  key={brand.id}
                  className="bg-white rounded-xl shadow border p-4 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start">
                    <button
                      onClick={() => navigate(`/brand/${brand.id}`)}
                      className="flex-1 text-left"
                    >
                      <h3 className="font-bold text-lg text-gray-800 hover:text-green-600 transition">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-400">{brand.country} • с {brand.founded}</p>
                      <div className="mt-2 flex gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getGradeColor(brand.grade)}`}>
                          {brand.grade}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => removeFromFavorites(brand.id)}
                      className="text-red-400 hover:text-red-600 text-xl transition ml-2"
                      title="Удалить из избранного"
                    >
                      ♥
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'history' && (
        <>
          {historyBrands.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                История поиска пуста
              </h3>
              <p className="text-gray-500 mb-4">
                Бренды, которые вы искали, появятся здесь.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm transition"
              >
                Найти бренды
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              {historyBrands.map((brand, index) => (
                <div
                  key={brand.id}
                  onClick={() => navigate(`/brand/${brand.id}`)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition flex justify-between items-center ${
                    index !== historyBrands.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{brand.name}</h3>
                    <p className="text-xs text-gray-400">{brand.country}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getGradeColor(brand.grade)}`}>
                      {brand.grade}
                    </span>
                    <span className="text-gray-400 text-sm">→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Советы */}
      <div className="mt-8 bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500">
          Совет: Добавляйте понравившиеся бренды в избранное, чтобы не потерять их.
          Сравнивайте бренды, чтобы делать осознанный выбор.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
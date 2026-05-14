import React, { useState } from 'react';
import { getAllBrands } from '../data/brands';
import { useAuth } from '../context/AuthContext';

const ComparePage = () => {
  const brands = getAllBrands();
  const [brand1, setBrand1] = useState(brands[0]);
  const [brand2, setBrand2] = useState(brands[1]);
  const [error, setError] = useState('');
  const { isFavorite, addToFavorites, removeFromFavorites } = useAuth();

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

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-green-500';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-500';
  };

  const handleBrand1Change = (brandId) => {
    setError('');
    if (brandId === brand2.id) {
      setError('Нельзя сравнивать бренд сам с собой. Выберите другой бренд.');
    }
    setBrand1(brands.find(b => b.id === brandId));
  };

  const handleBrand2Change = (brandId) => {
    setError('');
    if (brandId === brand1.id) {
      setError('Нельзя сравнивать бренд сам с собой. Выберите другой бренд.');
    }
    setBrand2(brands.find(b => b.id === brandId));
  };

  const handleFavorite = (e, brandId) => {
    e.stopPropagation();
    if (isFavorite(brandId)) {
      removeFromFavorites(brandId);
    } else {
      addToFavorites(brandId);
    }
  };

  const getWinner = (metric) => {
    if (brand1.id === brand2.id) return null;
    
    const val1 = brand1[metric];
    const val2 = brand2[metric];
    if (metric === 'carbon') {
      if (val1 < val2) return 'brand1';
      if (val2 < val1) return 'brand2';
    } else {
      if (val1 > val2) return 'brand1';
      if (val2 > val1) return 'brand2';
    }
    return null;
  };

  const ecoWinner = getWinner('eco');
  const laborWinner = getWinner('labor');
  const carbonWinner = getWinner('carbon');

  const isSameBrand = brand1.id === brand2.id;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Сравнение <span className="text-green-600">брендов</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Выберите два бренда и сравните их экологические показатели.
          Узнайте, кто заботится о планете больше.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Первый бренд
          </label>
          <select
            value={brand1.id}
            onChange={(e) => handleBrand1Change(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.country})</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Второй бренд
          </label>
          <select
            value={brand2.id}
            onChange={(e) => handleBrand2Change(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.country})</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200 max-w-2xl mx-auto">
          <p className="text-amber-700 text-sm text-center">{error}</p>
        </div>
      )}

      {!isSameBrand ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-5 text-left text-gray-600 font-medium w-1/3">
                  Критерий
                </th>
                <th className="p-5 text-center text-gray-800 font-semibold text-lg">
                  {brand1.name}
                  <button
                    onClick={(e) => handleFavorite(e, brand1.id)}
                    className="ml-2 text-lg hover:scale-110 transition"
                  >
                  </button>
                </th>
                <th className="p-5 text-center text-gray-800 font-semibold text-lg">
                  {brand2.name}
                  <button
                    onClick={(e) => handleFavorite(e, brand2.id)}
                    className="ml-2 text-lg hover:scale-110 transition"
                  >
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-gray-700">
                  Общий рейтинг
                  <p className="text-xs text-gray-400 mt-1">A+ лучший, D худший</p>
                </td>
                <td className="p-5 text-center">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getGradeColor(brand1.grade)}`}>
                    {brand1.grade}
                  </span>
                </td>
                <td className="p-5 text-center">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getGradeColor(brand2.grade)}`}>
                    {brand2.grade}
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-gray-700">
                  Экологичность
                  <p className="text-xs text-gray-400 mt-1">Материалы, вода, отходы</p>
                </td>
                <td className="p-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(brand1.eco)}`}>
                      {brand1.eco}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                    {ecoWinner === 'brand1' && (
                      <span className="text-xs text-green-600 mt-1">Победитель</span>
                    )}
                  </div>
                </td>
                <td className="p-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(brand2.eco)}`}>
                      {brand2.eco}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                    {ecoWinner === 'brand2' && (
                      <span className="text-xs text-green-600 mt-1">Победитель</span>
                    )}
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-gray-700">
                  Условия труда
                  <p className="text-xs text-gray-400 mt-1">Права рабочих, безопасность</p>
                </td>
                <td className="p-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(brand1.labor)}`}>
                      {brand1.labor}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                    {laborWinner === 'brand1' && (
                      <span className="text-xs text-green-600 mt-1">Победитель</span>
                    )}
                  </div>
                </td>
                <td className="p-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(brand2.labor)}`}>
                      {brand2.labor}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                    {laborWinner === 'brand2' && (
                      <span className="text-xs text-green-600 mt-1">Победитель</span>
                    )}
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-gray-700">
                  Углеродный след
                  <p className="text-xs text-gray-400 mt-1">Чем ниже, тем лучше для климата</p>
                </td>
                <td className="p-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(100 - brand1.carbon)}`}>
                      {brand1.carbon}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                    {carbonWinner === 'brand1' && (
                      <span className="text-xs text-green-600 mt-1">Победитель</span>
                    )}
                  </div>
                </td>
                <td className="p-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(100 - brand2.carbon)}`}>
                      {brand2.carbon}
                    </span>
                    <span className="text-gray-400 text-sm">/100</span>
                    {carbonWinner === 'brand2' && (
                      <span className="text-xs text-green-600 mt-1">Победитель</span>
                    )}
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-gray-700">
                  Страна происхождения
                </td>
                <td className="p-5 text-center text-gray-600">
                  {brand1.country}
                </td>
                <td className="p-5 text-center text-gray-600">
                  {brand2.country}
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-gray-700">
                  Год основания
                </td>
                <td className="p-5 text-center text-gray-600">
                  {brand1.founded}
                </td>
                <td className="p-5 text-center text-gray-600">
                  {brand2.founded}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-t">
            <div className="flex items-start gap-3">
              <div className="text-green-700 text-xl"></div>
              <div>
                <p className="font-medium text-gray-800">Что это значит?</p>
                <p className="text-sm text-gray-600 mt-1">
                  {brand1.eco > brand2.eco ? (
                    <>По экологичности <span className="font-semibold">{brand1.name}</span> выглядит лучше. 
                    {brand1.eco - brand2.eco > 20 ? ' Разница существенная — рекомендую обратить на него внимание.' : 
                     ' Разница небольшая, но всё же есть.'}</>
                  ) : brand2.eco > brand1.eco ? (
                    <>По экологичности <span className="font-semibold">{brand2.name}</span> выглядит лучше.
                    {brand2.eco - brand1.eco > 20 ? ' Разница существенная — рекомендую обратить на него внимание.' : 
                     ' Разница небольшая, но всё же есть.'}</>
                  ) : (
                    <>Оба бренда показывают примерно одинаковые результаты по экологичности.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Вы выбрали одинаковые бренды
          </h3>
          <p className="text-gray-500">
            Чтобы сравнить бренды, выберите два разных бренда.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Попробуйте сравнить, например, Zara и Patagonia
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Сравнивайте бренды, чтобы делать осознанный выбор</p>
      </div>
    </div>
  );
};

export default ComparePage;
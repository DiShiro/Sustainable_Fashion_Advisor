import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrandById, getAllBrands } from '../data/brands';
import { useAuth } from '../context/AuthContext';

const BrandDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useAuth();

  useEffect(() => {
    const foundBrand = getBrandById(id);
    if (foundBrand) {
      setBrand(foundBrand);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const getGradeColor = (grade) => {
    const colors = {
      'A': 'bg-green-100 text-green-700',
      'B': 'bg-blue-100 text-blue-700',
      'B+': 'bg-blue-100 text-blue-700',
      'C': 'bg-yellow-100 text-yellow-700',
      'C+': 'bg-yellow-100 text-yellow-700',
      'D': 'bg-red-100 text-red-700'
    };
    return colors[grade] || 'bg-gray-100 text-gray-700';
  };

  const getGradeDescription = (grade) => {
    const descriptions = {
      'A': 'Отличный результат! Бренд действительно заботится о планете и людях.',
      'B': 'Хороший результат. Есть положительные практики, но есть куда расти.',
      'B+': 'Хороший результат. Есть положительные практики, но есть куда расти.',
      'C': 'Средний результат. Бренд делает шаги в правильном направлении.',
      'C+': 'Средний результат. Бренд делает шаги в правильном направлении.',
      'D': 'Низкий результат. Рекомендуем обратить внимание на альтернативы.'
    };
    return descriptions[grade] || 'Нет данных для оценки.';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-green-500';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getScoreComment = (score, type) => {
    if (type === 'eco') {
      if (score >= 80) return 'Использует экологичные материалы, заботится о воде и отходах.';
      if (score >= 60) return 'Частично использует переработанные материалы, есть программа по сокращению отходов.';
      if (score >= 40) return 'Начал внедрять экологичные практики, но прогресс медленный.';
      return 'Пока не уделяет достаточного внимания экологии.';
    }
    if (type === 'labor') {
      if (score >= 80) return 'Справедливая оплата, безопасные условия, есть профсоюзы.';
      if (score >= 60) return 'Условия труда приемлемые, но есть вопросы к подрядчикам.';
      if (score >= 40) return 'Базовые стандарты соблюдаются, но есть жалобы рабочих.';
      return 'Серьёзные проблемы с условиями труда, нарушения прав рабочих.';
    }
    if (type === 'carbon') {
      if (score <= 30) return 'Минимальный углеродный след, использует возобновляемую энергию.';
      if (score <= 60) return 'Средний уровень выбросов, есть программы компенсации.';
      return 'Высокий углеродный след, требуется значительное сокращение.';
    }
    return '';
  };

  const handleFavorite = () => {
    if (isFavorite(brand.id)) {
      removeFromFavorites(brand.id);
    } else {
      addToFavorites(brand.id);
    }
  };

  // Функция для перехода по альтернативе
  const handleAlternativeClick = (altName) => {
    const altLower = altName.toLowerCase();
    const mapping = {
      'arket': 'arket',
      'armedangels': 'armedangels',
      '99recycle': '99recycle',
      'patagonia': 'patagonia',
      'pact': 'pact',
      'outerknown': 'outerknown',
      'conscious': 'hm',
      'weekday': 'weekday',
      'monki': 'monki',
      'move to zero': 'nike',
      'adidas': 'adidas',
      'cos': 'cos',
      'other stories': 'other-stories',
      'nike': 'nike',
      'zara': 'zara',
      'hm': 'hm'
    };
    
    for (const [key, value] of Object.entries(mapping)) {
      if (altLower.includes(key)) {
        navigate(`/brand/${value}`);
        return;
      }
    }
  };

  // Получаем похожие бренды (исключая текущий)
  const similarBrands = getAllBrands().filter(b => b.id !== brand?.id).slice(0, 3);

  if (notFound) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Бренд не найден</h1>
        <p className="text-gray-500 mb-6">К сожалению, такого бренда нет в нашей базе данных.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Хлебные крошки */}
      <div className="text-sm text-gray-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-green-600">
          Главная
        </button>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{brand.name}</span>
      </div>

      {/* Шапка бренда */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 md:p-8 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{brand.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(brand.grade)}`}>
                  Рейтинг {brand.grade}
                </span>
              </div>
              <p className="text-gray-500 mt-2">
                {brand.country} • основан в {brand.founded} году
              </p>
              <p className="text-gray-600 mt-3 max-w-2xl text-sm leading-relaxed">
                {getGradeDescription(brand.grade)}
              </p>
            </div>
            <button
              onClick={handleFavorite}
              className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
                isFavorite(brand.id)
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">{isFavorite(brand.id) ? '♥' : '♡'}</span>
              <span>{isFavorite(brand.id) ? 'В избранном' : 'В избранное'}</span>
            </button>
          </div>
        </div>

        {/* Детальные оценки */}
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Подробные оценки</h2>
          
          <div className="space-y-8">
            {/* Экологичность */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Экологичность</h3>
                  <p className="text-sm text-gray-400">Материалы, вода, переработка отходов</p>
                </div>
                <div>
                  <span className={`text-3xl font-bold ${getScoreColor(brand.eco)}`}>{brand.eco}</span>
                  <span className="text-gray-400 text-lg">/100</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-700" 
                  style={{ width: `${brand.eco}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">{getScoreComment(brand.eco, 'eco')}</p>
            </div>

            {/* Условия труда */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Условия труда</h3>
                  <p className="text-sm text-gray-400">Оплата, безопасность, права рабочих</p>
                </div>
                <div>
                  <span className={`text-3xl font-bold ${getScoreColor(brand.labor)}`}>{brand.labor}</span>
                  <span className="text-gray-400 text-lg">/100</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-700" 
                  style={{ width: `${brand.labor}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">{getScoreComment(brand.labor, 'labor')}</p>
            </div>

            {/* Углеродный след */}
            <div className="pb-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Углеродный след</h3>
                  <p className="text-sm text-gray-400">Выбросы CO₂, энергоэффективность</p>
                </div>
                <div>
                  <span className={`text-3xl font-bold ${getScoreColor(100 - brand.carbon)}`}>{brand.carbon}</span>
                  <span className="text-gray-400 text-lg">/100</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-gray-600 to-gray-700 h-3 rounded-full transition-all duration-700" 
                  style={{ width: `${brand.carbon}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">{getScoreComment(brand.carbon, 'carbon')}</p>
              <p className="text-xs text-gray-400 mt-2">Чем ниже процент, тем лучше для климата</p>
            </div>
          </div>
        </div>
      </div>

      {/* Описание бренда */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">О бренде</h2>
        <p className="text-gray-600 leading-relaxed">{brand.description}</p>
      </div>

      {/* Альтернативы (кликабельные) */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Альтернативы</h2>
        <p className="text-gray-600 mb-4">
          Если вы ищете более устойчивые варианты, обратите внимание на эти бренды:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {brand.alternatives.map((alt, idx) => (
            <button
              key={idx}
              onClick={() => handleAlternativeClick(alt)}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition text-left group"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">+</span>
                <span className="font-medium text-gray-800 group-hover:text-green-600 transition">
                  {alt}
                </span>
                <span className="text-green-500 text-sm opacity-0 group-hover:opacity-100 transition">→</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-5 p-3 bg-green-100 rounded-lg text-center">
          <p className="text-sm text-green-800">
            Совет: при покупке обращайте внимание на сертификаты GOTS, Fair Trade, B Corp
          </p>
        </div>
      </div>

      {/* Похожие бренды для сравнения */}
      {similarBrands.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Сравните с другими брендами</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {similarBrands.map(similar => (
              <button
                key={similar.id}
                onClick={() => navigate(`/brand/${similar.id}`)}
                className="bg-white rounded-xl p-4 shadow border hover:shadow-lg transition text-left group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                      {similar.name}
                    </h3>
                    <p className="text-xs text-gray-400">{similar.country}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getGradeColor(similar.grade)}`}>
                    {similar.grade}
                  </span>
                </div>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="text-green-600">🌍 {similar.eco}</span>
                  <span className="text-yellow-600">👷 {similar.labor}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка назад */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-green-600 text-sm transition"
        >
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default BrandDetailPage;
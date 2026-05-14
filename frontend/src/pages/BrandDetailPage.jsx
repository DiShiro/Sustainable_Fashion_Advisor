import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrandById, getAllBrands } from '../data/brands';
import { useAuth } from '../context/AuthContext';

const BrandDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState('overview');
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

  const getGradeDescription = (grade) => {
    const descriptions = {
      'A': 'Отличный результат! Бренд действительно заботится о планете и людях.',
      'A-': 'Очень хороший результат. Бренд на правильном пути.',
      'B': 'Хороший результат. Есть положительные практики, но есть куда расти.',
      'B+': 'Хороший результат. Есть положительные практики, но есть куда расти.',
      'B-': 'Неплохой результат. Но прозрачность средняя.',
      'C': 'Средний результат. Бренд делает шаги в правильном направлении.',
      'C+': 'Средний результат. Бренд делает шаги в правильном направлении.',
      'D': 'Низкий результат. Рекомендуем обратить внимание на альтернативы.',
      'D+': 'Низкий результат. Рекомендуем обратить внимание на альтернативы.'
    };
    return descriptions[grade] || 'Нет данных для оценки.';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-green-500';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getEcoLevel = (score) => {
    if (score >= 80) return { text: 'Высокий', color: 'text-green-600', bg: 'bg-green-50'};
    if (score >= 60) return { text: 'Выше среднего', color: 'text-green-500', bg: 'bg-green-50'};
    if (score >= 40) return { text: 'Средний', color: 'text-yellow-600', bg: 'bg-yellow-50'};
    if (score >= 20) return { text: 'Низкий', color: 'text-orange-600', bg: 'bg-orange-50'};
    return { text: 'Очень низкий', color: 'text-red-600', bg: 'bg-red-50'};
  };

  const getScoreComment = (score, type) => {
    if (type === 'eco') {
      if (score >= 80) return 'Использует экологичные материалы, заботится о воде и отходах. Есть сертификаты и прозрачные цепочки поставок.';
      if (score >= 60) return 'Частично использует переработанные материалы, есть программа по сокращению отходов. Прогресс есть, но не идеально.';
      if (score >= 40) return 'Начал внедрять экологичные практики, но прогресс медленный. Основные объёмы — обычные материалы.';
      return 'Пока не уделяет достаточного внимания экологии. Большинство коллекций из обычных материалов.';
    }
    if (type === 'labor') {
      if (score >= 80) return 'Справедливая оплата, безопасные условия, есть профсоюзы. Бренд публикует список фабрик.';
      if (score >= 60) return 'Условия труда приемлемые, но есть вопросы к подрядчикам. Частичная прозрачность.';
      if (score >= 40) return 'Базовые стандарты соблюдаются, но есть жалобы рабочих. Не хватает прозрачности.';
      return 'Серьёзные проблемы с условиями труда, нарушения прав рабочих. Нет прозрачности.';
    }
    if (type === 'carbon') {
      if (score <= 30) return 'Минимальный углеродный след, использует возобновляемую энергию. Компенсирует выбросы.';
      if (score <= 60) return 'Средний уровень выбросов, есть программы компенсации. Работает над снижением.';
      return 'Высокий углеродный след, требуется значительное сокращение. Много авиаперевозок и производства в Азии.';
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
      'nike': 'nike',
      'zara': 'zara',
      'hm': 'hm',
      'levis': 'levis',
      'nudie jeans': 'nudie-jeans',
      'stella mccartney': 'stella-mccartney',
      'vivienne westwood': 'vivienne-westwood',
      'reformation': 'reformation',
      'veja': 'veja',
      'allbirds': 'allbirds',
      'cariuma': 'cariuma',
      'nada': 'nada',
      'on running': 'on-running',
      'girlfriend collective': 'girlfriend-collective',
      'tentree': 'tentree',
      'organic basics': 'organic-basics',
      'botanica': 'botanica',
      'recycle': 'recycle',
      'svetlana': 'svetlana'
    };

    for (const [key, value] of Object.entries(mapping)) {
      if (altLower.includes(key)) {
        navigate(`/brand/${value}`);
        return;
      }
    }
  };

  const similarBrands = getAllBrands().filter(b => b.id !== brand?.id).slice(0, 4);
  const ecoLevel = brand ? getEcoLevel(brand.eco) : { text: '', color: '', bg: '', icon: '' };

  if (notFound) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
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
      <div className="text-sm text-gray-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-green-600">Главная</button>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{brand.name}</span>
      </div>

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

        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Экологический профиль</h2>

          <div className="space-y-8">
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Экологичность</h3>
                  <p className="text-sm text-gray-400">Материалы, вода, переработка отходов</p>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${ecoLevel.bg} ${ecoLevel.color} mb-1`}>
                    {ecoLevel.icon} {ecoLevel.text}
                  </div>
                  <div>
                    <span className={`text-3xl font-bold ${getScoreColor(brand.eco)}`}>{brand.eco}</span>
                    <span className="text-gray-400 text-lg">/100</span>
                  </div>
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

            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Условия труда</h3>
                  <p className="text-sm text-gray-400">Оплата, безопасность, права рабочих</p>
                </div>
                <div className="text-right">
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

            <div className="pb-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Углеродный след</h3>
                  <p className="text-sm text-gray-400">Выбросы CO₂, энергоэффективность</p>
                </div>
                <div className="text-right">
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

      <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="border-b">
          <div className="flex gap-4 px-6 pt-4">
            <button
              onClick={() => setActiveInfoTab('overview')}
              className={`pb-3 px-2 text-sm font-medium transition ${
                activeInfoTab === 'overview'
                  ? 'text-green-700 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              Обзор
            </button>
            <button
              onClick={() => setActiveInfoTab('details')}
              className={`pb-3 px-2 text-sm font-medium transition ${
                activeInfoTab === 'details'
                  ? 'text-green-700 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              Подробнее о бренде
            </button>
            <button
              onClick={() => setActiveInfoTab('tips')}
              className={`pb-3 px-2 text-sm font-medium transition ${
                activeInfoTab === 'tips'
                  ? 'text-green-700 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              Советы
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {activeInfoTab === 'overview' && (
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">{brand.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">Факты</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between"><span>Страна:</span><span className="font-medium">{brand.country}</span></li>
                    <li className="flex justify-between"><span>Год основания:</span><span className="font-medium">{brand.founded}</span></li>
                    <li className="flex justify-between"><span>Общий рейтинг:</span><span className="font-medium">{brand.grade}</span></li>
                    <li className="flex justify-between"><span>Экологичность:</span><span className="font-medium">{brand.eco}/100</span></li>
                    <li className="flex justify-between"><span>Условия труда:</span><span className="font-medium">{brand.labor}/100</span></li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-green-800 mb-2">Экологическая оценка</h4>
                  <p className="text-sm text-gray-600">
                    {brand.eco >= 80 ? 'Бренд активно использует переработанные и органические материалы, сокращает водопотребление и имеет прозрачные цепочки поставок.' :
                     brand.eco >= 60 ? 'Бренд частично использует устойчивые материалы, есть программы по сокращению отходов, но прозрачность неполная.' :
                     brand.eco >= 40 ? 'Бренд начинает внедрять экологичные практики, но основной объём продукции — из обычных материалов.' :
                     'Бренд пока не уделяет достаточного внимания экологии. Рекомендуем обратить внимание на альтернативы.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeInfoTab === 'details' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">История и миссия</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{brand.description}</p>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Что делает бренд для экологии?</h3>
              <div className={`p-4 rounded-xl mb-6 ${ecoLevel.bg}`}>
                <p className="text-gray-700">
                  {brand.eco >= 80 ? (
                    <>Бренд использует переработанные и органические материалы. Есть программы по сокращению воды и отходов. Прозрачные цепочки поставок. Сертификаты: GOTS, Fair Trade, B Corp.</>
                  ) : brand.eco >= 60 ? (
                    <>Бренд частично использует переработанные материалы. Есть программы по сбору старой одежды. Но прозрачность неполная. Нужно больше информации о цепочках поставок.</>
                  ) : brand.eco >= 40 ? (
                    <>Бренд начинает внедрять экологичные практики, но основной объём продукции — из обычных материалов. Рекомендуем выбирать специальные "зелёные" коллекции.</>
                  ) : (
                    <>Бренд пока не уделяет достаточного внимания экологии. Рекомендуем рассмотреть альтернативы из нашего списка.</>
                  )}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Социальная ответственность</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-700">
                  {brand.labor >= 80 ? (
                    <>Бренд обеспечивает справедливую оплату труда, безопасные условия. Публикует список фабрик. Есть сертификаты Fair Trade.</>
                  ) : brand.labor >= 60 ? (
                    <>Условия труда приемлемые, но есть вопросы к подрядчикам. Бренд частично раскрывает информацию о фабриках.</>
                  ) : brand.labor >= 40 ? (
                    <>Есть сообщения о нарушениях. Бренд не раскрывает информацию о цепочках поставок. Рекомендуем изучить вопрос глубже.</>
                  ) : (
                    <>Серьёзные проблемы с условиями труда. Рекомендуем избегать покупок или выбирать альтернативы.</>
                  )}
                </p>
              </div>
            </div>
          )}

          {activeInfoTab === 'tips' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Что делать, если вы хотите купить этот бренд?</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-600 text-xl">1</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Ищите специальные коллекции</h4>
                    <p className="text-sm text-gray-600">Многие бренды имеют "зелёные" линии из переработанных материалов.</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-600 text-xl">2</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Проверяйте состав на этикетке</h4>
                    <p className="text-sm text-gray-600">Ищите органический хлопок, переработанный полиэстер, сертификаты.</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-600 text-xl">3</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Покупайте в секонд-хендах</h4>
                    <p className="text-sm text-gray-600">Даже неэкологичный бренд становится устойчивым, если купить его вещь с рук.</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-600 text-xl">4</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Ухаживайте за вещами правильно</h4>
                    <p className="text-sm text-gray-600">Стирайте в холодной воде, сушите на воздухе — это продлевает жизнь одежды.</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-600 text-xl">5</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Рассмотрите альтернативы</h4>
                    <p className="text-sm text-gray-600">Внизу страницы есть список более устойчивых брендов.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  Помните: самая устойчивая вещь — та, которую вы уже носите. А вторая по устойчивости — та, которую вы купите осознанно.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Альтернативы</h2>
        <p className="text-gray-600 mb-4">
          Если вы хотите поддержать действительно устойчивые бренды, обратите внимание на эти варианты:
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
      </div>

      {similarBrands.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Похожие бренды для сравнения</h2>
          <div className="grid md:grid-cols-4 gap-4">
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
              </button>
            ))}
          </div>
        </div>
      )}

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
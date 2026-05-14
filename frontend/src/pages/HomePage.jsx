import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBrands } from '../data/brands';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('metrics');
  const [isLoading, setIsLoading] = useState(false);
  const { addToHistory, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Ой! Кажется, вы забыли написать название бренда');
      setSearchResults([]);
      setSelectedBrand(null);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const results = searchBrands(query);
      setSearchResults(results);
      
      if (results.length === 1) {
        setSelectedBrand(results[0]);
        addToHistory(results[0].id);
      } else if (results.length === 0) {
        setError(`Упс... "${query}" не найден в нашей базе. Попробуйте Zara, H&M, Patagonia или Nike`);
        setSelectedBrand(null);
      }
      setIsLoading(false);
    }, 500);
  };

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
    addToHistory(brand.id);
    setSearchResults([]);
    setQuery('');
    setActiveTab('metrics');
  };

  const getGradeInfo = (grade) => {
    const info = {
      'A': { color: 'bg-green-100 text-green-700', text: 'Чемпион устойчивости' },
      'B': { color: 'bg-blue-100 text-blue-700', text: 'Хороший выбор' },
      'B+': { color: 'bg-blue-100 text-blue-700', text: 'Хороший выбор' },
      'C': { color: 'bg-yellow-100 text-yellow-700', text: 'Есть куда расти' },
      'C+': { color: 'bg-yellow-100 text-yellow-700', text: 'Могло быть лучше' },
      'D': { color: 'bg-red-100 text-red-700', text: 'Требует внимания' }
    };
    return info[grade] || { color: 'bg-gray-100 text-gray-700', text: 'Нет данных' };
  };

  const handleFavorite = (e, brandId) => {
    e.stopPropagation();
    if (isFavorite(brandId)) {
      removeFromFavorites(brandId);
    } else {
      addToFavorites(brandId);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
      'other stories': 'other-stories'
    };
    
    for (const [key, value] of Object.entries(mapping)) {
      if (altLower.includes(key)) {
        navigate(`/brand/${value}`);
        return;
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-green-100 rounded-full px-4 py-1 text-green-700 text-sm mb-4">
          С заботой о планете
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Какой бренд <span className="text-green-600">проверим</span> сегодня?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Привет! Я помогу узнать, насколько бренд заботится о природе и людях.
          Просто введи название — и я всё расскажу.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border max-w-2xl mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Название бренда
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Например: Zara, H&M, Patagonia..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-xl transition disabled:opacity-50"
          >
            {isLoading ? 'Думаю...' : 'Проверить'}
          </button>
        </div>
        {error && (
          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-amber-700 text-sm">{error}</p>
          </div>
        )}
      </div>

      {searchResults.length > 1 && (
        <div className="mt-4 max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 mb-2">Нашлось {searchResults.length} брендов:</p>
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            {searchResults.map(brand => {
              const gradeInfo = getGradeInfo(brand.grade);
              return (
                <div
                  key={brand.id}
                  onClick={() => selectBrand(brand)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex justify-between items-center transition group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                        {brand.name}
                      </span>
                      <span className="text-xs text-gray-400">{brand.country}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {gradeInfo.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${gradeInfo.color}`}>
                      {brand.grade}
                    </span>
                    <button
                      onClick={(e) => handleFavorite(e, brand.id)}
                      className="text-xl hover:scale-110 transition"
                    >
                      {isFavorite(brand.id) ? '♥' : '♡'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedBrand && (
        <div className="mt-8 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
            <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b">
              <div className="flex justify-between items-start flex-wrap gap-3 relative z-10">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-3xl font-bold text-gray-800">{selectedBrand.name}</h2>
                    <span className="text-sm text-gray-400 bg-white px-2 py-0.5 rounded-full">
                      {selectedBrand.country} • с {selectedBrand.founded}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedBrand.eco >= 80 ? 'Отличная экологическая репутация' : 
                     selectedBrand.eco >= 50 ? 'Есть над чем работать, но уже неплохо' : 
                     'Давайте разбираться вместе'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {(() => {
                    const gradeInfo = getGradeInfo(selectedBrand.grade);
                    return (
                      <div className={`px-4 py-2 rounded-full text-sm font-bold ${gradeInfo.color}`}>
                        Рейтинг {selectedBrand.grade}
                      </div>
                    );
                  })()}
                  <button
                    onClick={(e) => handleFavorite(e, selectedBrand.id)}
                    className="text-3xl hover:scale-110 transition active:scale-95"
                    title={isFavorite(selectedBrand.id) ? 'Убрать из избранного' : 'В избранное'}
                  >
                    {isFavorite(selectedBrand.id) ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4 border-b mb-6">
                {[
                  { id: 'metrics', label: 'Показатели', desc: 'Цифры и факты' },
                  { id: 'alternatives', label: 'Альтернативы', desc: 'Что ещё посмотреть' },
                  { id: 'details', label: 'История бренда', desc: 'Подробнее' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-1 text-sm font-medium transition-all ${
                      activeTab === tab.id 
                        ? 'text-green-700 border-b-2 border-green-600' 
                        : 'text-gray-500 hover:text-green-600 hover:border-b-2 hover:border-green-300'
                    }`}
                  >
                    <div>{tab.label}</div>
                    <div className="text-xs opacity-60">{tab.desc}</div>
                  </button>
                ))}
              </div>

              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">Экологичность</span>
                        <p className="text-xs text-gray-400">Материалы, вода, отходы</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">{selectedBrand.eco}</span>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-700" 
                        style={{ width: `${selectedBrand.eco}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedBrand.eco >= 80 ? 'Отлично! Бренд реально заботится о природе' :
                       selectedBrand.eco >= 60 ? 'Неплохо, но можно лучше' :
                       selectedBrand.eco >= 40 ? 'Есть над чем работать' :
                       'К сожалению, экологичность оставляет желать лучшего'}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">Условия труда</span>
                        <p className="text-xs text-gray-400">Права рабочих, безопасность, оплата</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-yellow-600">{selectedBrand.labor}</span>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-700" 
                        style={{ width: `${selectedBrand.labor}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedBrand.labor >= 80 ? 'Прекрасно! Рабочие условия на высоте' :
                       selectedBrand.labor >= 60 ? 'Допустимо, но есть вопросы' :
                       selectedBrand.labor >= 40 ? 'Стоит изучить внимательнее' :
                       'Есть серьёзные опасения по условиям труда'}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">Углеродный след</span>
                        <p className="text-xs text-gray-400">Выбросы CO₂, энергоэффективность</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-700">{selectedBrand.carbon}</span>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-gray-600 to-gray-700 h-3 rounded-full transition-all duration-700" 
                        style={{ width: `${selectedBrand.carbon}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Чем ниже процент — тем лучше для климата.
                      {selectedBrand.carbon <= 30 ? ' Этот бренд — пример для подражания' :
                       selectedBrand.carbon <= 60 ? ' Можно лучше, но уже неплохо' :
                       ' Выбросы высокие, стоит искать альтернативы'}
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">Моё мнение</p>
                      <p className="text-sm text-gray-600">
                        {selectedBrand.eco >= 80 ? (
                          <>Отличный выбор! {selectedBrand.name} действительно заботится о планете. Можете покупать со спокойной душой.</>
                        ) : selectedBrand.eco >= 60 ? (
                          <>Неплохо, но не идеально. {selectedBrand.name} делает шаги в правильном направлении, но есть над чем работать.</>
                        ) : selectedBrand.eco >= 40 ? (
                          <>Средний результат. Перед покупкой {selectedBrand.name} рекомендую посмотреть альтернативы — есть бренды, которые заботятся о природе больше.</>
                        ) : (
                          <>К сожалению, {selectedBrand.name} пока не на высоте. Посмотрите альтернативы — там вы найдёте более экологичные варианты.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'alternatives' && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-green-800 text-xl">Бренды, которые заботятся</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Если хотите поддержать действительно устойчивую моду — присмотритесь к этим ребятам:
                    </p>
                  </div>
                  <ul className="space-y-3 mt-4">
                    {selectedBrand.alternatives.map((alt, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition group">
                        <span className="text-green-500 text-xl">+</span>
                        <button
                          onClick={() => handleAlternativeClick(alt)}
                          className="text-gray-800 font-medium hover:text-green-600 transition flex-1 text-left group-hover:underline cursor-pointer"
                        >
                          {alt}
                          <span className="text-xs text-green-500 ml-2 opacity-0 group-hover:opacity-100 transition">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 p-3 bg-green-100 rounded-lg text-center">
                    <p className="text-sm text-green-800">
                      Совет: при покупке обращайте внимание на сертификаты GOTS, Fair Trade, B Corp
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Что нужно знать о {selectedBrand.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedBrand.description}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => navigate(`/brand/${selectedBrand.id}`)}
                      className="text-green-700 hover:text-green-800 font-medium flex items-center gap-1 bg-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Узнать больше о бренде →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!selectedBrand && !error && (
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-green-700 text-lg mb-2">Готовы к осознанному выбору?</p>
            <p className="text-gray-600 text-sm">
              Я здесь, чтобы помочь вам разобраться в мире устойчивой моды. 
              Просто напишите название бренда — и я расскажу всю правду.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
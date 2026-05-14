import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBrands, getAllBrands, getTopBrands } from '../data/brands';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('metrics');
  const [isLoading, setIsLoading] = useState(false);
  const { addToHistory, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const topBrands = getTopBrands(6);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const allBrands = getAllBrands();
    const filtered = allBrands
      .filter(brand => brand.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) {
      setError('Ой! Кажется, вы забыли написать название бренда');
      setSelectedBrand(null);
      return;
    }
    
    setIsLoading(true);
    setError('');
    setShowSuggestions(false);
    
    setTimeout(() => {
      const results = searchBrands(query);
      
      if (results.length === 1) {
        setSelectedBrand(results[0]);
        addToHistory(results[0].id);
      } else if (results.length === 0) {
        setError(`Упс... "${query}" не найден в нашей базе. Попробуйте Zara, H&M, Patagonia или Nike`);
        setSelectedBrand(null);
      } else if (results.length > 1) {
        setSuggestions(results);
        setShowSuggestions(true);
        setError(`Найдено ${results.length} брендов. Уточните запрос:`);
      }
      setIsLoading(false);
    }, 300);
  };

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
    addToHistory(brand.id);
    setQuery(brand.name);
    setSuggestions([]);
    setShowSuggestions(false);
    setError('');
    setActiveTab('metrics');
  };

  const getGradeInfo = (grade) => {
    const info = {
      'A': { color: 'bg-green-100 text-green-700', text: 'Чемпион устойчивости' },
      'A-': { color: 'bg-green-100 text-green-700', text: 'Отличный выбор' },
      'B': { color: 'bg-blue-100 text-blue-700', text: 'Хороший выбор' },
      'B+': { color: 'bg-blue-100 text-blue-700', text: 'Хороший выбор' },
      'B-': { color: 'bg-blue-100 text-blue-700', text: 'Неплохой выбор' },
      'C': { color: 'bg-yellow-100 text-yellow-700', text: 'Есть куда расти' },
      'C+': { color: 'bg-yellow-100 text-yellow-700', text: 'Могло быть лучше' },
      'D': { color: 'bg-red-100 text-red-700', text: 'Требует внимания' },
      'D+': { color: 'bg-red-100 text-red-700', text: 'Требует внимания' }
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

  const handleAlternativeClick = (altName) => {
    const altLower = altName.toLowerCase();
    const mapping = {
      'arket': 'arket', 'armedangels': 'armedangels', '99recycle': '99recycle',
      'patagonia': 'patagonia', 'pact': 'pact', 'outerknown': 'outerknown',
      'conscious': 'hm', 'weekday': 'weekday', 'monki': 'monki',
      'move to zero': 'nike', 'adidas': 'adidas', 'cos': 'cos',
      'nike': 'nike', 'zara': 'zara', 'hm': 'hm', 'levis': 'levis',
      'nudie jeans': 'nudie-jeans', 'stella mccartney': 'stella-mccartney',
      'vivienne westwood': 'vivienne-westwood', 'reformation': 'reformation',
      'veja': 'veja', 'allbirds': 'allbirds', 'cariuma': 'cariuma',
      'nada': 'nada', 'on running': 'on-running', 'tentree': 'tentree'
    };
    for (const [key, value] of Object.entries(mapping)) {
      if (altLower.includes(key)) {
        navigate(`/brand/${value}`);
        return;
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-green-100 rounded-full px-4 py-1 text-green-700 text-sm mb-4">
          С заботой о планете
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Какой <span className="text-green-600">бренд</span> проверим сегодня?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Привет! Я помогу узнать, насколько <span className="text-green-600 font-medium">бренд</span> заботится о <span className="text-green-600 font-medium">природе</span> и <span className="text-green-600 font-medium">людях</span>.
          Просто введи <span className="text-green-600 font-medium">название</span> — и я всё расскажу.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название бренда
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => query.trim() && suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Например: Zara, H&M, Patagonia..."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {suggestions.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => selectBrand(brand)}
                      className="w-full p-3 text-left hover:bg-gray-50 transition flex justify-between items-center border-b last:border-b-0"
                    >
                      <div>
                        <span className="font-medium text-gray-800">{brand.name}</span>
                        <p className="text-xs text-gray-400">{brand.country}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getGradeInfo(brand.grade).color}`}>
                        {brand.grade}
                      </span>
                    </button>
                  ))}
                </div>
              )}
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
      </div>

      {!selectedBrand && !error && (
        <>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
              <div className="text-xl font-bold text-green-600">10%</div>
              <p className="text-xs text-gray-500">глобальных выбросов CO₂ от модной индустрии</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
              <div className="text-xl font-bold text-blue-600">2700 л</div>
              <p className="text-xs text-gray-500">воды для одной хлопковой футболки</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
              <div className="text-xl font-bold text-red-600">1 грузовик</div>
              <p className="text-xs text-gray-500">текстиля сжигается каждую секунду</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
              <div className="text-xl font-bold text-green-600">1%</div>
              <p className="text-xs text-gray-500">одежды перерабатывается в новую</p>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">Почему это важно?</h2>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              Модная индустрия — один из крупнейших загрязнителей планеты. 
              Каждый наш выбор имеет значение. Проверяя бренды, мы голосуем рублём за 
              более устойчивое и справедливое будущее. Вместе мы можем изменить индустрию 
              к лучшему — одну покупку за раз.
            </p>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Как мы оцениваем бренды?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <h3 className="font-semibold text-gray-800">Экологичность</h3>
                <p className="text-xs text-gray-500 mt-1">Материалы, водопотребление, переработка отходов, углеродный след</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <h3 className="font-semibold text-gray-800">Условия труда</h3>
                <p className="text-xs text-gray-500 mt-1">Оплата труда, безопасность, права рабочих, детский труд</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <h3 className="font-semibold text-gray-800">Прозрачность</h3>
                <p className="text-xs text-gray-500 mt-1">Публикуют ли бренды список фабрик? Есть ли сертификаты?</p>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Лучшие по версии нашего рейтинга</h2>
              <button onClick={() => navigate('/compare')} className="text-green-600 text-sm hover:underline">Все бренды →</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topBrands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => {
                    setSelectedBrand(brand);
                    addToHistory(brand.id);
                    setQuery(brand.name);
                  }}
                  className="bg-white rounded-xl p-3 shadow-sm border hover:shadow-md transition text-left"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-800 text-sm">{brand.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${getGradeInfo(brand.grade).color}`}>
                      {brand.grade}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{brand.country}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-amber-50 rounded-2xl p-6 max-w-3xl mx-auto border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-amber-800">Осторожно, greenwashing!</h2>
            </div>
            <p className="text-amber-700 text-sm leading-relaxed">
              Greenwashing (зелёный камуфляж) — это когда бренд говорит об экологичности, 
              но не подтверждает это сертификатами или реальными действиями. 
              Как распознать? Ищите конкретные сертификаты (GOTS, Fair Trade, B Corp), 
              списки фабрик и прозрачные отчёты. Наш сайт помогает отделить правду от маркетинга.
            </p>
          </div>

          <div className="mt-10 bg-green-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">Как стать осознанным покупателем?</h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex gap-2 items-start">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Покупайте меньше, но качественнее</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Ищите секонд-хенды и винтаж</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Ремонтируйте одежду вместо того, чтобы выбрасывать</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Стирайте в холодной воде и сушите на воздухе</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Сдавайте ненужные вещи на переработку</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Меняйтесь одеждой с друзьями</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-400 text-sm max-w-2xl mx-auto">
            <p className="italic">"Самая устойчивая вещь — та, которую вы уже носите. А вторая по устойчивости — та, которую вы купите осознанно."</p>
            <p className="text-xs mt-2">— Принцип устойчивой моды</p>
          </div>
        </>
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
    </div>
  );
};

export default HomePage;

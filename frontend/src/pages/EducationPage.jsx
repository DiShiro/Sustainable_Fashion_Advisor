import React from 'react';

const EducationPage = () => {
  const articles = [
    {
      title: 'Что такое устойчивая мода?',
      content: 'Устойчивая мода (sustainable fashion) — это подход к производству и потреблению одежды, который учитывает экологические, социальные и экономические последствия. Цель — минимизировать вред для планеты и людей.'
    },
    {
      title: 'Fast fashion vs Slow fashion',
      content: 'Fast fashion — бизнес-модель, основанная на быстром копировании трендов и выпуске больших объёмов недорогой одежды (Zara, H&M, Shein). Slow fashion — осознанное потребление, капсульные гардеробы, ремонт вещей и выбор качественных брендов.'
    },
    {
      title: 'Что такое Greenwashing?',
      content: 'Зелёный камуфляж — маркетинговый обман, когда компания заявляет о своей экологичности без реальных оснований. Например, использует зелёные цвета и слова "эко", "натуральный", но не предоставляет доказательств.'
    },
    {
      title: 'Главные эко-сертификаты',
      content: 'GOTS — органический текстиль. Fair Trade — справедливая оплата труда. B Corp — социальная и экологическая ответственность. OEKO-TEX — безопасность тканей для здоровья.'
    }
  ];

  const tips = [
    'Покупайте меньше, но качественнее',
    'Ищите секонд-хенды и винтажные магазины',
    'Учитесь ремонтировать одежду',
    'Сдавайте ненужные вещи на переработку',
    'Стирайте в холодной воде и сушите на воздухе'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Образовательный <span className="text-green-600">раздел</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Всё, что нужно знать об устойчивой моде
        </p>
      </div>

      {/* Статьи */}
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800">Основные понятия</h2>
        {articles.map((article, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 border-l-8 border-green-500">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
            <p className="text-gray-600 leading-relaxed">{article.content}</p>
          </div>
        ))}
      </div>

      {/* Советы */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Как стать осознанным потребителем?</h2>
        <ul className="space-y-2">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-green-600 text-xl">+</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Цитата */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>"Самая устойчивая вещь — та, которую вы уже носите"</p>
      </div>
    </div>
  );
};

export default EducationPage;
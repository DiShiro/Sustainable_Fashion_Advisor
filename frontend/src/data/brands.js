export const brands = {
  // === НИЗКИЙ РЕЙТИНГ (D) ===
  "zara": {
    id: "zara",
    name: "Zara",
    grade: "D",
    gradeColor: "bg-red-100 text-red-700",
    eco: 32,
    labor: 28,
    carbon: 68,
    alternatives: ["Arket", "Armedangels", "99recycle", "Patagonia"],
    alternativeIds: ["arket", "armedangels", "99recycle", "patagonia"],
    description: "Zara входит в группу Inditex. Есть коллекция 'Join Life', но основной объем производства — fast fashion. Условия труда в странах Азии оцениваются как критические. Бренд обещает к 2025 году использовать 100% устойчивых материалов, но пока прогресс медленный.",
    founded: 1975,
    country: "Испания",
    website: "https://www.zara.com"
  },
  "shein": {
    id: "shein",
    name: "Shein",
    grade: "D",
    gradeColor: "bg-red-100 text-red-700",
    eco: 15,
    labor: 12,
    carbon: 85,
    alternatives: ["Armedangels", "99recycle", "Patagonia", "Weekday"],
    alternativeIds: ["armedangels", "99recycle", "patagonia", "weekday"],
    description: "Shein — один из самых критикуемых брендов за экологию и условия труда. Огромные объёмы производства, низкое качество, отсутствие прозрачности. Рекомендуется избегать покупок в этом бренде.",
    founded: 2008,
    country: "Китай",
    website: "https://www.shein.com"
  },
  "hm": {
    id: "hm",
    name: "H&M",
    grade: "C",
    gradeColor: "bg-yellow-100 text-yellow-700",
    eco: 55,
    labor: 48,
    carbon: 55,
    alternatives: ["H&M Conscious", "Weekday", "Monki", "Arket"],
    alternativeIds: ["hm-conscious", "weekday", "monki", "arket"],
    description: "У H&M есть программа сбора старой одежды. Однако бренд остается одним из лидеров overproduction. Рекомендуем выбирать линию 'Conscious' из переработанных материалов. Бренд имеет цель стать циркулярным к 2030 году.",
    founded: 1947,
    country: "Швеция",
    website: "https://www.hm.com"
  },
  "nike": {
    id: "nike",
    name: "Nike",
    grade: "C+",
    gradeColor: "bg-yellow-100 text-yellow-700",
    eco: 58,
    labor: 45,
    carbon: 60,
    alternatives: ["Nike Move to Zero", "Adidas", "Patagonia", "Veja"],
    alternativeIds: ["nike-move-to-zero", "adidas", "patagonia", "veja"],
    description: "Nike использует переработанный полиэстер в некоторых коллекциях ('Move to Zero'), но основной объем производства остается углеродоемким. Есть проблемы с условиями труда на фабриках в Азии.",
    founded: 1964,
    country: "США",
    website: "https://www.nike.com"
  },
  "adidas": {
    id: "adidas",
    name: "Adidas",
    grade: "C+",
    gradeColor: "bg-yellow-100 text-yellow-700",
    eco: 60,
    labor: 50,
    carbon: 55,
    alternatives: ["Adidas x Parley", "Veja", "Patagonia", "ON Running"],
    alternativeIds: ["adidas-parley", "veja", "patagonia", "on-running"],
    description: "Adidas сотрудничает с Parley для создания кроссовок из океанского пластика. Есть цели по сокращению выбросов, но условия труда всё ещё требуют улучшения.",
    founded: 1949,
    country: "Германия",
    website: "https://www.adidas.com"
  },
  "uniqlo": {
    id: "uniqlo",
    name: "Uniqlo",
    grade: "C",
    gradeColor: "bg-yellow-100 text-yellow-700",
    eco: 50,
    labor: 45,
    carbon: 58,
    alternatives: ["Arket", "COS", "Muji", "Patagonia"],
    alternativeIds: ["arket", "cos", "muji", "patagonia"],
    description: "Uniqlo производит качественную одежду, но прозрачность цепочек поставок низкая. Есть программа переработки, но в основном бренд остаётся в сегменте масс-маркета.",
    founded: 1949,
    country: "Япония",
    website: "https://www.uniqlo.com"
  },

  // === СРЕДНИЙ РЕЙТИНГ (B) ===
  "arket": {
    id: "arket",
    name: "Arket",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 75,
    labor: 70,
    carbon: 40,
    alternatives: ["COS", "& Other Stories", "Weekday", "Monki"],
    alternativeIds: ["cos", "other-stories", "weekday", "monki"],
    description: "Arket — бренд H&M Group, специализирующийся на качественной одежде из устойчивых материалов. Используют переработанный полиэстер, органический хлопок и шерсть. Прозрачность цепочек поставок выше среднего.",
    founded: 2017,
    country: "Швеция",
    website: "https://www.arket.com"
  },
  "cos": {
    id: "cos",
    name: "COS",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 72,
    labor: 68,
    carbon: 42,
    alternatives: ["Arket", "Weekday", "& Other Stories", "Filippa K"],
    alternativeIds: ["arket", "weekday", "other-stories", "filippa-k"],
    description: "COS (Collection of Style) — бренд H&M Group с минималистичным дизайном. Используют устойчивые материалы, есть программы переработки. Качество выше среднего.",
    founded: 2007,
    country: "Швеция",
    website: "https://www.cos.com"
  },
  "weekday": {
    id: "weekday",
    name: "Weekday",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 74,
    labor: 72,
    carbon: 38,
    alternatives: ["Monki", "Arket", "COS", "Levi's"],
    alternativeIds: ["monki", "arket", "cos", "levis"],
    description: "Weekday — молодёжный бренд H&M Group. Активно используют переработанный деним и органический хлопок. Есть коллекции из сертифицированных материалов.",
    founded: 2002,
    country: "Швеция",
    website: "https://www.weekday.com"
  },
  "monki": {
    id: "monki",
    name: "Monki",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 73,
    labor: 70,
    carbon: 39,
    alternatives: ["Weekday", "Arket", "& Other Stories", "Girlfriend Collective"],
    alternativeIds: ["weekday", "arket", "other-stories", "girlfriend-collective"],
    description: "Monki — яркий молодёжный бренд. Используют переработанные материалы, продвигают бодипозитив и устойчивую моду. Есть ремонтные мастерские.",
    founded: 2006,
    country: "Швеция",
    website: "https://www.monki.com"
  },
  "veja": {
    id: "veja",
    name: "Veja",
    grade: "A-",
    gradeColor: "bg-green-100 text-green-700",
    eco: 85,
    labor: 82,
    carbon: 28,
    alternatives: ["Patagonia", "Allbirds", "Cariuma", "Nada"],
    alternativeIds: ["patagonia", "allbirds", "cariuma", "nada"],
    description: "Veja производит кроссовки из органического хлопка, дикого каучука и переработанных материалов. Прозрачные цепочки поставок, справедливая оплата труда. Французский бренд.",
    founded: 2004,
    country: "Франция",
    website: "https://www.veja-store.com"
  },
  "allbirds": {
    id: "allbirds",
    name: "Allbirds",
    grade: "A-",
    gradeColor: "bg-green-100 text-green-700",
    eco: 87,
    labor: 80,
    carbon: 25,
    alternatives: ["Veja", "Patagonia", "Cariuma", "Nada"],
    alternativeIds: ["veja", "patagonia", "cariuma", "nada"],
    description: "Allbirds — бренд обуви из натуральных материалов (меринос, эвкалипт, сахарный тростник). Углеродно-нейтральный бренд, компенсирует выбросы.",
    founded: 2016,
    country: "Новая Зеландия / США",
    website: "https://www.allbirds.com"
  },

  // === ВЫСОКИЙ РЕЙТИНГ (A) ===
  "patagonia": {
    id: "patagonia",
    name: "Patagonia",
    grade: "A",
    gradeColor: "bg-green-100 text-green-700",
    eco: 92,
    labor: 88,
    carbon: 25,
    alternatives: ["Pact", "Outerknown", "Armedangels", "Nudie Jeans"],
    alternativeIds: ["pact", "outerknown", "armedangels", "nudie-jeans"],
    description: "Patagonia — золотой стандарт устойчивой моды. Используют переработанные материалы, ремонтируют одежду, жертвуют 1% с продаж на экологию. B Corp сертифицированы. Призывают не покупать лишнего.",
    founded: 1973,
    country: "США",
    website: "https://www.patagonia.com"
  },
  "armedangels": {
    id: "armedangels",
    name: "Armedangels",
    grade: "A",
    gradeColor: "bg-green-100 text-green-700",
    eco: 88,
    labor: 85,
    carbon: 30,
    alternatives: ["Patagonia", "Pact", "Nudie Jeans", "Filippa K"],
    alternativeIds: ["patagonia", "pact", "nudie-jeans", "filippa-k"],
    description: "Немецкий бренд, производящий одежду из органических и переработанных материалов. Сертифицированы как B Corp. Прозрачные цепочки поставок, справедливая оплата.",
    founded: 2007,
    country: "Германия",
    website: "https://www.armedangels.com"
  },
  "99recycle": {
    id: "99recycle",
    name: "99recycle",
    grade: "B+",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 82,
    labor: 75,
    carbon: 35,
    alternatives: ["Armedangels", "Patagonia", "Recycle", "Botanica"],
    alternativeIds: ["armedangels", "patagonia", "recycle", "botanica"],
    description: "Российский бренд, создающий одежду из переработанных материалов. Собирают пластиковые бутылки и перерабатывают их в ткань. Растёт прозрачность производства.",
    founded: 2018,
    country: "Россия",
    website: "https://www.99recycle.ru"
  },
  "pact": {
    id: "pact",
    name: "Pact",
    grade: "A-",
    gradeColor: "bg-green-100 text-green-700",
    eco: 86,
    labor: 84,
    carbon: 28,
    alternatives: ["Patagonia", "Armedangels", "Organic Basics", "Tentree"],
    alternativeIds: ["patagonia", "armedangels", "organic-basics", "tentree"],
    description: "Pact производит одежду из органического хлопка. Fair Trade сертифицированы. Базовые вещи высокого качества по разумным ценам.",
    founded: 2009,
    country: "США",
    website: "https://www.wearpact.com"
  },
  "outerknown": {
    id: "outerknown",
    name: "Outerknown",
    grade: "A-",
    gradeColor: "bg-green-100 text-green-700",
    eco: 85,
    labor: 83,
    carbon: 30,
    alternatives: ["Patagonia", "Armedangels", "Nudie Jeans", "Tentree"],
    alternativeIds: ["patagonia", "armedangels", "nudie-jeans", "tentree"],
    description: "Бренд, основанный сёрфером Келли Слейтером. Используют переработанные материалы, органический хлопок. Прозрачные цепочки поставок.",
    founded: 2015,
    country: "США",
    website: "https://www.outerknown.com"
  },
  "nudie-jeans": {
    id: "nudie-jeans",
    name: "Nudie Jeans",
    grade: "A",
    gradeColor: "bg-green-100 text-green-700",
    eco: 89,
    labor: 87,
    carbon: 27,
    alternatives: ["Patagonia", "Armedangels", "Outerknown", "MUD Jeans"],
    alternativeIds: ["patagonia", "armedangels", "outerknown", "mud-jeans"],
    description: "Шведский бренд джинсов. Предлагает бесплатный ремонт, принимает старые джинсы на переработку. Используют органический хлопок. Прозрачность производства.",
    founded: 2001,
    country: "Швеция",
    website: "https://www.nudiejeans.com"
  },
  "tentree": {
    id: "tentree",
    name: "Tentree",
    grade: "A-",
    gradeColor: "bg-green-100 text-green-700",
    eco: 84,
    labor: 80,
    carbon: 32,
    alternatives: ["Patagonia", "Armedangels", "Pact", "Outerknown"],
    alternativeIds: ["patagonia", "armedangels", "pact", "outerknown"],
    description: "За каждую купленную вещь Tentree сажает 10 деревьев. Всего посажено более 100 миллионов деревьев. Используют экологичные материалы.",
    founded: 2012,
    country: "Канада",
    website: "https://www.tentree.com"
  },
  "organic-basics": {
    id: "organic-basics",
    name: "Organic Basics",
    grade: "A",
    gradeColor: "bg-green-100 text-green-700",
    eco: 90,
    labor: 86,
    carbon: 24,
    alternatives: ["Pact", "Armedangels", "Tentree", "Girlfriend Collective"],
    alternativeIds: ["pact", "armedangels", "tentree", "girlfriend-collective"],
    description: "Датский бренд базовой одежды. Используют органический хлопок, переработанные материалы. Углеродно-нейтральный бренд. Прозрачность производства.",
    founded: 2015,
    country: "Дания",
    website: "https://www.organicbasics.com"
  },

  // === РОССИЙСКИЕ БРЕНДЫ ===
  "botanica": {
    id: "botanica",
    name: "Botanica",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 78,
    labor: 72,
    carbon: 38,
    alternatives: ["99recycle", "Armedangels", "Patagonia", "Recycle"],
    alternativeIds: ["99recycle", "armedangels", "patagonia", "recycle"],
    description: "Российский бренд одежды из натуральных тканей. Используют лён, хлопок, крапиву. Производство в России, прозрачность выше среднего.",
    founded: 2015,
    country: "Россия",
    website: "https://www.botanicaclub.ru"
  },
  "recycle": {
    id: "recycle",
    name: "Recycle",
    grade: "B-",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 70,
    labor: 65,
    carbon: 45,
    alternatives: ["99recycle", "Botanica", "Armedangels", "Patagonia"],
    alternativeIds: ["99recycle", "botanica", "armedangels", "patagonia"],
    description: "Российский бренд, создающий одежду из переработанных материалов. Сотрудничают с эко-проектами.",
    founded: 2010,
    country: "Россия",
    website: "https://www.recyclemag.ru"
  },
  "svetlana": {
    id: "svetlana",
    name: "Svetlana",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 76,
    labor: 74,
    carbon: 36,
    alternatives: ["Botanica", "99recycle", "Armedangels", "Patagonia"],
    alternativeIds: ["botanica", "99recycle", "armedangels", "patagonia"],
    description: "Российский бренд женской одежды из натуральных тканей. Производство в России, используют органический хлопок и лён.",
    founded: 2017,
    country: "Россия",
    website: "https://www.svetlana.ru"
  }
};

export const searchBrands = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  return Object.values(brands).filter(brand => 
    brand.name.toLowerCase().includes(lowerQuery) || 
    brand.id.includes(lowerQuery)
  );
};

export const getBrandById = (id) => {
  return brands[id.toLowerCase()];
};

export const getAllBrands = () => {
  return Object.values(brands);
};

export const getBrandsByGrade = (grade) => {
  return Object.values(brands).filter(brand => brand.grade === grade);
};

export const getTopBrands = (limit = 5) => {
  return Object.values(brands)
    .sort((a, b) => b.eco - a.eco)
    .slice(0, limit);
};
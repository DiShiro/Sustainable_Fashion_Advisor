export const brands = {
  "zara": {
    id: "zara",
    name: "Zara",
    grade: "D",
    gradeColor: "bg-red-100 text-red-700",
    eco: 32,
    labor: 28,
    carbon: 68,
    alternatives: ["Arket", "Armedangels", "99recycle"],
    alternativeIds: ["arket", "armedangels", "99recycle"],
    description: "Zara входит в группу Inditex. Есть коллекция 'Join Life', но основной объем производства — fast fashion. Условия труда в странах Азии оцениваются как критические.",
    founded: 1975,
    country: "Испания"
  },
  "hm": {
    id: "hm",
    name: "H&M",
    grade: "C",
    gradeColor: "bg-yellow-100 text-yellow-700",
    eco: 55,
    labor: 48,
    carbon: 55,
    alternatives: ["H&M Conscious", "Weekday", "Monki"],
    alternativeIds: ["hm-conscious", "weekday", "monki"],
    description: "У H&M есть программа сбора старой одежды. Однако бренд остается одним из лидеров overproduction. Рекомендуем выбирать линию 'Conscious'.",
    founded: 1947,
    country: "Швеция"
  },
  "patagonia": {
    id: "patagonia",
    name: "Patagonia",
    grade: "A",
    gradeColor: "bg-green-100 text-green-700",
    eco: 92,
    labor: 88,
    carbon: 25,
    alternatives: ["Pact", "Outerknown"],
    alternativeIds: ["pact", "outerknown"],
    description: "Patagonia — золотой стандарт: переработанные материалы, ремонт одежды, 1% с продаж на экологию. B Corp сертификат.",
    founded: 1973,
    country: "США"
  },
  "nike": {
    id: "nike",
    name: "Nike",
    grade: "C+",
    gradeColor: "bg-yellow-100 text-yellow-700",
    eco: 58,
    labor: 45,
    carbon: 60,
    alternatives: ["Nike Move to Zero", "Adidas"],
    alternativeIds: ["nike-move-to-zero", "adidas"],
    description: "Nike использует переработанный полиэстер в некоторых коллекциях, но основной объем производства остается углеродоемким.",
    founded: 1964,
    country: "США"
  },
  "arket": {
    id: "arket",
    name: "Arket",
    grade: "B",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 75,
    labor: 70,
    carbon: 40,
    alternatives: ["COS", "& Other Stories"],
    alternativeIds: ["cos", "other-stories"],
    description: "Arket — бренд H&M Group, специализирующийся на качественной одежде из устойчивых материалов. Используют переработанный полиэстер и органический хлопок.",
    founded: 2017,
    country: "Швеция"
  },
  "armedangels": {
    id: "armedangels",
    name: "Armedangels",
    grade: "A",
    gradeColor: "bg-green-100 text-green-700",
    eco: 88,
    labor: 85,
    carbon: 30,
    alternatives: ["Patagonia", "Pact"],
    alternativeIds: ["patagonia", "pact"],
    description: "Немецкий бренд, производящий одежду из органических и переработанных материалов. Сертифицированы как B Corp.",
    founded: 2007,
    country: "Германия"
  },
  "99recycle": {
    id: "99recycle",
    name: "99recycle",
    grade: "B+",
    gradeColor: "bg-blue-100 text-blue-700",
    eco: 82,
    labor: 75,
    carbon: 35,
    alternatives: ["Armedangels", "Patagonia"],
    alternativeIds: ["armedangels", "patagonia"],
    description: "Российский бренд, создающий одежду из переработанных материалов.",
    founded: 2018,
    country: "Россия"
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
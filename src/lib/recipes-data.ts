import { Recipe, Goal } from './types';

export const recipesData: Omit<Recipe, 'id' | 'created_at'>[] = [
  // Weight Gain Recipes
  {
    name: 'Shake Hipercalórico de Banana',
    description: 'Shake cremoso e calórico perfeito para ganho de massa.',
    ingredients: [
      '2 bananas maduras',
      '400ml de leite integral',
      '3 colheres de aveia',
      '2 colheres de pasta de amendoim',
      '1 colher de mel',
      '30g de whey protein'
    ],
    instructions: [
      'Adicione todos os ingredientes no liquidificador.',
      'Bata por 2-3 minutos até ficar cremoso.',
      'Sirva imediatamente para melhor consistência.',
      'Opcional: adicione gelo para servir gelado.'
    ],
    goal: 'weight_gain',
    prep_time: 5,
    cook_time: 0,
    servings: 1,
    calories: 850,
    protein: 45,
    carbs: 95,
    fat: 28,
    image_url: null,
  },
  {
    name: 'Arroz com Frango e Legumes',
    description: 'Refeição completa para ganho de massa muscular.',
    ingredients: [
      '200g de peito de frango',
      '150g de arroz branco',
      '100g de brócolis',
      '1 cenoura média',
      '2 colheres de azeite',
      'Temperos a gosto'
    ],
    instructions: [
      'Cozinhe o arroz normalmente.',
      'Grelhe o frango temperado em uma frigideira.',
      'Cozinhe os legumes no vapor por 5-7 minutos.',
      'Monte o prato com todos os ingredientes.',
      'Finalize com azeite e temperos.'
    ],
    goal: 'weight_gain',
    prep_time: 15,
    cook_time: 30,
    servings: 1,
    calories: 720,
    protein: 55,
    carbs: 70,
    fat: 22,
    image_url: null,
  },
  {
    name: 'Panqueca Proteica de Aveia',
    description: 'Café da manhã rico em proteínas e carboidratos.',
    ingredients: [
      '2 ovos inteiros',
      '1 banana',
      '4 colheres de aveia',
      '30g de whey protein',
      '1 colher de mel',
      'Canela a gosto'
    ],
    instructions: [
      'Amasse a banana e misture com os ovos.',
      'Adicione a aveia e o whey, misturando bem.',
      'Aqueça uma frigideira antiaderente.',
      'Despeje pequenas porções da massa.',
      'Vire quando formar bolhas e dourar.',
      'Sirva com mel e canela.'
    ],
    goal: 'weight_gain',
    prep_time: 10,
    cook_time: 15,
    servings: 2,
    calories: 520,
    protein: 38,
    carbs: 55,
    fat: 18,
    image_url: null,
  },

  // Weight Loss Recipes
  {
    name: 'Salada de Frango Grelhado',
    description: 'Refeição leve e rica em proteínas.',
    ingredients: [
      '150g de peito de frango',
      '2 xícaras de folhas verdes',
      '1 tomate',
      '1/2 pepino',
      '1 colher de azeite',
      'Limão e sal a gosto'
    ],
    instructions: [
      'Tempere e grelhe o frango.',
      'Lave e corte as folhas e vegetais.',
      'Monte a salada em um prato grande.',
      'Adicione o frango fatiado por cima.',
      'Tempere com azeite, limão e sal.'
    ],
    goal: 'weight_loss',
    prep_time: 10,
    cook_time: 15,
    servings: 1,
    calories: 320,
    protein: 40,
    carbs: 12,
    fat: 14,
    image_url: null,
  },
  {
    name: 'Omelete de Claras com Espinafre',
    description: 'Café da manhã proteico e baixo em calorias.',
    ingredients: [
      '4 claras de ovo',
      '1 xícara de espinafre',
      '1/4 de cebola picada',
      '2 tomates cereja',
      'Sal e pimenta a gosto'
    ],
    instructions: [
      'Refogue a cebola e espinafre.',
      'Bata as claras com sal e pimenta.',
      'Despeje as claras na frigideira.',
      'Adicione os tomates cortados.',
      'Dobre a omelete e sirva.'
    ],
    goal: 'weight_loss',
    prep_time: 5,
    cook_time: 10,
    servings: 1,
    calories: 180,
    protein: 24,
    carbs: 8,
    fat: 4,
    image_url: null,
  },
  {
    name: 'Sopa de Legumes Light',
    description: 'Sopa nutritiva e baixa em calorias.',
    ingredients: [
      '2 cenouras',
      '2 abobrinhas',
      '1 chuchu',
      '1/2 repolho pequeno',
      '1 cebola',
      'Temperos naturais'
    ],
    instructions: [
      'Pique todos os legumes em cubos.',
      'Refogue a cebola em água.',
      'Adicione os legumes e cubra com água.',
      'Cozinhe até os legumes ficarem macios.',
      'Tempere a gosto e sirva quente.'
    ],
    goal: 'weight_loss',
    prep_time: 15,
    cook_time: 25,
    servings: 4,
    calories: 85,
    protein: 3,
    carbs: 18,
    fat: 1,
    image_url: null,
  },
  {
    name: 'Peixe Grelhado com Aspargos',
    description: 'Jantar leve e rico em ômega-3.',
    ingredients: [
      '180g de filé de tilápia',
      '8 aspargos',
      '1 limão',
      '1 colher de azeite',
      'Ervas finas',
      'Sal e pimenta'
    ],
    instructions: [
      'Tempere o peixe com limão e ervas.',
      'Grelhe o peixe por 4-5 minutos de cada lado.',
      'Grelhe os aspargos com azeite.',
      'Monte o prato e finalize com limão.',
      'Sirva imediatamente.'
    ],
    goal: 'weight_loss',
    prep_time: 10,
    cook_time: 12,
    servings: 1,
    calories: 280,
    protein: 42,
    carbs: 8,
    fat: 10,
    image_url: null,
  },

  // Maintenance Recipes
  {
    name: 'Bowl de Açaí Proteico',
    description: 'Lanche equilibrado e energético.',
    ingredients: [
      '200g de polpa de açaí',
      '1 banana',
      '30g de granola',
      '2 colheres de pasta de amendoim',
      'Frutas variadas para decorar'
    ],
    instructions: [
      'Bata o açaí com metade da banana.',
      'Transfira para uma tigela.',
      'Decore com granola e frutas.',
      'Adicione a pasta de amendoim.',
      'Sirva imediatamente.'
    ],
    goal: 'maintenance',
    prep_time: 10,
    cook_time: 0,
    servings: 1,
    calories: 480,
    protein: 15,
    carbs: 65,
    fat: 18,
    image_url: null,
  },
  {
    name: 'Wrap de Frango com Homus',
    description: 'Almoço prático e balanceado.',
    ingredients: [
      '1 wrap integral',
      '100g de frango desfiado',
      '3 colheres de homus',
      'Alface e tomate',
      'Cenoura ralada'
    ],
    instructions: [
      'Espalhe o homus no wrap.',
      'Adicione o frango desfiado.',
      'Coloque os vegetais.',
      'Enrole firmemente.',
      'Corte ao meio e sirva.'
    ],
    goal: 'maintenance',
    prep_time: 10,
    cook_time: 0,
    servings: 1,
    calories: 420,
    protein: 32,
    carbs: 38,
    fat: 16,
    image_url: null,
  },
  {
    name: 'Quinoa com Legumes Salteados',
    description: 'Refeição completa e nutritiva.',
    ingredients: [
      '100g de quinoa',
      '1 abobrinha',
      '1 pimentão',
      '100g de cogumelos',
      '2 colheres de azeite',
      'Molho shoyu'
    ],
    instructions: [
      'Cozinhe a quinoa conforme instruções.',
      'Corte os legumes em cubos.',
      'Salteie os legumes no azeite.',
      'Misture com a quinoa cozida.',
      'Finalize com molho shoyu.'
    ],
    goal: 'maintenance',
    prep_time: 10,
    cook_time: 20,
    servings: 2,
    calories: 380,
    protein: 14,
    carbs: 48,
    fat: 15,
    image_url: null,
  },
  {
    name: 'Smoothie Verde Energético',
    description: 'Bebida refrescante e nutritiva.',
    ingredients: [
      '1 xícara de espinafre',
      '1 banana congelada',
      '1/2 abacate',
      '200ml de água de coco',
      '1 colher de chia'
    ],
    instructions: [
      'Adicione todos os ingredientes no liquidificador.',
      'Bata até ficar homogêneo.',
      'Adicione gelo se preferir mais gelado.',
      'Sirva imediatamente.'
    ],
    goal: 'maintenance',
    prep_time: 5,
    cook_time: 0,
    servings: 1,
    calories: 320,
    protein: 8,
    carbs: 42,
    fat: 15,
    image_url: null,
  },
];

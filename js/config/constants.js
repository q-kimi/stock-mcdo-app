// Configuration et constantes du projet
export const CREDENTIALS = {
    username: 'admin',
    password: 'admin'
};

export const STORAGE_KEYS = {
    IS_LOGGED_IN: 'isLoggedIn',
    REMEMBER_LOGIN: 'rememberLogin',
    STOCK_PREFIX: 'stockMcdo_'
};

export const CATEGORIES = {
    CUISINE: 'cuisine',
    COMPTOIR: 'comptoir'
};

export const CATEGORY_TITLES = {
    [CATEGORIES.CUISINE]: 'Perte Cuisine',
    [CATEGORIES.COMPTOIR]: 'Perte Comptoir'
};

export const CUISINE_SUBCATEGORIES = [
    { id: 'bigmac', name: 'Big Mac' },
    { id: 'cheeseburger', name: 'Cheeseburger' },
    { id: 'mcchicken', name: 'McChicken' },
    { id: 'filet-o-fish', name: 'Filet-O-Fish' },
    { id: 'mcflurry', name: 'McFlurry' },
    { id: 'nuggets', name: 'Chicken McNuggets' },
    { id: 'fries', name: 'Frites' },
    { id: 'wrap', name: 'McWrap' },
    { id: 'salad', name: 'Salade' },
    { id: 'applepie', name: 'Apple Pie' }
    // Ingrédients des burgers
    { id: 'bun', name: 'Pain à burger' },
    { id: 'beefpatty', name: 'Steak haché' },
    { id: 'chickenpatty', name: 'Poulet pané' },
    { id: 'fishpatty', name: 'Poisson pané' },
    { id: 'cheese', name: 'Fromage' },
    { id: 'lettuce', name: 'Salade' },
    { id: 'tomato', name: 'Tomate' },
    { id: 'onion', name: 'Oignon' },
    { id: 'pickles', name: 'Cornichons' },
    { id: 'sauce', name: 'Sauce spéciale' },
    { id: 'mayonnaise', name: 'Mayonnaise' },
    { id: 'ketchup', name: 'Ketchup' },
    { id: 'mustard', name: 'Moutarde' }
];

export const LOADING_MESSAGES = [
    'Chargement des modules...',
    'Initialisation de la base...',
    'Vérification des accès...',
    'Connexion sécurisée...',
    'Comptage des pertes en cours...',
    'Recherche de frites disparues...',
    'Recherche de nuggets égarés...',
    'Recherche de steaks 10:1 perdus...',
    'Recherche de cornichons disparus...',
    'Analyse du ketchup restant...'
];

export const ANIMATION_DURATION = {
    LOGIN: 5000,
    MESSAGE_ROTATION: 700,
    MESSAGE_FADE: 120
};

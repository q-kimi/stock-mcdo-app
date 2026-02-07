// Configuration et constantes du projet

// ===== MODULE AUTH (ISOLATED) =====
// Ce module est isolé et ne sera jamais affecté par les modifications du site
export const CREDENTIALS = {
    username: 'admin',
    password: 'admin'
};

export const STORAGE_KEYS = {
    IS_LOGGED_IN: 'isLoggedIn',
    REMEMBER_LOGIN: 'rememberLogin',
    STOCK_PREFIX: 'stockMcdo_'
};
// ===== FIN MODULE AUTH =====

// ===== CONFIGURATION DES CATÉGORIES =====
export const CATEGORIES = {
    CUISINE: 'cuisine',
    COMPTOIR: 'comptoir',
    MANAGER: 'manager'
};

export const CATEGORY_TITLES = {
    [CATEGORIES.CUISINE]: 'Perte Cuisine',
    [CATEGORIES.COMPTOIR]: 'Perte Comptoir',
    [CATEGORIES.MANAGER]: 'Manager'
};

// Sous-catégories de Perte Cuisine
export const CUISINE_SUBCATEGORIES = [
    { id: 'table', name: 'Table' },
    { id: 'sauces', name: 'Sauces' },
    { id: 'pain', name: 'Pain' },
    { id: 'proteines', name: 'Protéines' },
    { id: 'sandwichs', name: 'Sandwichs' }
];

export const LOADING_MESSAGES = [
    'Chargement des modules...',
    'Vérification des accès...',
    'Connexion sécurisée...',
    'Comptage de vos pertes en cours...',
    'Analyse des données...',
    'Préparation de l\'interface...',
    'Finalisation du chargement...'
];

export const ANIMATION_DURATION = {
    LOGIN: 3500,
    MANAGER_LOGIN: 500,
    MESSAGE_ROTATION: 500,
    MESSAGE_FADE: 120
};

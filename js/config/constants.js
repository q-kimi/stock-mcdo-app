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
    LOGIN: 3000,
    MANAGER_LOGIN: 3000,
    MESSAGE_ROTATION: 700,
    MESSAGE_FADE: 120
};

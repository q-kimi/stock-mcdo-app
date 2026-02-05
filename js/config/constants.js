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

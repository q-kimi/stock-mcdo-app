// Gestion des produits et du stock
import { STORAGE_KEYS } from '../config/constants.js';
import { storage } from '../utils/storage.js';

// Listes de produits par catégorie et sous-catégorie
export const produitsParCategorie = {
    // Perte Cuisine - Sous-catégories
    'cuisine-table': [
        'Oignons Royal',
        'Oignons Frits',
        'Cheddar Orange',
        'Cheddar Blanc',
        'Gouda',
        'Bacon',
        'Cornichons',
        'Salade Mac',
        'Salade Batavia',
        'Tomates',
    ],
    'cuisine-sauces': [
        'Sauce Big Mac',
        'Sauce McChicken',
        'Sauce CBO',
        'Sauce Tasty',
        'Sauce Tartare',
        'Sauce Crispy',
        'Sauce Ranch',
        'Sauce Extreme',
        'Sauce Deluxe',
    ],
    'cuisine-pain': [
        'Pain Big Mac',
        'Pain Reg',
        'Pain CBO',
        'Pain Royal',
        'Pain Tasty',
        'Galette New York',
        'Galette P\'tit Wrap',
        'Pain McMuffin',
        'Pain Crispy',
    ],
    'cuisine-proteines': [
        'Viande 10:1',
        'Viande 4:1',
        'Viande 3:1', 
        'Nuggets',
        'Nuggets Veggie',
        'Wrap Poulet',
        'McChicken',
        'CBO',
        'Crispy',
        'Filet',
        'Egg',
        'Palet Veggie',
    ],
    'cuisine-sandwichs': [
'Hamburger',
    'Cheese',
    'Double Cheese',
    'Double Cheese Bacon',
    'Triple Cheese',
    'Triple Cheese Bacon',
    'Royal Cheese',
    'Royal Deluxe',
    'Royal Bacon',
    'Big Mac',
    'Big Arch',
    'Big Tasty 1v',
    'Big Tasty 2v',
    '280',
    'P\'tit Chicken',
    'Nuggets',
    'McChicken',
    'McCrispy',
    'McCrispy Bacon',
    'CBO',
    'McWrap New York',
    'Big Mac Chicken',
    'Filet-O-Fish',
    'McFish',
    'McFish Mayo',
    'Fish New York',
    'Double Fish New York',
    'Veggie McPlant Nuggets',
    'McVeggie',
    'McWrap Veggie',
    'P\'tit Wrap Ranch Veggie',
    'P\'tit Wrap New York Veggie',
    'P\'tit Wrap Ranch',
    'P\'tit Wrap New York',
    'Croque McDo',
    'Egg & Cheese McMuffin',
    'Egg & Bacon McMuffin',
    'Salade Caesar',
    'Salade Caesar Veggie',
    ],
    
    // Perte Comptoir
    'comptoir': [
        'exemple 1',
        'exemple 2',
        'exemple 3',
        'exemple 4',
        'exemple 5',
        'exemple 6',
        'exemple 7',
        'exemple 8',
        'exemple 9',
        'exemple 10'
    ],
    
    // Manager
    'manager': [
        'exemple 1',
        'exemple 2',
        'exemple 3',
        'exemple 4',
        'exemple 5',
        'exemple 6',
        'exemple 7',
        'exemple 8',
        'exemple 9',
        'exemple 10'
    ]
};

export function getQuantities(category) {
    const saved = storage.get(`${STORAGE_KEYS.STOCK_PREFIX}${category}`);
    const produits = produitsParCategorie[category] || [];
    
    // Créer un objet avec tous les produits initialisés à 0
    const defaultQuantities = produits.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
    
    // Si des données sauvegardées existent, les merger avec les valeurs par défaut
    if (saved && typeof saved === 'object') {
        return { ...defaultQuantities, ...saved };
    }
    
    return defaultQuantities;
}

export function saveQuantities(category, quantities) {
    storage.set(`${STORAGE_KEYS.STOCK_PREFIX}${category}`, quantities);
}

export function updateQuantity(category, produit, amount) {
    const quantities = getQuantities(category);
    if (!(produit in quantities)) return false;
    
    quantities[produit] = Math.max(0, (quantities[produit] || 0) + amount);
    saveQuantities(category, quantities);
    return true;
}

// Fonction pour réinitialiser les données d'une catégorie
export function resetCategoryData(category) {
    storage.remove(`${STORAGE_KEYS.STOCK_PREFIX}${category}`);
}

// Fonction pour nettoyer toutes les données
export function clearAllData() {
    const categories = Object.keys(produitsParCategorie);
    categories.forEach(cat => resetCategoryData(cat));
}

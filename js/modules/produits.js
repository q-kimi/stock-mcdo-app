// Gestion des produits et du stock
import { STORAGE_KEYS } from '../config/constants.js';
import { storage } from '../utils/storage.js';

// Listes de produits par catégorie et sous-catégorie
export const produitsParCategorie = {
    // Perte Cuisine - Sous-catégories
    'cuisine-table': [
        'Salade',
        'Cheddar orange',
        'exemple 3',
        'exemple 4',
        'exemple 5',
        'exemple 6',
        'exemple 7',
        'exemple 8',
        'exemple 9',
        'exemple 10'
    ],
    'cuisine-sauces': [
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
    'cuisine-pain': [
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
    'cuisine-proteines': [
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
    'cuisine-sandwichs': [
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
// Gestion des produits et du stock
import { STORAGE_KEYS } from '../config/constants.js';
import { storage } from '../utils/storage.js';

export const produitsParCategorie = {
    cuisine: [
        'Big Mac', 'McChicken', 'Royal Deluxe', 'Frites M', 'Frites L',
        'Nuggets 4', 'Nuggets 9', 'Nuggets 20', 'Crousty Poulet',
        "P'tit Wrap Ranch", 'Double Cheese', 'Filet-O-Fish'
    ],
    comptoir: [
        'Coca-Cola M', 'Coca-Cola L', 'Sprite M', 'Fanta M',
        'McFlurry Oreo', "McFlurry M&M's", 'Sundae Caramel',
        'Sundae Chocolat', 'Milk-shake Vanille', 'Café',
        'Cappuccino', 'Muffin'
    ]
};

export function getQuantities(category) {
    const saved = storage.get(`${STORAGE_KEYS.STOCK_PREFIX}${category}`);
    if (saved) return saved;
    
    const produits = produitsParCategorie[category] || [];
    return produits.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
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

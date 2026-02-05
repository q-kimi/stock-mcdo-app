// Gestion des produits, catégories, quantités, stockage local
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
    const saved = localStorage.getItem(`stockMcdo_${category}`);
    if (saved) {
        return JSON.parse(saved);
    }
    const produits = produitsParCategorie[category] || [];
    return produits.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
}

export function saveQuantities(category, quantities) {
    localStorage.setItem(`stockMcdo_${category}` , JSON.stringify(quantities));
}

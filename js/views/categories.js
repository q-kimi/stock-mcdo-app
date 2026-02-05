// Vue de sélection de catégorie et sous-catégories
import { DOM } from '../utils/dom.js';
import { CATEGORIES, CUISINE_SUBCATEGORIES } from '../config/constants.js';

export function initCategoriesView(onCategorySelect, onSubcategorySelect) {
    // Gestion des catégories principales
    DOM.onAll(DOM.getAll('.category-btn'), 'click', (e) => {
        const cat = e.target.textContent.includes('Cuisine') ? CATEGORIES.CUISINE : CATEGORIES.COMPTOIR;
        
        if (cat === CATEGORIES.CUISINE) {
            // Afficher les sous-catégories pour Cuisine
            showSubcategories();
        } else {
            // Aller directement aux produits pour Comptoir
            onCategorySelect(cat);
        }
    });
    
    // Bouton retour des sous-catégories vers catégories
    const backBtn = DOM.getById('backToCategories');
    if (backBtn) {
        DOM.on(backBtn, 'click', hideSubcategories);
    }
    
    // Fonction pour afficher les sous-catégories
    function showSubcategories() {
        DOM.hide(DOM.getById('categorySelector'));
        const subcatSelector = DOM.getById('subcategorySelector');
        DOM.show(subcatSelector);
        
        // Générer les boutons de sous-catégories
        const buttonsContainer = DOM.getById('subcategoryButtons');
        buttonsContainer.innerHTML = '';
        
        CUISINE_SUBCATEGORIES.forEach(subcat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = subcat.name;
            btn.setAttribute('data-subcat-id', subcat.id);
            DOM.on(btn, 'click', () => {
                onSubcategorySelect(CATEGORIES.CUISINE, subcat.id);
            });
            buttonsContainer.appendChild(btn);
        });
    }
    
    // Fonction pour masquer les sous-catégories
    function hideSubcategories() {
        DOM.hide(DOM.getById('subcategorySelector'));
        DOM.show(DOM.getById('categorySelector'));
    }
}


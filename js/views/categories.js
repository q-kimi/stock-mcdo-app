// Vue de sélection de catégorie
import { DOM } from '../utils/dom.js';

export function initCategoriesView(selectCategory) {
    DOM.onAll(DOM.getAll('.category-btn'), 'click', (e) => {
        const cat = e.target.textContent.includes('Cuisine') ? 'cuisine' : 'comptoir';
        selectCategory(cat);
    });
}

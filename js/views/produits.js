// Vue de gestion des produits
import { DOM } from '../utils/dom.js';

export function initProduitsView(backToCategories) {
    DOM.onAll(DOM.getAll('.back-btn'), 'click', backToCategories);
}

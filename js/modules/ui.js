// Gestion de l'affichage UI
import { DOM } from '../utils/dom.js';

export function showLogin() {
    DOM.show(DOM.getById('loginScreen'));
    DOM.removeClass(DOM.getById('appContainer'), 'active');
}

export function showApp() {
    DOM.hide(DOM.getById('loginScreen'));
    DOM.addClass(DOM.getById('appContainer'), 'active');
    DOM.show(DOM.getById('categorySelector'));
    DOM.removeClass(DOM.getById('productView'), 'active');
}

export function showError(message) {
    const errorElement = DOM.getById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        DOM.show(errorElement);
    }
}

export function hideError() {
    const errorElement = DOM.getById('errorMessage');
    if (errorElement) {
        DOM.hide(errorElement);
    }
}

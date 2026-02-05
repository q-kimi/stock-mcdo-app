// Point d'entrée principal - MedalBot Pertes
import { checkAuth, logout } from './modules/auth.js';
import { produitsParCategorie, getQuantities, saveQuantities, updateQuantity } from './modules/produits.js';
import { showLogin, showApp } from './modules/ui.js';
import { DOM } from './utils/dom.js';
import { CATEGORY_TITLES } from './config/constants.js';
import { initLoginView } from './views/login.js';
import { initCategoriesView } from './views/categories.js';
import { initProduitsView } from './views/produits.js';

// État de l'application
const state = {
    currentCategory: null,
    currentSearch: ''
};

// Rendu de la liste des produits
function render() {
    if (!state.currentCategory) return;
    
    const quantities = getQuantities(state.currentCategory);
    const productList = DOM.getById('productList');
    productList.innerHTML = '';
    
    let produits = produitsParCategorie[state.currentCategory];
    if (state.currentSearch.trim()) {
        const searchLower = state.currentSearch.trim().toLowerCase();
        produits = produits.filter(p => p.toLowerCase().includes(searchLower));
    }
    
    produits.forEach(produit => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <div class="product-name">${produit}</div>
            <div class="quantity-controls">
                <button class="btn" data-action="decrement" data-produit="${produit}">−</button>
                <button class="btn btn-bulk" data-action="bulk" data-produit="${produit}" data-amount="5">+5</button>
                <button class="btn btn-bulk" data-action="bulk" data-produit="${produit}" data-amount="10">+10</button>
                <div class="quantity" data-produit="${produit}" tabindex="0">${quantities[produit]}</div>
                <button class="btn" data-action="increment" data-produit="${produit}">+</button>
            </div>
        `;
        productList.appendChild(item);
    });
}

// Gestion des changements de quantité
function changeQuantity(produit, amount) {
    if (updateQuantity(state.currentCategory, produit, amount)) {
        render();
    }
}

// Sélection de catégorie
function selectCategory(category) {
    state.currentCategory = category;
    DOM.hide(DOM.getById('categorySelector'));
    DOM.addClass(DOM.getById('productView'), 'active');
    DOM.getById('categoryTitle').textContent = CATEGORY_TITLES[category];
    render();
}

// Retour aux catégories
function backToCategories() {
    state.currentCategory = null;
    state.currentSearch = '';
    DOM.show(DOM.getById('categorySelector'));
    DOM.removeClass(DOM.getById('productView'), 'active');
}

// Gestion de la déconnexion
function handleLogout() {
    logout();
    state.currentCategory = null;
    state.currentSearch = '';
    showLogin();
}


// Initialisation de l'application
DOM.on(window, 'DOMContentLoaded', () => {
    // Initialiser les vues
    initLoginView();
    initCategoriesView(selectCategory);
    initProduitsView(backToCategories);
    
    // Vérifier l'authentification
    if (checkAuth()) {
        showApp();
    } else {
        showLogin();
    }
    
    // Recherche de produits
    const searchInput = DOM.getById('productSearch');
    if (searchInput) {
        DOM.on(searchInput, 'input', (e) => {
            state.currentSearch = e.target.value;
            render();
        });
    }
    
    // Gestion des boutons produits
    DOM.on(document, 'click', (e) => {
        const target = e.target;
        
        // Boutons +/-/bulk
        if (target.classList.contains('btn') && target.hasAttribute('data-produit')) {
            const produit = target.getAttribute('data-produit');
            const action = target.getAttribute('data-action');
            
            if (action === 'increment') changeQuantity(produit, 1);
            else if (action === 'decrement') changeQuantity(produit, -1);
            else if (action === 'bulk') {
                const amount = parseInt(target.getAttribute('data-amount'), 10);
                changeQuantity(produit, amount);
            }
        }
        
        // Saisie directe sur quantité
        if (target.classList.contains('quantity') && target.hasAttribute('data-produit')) {
            const produit = target.getAttribute('data-produit');
            const currentValue = target.textContent;
            const input = document.createElement('input');
            
            input.type = 'number';
            input.className = 'quantity-input';
            input.value = currentValue;
            input.min = 0;
            input.style.width = '60px';
            input.setAttribute('data-produit', produit);
            
            target.replaceWith(input);
            input.focus();
            input.select();
            
            const validate = () => {
                const val = Math.max(0, parseInt(input.value, 10) || 0);
                const quantities = getQuantities(state.currentCategory);
                quantities[produit] = val;
                saveQuantities(state.currentCategory, quantities);
                render();
            };
            
            DOM.on(input, 'blur', validate);
            DOM.on(input, 'keydown', (ev) => {
                if (ev.key === 'Enter') input.blur();
                else if (ev.key === 'Escape') render();
            });
        }
    });
    
    // Bouton logout
    DOM.onAll(DOM.getAll('.logout-btn'), 'click', handleLogout);
});

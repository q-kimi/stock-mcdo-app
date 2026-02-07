// Point d'entrée principal - MedalBot Pertes
import { checkAuth, logout } from './modules/auth.js';
import { produitsParCategorie, getQuantities, saveQuantities, updateQuantity, resetCategoryData } from './modules/produits.js';
import { showLogin, showApp } from './modules/ui.js';
import { DOM } from './utils/dom.js';
import { CATEGORY_TITLES, CUISINE_SUBCATEGORIES } from './config/constants.js';
import { initLoginView } from './views/login.js';
import { initCategoriesView } from './views/categories.js';
import { initProduitsView } from './views/produits.js';

// État de l'application
const state = {
    currentCategory: null,
    currentSubcategory: null,
    currentSearch: ''
};

// Rendu de la liste des produits
function render() {
    if (!state.currentCategory) return;
    
    const productList = DOM.getById('productList');
    productList.innerHTML = '';
    
    // Si on est dans la catégorie Manager, afficher toutes les pertes
    if (state.currentCategory === 'manager') {
        renderManagerView(productList);
        return;
    }
    
    const quantities = getQuantities(state.currentCategory);
    
    let produits = produitsParCategorie[state.currentCategory] || [];
    
    if (state.currentSearch.trim()) {
        const searchLower = state.currentSearch.trim().toLowerCase();
        produits = produits.filter(p => p.toLowerCase().includes(searchLower));
    }
    
    produits.forEach(produit => {
        const item = document.createElement('div');
        item.className = 'product-item';
        const quantityValue = quantities[produit] !== undefined ? quantities[produit] : 0;
        item.innerHTML = `
            <div class="product-name">${produit}</div>
            <div class="quantity-controls">
                <button class="btn" data-action="decrement" data-produit="${produit}">−</button>
                <button class="btn btn-bulk" data-action="bulk" data-produit="${produit}" data-amount="5">+5</button>
                <button class="btn btn-bulk" data-action="bulk" data-produit="${produit}" data-amount="10">+10</button>
                <div class="quantity" data-produit="${produit}" tabindex="0">${quantityValue}</div>
                <button class="btn" data-action="increment" data-produit="${produit}">+</button>
            </div>
        `;
        productList.appendChild(item);
    });
}

// Rendu spécial pour la vue Manager
function renderManagerView(productList) {
    // Récupérer toutes les pertes de toutes les catégories
    const allLosses = [];
    
    // Parcourir toutes les catégories de produits
    Object.keys(produitsParCategorie).forEach(category => {
        if (category === 'manager') return; // Ignorer la catégorie manager elle-même
        
        const quantities = getQuantities(category);
        const produits = produitsParCategorie[category];
        
        produits.forEach(produit => {
            const qty = quantities[produit] || 0;
            if (qty > 0) {
                // Déterminer le nom de la catégorie pour l'affichage
                let categoryName = '';
                if (category.startsWith('cuisine-')) {
                    const subcatId = category.replace('cuisine-', '');
                    // Trouver le nom réel de la sous-catégorie
                    const subcat = CUISINE_SUBCATEGORIES.find(s => s.id === subcatId);
                    const subcatName = subcat ? subcat.name : subcatId;
                    categoryName = `Perte Cuisine - ${subcatName}`;
                } else if (category === 'comptoir') {
                    categoryName = 'Perte Comptoir';
                }
                
                allLosses.push({
                    produit,
                    quantite: qty,
                    categorie: categoryName
                });
            }
        });
    });
    
    // Afficher le résumé
    if (allLosses.length === 0) {
        productList.innerHTML = '<div class="manager-empty-state"><p>Aucune perte enregistrée pour le moment</p></div>';
    } else {
        // Créer un tableau des pertes
        const table = document.createElement('div');
        table.className = 'manager-losses-table';
        
        // En-tête
        table.innerHTML = `
            <div class="manager-table-header">
                <div class="manager-col-product">Produit</div>
                <div class="manager-col-quantity">Quantité</div>
                <div class="manager-col-category">Catégorie</div>
            </div>
        `;
        
        // Lignes de données
        allLosses.forEach(loss => {
            const row = document.createElement('div');
            row.className = 'manager-table-row';
            row.innerHTML = `
                <div class="manager-col-product">${loss.produit}</div>
                <div class="manager-col-quantity">${loss.quantite}</div>
                <div class="manager-col-category">${loss.categorie}</div>
            `;
            table.appendChild(row);
        });
        
        productList.appendChild(table);
    }
}

// Gestion des changements de quantité
function changeQuantity(produit, amount) {
    if (updateQuantity(state.currentCategory, produit, amount)) {
        render();
    }
}

// Sélection de catégorie directe (Comptoir, Manager)
function selectCategory(category) {
    state.currentCategory = category;
    state.currentSubcategory = null;
    DOM.hide(DOM.getById('categorySelector'));
    DOM.hide(DOM.getById('subcategorySelector'));
    DOM.addClass(DOM.getById('productView'), 'active');
    DOM.getById('categoryTitle').textContent = CATEGORY_TITLES[category];
    
    // Masquer la barre de recherche pour la vue Manager
    const searchBarContainer = document.querySelector('.search-bar-container');
    if (category === 'manager') {
        if (searchBarContainer) searchBarContainer.style.display = 'none';
    } else {
        if (searchBarContainer) searchBarContainer.style.display = 'flex';
    }
    
    render();
}

// Sélection de sous-catégorie (pour Perte Cuisine)
function selectSubcategory(parentCategory, subcategoryId) {
    const categoryKey = `${parentCategory}-${subcategoryId}`;
    state.currentCategory = categoryKey;
    state.currentSubcategory = subcategoryId;
    DOM.hide(DOM.getById('categorySelector'));
    DOM.hide(DOM.getById('subcategorySelector'));
    DOM.addClass(DOM.getById('productView'), 'active');
    
    // Afficher la barre de recherche
    const searchBarContainer = document.querySelector('.search-bar-container');
    if (searchBarContainer) searchBarContainer.style.display = 'flex';
    
    // Récupérer le nom de la sous-catégorie
    const subcatName = document.querySelector(`[data-subcat-id="${subcategoryId}"]`)?.textContent || subcategoryId;
    DOM.getById('categoryTitle').textContent = `${CATEGORY_TITLES[parentCategory]} - ${subcatName}`;
    render();
}

// Retour aux catégories
function backToCategories() {
    // Si on est dans une sous-catégorie, retourner aux sous-catégories
    if (state.currentSubcategory) {
        state.currentSubcategory = null;
        state.currentSearch = '';
        DOM.removeClass(DOM.getById('productView'), 'active');
        DOM.show(DOM.getById('subcategorySelector'));
    } else {
        // Sinon, retourner aux catégories principales
        state.currentCategory = null;
        state.currentSearch = '';
        DOM.show(DOM.getById('categorySelector'));
        DOM.removeClass(DOM.getById('productView'), 'active');
    }
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
    // Nettoyer les données corrompues du localStorage (fix pour cuisine-table et comptoir)
    const problematicCategories = ['cuisine-table', 'comptoir'];
    problematicCategories.forEach(cat => {
        const storageKey = `stockMcdo_${cat}`;
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Vérifier si les données sont valides
                const produits = produitsParCategorie[cat] || [];
                const isValid = produits.every(p => p in parsed);
                if (!isValid) {
                    // Réinitialiser les données corrompues
                    resetCategoryData(cat);
                }
            } catch (e) {
                // Données corrompues, réinitialiser
                resetCategoryData(cat);
            }
        }
    });
    
    // Initialiser les vues
    initLoginView();
    initCategoriesView(selectCategory, selectSubcategory);
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
    
    // Utilitaire de débogage disponible dans la console
    window.debugMedalBot = {
        resetCategory: (category) => {
            resetCategoryData(category);
            console.log(`✅ Catégorie "${category}" réinitialisée`);
            if (state.currentCategory === category) render();
        },
        clearAll: () => {
            const categories = Object.keys(produitsParCategorie);
            categories.forEach(cat => resetCategoryData(cat));
            console.log('✅ Toutes les données ont été effacées');
            render();
        },
        showData: (category) => {
            const quantities = getQuantities(category);
            console.log(`Données pour "${category}":`, quantities);
        },
        listCategories: () => {
            console.log('Catégories disponibles:', Object.keys(produitsParCategorie));
        }
    };
    
    console.log('🔧 MedalBot Debug Tools disponibles dans window.debugMedalBot');
    console.log('  - resetCategory(category): Réinitialiser une catégorie');
    console.log('  - clearAll(): Effacer toutes les données');
    console.log('  - showData(category): Afficher les données d\'une catégorie');
    console.log('  - listCategories(): Lister toutes les catégories');
});

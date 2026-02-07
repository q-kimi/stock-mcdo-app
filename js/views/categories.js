// Vue de sélection de catégorie et sous-catégories
import { DOM } from '../utils/dom.js';
import { CATEGORIES, CUISINE_SUBCATEGORIES, ANIMATION_DURATION } from '../config/constants.js';

export function initCategoriesView(onCategorySelect, onSubcategorySelect) {
    // Gestion des catégories principales
    DOM.onAll(DOM.getAll('.category-btn'), 'click', (e) => {
        e.target.blur();
        const btnText = e.target.textContent.trim();
        let cat;
        
        if (btnText.includes('Cuisine')) {
            cat = CATEGORIES.CUISINE;
            // Afficher les sous-catégories pour Cuisine
            showSubcategories();
        } else if (btnText.includes('Comptoir')) {
            cat = CATEGORIES.COMPTOIR;
            // Aller directement aux produits pour Comptoir
            onCategorySelect(cat);
        } else if (btnText.includes('Manager')) {
            // Ouvrir la popup de mot de passe pour Manager
            showManagerPopup(onCategorySelect);
        }
    });
    
    // Bouton retour des sous-catégories vers catégories
    const backBtn = DOM.getById('backToCategories');
    if (backBtn) {
        DOM.on(backBtn, 'click', (e) => {
            e.target.blur();
            hideSubcategories();
        });
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
            DOM.on(btn, 'click', (e) => {
                e.target.blur();
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
    
    // Fonction pour afficher la popup manager
    function showManagerPopup(onCategorySelect) {
        const popupOverlay = DOM.getById('managerPopupOverlay');
        const passwordForm = DOM.getById('managerPasswordForm');
        const passwordInput = DOM.getById('managerPassword');
        const errorMsg = DOM.getById('managerErrorMessage');
        const cancelBtn = DOM.getById('cancelManagerAccess');
        
        // Afficher la popup
        DOM.addClass(popupOverlay, 'active');
        passwordInput.value = '';
        DOM.hide(errorMsg);
        
        // Focus sur l'input
        setTimeout(() => passwordInput.focus(), 100);
        
        // Gérer l'annulation
        const handleCancel = () => {
            DOM.removeClass(popupOverlay, 'active');
            passwordInput.value = '';
            DOM.hide(errorMsg);
        };
        
        // Bouton annuler
        cancelBtn.onclick = handleCancel;
        
        // Clic sur l'overlay pour fermer
        popupOverlay.onclick = (e) => {
            if (e.target === popupOverlay) {
                handleCancel();
            }
        };
        
        // Gérer la soumission du formulaire
        passwordForm.onsubmit = (e) => {
            e.preventDefault();
            const password = passwordInput.value;
            
            if (password === 'manager') {
                // Mot de passe correct - Afficher le chargement
                const validateBtn = passwordForm.querySelector('button[type="submit"]');
                const originalBtnText = validateBtn.innerHTML;
                validateBtn.disabled = true;
                validateBtn.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    <div class="spinner"></div>
                    <div style="font-size:11px;color:#999;">Récupération de vos pertes en cours...</div>
                </div>`;
                
                setTimeout(() => {
                    validateBtn.innerHTML = originalBtnText;
                    validateBtn.disabled = false;
                    DOM.removeClass(popupOverlay, 'active');
                    passwordInput.value = '';
                    DOM.hide(errorMsg);
                    onCategorySelect(CATEGORIES.MANAGER);
                }, ANIMATION_DURATION.MANAGER_LOGIN);
            } else {
                // Mot de passe incorrect
                DOM.show(errorMsg);
                passwordInput.value = '';
                passwordInput.focus();
            }
        };
    }
}


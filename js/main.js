// Fichier central pour les fonctions JS du projet MedalBot - Pertes

const CREDENTIALS = { username: 'admin', password: 'admin' };

const produitsParCategorie = {
    cuisine: ['Big Mac', 'McChicken', 'Royal Deluxe', 'Frites M', 'Frites L', 'Nuggets 4', 'Nuggets 9', 'Nuggets 20', 'Crousty Poulet', "P'tit Wrap Ranch", 'Double Cheese', 'Filet-O-Fish'],
    comptoir: ['Coca-Cola M', 'Coca-Cola L', 'Sprite M', 'Fanta M', 'McFlurry Oreo', "McFlurry M&M's", 'Sundae Caramel', 'Sundae Chocolat', 'Milk-shake Vanille', 'Café', 'Cappuccino', 'Muffin']
};

let currentCategory = null;

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appContainer').classList.remove('active');
}

function showApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    document.getElementById('categorySelector').style.display = 'flex';
    document.getElementById('productView').classList.remove('active');
}

function getQuantities() {
    const saved = localStorage.getItem(`stockMcdo_${currentCategory}`);
    if (saved) {
        return JSON.parse(saved);
    }
    const produits = produitsParCategorie[currentCategory] || [];
    return produits.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
}

function saveQuantities(quantities) {
    localStorage.setItem(`stockMcdo_${currentCategory}`, JSON.stringify(quantities));
}

function render() {
    if (!currentCategory) return;
    const quantities = getQuantities();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    const produits = produitsParCategorie[currentCategory];
    
    produits.forEach(produit => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <div class="product-name">${produit}</div>
            <div class="quantity-controls">
                <button class="btn" data-action="decrement" data-produit="${produit}">−</button>
                <button class="btn btn-bulk" data-action="bulk" data-produit="${produit}" data-amount="5">+5</button>
                <button class="btn btn-bulk" data-action="bulk" data-produit="${produit}" data-amount="10">+10</button>
                <div class="quantity">${quantities[produit]}</div>
                <button class="btn" data-action="increment" data-produit="${produit}">+</button>
            </div>
        `;
        productList.appendChild(item);
    });
}

function changeQuantity(produit, amount) {
    const quantities = getQuantities();
    if (!currentCategory || !(produit in quantities)) return;
    
    quantities[produit] = (quantities[produit] || 0) + amount;
    if (quantities[produit] < 0) quantities[produit] = 0;
    
    saveQuantities(quantities);
    render();
}

function increment(produit) {
    changeQuantity(produit, 1);
}

function decrement(produit) {
    changeQuantity(produit, -1);
}

function selectCategory(category) {
    currentCategory = category;
    document.getElementById('categorySelector').style.display = 'none';
    document.getElementById('productView').classList.add('active');
    const titles = { cuisine: 'Perte Cuisine', comptoir: 'Perte Comptoir' };
    document.getElementById('categoryTitle').textContent = titles[category];
    render();
}

function backToCategories() {
    currentCategory = null;
    document.getElementById('categorySelector').style.display = 'flex';
    document.getElementById('productView').classList.remove('active');
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    currentCategory = null;
    showLogin();
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginBtn = document.querySelector('.login-btn');
    const errorMessage = document.getElementById('errorMessage');
    const originalText = loginBtn.innerHTML;

    loginBtn.disabled = true;
    loginBtn.classList.add('loading');

    let loadingMessages = [
        'Chargement des modules...',
        'Initialisation de la base...',
        'Vérification des accès...',
        'Connexion sécurisée...',
        'Comptage des pertes en cours...',
        'Recherche de frites disparues...',
        'Recherche de nuggets égarés...',
        'Recherche de steaks 10:1 perdus...',
        'Recherche de cornichons disparus...',
        'Analyse du ketchup restant...'
    ];

    loadingMessages = loadingMessages
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    let msgIndex = 0;
    loginBtn.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;"><div class="spinner"></div><div id='loginLoadingMsg' style="font-size:12px;color:#bbb;">${loadingMessages[0]}</div></div>`;
    errorMessage.style.display = 'none';

    let msgInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        const msgDiv = document.getElementById('loginLoadingMsg');
        if (msgDiv) msgDiv.textContent = loadingMessages[msgIndex];
    }, 700);

    setTimeout(() => {
        clearInterval(msgInterval);
        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            localStorage.setItem('isLoggedIn', 'true');
            if (rememberMe) {
                localStorage.setItem('rememberLogin', JSON.stringify({ username, password }));
            } else {
                localStorage.removeItem('rememberLogin');
            }
            errorMessage.style.display = 'none';
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            loginBtn.classList.remove('loading');
            currentCategory = null;
            showApp();
        } else {
            errorMessage.style.display = 'block';
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            loginBtn.classList.remove('loading');
        }
    }, 2000);

    return false;
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        showApp();
    } else {
        showLogin();
        setTimeout(() => {
            const savedLogin = localStorage.getItem('rememberLogin');
            if (savedLogin) {
                try {
                    const creds = JSON.parse(savedLogin);
                    document.getElementById('username').value = creds.username || '';
                    document.getElementById('password').value = creds.password || '';
                    document.getElementById('rememberMe').checked = true;
                } catch(e) {}
            }
        }, 0);
    }
}

// Exposer les fonctions au scope global pour les onclick inline
window.logout = logout;
window.selectCategory = selectCategory;
window.backToCategories = backToCategories;

// Attachement des événements après chargement du DOM
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Gestion des boutons produits avec délégation d'événement sur document
    // Utiliser document au lieu de productList car productList est créé dynamiquement
    document.addEventListener('click', e => {
        const target = e.target;
        
        // Vérifier si c'est un bouton de produit
        if (target.classList.contains('btn') && target.hasAttribute('data-produit')) {
            const produit = target.getAttribute('data-produit');
            const action = target.getAttribute('data-action');
            
            if (action === 'increment') {
                increment(produit);
            } else if (action === 'decrement') {
                decrement(produit);
            } else if (action === 'bulk') {
                const amount = parseInt(target.getAttribute('data-amount'), 10);
                changeQuantity(produit, amount);
            }
        }
    });
});

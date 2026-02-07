// Gestion de l'affichage UI

export function showLogin() {
    const loginScreen = document.getElementById('loginScreen');
    const appContainer = document.getElementById('appContainer');
    
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appContainer) {
        appContainer.classList.remove('active');
        appContainer.style.display = 'none';
    }
}

export function showApp() {
    const loginScreen = document.getElementById('loginScreen');
    const appContainer = document.getElementById('appContainer');
    const categorySelector = document.getElementById('categorySelector');
    const productView = document.getElementById('productView');
    
    if (loginScreen) loginScreen.style.display = 'none';
    if (appContainer) {
        appContainer.style.display = 'block';
        appContainer.classList.add('active');
    }
    if (categorySelector) categorySelector.style.display = 'flex';
    if (productView) productView.classList.remove('active');
}

export function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

export function hideError() {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

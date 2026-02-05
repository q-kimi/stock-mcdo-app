// Fonctions utilitaires pour la gestion de l'UI
export function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appContainer').classList.remove('active');
}

export function showApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    document.getElementById('categorySelector').style.display = 'flex';
    document.getElementById('productView').classList.remove('active');
}

export function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

export function hideError() {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

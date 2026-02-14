// Vue de connexion
import { tryLogin, getRememberedLogin } from '../modules/auth.js';
import { showError, hideError, showApp } from '../modules/ui.js';
import { LOADING_MESSAGES } from '../config/constants.js';

let loadingInterval = null;

export function initLoginView() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const creds = getRememberedLogin();
    if (creds) {
        document.getElementById('username').value = creds.username || '';
        document.getElementById('password').value = creds.password || '';
        document.getElementById('rememberMe').checked = true;
    }

    loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Nettoyer l'intervalle si il existe et réinitialiser le bouton
    cleanupLoading();
}

export function cleanupLoading() {
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
    }
    
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = 'Connexion';
        loginBtn.disabled = false;
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginBtn = document.querySelector('.login-btn');
    
    if (!loginBtn) return;
    
    const originalText = loginBtn.innerHTML;
    loginBtn.disabled = true;
    hideError();
    
    // Animation avec messages de chargement
    let messageIndex = 0;
    const messageInterval = 250; // Chaque message affiché pendant 250ms
    const totalDuration = 1000; // Durée totale de 1 seconde
    
    const updateMessage = () => {
        loginBtn.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div class="spinner"></div>
            <div style="font-size:11px;color:#999;" class="loading-dots">${LOADING_MESSAGES[messageIndex]}</div>
        </div>`;
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
    };
    
    updateMessage();
    loadingInterval = setInterval(updateMessage, messageInterval);
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        loadingInterval = null;
        
        if (tryLogin(username, password, rememberMe)) {
            showApp();
        } else {
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            showError('Identifiants incorrects');
        }
    }, totalDuration);
}






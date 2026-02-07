// Vue de connexion
import { tryLogin, getRememberedLogin } from '../modules/auth.js';
import { showError, hideError, showApp } from '../modules/ui.js';

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
    
    loginBtn.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;"><div class="spinner"></div></div>';
    
    setTimeout(() => {
        if (tryLogin(username, password, rememberMe)) {
            showApp();
        } else {
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            showError('Identifiants incorrects');
        }
    }, 3000);
}





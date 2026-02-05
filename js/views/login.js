// Vue de connexion
import { tryLogin, getRememberedLogin } from '../modules/auth.js';
import { showError, hideError, showApp } from '../modules/ui.js';
import { DOM } from '../utils/dom.js';
import { LOADING_MESSAGES, ANIMATION_DURATION } from '../config/constants.js';

export function initLoginView() {
    const loginForm = DOM.getById('loginForm');
    if (!loginForm) return;

    const creds = getRememberedLogin();
    if (creds) {
        DOM.getById('username').value = creds.username || '';
        DOM.getById('password').value = creds.password || '';
        DOM.getById('rememberMe').checked = true;
    }

    DOM.on(loginForm, 'submit', handleLoginSubmit);
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const username = DOM.getById('username').value;
    const password = DOM.getById('password').value;
    const rememberMe = DOM.getById('rememberMe').checked;
    const loginBtn = DOM.get('.login-btn');
    const originalText = loginBtn.innerHTML;

    loginBtn.disabled = true;
    DOM.addClass(loginBtn, 'loading');
    hideError();

    showLoadingAnimation(loginBtn);

    setTimeout(() => {
        if (tryLogin(username, password, rememberMe)) {
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            DOM.removeClass(loginBtn, 'loading');
            showApp();
        } else {
            showError('Identifiants incorrects');
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            DOM.removeClass(loginBtn, 'loading');
        }
    }, ANIMATION_DURATION.LOGIN);
}

function showLoadingAnimation(loginBtn) {
    const shuffled = [...LOADING_MESSAGES]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    let msgIndex = 0;
    loginBtn.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div class="spinner"></div>
        <div id='loginLoadingMsg' style="font-size:12px;color:#bbb;min-height:18px;transition:color 0.3s;">${shuffled[0]}</div>
    </div>`;

    let lastMsg = shuffled[0];
    const interval = setInterval(() => {
        msgIndex = (msgIndex + 1) % shuffled.length;
        const msgDiv = DOM.getById('loginLoadingMsg');
        if (msgDiv && lastMsg !== shuffled[msgIndex]) {
            msgDiv.style.opacity = 0.5;
            setTimeout(() => {
                msgDiv.textContent = shuffled[msgIndex];
                msgDiv.style.opacity = 1;
            }, ANIMATION_DURATION.MESSAGE_FADE);
            lastMsg = shuffled[msgIndex];
        }
    }, ANIMATION_DURATION.MESSAGE_ROTATION);

    setTimeout(() => clearInterval(interval), ANIMATION_DURATION.LOGIN);
}

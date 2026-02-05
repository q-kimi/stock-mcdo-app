// Gestion de l'authentification (login, logout, checkAuth, rememberMe)
export const CREDENTIALS = { username: 'admin', password: 'admin' };

export function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        return true;
    }
    return false;
}

export function tryLogin(username, password, rememberMe) {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        if (rememberMe) {
            localStorage.setItem('rememberLogin', JSON.stringify({ username, password }));
        } else {
            localStorage.removeItem('rememberLogin');
        }
        return true;
    } else {
        return false;
    }
}

export function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('rememberLogin');
}

export function getRememberedLogin() {
    const savedLogin = localStorage.getItem('rememberLogin');
    if (savedLogin) {
        try {
            return JSON.parse(savedLogin);
        } catch (e) {}
    }
    return null;
}

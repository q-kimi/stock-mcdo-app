// Gestion de l'authentification
import { CREDENTIALS, STORAGE_KEYS } from '../config/constants.js';
import { storage } from '../utils/storage.js';

export function checkAuth() {
    return storage.getString(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
}

export function tryLogin(username, password, rememberMe) {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        storage.setString(STORAGE_KEYS.IS_LOGGED_IN, 'true');
        if (rememberMe) {
            storage.set(STORAGE_KEYS.REMEMBER_LOGIN, { username, password });
        } else {
            storage.remove(STORAGE_KEYS.REMEMBER_LOGIN);
        }
        return true;
    }
    return false;
}

export function logout() {
    storage.remove(STORAGE_KEYS.IS_LOGGED_IN);
}

export function getRememberedLogin() {
    return storage.get(STORAGE_KEYS.REMEMBER_LOGIN);
}

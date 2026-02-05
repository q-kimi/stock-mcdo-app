// Utilitaires pour le localStorage
import { STORAGE_KEYS } from '../config/constants.js';

export const storage = {
    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    },

    getString(key) {
        return localStorage.getItem(key);
    },

    setString(key, value) {
        localStorage.setItem(key, value);
    }
};

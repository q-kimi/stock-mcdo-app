// Utilitaires DOM
export const DOM = {
    getById(id) {
        return document.getElementById(id);
    },

    getAll(selector) {
        return document.querySelectorAll(selector);
    },

    get(selector) {
        return document.querySelector(selector);
    },

    show(element) {
        if (element) element.style.display = 'flex';
    },

    hide(element) {
        if (element) element.style.display = 'none';
    },

    addClass(element, className) {
        if (element) element.classList.add(className);
    },

    removeClass(element, className) {
        if (element) element.classList.remove(className);
    },

    toggleClass(element, className) {
        if (element) element.classList.toggle(className);
    },

    on(element, event, handler) {
        if (element) element.addEventListener(event, handler);
    },

    onAll(elements, event, handler) {
        elements.forEach(el => el.addEventListener(event, handler));
    }
};

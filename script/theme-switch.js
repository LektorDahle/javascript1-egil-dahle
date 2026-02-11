/**
 * Returns the theme color choosen, either from localstorage
 * or from browser color choices
 * @returns {boolean}
 */
export function getBrowserColor() {
    const value = localStorage.getItem("theme");
    if (value) {
        return value === "light" ? true : false;
    }
    localStorage.setItem("theme", "dark");
    if (!window.matchMedia) {
        localStorage.setItem("theme", "light");
        return true;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? false : true;
}
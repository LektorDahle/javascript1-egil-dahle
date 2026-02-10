/**
 * Returns the theme color choosen, either from localstorage
 * or from browser color choices
 * @returns {boolean}
 */
export function getBrowserColor() {
    const value = localStorage.getItem("theme");
    if (!value) {
        if (!window.matchMedia) {
            localStorage.setItem("theme", "light");
            return true;
        }
        localStorage.setItem("theme", "dark");
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? false : true;
    }
    if (value === "light"){
        return true;
    }
    return false;
}
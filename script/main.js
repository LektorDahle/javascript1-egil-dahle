import { makeHeaderAndFooter } from "./header-footer.js";
import { Head } from "./head.js";

export function render() {
    makeHeaderAndFooter();
    new Head();
}
document.addEventListener("DOMContentLoaded", render);

export function getBrowserColor() {
    if (!window.matchMedia) return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? false : true;
}

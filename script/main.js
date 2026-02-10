import { makeHeaderAndFooter } from "./header-footer.js";
import { Head } from "./head.js";

export function render() {
    makeHeaderAndFooter();
    new Head();
}
document.addEventListener("DOMContentLoaded", render);


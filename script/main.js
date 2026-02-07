import { makeHeaderAndFooter } from "./header-footer.js";
import { Head } from "./head.js";

function render(){
    makeHeaderAndFooter();
    new Head();
}
document.addEventListener("DOMContentLoaded", render);

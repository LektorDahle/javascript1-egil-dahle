/**
 * 
 * @param {string} id 
 */
export function jacketPage(id) {
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    main.innerHTML = id
}
//export class Page {
//    constructor(location, ){
//    this.main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
//    window.location.hash = location;}

//}
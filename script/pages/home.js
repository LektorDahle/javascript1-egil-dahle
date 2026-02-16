export function mainPage() {
    window.location.hash = "mainpage"; // const screen = location.hash.slice(1); reads the url
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    main.textContent = "Yo";
}

export class MainContentPage {

    async getAllData() {
        try {
            const res = await fetch("https://v2.api.noroff.dev/rainy-days");
            if (!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

/** @jest-environment jsdom */
/** @type {import("./header-footer.js")} */
import { Header } from "./header-footer.js";

describe("checks the render of the header", () => {
    beforeEach(() => {
        /**Emptying the body so as to see that the header elements are actually rendered */
        document.body.innerHTML = '';
    });
    test("Header-class works", () => {
        /**Tests that the Header class does not throw any errors */
        expect(() => new Header()).not.toThrow();
    });
    test("header has a logo", () => {
        /**Tests that the addLogo does not throw any error */
        expect(() => new Header().addLogo()).not.toThrow();

        document.body.innerHTML = "";
        new Header()

        /** @type {HTMLElement | null} */
        const logoWrapper = document.querySelector(".logo-wrapper");
        expect(logoWrapper).not.toBeNull();

        /** @type {HTMLElement | null | undefined} */
        const logoImage = logoWrapper?.querySelector("img");
        expect(logoImage).not.toBeNull();
        expect(logoImage).toBeDefined();

        /** @type {HTMLElement | null | undefined} */
        const logoLink = logoWrapper?.querySelector("a.logo");
        expect(logoLink?.getAttribute("href")).toBe("./");
    });

    test("add navigation link", () => {
        expect(() => new Header().addListItem(document.body, "./content", "Content")).not.toThrow();

        document.body.innerHTML = "";
        new Header()

        const navWrapper = document.querySelector(".nav-wrapper");
        expect(navWrapper).not.toBeNull();

        const a = document.querySelector(".nav-wrapper a");
        expect(a).not.toBeNull();
        expect(a?.getAttribute("href")).not.toBeNull();
        expect(a?.getAttribute("href")).toBeDefined();

        const h2 = document.querySelector(".nav-wrapper a h2");
        expect(h2).not.toBeNull();
        expect(h2?.textContent).not.toBe("");
    });

    test("add theme change button", () => {
        expect(() => new Header().addThemeButton()).not.toThrow();

        document.body.innerHTML = "";
        new Header()
        const navWrapper = document.querySelector(".light-dark-switch-wrapper");
        expect(navWrapper).not.toBeNull();

        const h2 = document.querySelectorAll(".light-dark-switch-wrapper h2");
        expect(h2[0].textContent).toBe("LIGHT");
        expect(h2[1].textContent).toBe("DARK");

        const label = document.querySelector(".theme-switch");
        expect(label).not.toBeNull();

        const input = document.querySelector("#theme-toggle");
        expect(input).not.toBeNull();
        expect(input?.getAttribute("type")).toBe("checkbox");

        const span = document.querySelector(".slider");
        expect(span).not.toBeNull();
        
    });
});
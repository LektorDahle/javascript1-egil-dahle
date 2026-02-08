/** @jest-environment jsdom */
/** @type {import("./header-footer.js")} */
import { Header } from "./header-footer.js";

describe("checks the render of the header", () => {
    beforeEach(() => {
        /**Emptying the body so as to see that the header elements are actually rendered */
        document.body.innerHTML = '';
        new Header(document.body);
    });
    test("Header-class works", () => {
        /**Tests that the Header class does not throw any errors */
        expect(() => new Header(document.body)).not.toThrow();
    });
    test("header has a logo", () => {
        /**Tests that the addLogo does not throw any error */
        expect(() => new Header(document.body).addLogo("./img/icons/RD-logo-lightmode.svg")).not.toThrow();

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
        expect(() => new Header(document.body).addLI(document.body, "./content", "Content")).not.toThrow();
    });
});
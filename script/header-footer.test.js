/** @jest-environment jsdom */
/** @type {import("./header-footer.js")} */
import { Header } from "./header-footer.js";

describe("checks the render of header and footer", () => {
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
        const logoWrapper = document.querySelector(".logo-wrapper");
        expect(logoWrapper).not.toBeNull();

        const logoImage = logoWrapper?.querySelector("img");
        expect(logoImage).not.toBeNull();

        const logoLink = logoWrapper?.querySelector("a.logo");
        expect(logoLink?.getAttribute("href")).toBe("./");
    });
});
//empty/** @jest-environment jsdom */
//import { jest } from '@jest/globals';
/** @type {import("./main.js")} */
import { render } from "./main.js";

describe("checks the render function for correct behaviour", () => {
    beforeEach(() => {
    /**Emptying the document elements that render affects */
        document.body.innerHTML = '';
        document.head.innerHTML = '';
    });
    test("render-function works", () => {
        /**Tests that the render function does not throw any errors */
        expect(() => render()).not.toThrow();
    });
    test("head is rendered", () => {
        render();
        /**Tests to se that head have any elements after render has been called */
        const innholdIHead = document.head.firstElementChild;
        expect(innholdIHead).not.toBeNull();
    });
    test("header is rendered", () => {
        render();
        /**Tests to se that header exists */
        const header = document.querySelector("header");
        expect(header).not.toBeNull();
    });
    test("footer is rendered", () => {
        render();
        /**Tests to se that footer exists */
        const footer = document.querySelector("footer");
        expect(footer).not.toBeNull();
    });
});
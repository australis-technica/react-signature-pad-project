import dataUrlToBuffer from "../src";

describe("data-url-to-image", () => {
    it("works", () => {
        expect(dataUrlToBuffer(",") instanceof Buffer).toBe(true);
    });
});

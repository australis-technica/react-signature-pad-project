import debug, { submodule } from "./x-module";
/** */
describe("create-debug: module-debugger", () => {
    it("sets namespace", async () => {
        expect(debug.namespace).toBe("test/x-module:");
        expect(submodule.namespace).toBe("test/x-module/x-sub-module:");
    })    
})
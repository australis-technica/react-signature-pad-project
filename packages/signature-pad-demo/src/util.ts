export function isString(x: any): x is string {
    return typeof x  === "string";
}
export function isStringNotEmpty(s: string){return isString(s) && s.length > 0; };
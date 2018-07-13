export default function checkWindowPassive(window: Window, callback: () => any) {
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                callback();
            }
        });
        window.addEventListener("testPassive", null as any, opts);
        window.removeEventListener("testPassive", null as any, opts);
    } catch (e) { }
}
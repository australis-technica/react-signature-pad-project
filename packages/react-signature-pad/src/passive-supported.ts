let passiveSupported = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;      
    }
  });
  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (err) {  
  passiveSupported = false;
}
export default passiveSupported;

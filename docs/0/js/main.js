window.addEventListener('DOMContentLoaded', (event) => {
    initWritingMode();
    initFontSize();
    console.log("DOMContentLoaded");
    console.log(`devicePixelRatio = ${window.devicePixelRatio}`);
;
});
window.addEventListener('load', (event) => {
    console.log("load");
});
window.addEventListener('beforeunload', (event) => {
    console.log("beforeunload");
    saveWritingMode();
    saveFontSize();
});


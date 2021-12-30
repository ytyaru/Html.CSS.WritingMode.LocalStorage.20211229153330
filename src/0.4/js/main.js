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
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxLineOfChars(); // CalcFontSize.js
    setLineOfCharsFromFontSizePixel(); // CalcFontSize.js
});


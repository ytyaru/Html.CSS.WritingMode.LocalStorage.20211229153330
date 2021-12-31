window.addEventListener('DOMContentLoaded', (event) => {
    initFullScreen();
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
    saveFullScreen();
    saveWritingMode();
    saveFontSize();
});
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxLineOfChars(); // CalcFontSize.js
    setLineOfCharsFromFontSizePixel(); // CalcFontSize.js
    document.querySelector('#FontSize_').innerHTML = calcLineOfCharsFromFontSizePixel(parseFloat(document.querySelector('body').style.getPropertyValue('font-size')));
});
window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
    console.log("resize");
    setMaxLineOfChars(); // CalcFontSize.js
    setLineOfCharsFromFontSizePixel(); // CalcFontSize.js
    document.querySelector('#FontSize_').innerHTML = calcLineOfCharsFromFontSizePixel(parseFloat(document.querySelector('body').style.getPropertyValue('font-size')));
});


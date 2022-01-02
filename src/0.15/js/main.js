window.addEventListener('DOMContentLoaded', (event) => {
    initFullScreen();
    initWritingMode();
    initLineOfChars();
    initLineHeight();
    initLetterSpacing();
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
    saveLineOfChars();
    saveLineHeight();
    saveLetterSpacing();
});
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxLineOfChars(); // resize.js
//    setLineOfCharsFromFontSizePixel(); // resize.js
//    setLineOfChars(document.querySelector('#writing-mode').value);
    setLineOfChars();
//    document.querySelector('#line-of-chars-label').innerHTML = calcLineOfCharsFromFontSizePixel(parseFloat(document.querySelector('body').style.getPropertyValue('font-size')));
//    setLineOfCharsFromFontSizePixel();
});
window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
    console.log("resize");
    setMaxLineOfChars(); // resize.js
//    setLineOfCharsFromFontSizePixel(); // resize.js
//    setLineOfChars(document.querySelector('#writing-mode').value);
    setLineOfChars();
//    document.querySelector('#line-of-chars-label').innerHTML = calcLineOfCharsFromFontSizePixel(parseFloat(document.querySelector('body').style.getPropertyValue('font-size')));
//    setLineOfCharsFromFontSizePixel();
});


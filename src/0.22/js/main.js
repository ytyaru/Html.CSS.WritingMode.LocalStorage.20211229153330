window.addEventListener('DOMContentLoaded', (event) => {
    initFullScreen();
    initWritingMode();
    initColumns();
    initLineOfChars();
    initLineHeight();
    initLetterSpacing();
    console.log("DOMContentLoaded");
    console.log(`devicePixelRatio = ${window.devicePixelRatio}`);
});
window.addEventListener('load', (event) => {
    console.log("load");
});
window.addEventListener('beforeunload', (event) => {
    console.log("beforeunload");
    saveFullScreen();
    saveColumns();
    saveWritingMode();
    saveLineOfChars();
    saveLineHeight();
    saveLetterSpacing();
});
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxColumns(); // columns.js
    setMaxLineOfChars(); // resize.js
    setFontSizePixel(document.querySelector('#writing-mode').value, document.querySelector('#line-of-chars').value, document.querySelector('#letter-spacing').value); // resize.js
//    setLineOfChars(); // resize.js
    calcScreenSize(document.querySelector('#writing-mode').value, document.querySelector('#columns').value); // resize.js
});
window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
    console.log("resize");
    /*
    setMaxLineOfChars(); // resize.js
    setLineOfChars();
    setMaxColumns();
    */
    setMaxColumns(); // columns.js
    setMaxLineOfChars(); // resize.js
    setFontSizePixel(document.querySelector('#writing-mode').value, document.querySelector('#line-of-chars').value, document.querySelector('#letter-spacing').value); // resize.js
//    setLineOfChars(); // resize.js

});


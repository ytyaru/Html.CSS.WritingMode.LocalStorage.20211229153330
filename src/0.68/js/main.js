window.addEventListener('DOMContentLoaded', (event) => {
    initCursor();
    initFullScreen();
    initWritingMode();
    initColorScheme();
    initColumns();
    initLineOfChars();
    initLineHeight();
    initLetterSpacing();
    initPaging();
    breakPage();
    setNowSectionHeading();
    setPageHeaderPosition();
    setPosPageFooter();
    calcReadRate();
    initClock();
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
    removeClock();
});
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxColumns(); // columns.js
    setMaxLineOfChars(); // resize.js
    setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value)); // resize.js
    breakPage();
});
window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
    console.log("resize");
    setMaxColumns(); // columns.js
    setMaxLineOfChars(); // resize.js
    setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value)); // resize.js
    breakPage();
});
// OSのダークモード変更に合わせる
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const COLOR_SCHEME = document.getElementById('color-scheme');
    COLOR_SCHEME.value = event.matches ? 'dark' : 'light';
    COLOR_SCHEME.innerText = event.matches ? '🌙' : '☀';
    document.querySelector(':root').style.setProperty('--color-scheme', COLOR_SCHEME.value)
});


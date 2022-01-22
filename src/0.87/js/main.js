window.addEventListener('DOMContentLoaded', (event) => {
    initFullScreen();
    initWritingMode();
    initColorScheme();
    initColumns();
    initLineOfChars();
    initLineHeight();
    initLetterSpacing();
    initMargin();
    initSettingSubInfo();
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
    document.querySelector(':root').style.setProperty('--content-visibility', 'auto');
    // ページ計算が狂う。content-visibility:auto;にしたら非同期（バックグラウド）でbreakPage()を実行したい。それが完了するまでページ遷移させない。そうでないとページ計算が狂う。
    //breakPage();
    // ページ移動も狂う。補足情報を表示しない状態で最初のページから移動すると２ページ飛ぶ。そして戻ろうとすると最初のページには戻れない。
    // ノンブル表示も0。
});
window.addEventListener('beforeunload', (event) => {
    console.log("beforeunload");
    saveFullScreen();
    saveColumns();
    saveWritingMode();
    saveLineOfChars();
    saveLineHeight();
    saveSettingSubInfo();
    saveMargin();
    saveLetterSpacing();
    removeClock();
});
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxColumns(); // columns.js
    setMaxLineOfChars(); // resize.js
    setFontSizePixel(); // resize.js
    breakPage();
});
window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
    console.log("resize");
    setMaxColumns(); // columns.js
    setMaxLineOfChars(); // resize.js
    setFontSizePixel(); // resize.js
    breakPage();
});
// OSのダークモード変更に合わせる
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    setColorScheme((!event.matches) ? 'dark' : 'light')
});


function saveLineOfChars() {
    const lineOfChars = document.querySelector('#line-of-chars');
    localStorage.setItem('line-of-chars', lineOfChars.value);
}
function initLineOfChars() { // UI操作でフォントサイズを変更する
    function getLineOfCharsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = localStorage.getItem('line-of-chars') || getComputedStyle(root).getPropertyValue('--line-of-chars') || 30;
        const min = getComputedStyle(root).getPropertyValue('--min-line-of-chars') || 15;
        const max = calcMaxLineOfChars() || getComputedStyle(root).getPropertyValue('--max-line-of-chars') || 30;
        return [root, value, min, max];
    }
    const lineOfChars = document.querySelector('#line-of-chars');
    const [root, value, min, max] = getLineOfCharsFromCss();
    lineOfChars.min = min;
    lineOfChars.max = max;
    lineOfChars.value = value;
    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-of-chars', `${value}`);
//        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(value), parseFloat(document.querySelector('#letter-spacing').value));
        // 画面サイズはフォントサイズに依存しているため、２回計算する必要がある。１回で済むようにしたいのだが循環参照してしまう
//        calcScreenSize(document.querySelector('#writing-mode').value, document.querySelector('#column-count').value); // resize.js
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(value), parseFloat(document.querySelector('#letter-spacing').value));
        /*
        calcScreenSize(document.querySelector('#writing-mode').value, document.querySelector('#column-count').value); // resize.js
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(value), parseFloat(document.querySelector('#letter-spacing').value));
        */
        document.querySelector('#line-of-chars-label').innerHTML = value;
        console.log(`${value}字／行`);
    }
    lineOfChars.addEventListener('input', e => {
        setLineOfCharsToHtml(e.target.value);
        breakPage();
    });
    lineOfChars.dispatchEvent(new Event('input'));
    return lineOfChars;
}
function setMaxLineOfChars() {
    console.log(window.screen.orientation);
    console.log(`w:${window.screen.availWidth}`);
    console.log(`h:${window.screen.availHeight}`);
    document.querySelector('#line-of-chars').max = calcMaxLineOfChars();
    console.log(`max:${document.querySelector('#line-of-chars').max}`);
}
function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する（但しCSSで指定した最大値より大きくはならない）
    const MIN_FONT_SIZE_PX = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = document.querySelector('#writing-mode').value;
//    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth;
    const MAIN = document.querySelector('main:not([hidden])');
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域
    return Math.min(Math.floor(LINE_OF_PX / MIN_FONT_SIZE_PX), getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-line-of-chars'))
}


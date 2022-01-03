function saveLineOfChars() {
    const fontSize = document.querySelector('#line-of-chars');
    localStorage.setItem('LineOfChars', fontSize.value);
}
function initLineOfChars() { // UI操作でフォントサイズを変更する
    function getLineOfCharsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = ('line-of-chars' in localStorage) ? localStorage.getItem('line-of-chars') : getComputedStyle(root).getPropertyValue('--line-of-chars');
        const min = getComputedStyle(root).getPropertyValue('--min-line-of-chars');
        const max = calcMaxLineOfChars() || getComputedStyle(root).getPropertyValue('--max-line-of-chars'); // MinFontSize.js
        return [root, value, min, max];
    }
    const fontSize = document.querySelector('#line-of-chars');
    const [root, value, min, max] = getLineOfCharsFromCss();
    fontSize.min = min;
    fontSize.max = max;
    fontSize.value = value;
    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-of-chars', `${value}`);
        setFontSizePixel(document.querySelector('#writing-mode').value, value, document.querySelector('#letter-spacing').value);
        document.querySelector('#line-of-chars-label').innerHTML = value;
        console.log(`${value}字／行`);
    }
    fontSize.addEventListener('input', e => {
        setLineOfCharsToHtml(e.target.value);
    });
    fontSize.dispatchEvent(new Event('input'));
    return fontSize;
}
function setMaxLineOfChars() {
    console.log(window.screen.orientation);
    console.log(`w:${window.screen.availWidth}`);
    console.log(`h:${window.screen.availHeight}`);
    document.querySelector('#line-of-chars').max = calcMaxLineOfChars();
    console.log(`max:${document.querySelector('#line-of-chars').max}`);
//    const fontSize = document.querySelector('#line-of-chars');
}
function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する（但しCSSで指定した最大値より大きくはならない）
    const MIN_FONT_SIZE_PX = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = document.querySelector('#writing-mode').value;
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth;
//    const LINE_OF_PX = ('vertical-rl' === writingMode) ? window.screen.availHeight : window.screen.availWidth;
    return Math.min(Math.floor(LINE_OF_PX / MIN_FONT_SIZE_PX), getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-line-of-chars'))

    // 計算式をCSSで定義した。けれどcalc()やvar()が使えない環境では動作しないため、一応JSによる計算コードもコメントアウトで残しておく。

}


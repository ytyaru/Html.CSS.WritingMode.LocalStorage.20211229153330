function saveFontSize() {
    const fontSize = document.querySelector('#FontSize');
    localStorage.setItem('LineOfChars', fontSize.value);
}
function initFontSize() { // UI操作でフォントサイズを変更する
    function getLineOfCharsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const line_of_chars = ('LineOfChars' in localStorage) ? localStorage.getItem('LineOfChars') : getComputedStyle(root).getPropertyValue('--line-of-chars');
        const min = getComputedStyle(root).getPropertyValue('--min-line-of-chars');
        const max = calcMaxLineOfChars() || getComputedStyle(root).getPropertyValue('--max-line-of-chars'); // MinFontSize.js
        return [root, line_of_chars, min, max];
    }
    const fontSize = document.querySelector('#FontSize');
    const [root, line_of_chars, min, max] = getLineOfCharsFromCss();
    fontSize.min = min;
    fontSize.max = max;
    fontSize.value = line_of_chars;
    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-of-chars', `${value}`);
        setFontSizePixelFromLineOfChars(value); // CalcFontSize.js
        document.querySelector('#FontSize_').innerHTML = value;
        console.log(`${value}`);
    }
    fontSize.addEventListener('input', e => {
        setLineOfCharsToHtml(e.target.value);
    });
    fontSize.dispatchEvent(new Event('input'));
    return fontSize;
}

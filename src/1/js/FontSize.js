export class FontSize {
    constructor() {

    }
}


function saveFontSize() {
    const fontSize = document.querySelector('#FontSize');
    localStorage.setItem('LineOfChars', fontSize.value);
}
function initFontSize() { // UI操作でフォントサイズを変更する
    function getLineOfCharsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const line_of_chars = ('LineOfChars' in localStorage) ? localStorage.getItem('LineOfChars') : getComputedStyle(root).getPropertyValue('--line-of-chars');
        const min = getComputedStyle(root).getPropertyValue('--min-line-of-chars');
        const max = getComputedStyle(root).getPropertyValue('--max-line-of-chars');
        return [root, line_of_chars, min, max];
    }
    const fontSize = document.querySelector('#FontSize');
    const [root, line_of_chars, min, max] = getLineOfCharsFromCss();
    fontSize.min = min;
    fontSize.max = max;
    fontSize.value = line_of_chars;

    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-of-chars', `${value}`);
        const fontSize_ = document.querySelector('#FontSize_');
        fontSize_.innerHTML = value;
        console.log(`${value}`);
    }
    fontSize.addEventListener('input', e => {
        setLineOfCharsToHtml(e.target.value);
    });
    fontSize.dispatchEvent(new Event('input'));
    return fontSize;
}


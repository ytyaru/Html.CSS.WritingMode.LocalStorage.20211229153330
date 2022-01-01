function saveLetterSpacing() {
    const letterSpacing = document.querySelector('#letter-spacing');
    localStorage.setItem('letter-spacing', letterSpacing.value);
}
function initLetterSpacing() { // UI操作で行間を変更する
    function getLetterSpacingFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const letterSpacing = ('letter-spacing' in localStorage) ? localStorage.getItem('letter-spacing') : getComputedStyle(root).getPropertyValue('--letter-spacing');
        return [root, letterSpacing];
    }
    const letterSpacing = document.querySelector('#letter-spacing');
    const [root, value] = getLetterSpacingFromCss();
    letterSpacing.value = value;

    function round(value, step=1.0) { // 指定したstep単位で丸める（今回は0.5単位で丸めたい）
        var inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }
    function setLetterSpacingToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--letter-spacing', `${value}`);
        setFontSizePixel(document.querySelector('#WritingMode').value, document.querySelector('#FontSize').value, value);
//        document.querySelector('#letter-spacing_').innerHTML = value;
//        document.querySelector('#letter-spacing_').innerHTML = value * 100;
        document.querySelector('#letter-spacing_').innerHTML = round(value * 100, 0.5);
        console.log(`letter-spacing: ${value}`);
    }
    letterSpacing.addEventListener('input', e => {
        setLetterSpacingToHtml(e.target.value);
    });
    letterSpacing.dispatchEvent(new Event('input'));
    return letterSpacing;
}

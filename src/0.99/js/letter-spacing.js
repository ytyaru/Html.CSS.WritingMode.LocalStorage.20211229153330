function saveLetterSpacing() {
    const letterSpacing = document.querySelector('#letter-spacing');
    localStorage.setItem('letter-spacing', letterSpacing.value);
}
function initLetterSpacing() { // UI操作で行間を変更する
    function getLetterSpacingFromCss() { // CSSの変数を取得する
        const root = Html.Root;
        const value = localStorage.getItem('letter-spacing') || getComputedStyle(root).getPropertyValue('--letter-spacing') || 0.05;
        return [root, value];
    }
    const letterSpacing = Html.id('letter-spacing');
    const [root, value] = getLetterSpacingFromCss();
    letterSpacing.value = value;
    function round(value, step=1.0) { // 指定したstep単位で丸める（今回は0.5単位で丸めたい）
        var inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }
    function setLetterSpacingToHtml(value) { // CSSの変数をHTMLにセットする
        Css.Root.set('--letter-spacing', `${value}`);
        Html.id('letter-spacing-label').innerHTML = round(value * 100, 0.5);
        console.log(`${value}em字間`);
    }
    letterSpacing.addEventListener('input', e => {
        setLetterSpacingToHtml(e.target.value);
        setFontSizePixel(); // resize.js
        Paging.break();
    });
    setLetterSpacingToHtml(value);
    return letterSpacing;
}

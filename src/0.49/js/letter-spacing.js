function saveLetterSpacing() {
    const letterSpacing = document.querySelector('#letter-spacing');
    localStorage.setItem('letter-spacing', letterSpacing.value);
}
function initLetterSpacing() { // UI操作で行間を変更する
    function getLetterSpacingFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = ('letter-spacing' in localStorage) ? localStorage.getItem('letter-spacing') : getComputedStyle(root).getPropertyValue('--letter-spacing');
        return [root, value];
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
        document.querySelector('#letter-spacing-label').innerHTML = round(value * 100, 0.5);
        console.log(`${value}em字間`);
        // 画面サイズはフォントサイズに依存しているため、２回計算する必要がある。１回で済むようにしたいのだが循環参照してしまう
        calcScreenSize(document.querySelector('#writing-mode').value, document.querySelector('#column-count').value); // resize.js
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(value)); // resize.js
        calcScreenSize(document.querySelector('#writing-mode').value, document.querySelector('#column-count').value); // resize.js
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(value)); // resize.js
    }
    letterSpacing.addEventListener('input', e => {
        setLetterSpacingToHtml(e.target.value);
        breakPage();
    });
    letterSpacing.dispatchEvent(new Event('input'));
    return letterSpacing;
}

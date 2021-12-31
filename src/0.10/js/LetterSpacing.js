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
    function setLetterSpacingToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--letter-spacing', `${value}`);
//        setFontSizePixelFromLineOfChars(parseFloat(document.querySelector('body').style.getPropertyValue('font-size'))); // CalcFontSize.js
        document.querySelector('#letter-spacing_').innerHTML = value;
        console.log(`letter-spacing: ${value}`);

        // フォントサイズをピクセルで取得する（字数／行と行間から算出する。変更した行間サイズの分だけフォントサイズを増減する）
        // どうやって計算すればいい？
        // fontPx = clientW:H / lineOfChars

        // 字数／行を更新する
        const px = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'));
        document.querySelector('#FontSize_').innerHTML = calcLineOfCharsFromFontSizePixel(px);

        // 最大字数／行を更新する
        setMaxLineOfChars();
    }
    letterSpacing.addEventListener('input', e => {
        setLetterSpacingToHtml(e.target.value);
    });
    letterSpacing.dispatchEvent(new Event('input'));
    return letterSpacing;
}

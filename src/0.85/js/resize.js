function calcFontSizePixel() { // フォントサイズをピクセル単位で算出する
    function css(key, q=':root') { return getComputedStyle(document.querySelector(q)).getPropertyValue(key); }
    function cssF(key, q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
    function setCss(key, value, q=':root') {document.querySelector(':root').style.setProperty(key, value);}
    // １行の表示領域
    setCss('--line-of-px', cssF('inline-size', 'main:not([hidden])'));
    console.log(`font-size:${css('--font-size-px')}`)
    console.log(`font-size:${css('font-size', 'body')}`)
    console.log(`--line-of-px:${cssF('--line-of-px')}`)
}
function setFontSizePixel() { calcFontSizePixel(); }
function calcLineOfChars(writingMode) { // 字数／行を算出する（writingMode,フォントサイズpx,行間emから。縦横ボタン押下時）
    // １行あたりの字数＝(LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
    const FontSizePx = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size-px'));
    const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
    const MAIN = document.querySelector('main:not([hidden])');
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域
    const lineOfChars = (LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx);
    console.log(`${lineOfChars}字／行。${window.screen.orientation.type} ${writingMode} ${LINE_OF_PX}px行長 ${FontSizePx}px字大 ${LetterSpacingPx}px字間`);
    return lineOfChars;
}


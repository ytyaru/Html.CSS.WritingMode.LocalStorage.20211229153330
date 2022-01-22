function calcFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出する
    function css(key, q=':root') { return getComputedStyle(document.querySelector(q)).getPropertyValue(key); }
    function cssF(key, q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
//    const STYLE = getComputedStyle(document.querySelector(':root'));
    function setCss(key, value, q=':root') {document.querySelector(':root').style.setProperty(key, value);}
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const MAIN = document.querySelector('main:not([hidden])');
    // １行の表示領域
//    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域
//    const LINE_OF_PX = cssF((IS_VERTICAL) ? 'height' : 'width', main:not([hidden]));
    setCss('--line-of-px', cssF((IS_VERTICAL) ? 'height' : 'width', 'main:not([hidden])'));
//    setCss('--line-of-px', Math.floor(cssF((IS_VERTICAL) ? 'height' : 'width', 'main:not([hidden])'))); // 1文字入らないのでちょっと小さくする
    console.log(`font-size:${css('--font-size-px')}`)
    console.log(`font-size:${css('font-size', 'body')}`)
    console.log(`font-size:${css('font-size', 'main:not([hidden])')}`)
    /*
    --font-size-px:calc(((var(--line-of-px) / var(--column-count)) - (var(--column-rule-width-px) * (var(--column-count) - 1))) / (((var(--line-of-chars) * (1 + var(--letter-spacing))) + (var(--column-gap-em) / 2))));
    */
    /*
    function cssF(key, q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const MAIN = document.querySelector('main:not([hidden])');
    const COL_COUNT= cssF('--column-count');
    const COL_GAP_EM = cssF('--column-gap-em');
    const COL_RULE_W = cssF('--column-rule-width-px');
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域
//    const fontSizePx = (LINE_OF_PX / COL_COUNT) / ((lineOfChars * (1 + letterSpacing)) + (COL_GAP_EM / 2));
    const fontSizePx = ((LINE_OF_PX / COL_COUNT) - (COL_RULE_W * (COL_COUNT - 1))) / ((lineOfChars * (1 + letterSpacing)) + (COL_GAP_EM / 2));
    console.log(`フォントサイズ:${fontSizePx}px`);
    console.log(`LINE_OF_PX:${LINE_OF_PX}px`);
    console.log(`letterSpacing:${letterSpacing}em`);
    console.log(`lineOfChars :${lineOfChars }字`);
    return fontSizePx;
    */
}
function setFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出してHTMLにセットする
    calcFontSizePixel(writingMode, lineOfChars, letterSpacing);
    /*
    const FONT_SIZE_PX = calcFontSizePixel(writingMode, lineOfChars, letterSpacing);
    document.querySelector(':root').style.setProperty('--font-size-px', `${FONT_SIZE_PX}`);
    document.querySelector(':root').style.setProperty('--letter-spacing-px', `${FONT_SIZE_PX * letterSpacing}`);
    */
}
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


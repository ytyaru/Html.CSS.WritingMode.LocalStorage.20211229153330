function calcFontSizePixel() { // フォントサイズをピクセル単位で算出する
    const MAIN = document.querySelector('main:not([hidden])');
    const WRITING_MODE = document.getElementById('writing-mode').value;
    const LINE_OF_CHARS = parseInt(document.getElementById('line-of-chars').value);
    const LETTER_SPACING = parseFloat(document.getElementById('letter-spacing').value);
    const IS_VERTICAL = ('vertical-rl' === WRITING_MODE);
    //const LINE_OF_PX = (IS_VERTICAL) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域 684msかかり遅い
    const LINE_OF_PX = parseFloat(Css.Main.get('inline-size')); // １行の表示領域 なぜかこれで高速化した
    const COL_COUNT= parseInt(document.getElementById('column-count').value);
    const COL_GAP_EM = parseFloat(Css.Root.get('--column-gap-em'));
    const COL_RULE_W = parseFloat(Css.Root.get('--column-rule-width-px'));
//    const fontSizePx = (LINE_OF_PX / COL_COUNT) / ((lineOfChars * (1 + letterSpacing)) + (COL_GAP_EM / 2));
//    const fontSizePx = ((LINE_OF_PX / COL_COUNT) - (COL_RULE_W * (COL_COUNT - 1))) / ((lineOfChars * (1 + letterSpacing)) + (COL_GAP_EM / 2));
    const fontSizePx = ((LINE_OF_PX / COL_COUNT) - (COL_RULE_W * (COL_COUNT - 1))) / ((LINE_OF_CHARS * (1 + LETTER_SPACING)) + (COL_GAP_EM * (COL_COUNT - 1)));
    console.log(`フォントサイズ:${fontSizePx}px`);
    console.log(`LINE_OF_PX:${LINE_OF_PX}px`);
    console.log(`LETTER_SPACING:${LETTER_SPACING}em`);
    console.log(`LINE_OF_CHARS:${LINE_OF_CHARS}字`);
    console.log(`COL_COUNT:${COL_COUNT}段`);
    console.log(`COL_GAP_EM:${COL_GAP_EM}em`);
    console.log(`COL_RULE_W:${COL_RULE_W}px`);
    return fontSizePx;
}
function setFontSizePixel() { // フォントサイズをピクセル単位で算出してHTMLにセットする
    document.querySelector(':root').style.setProperty('--font-size', `${calcFontSizePixel()}px`);
}
/* CSS計算式
    --font-size-px:calc(((var(--line-of-px) / var(--column-count)) - (var(--column-rule-width-px) * (var(--column-count) - 1))) / (((var(--line-of-chars) * (1 + var(--letter-spacing))) ) + (var(--column-gap-em) * (var(--column-count) - 1))) );
*/
/* CSSで計算させた版。パフォーマンスが遅い。
function calcFontSizePixel() { // フォントサイズをピクセル単位で算出する
    function css(key, q=':root') { return getComputedStyle(document.querySelector(q)).getPropertyValue(key); }
    function cssF(key, q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
    function setCss(key, value, q=':root') {document.querySelector(':root').style.setProperty(key, value);}
    setCss('--line-of-px', cssF('inline-size', 'main:not([hidden])'));// １行の表示領域
    console.log(`font-size:${css('--font-size-px')}`)
    console.log(`font-size:${css('font-size', 'body')}`)
    console.log(`--line-of-px:${cssF('--line-of-px')}`)
}
function setFontSizePixel() { calcFontSizePixel(); }
*/


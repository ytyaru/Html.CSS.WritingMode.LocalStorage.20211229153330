function calcFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出する
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const LINE_OF_PX = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
//    const LINE_OF_PX = (IS_VERTICAL) ? document.body.innerHeight : document.body.innerWidth; // １行の表示領域

    /*
    if (IS_VERTICAL) {
        const SCROLL_BAR_W = window.innerWidth - document.body.clientWidth;
        document.querySelector(':root').style.setProperty('--scroll-bar-px-w', SCROLL_BAR_W);
        document.querySelector(':root').style.setProperty('--scroll-bar-px-h', 0);
        console.log(`--scroll-bar-px-w:${SCROLL_BAR_W}`);
    } else {
        const SCROLL_BAR_H = window.innerHeight - document.body.clientHeight;
        document.querySelector(':root').style.setProperty('--scroll-bar-px-h', SCROLL_BAR_H);
        document.querySelector(':root').style.setProperty('--scroll-bar-px-w', 0);
        console.log(`window.innerHeight:${window.innerHeight}`);
        console.log(`document.body.clientHeight:${document.body.clientHeight}`);
        console.log(`--scroll-bar-px-h:${SCROLL_BAR_H}`);
    }
    */

    const COL_GAP_EM = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-em'));
    const fontSizePx = LINE_OF_PX / ((lineOfChars * (1 + letterSpacing)) + (COL_GAP_EM / 2));
    console.log(`フォントサイズ:${fontSizePx}px`);
    console.log(`LINE_OF_PX:${LINE_OF_PX}px`);
    console.log(`letterSpacing:${letterSpacing}em`);
    console.log(`lineOfChars :${lineOfChars }字`);
    return fontSizePx;
}
function setFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出してHTMLにセットする
    const FONT_SIZE_PX = calcFontSizePixel(writingMode, lineOfChars, letterSpacing);
    document.querySelector(':root').style.setProperty('--font-size-px', `${FONT_SIZE_PX}`);
    document.querySelector(':root').style.setProperty('--letter-spacing-px', `${FONT_SIZE_PX * letterSpacing}`);
}
function calcLineOfChars(writingMode) { // 字数／行を算出する（writingMode,フォントサイズpx,行間emから。縦横ボタン押下時）
    // １行あたりの字数＝(LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
    const FontSizePx = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size-px'));
    const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const lineOfChars = (LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx);
    console.log(`${lineOfChars}字／行。${window.screen.orientation.type} ${writingMode} ${LINE_OF_PX}px行長 ${FontSizePx}px字大 ${LetterSpacingPx}px字間`);
    return lineOfChars;
}
function setLineOfChars() { // 字数／行を算出してHTMLにセットする
    const lineOfChars = parseInt(calcLineOfChars(document.querySelector('#writing-mode').value))
    document.querySelector('#line-of-chars-label').innerHTML = lineOfChars;
    document.querySelector('#line-of-chars').value = lineOfChars;
}
function calcScreenSize(writingMode, columns) { // 画面比率を変える（writingModeと段組数に応じて）
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const FULL_ID = (IS_VERTICAL) ? '--width-vw' : '--height-vh' ;
    const SPLIT_ID = (IS_VERTICAL) ? '--height-vh' : '--width-vw' ;
    document.querySelector(':root').style.setProperty(FULL_ID, 100);
    document.querySelector(':root').style.setProperty(SPLIT_ID, 100 / columns); // 段組み数で割る
    const COL_GAP_EM = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-em')) || 1;
    document.querySelector(':root').style.setProperty(`--column-gap-em-${(IS_VERTICAL) ? 'w' : 'h'}`, 0); // FULL
    document.querySelector(':root').style.setProperty(`--column-gap-em-${(IS_VERTICAL) ? 'h' : 'w'}`, COL_GAP_EM); // SPLIT
}

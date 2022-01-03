function calcFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出する
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const F = LINE_OF_PX / lineOfChars; // 字間なし時の１字あたりのフォントサイズ
    const L = F * letterSpacing; // 字間サイズ（emからpxに変換）
    const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）
    const fontSizePx = (LINE_OF_PX - ALL_LETTER_SPACING) / lineOfChars; // 入力した字／行と字間からピクセル単位でフォントサイズを算出する
    console.log(`${fontSizePx}。フォントサイズpx算出（writingMode:${writingMode}, lineOfChars:${lineOfChars}, letterSpacing:${letterSpacing}）。(１行の表示領域 - 全字間サイズ) / １行の字数\n＝((clientHeight or clientWidth) - ((字間なし字の１字あたりのフォントサイズpx * 字間em) * (１行の字数 - 1)) / １行の字数\n＝(${LINE_OF_PX} - ${ALL_LETTER_SPACING}) / ${lineOfChars}`);
    return fontSizePx;
}
function setFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出してHTMLにセットする
    const px = calcFontSizePixel(writingMode, lineOfChars, letterSpacing);
    document.querySelector(':root').style.setProperty('--font-size-px', `${px}`);
}
function calcLineOfChars(writingMode) { // 字数／行を算出する（writingMode,フォントサイズpx,行間emから。縦横ボタン押下時）
    // １行あたりの字数＝(LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
    console.log(document.querySelector('body').style);
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


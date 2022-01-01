function calcFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出する
    const SIZE = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const F = SIZE / lineOfChars; // 字間なし時の１字あたりのフォントサイズ
    const L = F * letterSpacing; // 字間サイズ（emからpxに変換）
    const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）
    const fontSizePx = (SIZE - ALL_LETTER_SPACING) / lineOfChars; // 入力した字／行と字間からピクセル単位でフォントサイズを算出する
    console.log(`${fontSizePx}。フォントサイズpx算出（writingMode:${writingMode}, lineOfChars:${lineOfChars}, letterSpacing:${letterSpacing}）。(１行の表示領域 - 全字間サイズ) / １行の字数\n＝((clientHeight or clientWidth) - ((字間なし字の１字あたりのフォントサイズpx * 字間em) * (１行の字数 - 1)) / １行の字数\n＝(${SIZE} - ${ALL_LETTER_SPACING}) / lineOfChars`);
    return fontSizePx;
}
function setFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出してHTMLにセットする
    const px = calcFontSizePixel(writingMode, lineOfChars, letterSpacing);
    document.querySelector('body').style.setProperty('font-size', `${px}px`);
}
function calcFontSizePixelFromLineOfChars(lineOfChars) { // 字数／行からその値をピクセル単位に変換する（字間を抜いたサイズ）
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
    const letterSpacing = getComputedStyle(document.querySelector(':root')).getPropertyValue('--letter-spacing');
    const px = SIZE / lineOfChars;
    console.log(`${px - (px * letterSpacing)}px = ${px}px(= ${SIZE}px / (${lineOfChars}字／行) - ${px * letterSpacing}px(${px}px * letterSpacing:${letterSpacing })行間)`);
    return px - (px * letterSpacing);
}
function setFontSizePixelFromLineOfChars(lineOfChars) { // 字数／行からその値をピクセル単位に変換してCSS変数にセットする
    const px = calcFontSizePixelFromLineOfChars(lineOfChars);
    console.log(`${lineOfChars}字／行 ${px}px ${document.querySelector('#WritingMode').value} ${window.screen.orientation.type}`);
    document.querySelector('body').style.setProperty('font-size', `${px}px`);
    return px;
}
function calcLineOfCharsFromFontSizePixel(px) { // フォントのピクセル数から字数／行に変換する
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
//    return Math.floor(SIZE / px);
    return Math.floor(SIZE / (px + (px * getComputedStyle(document.querySelector(':root')).getPropertyValue('--letter-spacing'))));
}

function calcLineOfChars(writingMode) { // 字数／行を算出する（writingMode,フォントサイズpx,行間emから。縦横ボタン押下時）
    // １行あたりの字数＝(SIZE - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
    console.log(document.querySelector('body').style);
    const FontSizePx = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'));
    const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
    const SIZE = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const lineOfChars = (SIZE - LetterSpacingPx) / (FontSizePx + LetterSpacingPx);
    console.log(`${lineOfChars}字／行。${window.screen.orientation.type} ${writingMode} ${SIZE}px全幅 ${FontSizePx}px字大 ${LetterSpacingPx}px字間`);
    return lineOfChars;
}
function setLineOfChars(writingMode) { // 字数／行を算出してHTMLにセットする
    const lineOfChars = parseInt(calcLineOfChars(writingMode))
    document.querySelector('#FontSize_').innerHTML = lineOfChars;
    document.querySelector('#FontSize').value = lineOfChars;
}

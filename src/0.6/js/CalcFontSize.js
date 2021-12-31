function calcFontSizePixelFromLineOfChars(lineOfChars) { // 字数／行からその値をピクセル単位に変換する
    const writingMode = document.querySelector('#WritingMode');
//    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
    console.log(`${SIZE / lineOfChars}px = ${SIZE}px / ${lineOfChars}字／行`);
    return SIZE / lineOfChars;
}
function setFontSizePixelFromLineOfChars(lineOfChars) { // 字数／行からその値をピクセル単位に変換してCSS変数にセットする
    const px = calcFontSizePixelFromLineOfChars(lineOfChars);
    console.log(`${lineOfChars}字／行 ${px}px ${document.querySelector('#WritingMode').value} ${window.screen.orientation.type}`);
    document.querySelector('body').style.setProperty('font-size', `${px}px`);
    return px;
}
function calcLineOfCharsFromFontSizePixel(px) { // フォントのピクセル数から字数／行に変換する
    const writingMode = document.querySelector('#WritingMode');
//    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
    return Math.floor(SIZE / px);
}

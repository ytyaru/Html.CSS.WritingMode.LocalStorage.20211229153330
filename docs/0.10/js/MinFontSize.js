function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する（但しCSSで指定した最大値より大きくはならない）
    const MIN_FONT_SIZE = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
//    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
    return Math.min(Math.floor(SIZE / MIN_FONT_SIZE), getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-line-of-chars'))
}
function setMaxLineOfChars() {
    console.log(window.screen.orientation);
    console.log(`w:${window.screen.availWidth}`);
    console.log(`h:${window.screen.availHeight}`);
    document.querySelector('#FontSize').max = calcMaxLineOfChars();
    console.log(`max:${document.querySelector('#FontSize').max}`);
    const fontSize = document.querySelector('#FontSize');
}
/*
function setLineOfCharsFromFontSizePixel() {// 画面の向きまたはWritingMode変更時にフォントサイズのピクセル値から字／行を取得してHTMLにセットする
    const px = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'))
    const lineOfChars = calcLineOfCharsFromFontSizePixel(px);
    console.log(`${lineOfChars}字／行 ${px}px`);
    document.querySelector('#FontSize').value = lineOfChars;
    const fontSize = document.querySelector('#FontSize');
    fontSize.value = (lineOfChars < fontSize.min) ? fontSize.min : (fontSize.max < lineOfChars) ? fontSize.max : lineOfChars;
    document.querySelector('#FontSize_').innerHTML = lineOfChars;
}
*/

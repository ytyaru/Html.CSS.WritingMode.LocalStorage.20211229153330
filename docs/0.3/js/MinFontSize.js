function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する
    const MIN_FONT_SIZE = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
    return Math.floor(SIZE / MIN_FONT_SIZE);
}
function setMaxLineOfChars() {
    console.log(window.screen.orientation);
    console.log(`w:${window.screen.availWidth}`);
    console.log(`h:${window.screen.availHeight}`);
    document.querySelector('#FontSize').max = calcMaxLineOfChars();
    console.log(`max:${document.querySelector('#FontSize').max}`);
    const fontSize = document.querySelector('#FontSize');
    fontSize.dispatchEvent(new Event('input'));
}


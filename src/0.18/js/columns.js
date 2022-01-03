function saveColumns() {
    const columns = document.querySelector('#columns');
    localStorage.setItem('columns', columns.value);
}
function initColumns() { // UI操作でフォントサイズを変更する
    function getColumnsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = localStorage.getItem('columns') || getComputedStyle(root).getPropertyValue('--columns') || 1;
        const min = getComputedStyle(root).getPropertyValue('--min-columns') || 1;
        const max = calcMaxColumns() || getComputedStyle(root).getPropertyValue('--max-columns') || 1;
        return [root, value, min, max];
    }
    const columns = document.querySelector('#columns');
    const [root, value, min, max] = getColumnsFromCss();
    columns.min = min;
    columns.max = max;
    columns.value = value;
    function setColumnsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--columns', `${value}`);
//        setFontSizePixel(document.querySelector('#writing-mode').value, value, document.querySelector('#letter-spacing').value);
        document.querySelector('#columns-label').innerHTML = value;
        setFontSizePixel(document.querySelector('#writing-mode').value, document.querySelector('#line-of-chars').value, document.querySelector('#letter-spacing').value);
//        setLineOfChars(); // resize.js
        console.log(`${value}段`);
    }
    columns.addEventListener('input', e => {
        setColumnsToHtml(e.target.value);
    });
    setMaxColumns();
    columns.dispatchEvent(new Event('input'));
    return columns;
}
function setMaxColumns() {
    console.log(window.screen.orientation);
    console.log(`w:${window.screen.availWidth}`);
    console.log(`h:${window.screen.availHeight}`);
    const columns = document.querySelector('#columns');
    columns.max = calcMaxColumns();
    if (columns.max < columns.value) {
        console.log(`超過！　最大段組数:${columns.max} 現在段組数:${columns.value}`);
        columns.value = columns.max;
    }
    document.querySelector('#columns-label').innerHTML = columns.value;
    document.querySelector(':root').style.setProperty('--columns', columns.value);
    console.log(`最大段組数:${columns.max} 現在段組数:${columns.value}`);
}
function calcMaxColumns() { // 解像度と画面の向きから最小フォントサイズ（16px）字で段組みするときの最大段組数を算出する
    const MIN_FONT_SIZE_PX = 16; // px。各ブラウザによって9px,10pxだったりする。ただし段組みするときの最小フォントは16pxとする。
    const writingMode = document.querySelector('#writing-mode').value;
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth;
    const JP_MAX_STANDARD_LINE_OF_CHARS= getComputedStyle(document.querySelector(':root')).getPropertyValue('--jp-max-standard-line-of-chars');
    const MAX_COLUMNS = parseInt((LINE_OF_PX / MIN_FONT_SIZE_PX) / JP_MAX_STANDARD_LINE_OF_CHARS);
    console.log(`最大段組数:${MAX_COLUMNS} ((１行あたりのサイズ/16px)/50字)=((${LINE_OF_PX}/${MIN_FONT_SIZE_PX})/${JP_MAX_STANDARD_LINE_OF_CHARS})=${LINE_OF_PX/MIN_FONT_SIZE_PX}/${JP_MAX_STANDARD_LINE_OF_CHARS}=${(LINE_OF_PX/MIN_FONT_SIZE_PX)/JP_MAX_STANDARD_LINE_OF_CHARS}`);
    return Math.max(1, MAX_COLUMNS);
    // 2段 = ((1600px / 16px ) / 50)。１行あたりのサイズが1600px以上でなければ段組みできない計算である。

//    return parseInt((LINE_OF_PX / MIN_FONT_SIZE_PX) / getComputedStyle(document.querySelector(':root')).getPropertyValue('--jp-max-standard-line-of-chars'));
//    return Math.min(Math.floor(LINE_OF_PX / MIN_FONT_SIZE_PX), getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-columns'))
}


function saveColumns() {
    const columns = document.querySelector('#column-count');
    localStorage.setItem('column-count', columns.value);
}
function initColumns() { // UI操作でフォントサイズを変更する
    function getColumnsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = localStorage.getItem('columns') || getComputedStyle(root).getPropertyValue('--column-count') || 1;
        const min = getComputedStyle(root).getPropertyValue('--column-count-min') || 1;
        const max = calcMaxColumns() || getComputedStyle(root).getPropertyValue('--column-count-max') || 1;
        return [root, value, min, max];
    }
    const columns = document.querySelector('#column-count');
    const [root, value, min, max] = getColumnsFromCss();
    columns.min = min;
    columns.max = max;
    columns.value = value;
    function setColumnsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--column-count', `${value}`);
        document.querySelector('#column-count-label').innerHTML = value;
        // 画面サイズはフォントサイズに依存しているため、２回計算する必要がある。１回で済むようにしたいのだが循環参照してしまう
        calcScreenSize(document.querySelector('#writing-mode').value, value); // resize.js
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value));
        calcScreenSize(document.querySelector('#writing-mode').value, value); // resize.js
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value));
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
    const columns = document.querySelector('#column-count');
    columns.max = calcMaxColumns();
    if (columns.max < columns.value) {
        console.log(`超過！　最大段組数:${columns.max} 現在段組数:${columns.value}`);
        columns.value = columns.max;
    }
    document.querySelector('#column-count-label').innerHTML = columns.value;
    document.querySelector(':root').style.setProperty('--column-count', columns.value);
    columns.style.display = (1 < columns.max) ? 'inline' : 'none';
    document.querySelector('#column-count ~ label').style.display = (1 < columns.max) ? 'inline' : 'none';
    console.log(`最大段組数:${columns.max} 現在段組数:${columns.value}`);
}
function calcMaxColumns() { // 解像度と画面の向きから最小フォントサイズ（16px）字で段組みするときの最大段組数を算出する
    const MIN_FONT_SIZE_PX = 16; // px。各ブラウザによって9px,10pxだったりする。ただし段組みするときの最小フォントは16pxとする。
    const writingMode = document.querySelector('#writing-mode').value;
//    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth;
    const MAIN = document.querySelector('main:not([hidden])');
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth;
    const JP_MAX_STANDARD_LINE_OF_CHARS= getComputedStyle(document.querySelector(':root')).getPropertyValue('--ja-max-standard-line-of-chars');
    const MAX_COLUMNS = parseInt((LINE_OF_PX / MIN_FONT_SIZE_PX) / JP_MAX_STANDARD_LINE_OF_CHARS);
    console.log(`最大段組数:${MAX_COLUMNS} ((１行あたりのサイズ/16px)/50字)=((${LINE_OF_PX}/${MIN_FONT_SIZE_PX})/${JP_MAX_STANDARD_LINE_OF_CHARS})=${LINE_OF_PX/MIN_FONT_SIZE_PX}/${JP_MAX_STANDARD_LINE_OF_CHARS}=${(LINE_OF_PX/MIN_FONT_SIZE_PX)/JP_MAX_STANDARD_LINE_OF_CHARS}`);
    console.log(`:${getComputedStyle(document.querySelector('main')).getPropertyValue('width')}`)
    console.log(`:${getComputedStyle(document.querySelector('main')).getPropertyValue('height')}`)
    return Math.max(1, MAX_COLUMNS);

    // 2段 = ((1600px / 16px ) / 50)。１行あたりのサイズが1600px以上でなければ段組みできない計算である。

//    return parseInt((LINE_OF_PX / MIN_FONT_SIZE_PX) / getComputedStyle(document.querySelector(':root')).getPropertyValue('--jp-max-standard-line-of-chars'));
//    return Math.min(Math.floor(LINE_OF_PX / MIN_FONT_SIZE_PX), getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-count-max'))
}


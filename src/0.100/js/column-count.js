function saveColumns() {
    const columns = document.querySelector('#column-count');
    localStorage.setItem('column-count', columns.value);
}
function initColumns() { // UI操作でフォントサイズを変更する
    function getColumnsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = localStorage.getItem('columns') || Css.Root.get('--column-count') || 1;
        const min = Css.Root.get('--column-count-min') || 1;
        const max = calcMaxColumns() || Css.Root.get('--column-count-max') || 1;
        return [root, value, min, max];
    }
    const columns = Html.id('column-count');
    const [root, value, min, max] = getColumnsFromCss();
    columns.min = min;
    columns.max = max;
    columns.value = value;
    function setColumnsToHtml(value) { // CSSの変数をHTMLにセットする
        Css.Root.set('--column-count', `${value}`);
        Html.id('column-count-label').innerHTML = value;
        console.debug(`${value}段`);
    }
    columns.addEventListener('input', e => {
        setColumnsToHtml(e.target.value);
        setFontSizePixel();
        Paging.break();
    });
    setMaxColumns();
//    columns.dispatchEvent(new Event('input'));
    setColumnsToHtml(value);
    return columns;
}
function setMaxColumns() {
    console.debug(window.screen.orientation);
    console.debug(`w:${window.screen.availWidth}`);
    console.debug(`h:${window.screen.availHeight}`);
    const columns = Html.id('column-count');
    columns.max = calcMaxColumns();
    if (columns.max < columns.value) {
        console.debug(`超過！　最大段組数:${columns.max} 現在段組数:${columns.value}`);
        columns.value = columns.max;
    }
    Html.id('column-count-label').innerHTML = columns.value;
    Css.Root.set('--column-count', columns.value);
    columns.style.display = (1 < columns.max) ? 'inline' : 'none';
    document.querySelector('#column-count ~ label').style.display = (1 < columns.max) ? 'inline' : 'none';
    console.debug(`最大段組数:${columns.max} 現在段組数:${columns.value}`);
}
function calcMaxColumns() { // 解像度と画面の向きから最小フォントサイズ（16px）字で段組みするときの最大段組数を算出する
    const MIN_FONT_SIZE_PX = 16; // px。各ブラウザによって9px,10pxだったりする。ただし段組みするときの最小フォントは16pxとする。
    const writingMode = document.querySelector('#writing-mode').value;
    const MAIN = document.querySelector('main:not([hidden])');
    const W = parseFloat(Css.Main.get('width')); // elm.clientWidthは遅い
    const H = parseFloat(Css.Main.get('height')); // elm.clientHeightは遅い
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? H : W;
    const JP_MAX_STANDARD_LINE_OF_CHARS= getComputedStyle(document.querySelector(':root')).getPropertyValue('--ja-max-standard-line-of-chars');
    const MAX_COLUMNS = parseInt((LINE_OF_PX / MIN_FONT_SIZE_PX) / JP_MAX_STANDARD_LINE_OF_CHARS);
    console.debug(`最大段組数:${MAX_COLUMNS} ((１行あたりのサイズ/16px)/50字)=((${LINE_OF_PX}/${MIN_FONT_SIZE_PX})/${JP_MAX_STANDARD_LINE_OF_CHARS})=${LINE_OF_PX/MIN_FONT_SIZE_PX}/${JP_MAX_STANDARD_LINE_OF_CHARS}=${(LINE_OF_PX/MIN_FONT_SIZE_PX)/JP_MAX_STANDARD_LINE_OF_CHARS}`);
    console.debug(`W:${W}, H:${H}, writingMode:${writingMode}`)
    return Math.max(1, MAX_COLUMNS);
    // 2段 = ((1600px / 16px ) / 50)。１行あたりのサイズが1600px以上でなければ段組みできない計算である。
}


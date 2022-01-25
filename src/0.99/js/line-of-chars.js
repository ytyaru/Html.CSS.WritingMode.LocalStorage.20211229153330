/*
const LineOfChars = function() {
    this._id = 'line-of-chars';
}
Object.defineProperties(LineOfChars.prototype, {
    Id: {
        get: function() { return this._id; }
    },
    Css: {
        get: function() { return parseInt(getComputedStyle(document.getElementById(':root')).getPropertyValue(`--${id}`)); }
        set: function(v) { document.getElementById(':root').style.setProperty(`--${id}`, v)); }
    },
    Html: {
        get: function() { return document.getElementById(`${id}`); }
    },
    Storage: {
        get: function() { return localStorage.getItem(`${id}`); }
        set: function(v) { return localStorage.getItem(`${id}`, v); }
    }
//    ,
//    Db: { // IndexedDB
//        get: function() { return localStorage.getItem(`${id}`); }
//        set: function(v) { return localStorage.getItem(`${id}`, v); }
//    }
}
LineOfChars.prototype.load = function() {
    function getLineOfCharsFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = localStorage.getItem('line-of-chars') || getComputedStyle(root).getPropertyValue('--line-of-chars') || 30;
        const min = getComputedStyle(root).getPropertyValue('--min-line-of-chars') || 15;
        const max = calcMaxLineOfChars() || getComputedStyle(root).getPropertyValue('--max-line-of-chars') || 30;
        return [root, value, min, max];
    }
    const lineOfChars = document.querySelector('#line-of-chars');
    const [root, value, min, max] = getLineOfCharsFromCss();
    lineOfChars.min = min;
    lineOfChars.max = max;
    lineOfChars.value = value;
}
LineOfChars.prototype.save = function() {}
LineOfChars.prototype.addEvent = function() {
    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-of-chars', `${value}`);
        document.querySelector('#line-of-chars-label').innerHTML = value;
        setFontSizePixel();
        console.debug(`${value}字／行`);
    }
    lineOfChars.addEventListener('input', e => {
        // フォントサイズ変更処理
        setLineOfCharsToHtml(e.target.value);
        // 変更後にページ再計算
        breakPage();
    });
}
LineOfChars.prototype.removeEvent = function() {
    
}
*/
function saveLineOfChars() {
    const lineOfChars = document.querySelector('#line-of-chars');
    localStorage.setItem('line-of-chars', lineOfChars.value);
}
function initLineOfChars() { // UI操作でフォントサイズを変更する
    function getLineOfCharsFromCss() { // CSSの変数を取得する
        const root = Html.Root;
        const value = localStorage.getItem('line-of-chars') || Css.Root.get('--line-of-chars') || 30;
        const min = Css.Root.get('--min-line-of-chars') || 15;
        const max = calcMaxLineOfChars() || Css.Root.get('--max-line-of-chars') || 30;
        return [root, value, min, max];
    }
    const lineOfChars = Html.id('line-of-chars');
    const [root, value, min, max] = getLineOfCharsFromCss();
    lineOfChars.min = min;
    lineOfChars.max = max;
    lineOfChars.value = value;
    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        Css.Root.set('--line-of-chars', `${value}`);
        Html.id('line-of-chars-label').innerHTML = value;
        console.debug(`${value}字／行`);
    }
    lineOfChars.addEventListener('input', e => {
        setLineOfCharsToHtml(e.target.value);
        // フォントサイズ変更処理
        setFontSizePixel();
        // 変更後にページ再計算
        Paging.break();
    });
//    lineOfChars.dispatchEvent(new Event('input'));
    setLineOfCharsToHtml(value);
    return lineOfChars;
}
function setMaxLineOfChars() {
    console.debug(window.screen.orientation);
    console.debug(`w:${window.screen.availWidth}`);
    console.debug(`h:${window.screen.availHeight}`);
    Html.id('line-of-chars').max = calcMaxLineOfChars();
}
function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する（但しCSSで指定した最大値より大きくはならない）
    const MIN_FONT_SIZE_PX = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = Html.id('writing-mode').value;
    const MAIN = Html.Main;
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域
    return Math.min(Math.floor(LINE_OF_PX / MIN_FONT_SIZE_PX), Css.Root.get('--max-line-of-chars'));
}


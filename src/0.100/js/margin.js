function saveMargin() {
    localStorage.setItem('margin', Html.id('margin').value);
}
function initMargin() { // UI操作でマージンを変更する
    const margin = Html.id('margin');
    function getMarginFromCss() { // CSSの変数を取得する
        const root = Html.Root;
        const value = localStorage.getItem('margin') || Css.Root.get('--margin') || 2.5;
        const min = margin.min || Css.Root.get('--min-margin') || 1.5;
        const max = margin.max || Css.Root.get('--max-margin') || 4;
        return [root, value, min, max];
    }
    const [root, value, min, max] = getMarginFromCss();
    margin.min = min;
    margin.max = max;
    margin.value = value;
    function setMarginToHtml(value) { // CSSの変数をHTMLにセットする
        Css.Root.set('--margin', `${value}`);
        Css.Root.set('--padding-left-em', `${value}`);
        Css.Root.set('--padding-right-em', `${value}`);
        Css.Root.set('--padding-top-em', `${value}`);
        Css.Root.set('--padding-bottom-em', `${value}`);
        Html.id('margin-label').innerHTML = value;
        console.debug(`${value}字 余白`);
    }
    margin.addEventListener('input', e => {
        setMarginToHtml(e.target.value);
        setFontSizePixel();
        Paging.break();
    });
    setMarginToHtml(value);
    return margin;
}


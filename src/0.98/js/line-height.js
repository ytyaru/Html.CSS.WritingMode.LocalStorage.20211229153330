function saveLineHeight() {
    const lineHeight = document.querySelector('#line-height');
    localStorage.setItem('line-height', lineHeight.value);
}
function initLineHeight() { // UI操作で行間を変更する
    function getLineHeightFromCss() { // CSSの変数を取得する
        const root = Html.Root;
        const value = localStorage.getItem('line-height') || getComputedStyle(root).getPropertyValue('--line-height') || 1.5;
        return [root, value];
    }
    const lineHeight = document.querySelector('#line-height');
    const [root, value] = getLineHeightFromCss();
    lineHeight.value = value;
    function setLineHeightToHtml(value) { // CSSの変数をHTMLにセットする
        Css.Root.set('--line-height', `${value}`);
        Html.id('line-height-label').innerHTML = value * 100;
        console.log(`${value}em行間`);
    }
    lineHeight.addEventListener('input', e => {
        setLineHeightToHtml(e.target.value);
        Paging.break();
    });
    setLineHeightToHtml(value);
    return lineHeight;
}

function saveLineHeight() {
    const lineHeight = document.querySelector('#line-height');
    localStorage.setItem('line-height', lineHeight.value);
}
function initLineHeight() { // UI操作で行間を変更する
    function getLineHeightFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const lineHeight = ('line-height' in localStorage) ? localStorage.getItem('line-height') : getComputedStyle(root).getPropertyValue('--line-height');
        return [root, lineHeight];
    }
    const lineHeight = document.querySelector('#line-height');
    const [root, value] = getLineHeightFromCss();
    lineHeight.value = value;
    function setLineHeightToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-height', `${value}`);
//        document.querySelector('#line-height_').innerHTML = value;
        document.querySelector('#line-height_').innerHTML = value * 100;
        console.log(`line-height: ${value}`);
    }
    lineHeight.addEventListener('input', e => {
        setLineHeightToHtml(e.target.value);
    });
    lineHeight.dispatchEvent(new Event('input'));
    return lineHeight;
}

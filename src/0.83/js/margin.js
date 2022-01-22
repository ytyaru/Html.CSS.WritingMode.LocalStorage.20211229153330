function saveMargin() {
    const margin = document.querySelector('#margin');
    localStorage.setItem('margin', margin.value);
}
function initMargin() { // UI操作でマージンを変更する
    const margin = document.querySelector('#margin');
    function getMarginFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const value = localStorage.getItem('margin') || getComputedStyle(root).getPropertyValue('--margin') || 2.5;
        const min = margin.min || getComputedStyle(root).getPropertyValue('--min-margin') || 1.5;
        const max = margin.max || getComputedStyle(root).getPropertyValue('--max-margin') || 4;
        return [root, value, min, max];
    }
    const [root, value, min, max] = getMarginFromCss();
    margin.min = min;
    margin.max = max;
    margin.value = value;
    function setMarginToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--margin', `${value}`);
        root.style.setProperty('--padding-left-em', `${value}`);
        root.style.setProperty('--padding-right-em', `${value}`);
        root.style.setProperty('--padding-top-em', `${value}`);
        root.style.setProperty('--padding-bottom-em', `${value}`);
        document.querySelector('#margin-label').innerHTML = value;
        console.log(`${value}字 余白`);
        setFontSizePixel(
            document.querySelector('#writing-mode').value, 
            parseInt(document.querySelector('#line-of-chars').value), 
            parseFloat(document.querySelector('#letter-spacing').value));
    }
    margin.addEventListener('input', e => {
        setMarginToHtml(e.target.value);
//        breakPage();
    });
    margin.dispatchEvent(new Event('input'));
    return margin;
}

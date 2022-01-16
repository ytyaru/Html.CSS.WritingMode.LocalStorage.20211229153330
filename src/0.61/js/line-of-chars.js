function saveLineOfChars() {
    const lineOfChars = document.querySelector('#line-of-chars');
    localStorage.setItem('line-of-chars', lineOfChars.value);
}
function initLineOfChars() { // UI操作でフォントサイズを変更する
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
    function setLineOfCharsToHtml(value) { // CSSの変数をHTMLにセットする
        root.style.setProperty('--line-of-chars', `${value}`);
        setFontSizePixel(document.querySelector('#writing-mode').value, parseInt(value), parseFloat(document.querySelector('#letter-spacing').value));
        document.querySelector('#line-of-chars-label').innerHTML = value;
        console.log(`${value}字／行`);
    }
    lineOfChars.addEventListener('input', e => {
        /*
        // 変更前に先頭要素を取得する
        function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
        let oldHeadElement = document.querySelector(`p[page="${cssI('--page-index')}"]`);
        oldHeadElement.setAttribute('id', 'head-element');
        */

        // フォントサイズ変更処理
        setLineOfCharsToHtml(e.target.value);

        // 変更後にページ再計算
        breakPage();

        /*
        // 変更後に変更前の先頭要素へ移動する
//        oldHeadElement.scrollIntoView(true); 
        oldHeadElement.scrollIntoView({block: "start", inline: "start", behavior: "auto"});
        // 変更後に先頭要素へ移動し、ページ数をセットする
        oldHeadElement = document.querySelector('#head-element');
        console.log('======================');
        console.log(oldHeadElement);
        console.log('======================');
        if (oldHeadElement.hasAttribute('page')) {document.querySelector(':root').style.setProperty('--page-index', oldHeadElement.getAttribute('page'));}
        else {
            let index = 1;
            let element = oldHeadElement.previousElementSibling;
            while (element) {
                if (element.hasAttribute('page')) {
                    document.querySelector(':root').style.setProperty('--page-index', element.getAttribute('page'));
                    break;
                }
                element = element.previousElementSibling;
            }
        }
        oldHeadElement.removeAttribute('id');
        */
        /*
        oldHeadElement = document.querySelector('#head-element');
        if (!oldHeadElement) {
            console.log('*******************************');
            return;
        } else {
            console.log('======================');
        }
        if (oldHeadElement.hasAttribute('page')) {document.querySelector(':root').style.setProperty('--page-index', oldHeadElement.getAttribute('page'));}
        else {
            console.log('!!!!!!!!!!!!!!!!!!!');
            console.log(oldHeadElement.previousElementSibling);
            let index = 1;
            while (oldHeadElement.previousElementSibling) {
                console.log('無限ループ');
                if (oldHeadElement.previousElementSibling.hasAttribute('page')) {
                    document.querySelector(':root').style.setProperty('--page-index', oldHeadElement.previousElementSibling.getAttribute('page'));
                    break;
                }
                oldHeadElement = oldHeadElement.previousElementSibling;
            }
        }
        oldHeadElement.removeAttribute('id');
        */
        /*
        if (oldHeadElement.hasAttribute('page')) {document.querySelector(':root').style.setProperty('--page-index', oldHeadElement.getAttribute('page'));}
        else {
            let index = 1;
            while (oldHeadElement.previousElementSibling) {
                if (oldHeadElement.previousElementSibling.hasAttribute('page')) {
                    document.querySelector(':root').style.setProperty('--page-index', oldHeadElement.previousElementSibling.getAttribute('page'));
                    oldHeadElement.removeAttribute('id');
                    break;
                }
                console.log('無限ループ');
            }
        }
        */
        /*
        */
    });
    lineOfChars.dispatchEvent(new Event('input'));
    return lineOfChars;
}
function setMaxLineOfChars() {
    console.log(window.screen.orientation);
    console.log(`w:${window.screen.availWidth}`);
    console.log(`h:${window.screen.availHeight}`);
    document.querySelector('#line-of-chars').max = calcMaxLineOfChars();
    console.log(`max:${document.querySelector('#line-of-chars').max}`);
}
function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する（但しCSSで指定した最大値より大きくはならない）
    const MIN_FONT_SIZE_PX = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = document.querySelector('#writing-mode').value;
    const MAIN = document.querySelector('main:not([hidden])');
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? MAIN.clientHeight : MAIN.clientWidth; // １行の表示領域
    return Math.min(Math.floor(LINE_OF_PX / MIN_FONT_SIZE_PX), getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-line-of-chars'))
}


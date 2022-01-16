function saveWritingMode() {
    const writingMode = document.querySelector('#writing-mode');
    localStorage.setItem('writing-mode', getComputedStyle(document.querySelector(':root')).getPropertyValue('--writing-mode'));
}
function isVartical(value=null) { return ('vertical-rl' === (value || document.querySelector('#writing-mode').value)); }
function initWritingMode() { // UI操作でフォントサイズを変更する
    const root = document.querySelector(':root');
    const writingMode = document.querySelector('#writing-mode');
    function getButtonValue(value) { return (isVartical(value)) ? value : 'horizontal-tb'; }
    function getButtonText(value) { return (isVartical(value)) ? '縦' : '横'; }
    function getFontSizeBaseValue(value) { return `100v${(isVartical(value)) ? 'h' : 'w'}`; }
    function switchWritingModeValue(value) { return (isVartical(value)) ? 'horizontal-tb' : 'vertical-rl';}
    function getTextOrientationValue(writingMode) { return (isVartical(writingMode)) ? 'upright' : 'sideways'; }
    function setValues(e, value) {
        e.value = value;
        e.innerHTML = getButtonText(value);
        root.style.setProperty('--writing-mode', value);
        root.style.setProperty('--text-orientation', getTextOrientationValue(value));
        root.style.setProperty('--block-size-base', '100v' + ((isVartical(value)) ? 'w' : 'h'));
        root.style.setProperty('--inline-size-base', '100v' + ((isVartical(value)) ? 'h' : 'w'));
        console.log(`表記方向:${getButtonText(value)}`);
    }
    function loadWritingMode() {
        const loadedValue = localStorage.getItem('WritingMode') || getComputedStyle(root).getPropertyValue('--writing-mode');
        setValues(writingMode, loadedValue );
    }
    loadWritingMode();
    function toggleWritingModeToHtml(e) { // CSSの変数をHTMLにセットする
        const switchedWritingMode = switchWritingModeValue(getComputedStyle(root).getPropertyValue('--writing-mode'));
        setValues(e.target, switchedWritingMode);
    }
    function setInputRangeWritingMode() {
        for (const input of document.querySelectorAll('input[type="range"]')) {
            if (isVartical()) {
                input.setAttribute('style', '-webkit-appearance:slider-vertical; writing-mode: bt-lr;');
                input.setAttribute('orient', 'vertical');
            } else {
                input.setAttribute('style', '');
                input.setAttribute('orient', '');
            }
        }
    }
    writingMode.addEventListener('click', e => {
        // 変更前に先頭要素を取得する
        function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
        let oldHeadElement = document.querySelector(`p[page="${cssI('--page-index')}"]`);
        oldHeadElement.setAttribute('id', 'head-element');

        // writing-mode 変更処理
        toggleWritingModeToHtml(e);
        setInputRangeWritingMode();
        setMaxColumns(); // columns.js
        setMaxLineOfChars(); // MinFontSize.js
        // 画面サイズはフォントサイズに依存しているため、２回計算する必要がある。１回で済むようにしたいのだが循環参照してしまう
//        calcScreenSize(e.target.value, document.querySelector('#column-count').value); // resize.js
        setFontSizePixel(e.target.value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value));
        /*
        calcScreenSize(e.target.value, document.querySelector('#column-count').value); // resize.js
        setFontSizePixel(e.target.value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value));
        */

        // 変更後にページ再計算
        breakPage();
        // 変更後に変更前の先頭要素へ移動する
//        oldHeadElement.scrollIntoView(true); 
        oldHeadElement.scrollIntoView({block: "start", inline: "start", behavior: "auto"});
        // 変更後に先頭要素へ移動し、ページ数をセットする
        oldHeadElement = document.querySelector('#head-element');
        if (oldHeadElement.hasAttribute('page')) {document.querySelector(':root').style.setProperty('--page-index', oldHeadElement.getAttribute('page'));}
        else {
            let index = 1;
            let element = oldHeadElement.previousElementSibling;
            while (element) {
                if (element.hasAttribute('page')) {
                    document.querySelector(':root').style.setProperty('--page-index', element.getAttribute('page'));
//                    oldHeadElement.removeAttribute('id');
                    break;
                }
                element = element.previousElementSibling;
            }
        }
        oldHeadElement.removeAttribute('id');
        setPageHeaderPosition(); // 柱を左寄せ／右寄せする
    });
    setInputRangeWritingMode();
    return writingMode;
}


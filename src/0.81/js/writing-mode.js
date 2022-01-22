function saveWritingMode() {
    const writingMode = document.querySelector('#writing-mode');
    localStorage.setItem('writing-mode', getComputedStyle(document.querySelector(':root')).getPropertyValue('--writing-mode'));
}
function isVartical(value=null) { return ('vertical-rl' === (value || document.querySelector('#writing-mode').value)); }
function initWritingMode() { // UI操作でフォントサイズを変更する
    const root = document.querySelector(':root');
    const writingMode = document.querySelector('#writing-mode');
    function getButtonValue(value) { return ((isVartical(value)) ? 'vertical-rl' : 'horizontal-tb'); }
    function getButtonText(value) { return ((isVartical(value)) ? '縦' : '横'); }
    function getFontSizeBaseValue(value) { return `100v${(isVartical(value)) ? 'h' : 'w'}`; }
    function switchWritingModeValue(value) { return ((isVartical(value)) ? 'horizontal-tb' : 'vertical-rl');}
    function getTextOrientationValue(writingMode) { return ((isVartical(writingMode)) ? 'upright' : 'sideways'); }
    function setValues(e, value) {
        e.value = value; // なぜかeだとvalueが更新されないのでwritingModeで更新した
        writingMode.value = value;
//        e.innerHTML = getButtonText(value);
//        const URL = getAssetsUrl(`images/icons/writing-mode-${value}.svg`);
        const SWITCHED_MODE_VALUE = switchWritingModeValue(value);
        const URL = getAssetsUrl(`images/icons/writing-mode-${SWITCHED_MODE_VALUE}.svg`);
        const IMG = document.querySelector('#writing-mode > img');
        IMG.setAttribute('src', `${URL}`);
        IMG.setAttribute('alt', `${getButtonText(SWITCHED_MODE_VALUE)}`);
        root.style.setProperty('--writing-mode', value);
        root.style.setProperty('--text-orientation', getTextOrientationValue(value));
        root.style.setProperty('--block-size-base', '100v' + ((isVartical(value)) ? 'w' : 'h'));
        root.style.setProperty('--inline-size-base', '100v' + ((isVartical(value)) ? 'h' : 'w'));
        console.log(`表記方向:${getButtonText(value)}, e.value:${e.value}, SWITCHED_MODE_VALUE:${SWITCHED_MODE_VALUE }`);
    }
    function loadWritingMode() {
        const loadedValue = localStorage.getItem('WritingMode') || getComputedStyle(root).getPropertyValue('--writing-mode');
        setValues(writingMode, loadedValue );
    }
    loadWritingMode();
    function toggleWritingModeToHtml(e) { // CSSの変数をHTMLにセットする
//        const switchedWritingMode = switchWritingModeValue(getComputedStyle(root).getPropertyValue('--writing-mode'));
//        setValues(e.target, switchedWritingMode);
        setValues(e.target, switchWritingModeValue(e.target.value));
    }
    writingMode.addEventListener('click', e => {
        // writing-mode 変更処理
        toggleWritingModeToHtml(e);
        setMaxColumns(); // columns.js
        setMaxLineOfChars(); // MinFontSize.js
        setFontSizePixel(e.target.value, parseInt(document.querySelector('#line-of-chars').value), parseFloat(document.querySelector('#letter-spacing').value));
        // 変更後にページ再計算
        breakPage();
        // 柱を左寄せ／右寄せする
        setPageHeaderPosition();
        setPosPageFooter(); // ページフッタの左右要素を入れ替える
    });
    return writingMode;
}


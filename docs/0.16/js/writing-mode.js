function saveWritingMode() {
    const writingMode = document.querySelector('#writing-mode');
    localStorage.setItem('WritingMode', getComputedStyle(document.querySelector(':root')).getPropertyValue('--writing-mode'));
}
function initWritingMode() { // UI操作でフォントサイズを変更する
    const root = document.querySelector(':root');
    const writingMode = document.querySelector('#writing-mode');
    function getButtonValue(value) { return ('vertical-rl' === value) ? value : 'horizontal-tb'; }
    function getButtonText(value) { return ('vertical-rl' === value) ? '縦' : '横'; }
    function getFontSizeBaseValue(value) { return `100v${('vertical-rl' === value) ? 'h' : 'w'}`; }
    function switchWritingModeValue(value) { return ('vertical-rl' === value) ? 'horizontal-tb' : 'vertical-rl';}
    function getTextOrientationValue(writingMode) { return ('vertical-rl' === writingMode) ? 'upright' : 'sideways'; }
    function loadWritingMode() {
        const loadedValue = localStorage.getItem('WritingMode') || getComputedStyle(root).getPropertyValue('--writing-mode');
        writingMode.value = getButtonValue(loadedValue);
        writingMode.innerHTML = getButtonText(loadedValue);
        root.style.setProperty('--writing-mode', writingMode.value);
        root.style.setProperty('--text-orientation', getTextOrientationValue(writingMode.value));
//        root.style.setProperty('--font-size-base', getFontSizeBaseValue(writingMode.value));
    }
    loadWritingMode();
    function toggleWritingModeToHtml(e) { // CSSの変数をHTMLにセットする
        const switchedWritingMode = switchWritingModeValue(getComputedStyle(root).getPropertyValue('--writing-mode'));
        e.target.value = switchedWritingMode;
        e.target.innerHTML = getButtonText(switchedWritingMode);
        root.style.setProperty('--writing-mode', switchedWritingMode);
        root.style.setProperty('--text-orientation', getTextOrientationValue(switchedWritingMode));
    }
    function setInputRangeWritingMode() {
        for (const input of document.querySelectorAll('input[type="range"]')) {
            if ('vertical-rl' === writingMode.value) {
                input.setAttribute('style', '-webkit-appearance:slider-vertical; writing-mode: bt-lr;');
                input.setAttribute('orient', 'vertical');
            } else {
                input.setAttribute('style', '');
                input.setAttribute('orient', '');
            }
        }
    }
    writingMode.addEventListener('click', e => {
        toggleWritingModeToHtml(e);
        setInputRangeWritingMode();
        setMaxLineOfChars(); // MinFontSize.js
//        setLineOfChars(e.target.value); // resize.js
        setLineOfChars(); // resize.js
    });
    setInputRangeWritingMode();
    return writingMode;
}


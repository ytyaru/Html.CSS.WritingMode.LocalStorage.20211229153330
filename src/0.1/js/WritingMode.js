function saveWritingMode() {
    const writingMode = document.querySelector('#WritingMode');
    localStorage.setItem('WritingMode', getComputedStyle(document.querySelector(':root')).getPropertyValue('--writing-mode'));
}
function initWritingMode() { // UI操作でフォントサイズを変更する
    const root = document.querySelector(':root');
    const writingMode = document.querySelector('#WritingMode');
    function getButtonValue(value) { return ('vertical-rl' === value) ? value : 'horizontal-tb'; }
    function getButtonText(value) { return ('vertical-rl' === value) ? '縦' : '横'; }
    function getFontSizeBase(value) { return '100v' + ('vertical-rl' === value) ? 'h' : 'w'; }
    function switchWritingModeValue(value) { return ('vertical-rl' === value) ? 'horizontal-tb' : 'vertical-rl';}
    function loadWritingMode() {
        const init_value = localStorage.getItem('WritingMode') || getComputedStyle(root).getPropertyValue('--writing-mode');
        writingMode.value = getButtonValue(init_value);
        writingMode.innerHTML = getButtonText(init_value);
        root.style.setProperty('--writing-mode', writingMode.value);
        root.style.setProperty('--font-size-base', getFontSizeBase(writingMode.value));
    }
    loadWritingMode();
    function toggleWritingModeToHtml(e) { // CSSの変数をHTMLにセットする
        const switched_value = switchWritingModeValue(getComputedStyle(root).getPropertyValue('--writing-mode'));
        e.target.value = switched_value;
        e.target.innerHTML = getButtonText(switched_value);
        root.style.setProperty('--writing-mode', switched_value);
        root.style.setProperty('--font-size-base', getFontSizeBase(switched_value));
    }
    writingMode.addEventListener('click', e => {
        toggleWritingModeToHtml(e);
    });
    writingMode.dispatchEvent(new Event('input'));
    return writingMode;
}


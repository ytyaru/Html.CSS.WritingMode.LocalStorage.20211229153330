function saveWritingMode() {
    const writingMode = document.querySelector('#WritingMode');
    localStorage.setItem('WritingMode', getComputedStyle(document.querySelector(':root')).getPropertyValue('--writing-mode'));
}
function initWritingMode() { // UI操作でフォントサイズを変更する
    const root = document.querySelector(':root');
    const writingMode = document.querySelector('#WritingMode');
    function getButtonValue(value) { return ('vertical-rl' == value) ? '縦' : '横'; }
    function loadWritingMode() {
        document.querySelector('#WritingMode').value = getButtonValue(localStorage.getItem('WritingMode') || getComputedStyle(root).getPropertyValue('--writing-mode'));
        if ('縦' === document.querySelector('#WritingMode').value) {
            root.style.setProperty('--writing-mode', 'vertical-rl');
            root.style.setProperty('--font-size-base', '100vh');
        } else {
            root.style.setProperty('--writing-mode', 'horizontal-tb');
            root.style.setProperty('--font-size-base', '100vw');
        }
    }
    loadWritingMode();
    function toggleWritingModeToHtml(e) { // CSSの変数をHTMLにセットする
        const v = getComputedStyle(root).getPropertyValue('--writing-mode');
        console.log(e)
        console.log(e.target)
        if ('vertical-rl' === v) {
            e.target.value = '横';
            root.style.setProperty('--writing-mode', 'horizontal-tb');
            root.style.setProperty('--font-size-base', '100vw');
        } else {
            e.target.value = '縦';
            root.style.setProperty('--writing-mode', 'vertical-rl');
            root.style.setProperty('--font-size-base', '100vh');
        }
    }
    writingMode.addEventListener('click', e => {
        toggleWritingModeToHtml(e);
    });
    writingMode.dispatchEvent(new Event('input'));
    return writingMode;
}


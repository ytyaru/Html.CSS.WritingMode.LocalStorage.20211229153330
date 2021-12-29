function saveWritingMode() {
    const writingMode = document.querySelector('#WritingMode');
    localStorage.setItem('WritingMode', getComputedStyle(document.querySelector(':root')).getPropertyValue('--writing-mode'));
}
function initWritingMode() { // UI操作でフォントサイズを変更する
    /*
    function getWritingModeFromCss() { // CSSの変数を取得する
        const root = document.querySelector(':root');
        const font_size_base = getComputedStyle(root).getPropertyValue('--font-size-base')
        const line_of_chars = ('WritingMode' in localStorage) ? localStorage.getItem('WritingMode') : getComputedStyle(root).getPropertyValue('--line-of-chars');
        const min = getComputedStyle(root).getPropertyValue('--min-line-of-chars');
        const max = getComputedStyle(root).getPropertyValue('--max-line-of-chars');
        return [root, line_of_chars, min, max];
    }
    const writingMode = document.querySelector('#WritingMode');
    const [root, line_of_chars, min, max] = getWritingModeFromCss();
    writingMode.min = min;
    writingMode.max = max;
    writingMode.value = line_of_chars;
    */
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


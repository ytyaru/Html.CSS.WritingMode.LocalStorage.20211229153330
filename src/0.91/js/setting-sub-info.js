function getSettingSubInfoElements() {
    const CLOCK = document.getElementById('clock-visibility');
    const ELAPSED_TIME = document.getElementById('elapsed-time-visibility');
    const NOW_SECTION_HEADING = document.getElementById('now-section-heading-visibility');
    const READ_RATE = document.getElementById('read-rate-visibility');
    const PAGE_NUMBER = document.getElementById('page-number-visibility');
    const REMAINING_PAGES = document.getElementById('remaining-pages-visibility');
    return [CLOCK, ELAPSED_TIME, NOW_SECTION_HEADING, READ_RATE, PAGE_NUMBER, REMAINING_PAGES];
}
function setSettingSubInfoColor(INPUT) {
    const SUB = document.getElementById('sub-info-disabled');
    Css.Root.set('background-color', 
                 (INPUT.checked) ? Css.Root.get('--selected-background-color') :  Css.Root.get('--background-color') , 
                 `#${INPUT.id}-label`);
    let color = Css.Root.get('--color');
    if (INPUT.checked) { color = Css.Root.get('--selected-color'); }
    if (!SUB.checked) { color = Css.Root.get('--disabled-color'); }
    Css.Root.set('color', color, `#${INPUT.id}-label`);
}
function initSettingSubInfo() { // 補足情報（ページヘッダ、フッタ）の表示ON/OFF
//    function css(key) { return STYLE.getPropertyValue(key); }
//    function setCss(key, value) { return ROOT.style.setProperty(key, value); }
    const SUB = document.getElementById('sub-info-disabled');
    function loadFromStorage(INPUT) {
        const VALUE = ('0' === localStorage.getItem(`${INPUT.id}`)) ? 'hidden' : 'visible';
        document.querySelector(':root').style.setProperty(`--${INPUT.id}`, VALUE);
        INPUT.checked = ('visible' === VALUE);
    }
    function round(value, step=1.0) { // 指定したstep単位で丸める（今回は0.5単位で丸めたい）
        var inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }
    function establishMargin() { // マージンとの整合性をとる
        const INPUTS = getSettingSubInfoElements();
        const MARGIN = document.getElementById('margin');
        // 補足情報がすべて非表示のとき、余白の最小値を0にする（1.5em未満にできる）
        if (INPUTS.every(x=> !x.checked)) {
            MARGIN.min = 0;
            MARGIN.value = 0;
            MARGIN.dispatchEvent(new Event('input'));
        }
        // 余白1.5em未満のとき、補足情報のいずれかが表示ONになったら、余白の最小値と値を1.5emにする
        if (round(parseFloat(MARGIN.value), 0.5) <= 1.5 && INPUTS.some(x=> x.checked)) {
            MARGIN.min = 1.5;
            MARGIN.value = 1.5;
            MARGIN.dispatchEvent(new Event('input'));
        }
    }
    function addEvent(INPUT) { // UI操作イベントを実装する
        INPUT.addEventListener('change', (e)=>{
            document.querySelector(':root').style.setProperty(`--${e.target.id}`, (e.target.checked) ? 'visible' : 'hidden');
//            document.querySelector(':root').style.setProperty(`--${e.target.id}-background-color`, (e.target.checked) ? 'visible' : 'hidden');
//            document.querySelector(':root').style.setProperty(`--${e.target.id}-color`, (e.target.checked) ? 'visible' : 'hidden');
//            Css.Root.set(`--${e.target.id}-background-color`, (e.target.checked) ? 'visible' : 'hidden');
//            Css.Root.set(`--${e.target.id}-color`, (e.target.checked) ? 'visible' : 'hidden');
//            Css.Root.set('background-color', 
//                         (e.target.checked) ? Css.Root.get('--selected-background-color') :  Css.Root.get('--background-color') , 
//                         `#${e.target.id}-label`);
//            Css.Root.set('color', 
//                         (e.target.checked) ? Css.Root.get('--selected-color') : Css.Root.get('--color'), 
//                         `#${e.target.id}-label`);

//            setColor(e.target);
            setSettingSubInfoColor(e.target);
            establishMargin();
        });
    }
    for (const INPUT of getSettingSubInfoElements()) {
        loadFromStorage(INPUT);
        addEvent(INPUT);
//        setColor(INPUT);
        setSettingSubInfoColor(INPUT);
    }
    SUB.addEventListener('change', (e)=>{
        document.querySelector('#sub-info-fieldset').disabled = !e.target.checked;
        const ROOT = document.querySelector(':root');
        const MARGIN = document.querySelector('#margin');
        function getInputValue(checked, INPUT) {return (checked) ? ((INPUT.checked) ? 'visible' : 'hidden') : 'hidden';}
        function getMarginValue(checked) {return (checked) ? MARGIN.value : 0 ;}
        for (const INPUT of getSettingSubInfoElements()) {
            ROOT.style.setProperty(`--${INPUT.id}`, getInputValue(e.target.checked, INPUT));
        }
        for (const name of ['--margin', '--padding-left-em', '--padding-right-em', '--padding-top-em', '--padding-bottom-em']) {
            ROOT.style.setProperty(name, getMarginValue(e.target.checked));
        }
        setFontSizePixel();
        // 補足情報のグレーアウト表示切替
        for (const INPUT of getSettingSubInfoElements()) { setSettingSubInfoColor(INPUT); }
        Css.Root.set('color', (e.target.checked) ? Css.Root.get('--color') : Css.Root.get('--disabled-color'), `#margin ~ label`);
    });
    SUB.checked = ('1' === localStorage.getItem(`${SUB.id}`));
//    SUB.dispatchEvent(new Event('change'));
    document.querySelector('#sub-info-fieldset').disabled = !SUB.checked;
    const ROOT = document.querySelector(':root');
    const MARGIN = document.querySelector('#margin');
    function getInputValue(checked, INPUT) {return (checked) ? ((INPUT.checked) ? 'visible' : 'hidden') : 'hidden';}
    function getMarginValue(checked) {return (checked) ? MARGIN.value : 0 ;}
    for (const INPUT of getSettingSubInfoElements()) {
        ROOT.style.setProperty(`--${INPUT.id}`, getInputValue(SUB.checked, INPUT));
    }
    for (const name of ['--margin', '--padding-left-em', '--padding-right-em', '--padding-top-em', '--padding-bottom-em']) {
        ROOT.style.setProperty(name, getMarginValue(SUB.checked));
    }
}
function saveSettingSubInfo() {
    for (const INPUT of getSettingSubInfoElements()) {
        localStorage.setItem(`${INPUT.id}`, (INPUT.checked) ? '1' : '0');
    }
    const SUB = document.getElementById('sub-info-disabled');
    localStorage.setItem(`${SUB.id}`, (SUB.checked) ? '1' : '0');
}


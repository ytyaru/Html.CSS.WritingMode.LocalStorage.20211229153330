function getSettingSubInfoElements() {
    const CLOCK = document.getElementById('clock-visibility');
    const ELAPSED_TIME = document.getElementById('elapsed-time-visibility');
    const NOW_SECTION_HEADING = document.getElementById('now-section-heading-visibility');
    const READ_RATE = document.getElementById('read-rate-visibility');
    const PAGE_NUMBER = document.getElementById('page-number-visibility');
    const REMAINING_PAGES = document.getElementById('remaining-pages-visibility');
    return [CLOCK, ELAPSED_TIME, NOW_SECTION_HEADING, READ_RATE, PAGE_NUMBER, REMAINING_PAGES];
}
function initSettingSubInfo() { // 補足情報（ページヘッダ、フッタ）の表示ON/OFF
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
            establishMargin();
        });
    }
    for (const INPUT of getSettingSubInfoElements()) {
        loadFromStorage(INPUT);
        addEvent(INPUT);
    }

    const SUB = document.getElementById('sub-info-disabled');
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
        setFontSizePixel(
            document.querySelector('#writing-mode').value, 
            parseInt(document.querySelector('#line-of-chars').value), 
            parseFloat(document.querySelector('#letter-spacing').value));

        /*
        if (e.target.checked) {
            for (const INPUT of getSettingSubInfoElements()) {
                ROOT.style.setProperty(`--${INPUT.id}`, (INPUT.checked) ? 'visible' : 'hidden');
            }
            for (const name of ['--margin', '--padding-left-em', '--padding-right-em', '--padding-top-em', '--padding-bottom-em']) {
                ROOT.style.setProperty(name, `${MARGIN.value}`);
            }
        } else {
            for (const INPUT of getSettingSubInfoElements()) {
                ROOT.style.setProperty(`--${INPUT.id}`, 'hidden');
            }
            for (const name of ['--margin', '--padding-left-em', '--padding-right-em', '--padding-top-em', '--padding-bottom-em']) {
                ROOT.style.setProperty(name, `0`);
            }
        }
        */
            /*
            ROOT.style.setProperty('--margin', `0`);
            ROOT.style.setProperty('--padding-left-em', `0`);
            ROOT.style.setProperty('--padding-right-em', `0`);
            ROOT.style.setProperty('--padding-top-em', `0`);
            ROOT.style.setProperty('--padding-bottom-em', `0`);
            */
             /*
            ROOT.style.setProperty('--margin', `${MARGIN.value}`);
            ROOT.style.setProperty('--padding-left-em', `${MARGIN.value}`);
            ROOT.style.setProperty('--padding-right-em', `${MARGIN.value}`);
            ROOT.style.setProperty('--padding-top-em', `${MARGIN.value}`);
            ROOT.style.setProperty('--padding-bottom-em', `${MARGIN.value}`);
            */
    });
}
function saveSettingSubInfo() {
    for (const INPUT of getSettingSubInfoElements()) {
        localStorage.setItem(`${INPUT.id}`, (INPUT.checked) ? '1' : '0');
    }
    const SUB = document.getElementById('sub-info-disabled');
    localStorage.setItem(`${SUB.id}`, (SUB.checked) ? '1' : '0');
}


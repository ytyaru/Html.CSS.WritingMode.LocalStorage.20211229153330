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
    function loadStorage(INPUT) {
        const VALUE = ('0' === localStorage.getItem(`${INPUT.id}`)) ? 'hidden' : 'visible';
        document.querySelector(':root').style.setProperty(`--${INPUT.id}`, VALUE);
        INPUT.checked = ('visible' === VALUE);
    }
    function addEvent(INPUT) {
        INPUT.addEventListener('change', (e)=>{
            document.querySelector(':root').style.setProperty(`--${e.target.id}`, (e.target.checked) ? 'visible' : 'hidden');
        });
    }
    for (const INPUT of getSettingSubInfoElements()) {
        loadStorage(INPUT);
        addEvent(INPUT);
    }
}
function saveSettingSubInfo() {
    for (const INPUT of getSettingSubInfoElements()) {
        localStorage.setItem(`${INPUT.id}`, (INPUT.checked) ? '1' : '0');
    }
}


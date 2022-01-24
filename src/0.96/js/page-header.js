function setPageHeaderPosition() { // ページヘッダの現在時刻、経過時間、柱を左寄せ／右寄せする（縦書き：現柱、横書き：柱現）
    /*
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const ROOT = document.querySelector(':root');
    const HEADING = document.getElementById('now-section-heading');
    const ELAPSED = document.getElementById('elapsed-time');
    const CLOCK = document.getElementById('clock');
    // text-align
    ROOT.style.setProperty('--now-section-heading-text-align', (IS_VERTICAL) ? 'end' : 'start');
    ROOT.style.setProperty('--clock-text-align', (IS_VERTICAL) ? 'start' : 'end');
    // order
    ROOT.style.setProperty('--now-section-heading-order', (IS_VERTICAL) ? 3 : 1);
    ROOT.style.setProperty('--clock-order', (IS_VERTICAL) ? 1 : 3);
    */
    const IS_VERTICAL = ('vertical-rl' === Html.id('writing-mode').value);
    // text-align
    Css.Root.set('--now-section-heading-text-align', (IS_VERTICAL) ? 'end' : 'start');
    Css.Root.set('--clock-text-align', (IS_VERTICAL) ? 'start' : 'end');
    // order
    Css.Root.set('--now-section-heading-order', (IS_VERTICAL) ? 3 : 1);
    Css.Root.set('--clock-order', (IS_VERTICAL) ? 1 : 3);
}


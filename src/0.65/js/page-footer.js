function setPosPageFooter() { // ページフッタの左右要素を入れ替える（縦：残了、横：了残）
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    /*
    const FOOTER = document.getElementById('page-footer');
    const REMAINING = document.getElementById('remaining-pages');
    const RATE = document.getElementById('remaining-pages');
    const NUMBER = document.getElementById('page-number');
    */
    const ROOT = document.querySelector(':root');

    /*
//    RATE.style.setProperty('text-align', 'start');
    RATE.style.setProperty('text-align', ((IS_VERTICAL) ? 'end' : 'start'));
    console.log(`${IS_VERTICAL }**********************************`);
    REMAINING.style.setProperty('text-align', ((IS_VERTICAL) ? 'start' : 'end'));
    */
    ROOT.style.setProperty('--remaining-pages-text-align', (IS_VERTICAL) ? 'start' : 'end');
    ROOT.style.setProperty('--read-rate-text-align', (IS_VERTICAL) ? 'end' : 'start');
    /*
    RATE.style.setProperty('order', (IS_VERTICAL) ? 1 : 3);
    REMAINING.style.setProperty('order', (IS_VERTICAL) ? 3 : 1);
    NUMBER.style.setProperty('order', 2);
    */
//    document.querySelector('#read-rate').style.setProperty('text-align', ((IS_VERTICAL) ? 'end' : 'start'));
//    document.querySelector('#remaining-pages').style.setProperty('text-align', ((IS_VERTICAL) ? 'start' : 'end'));
    // 最左にある最右にしたい要素を返す
    /*
    function getLast() { return (IS_VERTICAL) ? REMAINING : RATE; }
    FOOTER.appendChild(document.getElementById('page-number'));
    FOOTER.appendChild(getLast());
    */
    ROOT.style.setProperty('--read-rate-order', (IS_VERTICAL) ? 3 : 1);
    ROOT.style.setProperty('--page-number-order', 2);
    ROOT.style.setProperty('--remaining-pages-order', (IS_VERTICAL) ? 1 : 3);
    /*
    if (IS_VERTICAL) {
        document.querySelector(':root').style.setProperty('--read-rate-order', (IS_VERTICAL) ? 3 : 1);
        document.querySelector(':root').style.setProperty('--page-number-order', 2);
        document.querySelector(':root').style.setProperty('--remaining-pages-order', (IS_VERTICAL) ? 1 : 3);
    } else {
        document.querySelector(':root').style.setProperty('--read-rate-order', (IS_VERTICAL) ? 3 : 1);
        document.querySelector(':root').style.setProperty('--page-number-order', 2);
        document.querySelector(':root').style.setProperty('--remaining-pages-order', (IS_VERTICAL) ? 1 : 3);
    }
    */
    /*
    */
}

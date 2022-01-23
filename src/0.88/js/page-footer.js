function setPosPageFooter() { // ページフッタの左右要素を入れ替える（縦：残了、横：了残）
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const ROOT = document.querySelector(':root');
    // text-align
    ROOT.style.setProperty('--remaining-pages-text-align', (IS_VERTICAL) ? 'start' : 'end');
    ROOT.style.setProperty('--read-rate-text-align', (IS_VERTICAL) ? 'end' : 'start');
    // order
    ROOT.style.setProperty('--read-rate-order', (IS_VERTICAL) ? 3 : 1);
    ROOT.style.setProperty('--remaining-pages-order', (IS_VERTICAL) ? 1 : 3);
}

function setPosPageFooter() { // ページフッタの左右要素を入れ替える（縦：残了、横：了残）
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    document.querySelector('#read-rate').style.setProperty('text-align', ((IS_VERTICAL) ? 'end' : 'start'));
//    document.querySelector('#read-rate').style.setProperty('inset-inline-start', ((IS_VERTICAL) ? 'end' : 'start'));
//    document.querySelector('#read-rate').style.setProperty('inset-inline-end', 0);
    document.querySelector('#remaining-pages').style.setProperty('text-align', ((IS_VERTICAL) ? 'start' : 'end'));
}

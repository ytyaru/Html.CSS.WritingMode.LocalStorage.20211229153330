function setPosPageFooter() { // ページフッタの左右要素を入れ替える（縦：残了、横：了残）
    const IS_VERTICAL = ('vertical-rl' === Html.id('writing-mode').value);
    // text-align
    Css.Root.set('--remaining-pages-text-align', (IS_VERTICAL) ? 'start' : 'end');
    Css.Root.set('--read-rate-text-align', (IS_VERTICAL) ? 'end' : 'start');
    // order
    Css.Root.set('--read-rate-order', (IS_VERTICAL) ? 3 : 1);
    Css.Root.set('--remaining-pages-order', (IS_VERTICAL) ? 1 : 3);
}

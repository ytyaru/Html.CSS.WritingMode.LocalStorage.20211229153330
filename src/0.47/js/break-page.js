function breakPage() { // 本文表示領域(main要素)内を超過するところでbreak-before:columnする
    function cssF(key) { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    let page = 1; // ページ数
    let page_pos = 0; // ページ座標
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const MAIN_BLOCK_SIZE = cssF(((IS_VERTICAL) ? 'width' : 'height'), 'main:not([hidden])');
    console.log(`breakPage MAIN_BLOCK_SIZE:${MAIN_BLOCK_SIZE}`);
    for (const p of document.querySelectorAll('p')) {
        const RECT = p.getBoundingClientRect();
//        console.log('RECT:', RECT);
        const P_INLINE_START = RECT.left;
        const P_BLOCK_START = (IS_VERTICAL) ? RECT.top : RECT.left; 
        const P_PAGE_POS = P_BLOCK_START;
        p.removeAttribute('page');
        if (page_pos < P_PAGE_POS) { // 次のページの先頭要素
//            p.style.setProperty('break-before', 'all');
            p.setAttribute('page', `${page}`);
            page++;
            page_pos = P_PAGE_POS;
            console.log(`ページ追加:${page}, page_pos:${page_pos}`);
        }
    }
    document.querySelector(':root').style.setProperty('--page-length', (page-1));
}

function breakPage() { // page属性を追加する（p要素のうちinline-start座標が最初に増加する要素をページ先頭要素と判断して）
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    function cssF(key) { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const COL_COUNT= cssF('--column-count');
    let page = 1; // ページ数
    let page_pos = 0; // ページ座標
    let col_pos = COL_COUNT; // 段組位置

    // 現在位置保存（初回以降）
    console.log(cssI('--page-index'));
    let HEAD_P = document.querySelector(`p[page="${cssI('--page-index')}"]`);
    console.log(HEAD_P);
    if(HEAD_P) {
        HEAD_P.setAttribute('class', 'break-page-head');
    }

    // スクロールを先頭にする（さもなくばページ先頭が現在ページになってしまう）
    const MAIN = document.querySelector('main:not([hidden])');
    MAIN.scrollTop = 0;
    MAIN.scrollLeft = 0;
    for (const p of document.querySelectorAll('p')) {
        const RECT = p.getBoundingClientRect();
//        console.log('RECT:', RECT);
        const P_INLINE_START = RECT.left;
        const P_BLOCK_START = (IS_VERTICAL) ? RECT.top : RECT.left; 
        const P_PAGE_POS = P_BLOCK_START;
        p.removeAttribute('page');
        if (page_pos < P_PAGE_POS) { // 次のページの先頭要素
            col_pos++;
            page_pos = P_PAGE_POS;
            if (COL_COUNT < col_pos) {
    //            p.style.setProperty('break-before', 'all');
                p.setAttribute('page', `${page}`);
                col_pos = 1;
                page++;
                page_pos = P_PAGE_POS;
    //            console.log(`ページ追加:${page}, page_pos:${page_pos}`);
                console.log(`ページ:${page-1}`, RECT);
            }
        }
    }
    // 全ページ数セット
    document.querySelector(':root').style.setProperty('--page-length', (page-1));

    // 現在位置を戻す（初回以降）
    if (HEAD_P) {
        HEAD_P.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        // 現在ページ数セット
        HEAD_P = document.querySelector('p[class="break-page-head"]');
        if (HEAD_P.hasAttribute('page')) { document.querySelector(':root').style.setProperty('--page-index', HEAD_P.getAttribute('page'));}
        else {
            let index = 1;
            let element = HEAD_P.previousElementSibling;
            while (element) {
                if (element.hasAttribute('page')) {
                    document.querySelector(':root').style.setProperty('--page-index', element.getAttribute('page'));
                    break;
                }
                element = element.previousElementSibling;
            }
        }
        HEAD_P.removeAttribute('class');
    }
}

function getHeadElement() { // 現在画面先頭にあるHTML要素を取得する
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const COL_GAP_EM = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-em'));
    const FONT_SIZE_PX = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size-px'));
    const COL_GAP_PX = FONT_SIZE_PX * COL_GAP_EM;
//    const PAGE_PX = (parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) + COL_GAP_PX);
//    const PAGE_WIDTH = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue('width')) + COL_GAP_PX
//    const PAGE_WIDTH = document.body.clientWidth;
    const MAIN = document.querySelector('main:not([hidden])');
    const PAGE_WIDTH = MAIN.clientWidth;

    // 画面先頭の座標を取得
//    const X = document.body.scrollLeft + ((IS_VERTICAL) ? PAGE_WIDTH : 0); // 将来、余白、ページ数表示領域も計算に含める
//    const Y = document.body.scrollTop; // 将来、余白も計算に含める
//    const X = MAIN.scrollLeft + ((IS_VERTICAL) ? PAGE_WIDTH : 0); // 将来、余白、ページ数表示領域も計算に含める
//    const Y = MAIN.scrollTop; // 将来、余白も計算に含める
    
    const MAIN_RECT = MAIN.getBoundingClientRect();
//    const X = MAIN_RECT.x + ((IS_VERTICAL) ? PAGE_WIDTH : 0); // 将来、余白、ページ数表示領域も計算に含める
//    const Y = MAIN_RECT.y; // 将来、余白も計算に含める
//    const X = MAIN_RECT.x + MAIN.scrollLeft + ((IS_VERTICAL) ? PAGE_WIDTH : 0); // 将来、余白、ページ数表示領域も計算に含める
//    const Y = MAIN_RECT.y + MAIN.scrollTop; // 将来、余白も計算に含める
//    const X = MAIN_RECT.left + MAIN.scrollLeft + ((IS_VERTICAL) ? PAGE_WIDTH -1 : 0);
//    const Y = MAIN_RECT.top + MAIN.scrollTop;
    const X = MAIN.scrollLeft + ((IS_VERTICAL) ? MAIN_RECT.right : MAIN_RECT.left);
    const Y = MAIN_RECT.top + MAIN.scrollTop;    console.log(`X:${X}, Y:${Y}`);
    console.log(MAIN);
//    console.log(`MAIN.pageX:${MAIN.pageX}, MAIN.pageY:${MAIN.pageY}`);

    let index = 0;
    for (const p of document.querySelectorAll('p')) {
        const RECT = p.getBoundingClientRect();
//        console.log('RECT', RECT, p.innerHTML);
        if ((RECT.left <= X && X <= RECT.right) && (RECT.top <= Y && Y <= RECT.bottom)) {
//        if ((RECT.left <= X && X <= RECT.right) && ((RECT.top-1) <= Y && Y <= RECT.bottom)) {
            console.log(`！！！！！！！！！！！！！！！！！！！！！！`);
            console.log(`画面先頭要素をみつけた！ index:${index}`);
            console.log(p);
            console.log(`！！！！！！！！！！！！！！！！！！！！！！`);
            p.setAttribute('id', 'head-element');
            const HEAD_ELEMNT = document.querySelector('#head-element');
//            HEAD_ELEMNT.removeAttribute('id');
            return HEAD_ELEMNT; 
        }
        // 画面先頭座標点が要素ボックス内に含まれているならそれが画面先頭要素である
//        p.scrollLeft <= X p.
//        p.scrollTop
        index += 1;
    }
    console.log(`？？？？？？？？？？？？？？？？？？？？？？？？？？`);
    console.log(`先頭要素がみつからなかった`);
    console.log(`？？？？？？？？？？？？？？？？？？？？？？？？？？`);
    /*
    const LEN = document.querySelectorAll('p').length;
    for (const i=0; i<LEN; i++) {
        
    }
    */
}

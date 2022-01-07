function initPaging() { // 画面端をクリックかタップしたら１画面分スクロールする
    // 
}

function nextPage() { movePageRelative(1); }
function prevPage() { movePageRelative(-1); }

function movePageRelative(increment=1) { // incrementが正数なら進む。負数なら戻る。0なら何もしない。
    //const COL_GAP_EM = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-em'));
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * increment;
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollBy(X_INC, Y_INC);
}
function movePageAbsolute(page=0) { // pageは整数。0を最初のページとする。負数なら最後のページから数えた値。
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * page;
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollTo(X_INC, Y_INC);
}
function movePage(isAbsolute=false, isPrev=false, value=1) {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * page;
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    const SCROLL = 
    window.scrollTo(X_INC, Y_INC);

}
function calcPage() {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width'));
    const ALL_PX = (IS_VERTICAL) ? document.body.scrollHeight : document.body.scrollWidth;
//    const PAGE_PX = (IS_VERTICAL) ? window.screen.availHeight : window.screen.availWidth;
//    const ALL_PX = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth;
    const ALL_PAGE = ALL_PX / PAGE_PX;
    const pos = getWindowScrollPosition();
    const NOW_PX = (IS_VERTICAL) ? pos.y : pos.x;
    const NOW_PAGE = (0 === NOW_PX) ? 0 : ALL_PX / NOW_PX;
    console.log(`ALL_PAGE:${ALL_PAGE}, NOW_PAGE:${NOW_PAGE}`);
    console.log(`ALL_PX:${ALL_PX}, PAGE_PX:${PAGE_PX}, NOW_PX:${NOW_PX}`);
    console.log(`scrollWidth:${document.body.scrollWidth}`);
    console.log(`ALL_PAGE:${parseInt(ALL_PAGE)}, NOW_PAGE:${parseInt(NOW_PAGE)}`)
    return [parseInt(ALL_PAGE), parseInt(NOW_PAGE)];
}
/*
function calcAllPage() {
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * increment;
    const ALL_PX = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth;
    const PAGE = ALL_PX / PAGE_PX;
    console.log(`総ページ数:${PAGE}`);
    return PAGE;
}
function calcNowPage() {
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * increment;
    const ALL_PX = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth;
    const pos = getWindowScrollPosition();
    const NOW_PX = (IS_VERTICAL) ? pos.y : pos.x;
    const NOW_PAGE = ALL_PX / NOW_PX;
    return NOW_PAGE;
}
*/
var getWindowScrollPosition = function() {
    return {
        x : typeof window.scrollX !== 'undefined' ? window.scrollX : (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft : document.body.scrollLeft),
        y : typeof window.scrollY !== 'undefined' ? window.scrollY : (typeof document.documentElement.scrollTop  !== "undefined" ? document.documentElement.scrollTop  : document.body.scrollTop)
    };
};
window.addEventListener('click', (event) => {

});
window.addEventListener('touchstart', (event) => {

});

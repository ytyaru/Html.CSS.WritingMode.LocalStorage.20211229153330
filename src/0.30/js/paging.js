function initPaging() { // 画面端をクリックかタップしたら１画面分スクロールする
    // 
}

function nextPage() { movePageRelative(1); }
function prevPage() { movePageRelative(-1); }
function firstPage() { movePageAbsolute(0); }
function lastPage() { movePageAbsolute(-1); }
function movePage(page) { movePageAbsolute(page); }


function movePageRelative(increment=1) { // incrementが正数なら進む。負数なら戻る。0なら何もしない。
    //const COL_GAP_EM = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-em'));
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = ((IS_VERTICAL) ? window.screen.height : window.screen.width) * increment;
//    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * increment;
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollBy(X_INC, Y_INC);
}
function movePageAbsolute(page=0) { // pageは整数。0を最初のページとする。負数なら最後のページから数えた値。
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
//    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width')) * page;
    /*
    const PAGE_PX = ((IS_VERTICAL) ? window.screen.height : window.screen.width) * page;
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollTo(X_INC, Y_INC);
    */
    function calcPagePx() {
        const PAGE_PX = ((IS_VERTICAL) ? window.screen.height : window.screen.width) * page;
        if (0 <= page) { return PAGE_PX; }
        else {
            const [ALL_PAGE, NOW_PAGE] = calcPage();
            const TARGET_PAGE = ALL_PAGE + page;
            console.log(`TARGET_PAGE :${TARGET_PAGE }, PAGE_PX:${PAGE_PX}`);
            return TARGET_PAGE * (PAGE_PX * -1);
        }
    }
    const PAGE_PX = calcPagePx();
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollTo(X_INC, Y_INC);
}

function calcPage() {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width'));
//    const PAGE_PX = ((IS_VERTICAL) ? window.screen.height : window.screen.width) * page;
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
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    /*
    if (IS_VERTICAL) {
        const POS = event.screenY;
        const SIZE = window.screen.height * 0.1; // 10%分の高さ
        if (POS <= SIZE) { prevPage(); }
        else if ((window.screen.height - SIZE) < POS && POS < window.screen.height) { nextPage(); }
        else {} // 何もしない
    } else {
        const POS = event.screenX;
        const SIZE = window.screen.width * 0.1; // 10%分の幅
        if (POS <= SIZE) { prevPage(); }
        else if ((window.screen.width - SIZE) < POS && POS < window.screen.width) { nextPage(); }
        else {} // 何もしない
    }
    */
//    const POS = (IS_VERTICAL) ? event.screenY : event.screenX; // 現在マウス位置
    const POS = (IS_VERTICAL) ? event.clientY : event.clientX; // 現在マウス位置
//    const SCREEN_SIZE = (IS_VERTICAL) ? window.screen.height : window.screen.width; // 画面サイズ
//    const SCREEN_SIZE = (IS_VERTICAL) ? window.screen.availHeight : window.screen.availWidth; // 画面サイズ
    const SCREEN_SIZE = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth; // 画面サイズ
    const CLICK_SIZE = SCREEN_SIZE * 0.1; // クリック領域サイズ
    console.log(`POS:${POS}, SCREEN_SIZE:${SCREEN_SIZE}, CLICK_SIZE:${CLICK_SIZE}`);
    if (POS <= CLICK_SIZE) { prevPage(); }
    else if ((SCREEN_SIZE  - CLICK_SIZE) < POS && POS < SCREEN_SIZE) { nextPage(); }
    else {} // 何もしない

});
window.addEventListener('mousemove', (event) => {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const POS = (IS_VERTICAL) ? event.clientY : event.clientX; // 現在マウス位置
    const SCREEN_SIZE = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth; // 画面サイズ
    const CLICK_SIZE = SCREEN_SIZE * 0.1; // クリック領域サイズ
    console.log(`POS:${POS}, SCREEN_SIZE:${SCREEN_SIZE}, CLICK_SIZE:${CLICK_SIZE}`);
    if (POS <= CLICK_SIZE) { document.body.style.cursor = (IS_VERTICAL) ? 'n-resize' : 'w-resize'; }
    else if ((SCREEN_SIZE  - CLICK_SIZE) < POS && POS < SCREEN_SIZE) { document.body.style.cursor = (IS_VERTICAL) ? 's-resize' : 'e-resize'; }
    else {document.body.style.cursor = 'auto'; }
});

window.addEventListener('touchstart', (event) => {

});
window.addEventListener("keydown", event => {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    console.log(`keydown event.key:${event.key}, Shift:${event.shiftKey}`)
         if (event.key === 'ArrowUp') {if (IS_VERTICAL) { prevPage(); } event.preventDefault();  }
    else if (event.key === 'ArrowDown') {if (IS_VERTICAL) { nextPage(); } event.preventDefault();  }
    else if (event.key === 'ArrowLeft') {if (!IS_VERTICAL) { prevPage(); } event.preventDefault();  }
    else if (event.key === 'ArrowRight') {if (!IS_VERTICAL) { nextPage(); } event.preventDefault();  }
    else if (event.key === 'PageUp') {prevPage();event.preventDefault();}
    else if (event.key === 'PageDown') {nextPage();event.preventDefault();}
    else if (event.key === 'Home') {firstPage();event.preventDefault();}
    else if (event.key === 'End') {lastPage();event.preventDefault();}
    else if (!event.shiftKey && event.key === ' ') {nextPage();event.preventDefault();}
    else if (event.shiftKey && event.key === ' ') {prevPage();event.preventDefault();}
    else if (!event.shiftKey && event.key === 'Enter') {nextPage();event.preventDefault();}
    else if (event.shiftKey && event.key === 'Enter') {prevPage();event.preventDefault();}
    else if (event.key === 'Backspace') {prevPage();event.preventDefault();}
    else {}
}, {passive: false});
window.addEventListener("keypress", event => {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    console.log(`keypress event.key:${event.key}`)
    if (event.key === 'n') {nextPage();}
    else if (event.key === 'p') {prevPage();}
    else if (event.key === 'f') {firstPage();}
    else if (event.key === 'l') {lastPage();}
    /* なぜか以下はkeypressだと捕捉できない！
    else if (event.key === 'ArrowUp') {if (IS_VERTICAL) { prevPage(); } event.preventDefault();  }
    else if (event.key === 'ArrowDown') {if (IS_VERTICAL) { nextPage(); } event.preventDefault();  }
    else if (event.key === 'ArrowLeft') {console.log('------------');if (!IS_VERTICAL) { prevPage(); console.log('=============='); } event.preventDefault();  }
    else if (event.key === 'ArrowRight') {if (!IS_VERTICAL) { nextPage(); } event.preventDefault();  }
    else if (event.key === 'PageUp') {event.preventDefault();prevPage();}
    else if (event.key === 'PageDown') {event.preventDefault();nextPage();}
    else if (event.key === 'Home') {event.preventDefault();firstPage();}
    else if (event.key === 'End') {event.preventDefault();lastPage();}
    else if (!event.shiftKey && event.key === ' ') {event.preventDefault();nextPage();}
    else if (event.shiftKey && event.key === ' ') {event.preventDefault();nextPage();}
    else if (!event.shiftKey && event.key === 'Enter') {event.preventDefault();nextPage();}
    else if (event.shiftKey && event.key === 'Enter') {event.preventDefault();prevPage();}
    else if (event.key === 'Backspace') {event.preventDefault();lastPage();}
    */
    else {}
}, {passive: false});

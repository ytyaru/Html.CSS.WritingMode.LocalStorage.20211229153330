function nextPage() { movePageRelative(1); calcPage(); }
function prevPage() { movePageRelative(-1); calcPage();  }
function firstPage() { movePageAbsolute(0); calcPage();  }
function lastPage() { movePageAbsolute(-1); calcPage();  }
function movePage(page) { movePageAbsolute(page); calcPage();  }
function movePageRelative(increment=1) { // incrementが正数なら進む。負数なら戻る。0なら何もしない。
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_PX = ((IS_VERTICAL) ? window.screen.height : window.screen.width) * increment;
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollBy(X_INC, Y_INC);
}
function movePageAbsolute(page=0) { // pageは整数。0を最初のページとする。負数なら最後のページから数えた値。
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    function calcPagePx() {
        const PAGE_PX = ((IS_VERTICAL) ? window.screen.height : window.screen.width);
        if (0 <= page) { return PAGE_PX * page; }
        else {
            const [ALL_PAGE, NOW_PAGE] = calcPage();
            const TARGET_PAGE = ALL_PAGE + page;
            const TARGET_POS_PX = TARGET_PAGE * PAGE_PX;
            console.log(`TARGET_PAGE :${TARGET_PAGE }, PAGE_PX:${PAGE_PX}, TARGET_POS_PX:${TARGET_POS_PX}`);
            return TARGET_POS_PX;
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
    const ALL_PX = (IS_VERTICAL) ? document.body.scrollHeight : document.body.scrollWidth;
    const ALL_PAGE = ALL_PX / PAGE_PX;
    const pos = getWindowScrollPosition();
    const NOW_PX = (IS_VERTICAL) ? pos.y : pos.x;
    const NOW_PAGE = (0 === NOW_PX) ? 0 : ALL_PAGE * (NOW_PX / ALL_PX);
    console.log(`ALL_PAGE:${ALL_PAGE}, NOW_PAGE:${NOW_PAGE}`);
    console.log(`ALL_PX:${ALL_PX}, PAGE_PX:${PAGE_PX}, NOW_PX:${NOW_PX}`);
    console.log(`scrollWidth:${document.body.scrollWidth}`);
    console.log(`ALL_PAGE:${parseInt(ALL_PAGE)}, NOW_PAGE:${parseInt(NOW_PAGE)}`)
    return [parseInt(ALL_PAGE), parseInt(NOW_PAGE)];
}
function getWindowScrollPosition() {
    return {
        x : typeof window.scrollX !== 'undefined' ? window.scrollX : (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft : document.body.scrollLeft),
        y : typeof window.scrollY !== 'undefined' ? window.scrollY : (typeof document.documentElement.scrollTop  !== "undefined" ? document.documentElement.scrollTop  : document.body.scrollTop)
    };
};
window.addEventListener('touchstart', (event) => {
    console.log('touchstart', event);
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    movePagePositionalDevice(event.touches[0].X);
});

const POS_NONE = 0;
const POS_PREV = 1;
const POS_NEXT = 2;
const POS_MENU = 3; // index, setting, tools(bookmark, timer)
function PagingPosition(POS) { // ページめくるための画面端領域を算出する
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const SCREEN_SIZE = document.body.clientWidth; // 画面サイズ
    const CLICK_SIZE = SCREEN_SIZE * 0.1; // クリック領域サイズ
    if (POS <= CLICK_SIZE) { return (IS_VERTICAL) ? POS_NEXT : POS_PREV; } // 左端
    else if ((SCREEN_SIZE  - CLICK_SIZE) < POS) { return (IS_VERTICAL) ? POS_PREV : POS_NEXT; } // 右端
    else { return POS_NONE; }
}
function movePagePositionalDevice(POS) { // マウスかタップで次前ページ遷移
    switch (PagingPosition(POS)) {
        case POS_PREV: return prevPage();
        case POS_NEXT: return nextPage();
    }
}
window.addEventListener('click', (event) => {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    movePagePositionalDevice(event.clientX);
});
window.addEventListener('mousemove', (event) => {
    function getCursor() {
        const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
        const POS = event.clientX;
        switch (PagingPosition(POS)) {
            case POS_PREV: return (IS_VERTICAL) ? 'e-resize' : 'w-resize';
            case POS_NEXT: return (IS_VERTICAL) ? 'w-resize' : 'e-resize';
            case POS_NONE: return 'auto';
        }
    }
    document.body.style.cursor = getCursor();
});
window.addEventListener("keydown", event => {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    console.log(`keydown event.key:${event.key}, Shift:${event.shiftKey}`)
         if (event.key === 'ArrowUp') { event.preventDefault();  }   // menu(index,setting,tools)表示予定
    else if (event.key === 'ArrowDown') { event.preventDefault();  } // menu(index,setting,tools)表示予定
    else if (event.key === 'ArrowLeft') {(IS_VERTICAL) ? nextPage() : prevPage(); event.preventDefault();  }
    else if (event.key === 'ArrowRight') {(IS_VERTICAL) ? prevPage() : nextPage(); event.preventDefault();  }
    else if (event.key === 'PageUp') {prevPage();event.preventDefault();}
    else if (event.key === 'PageDown') {nextPage();event.preventDefault();}
    else if (event.key === 'Home') {firstPage();event.preventDefault();}
    else if (event.key === 'End') {lastPage();event.preventDefault();}
    else if (!event.shiftKey && event.key === ' ') {nextPage();event.preventDefault();}
    else if (event.shiftKey && event.key === ' ') {prevPage();event.preventDefault();}
    else if (!event.shiftKey && event.key === 'Enter') {nextPage();event.preventDefault();}
    else if (event.shiftKey && event.key === 'Enter') {prevPage();event.preventDefault();}
    else if (event.key === 'Backspace') {prevPage();event.preventDefault();}
    else if (event.key === 'Escape') {;event.preventDefault();} // 本を閉じる予定（本棚に戻る）
    else {}
}, {passive: false});
window.addEventListener("keypress", event => {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    console.log(`keypress event.key:${event.key}`)
    if (event.key === 'n') {nextPage();}
    else if (event.key === 'p') {prevPage();}
    else if (event.key === 'f') {firstPage();}
    else if (event.key === 'l') {lastPage();}

    // 'u' undo 前の移動を取り消す
    // 'm' move 移動するページを絶対値で指定する
    else if (event.key === 'm') {
        const [ALL_PAGE, NOW_PAGE] = calcPage();
        const page = window.prompt('何ページ目に移動しますか？', `${NOW_PAGE}`)
        movePage(parseInt(page));
    }
    // 'h' here 現在ここは何ページ目かを表示する
    // 't' time 現在時刻。経過時刻。指定時間、指定時刻までの残り時間を表示する
    // 'i' index 作品名,編,章,ページ数,著者名(著者他作品リンクへ)
    else {}
}, {passive: false});

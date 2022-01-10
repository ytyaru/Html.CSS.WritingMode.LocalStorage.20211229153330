function nextPage() { movePageRelative(1); calcPage(); }
function prevPage() { movePageRelative(-1); calcPage();  }
function firstPage() { movePageAbsolute(0); calcPage();  }
function lastPage() { movePageAbsolute(-1); calcPage();  }
function movePage(page) { movePageAbsolute(page); calcPage();  }
function movePageRelative(increment=1) { // incrementが正数なら進む。負数なら戻る。0なら何もしない。
    const [ALL_PAGE, NOW_PAGE] = calcPage();
    if (increment < 1 && 0 === NOW_PAGE) { return; } // 先頭ページ以上は進まない（微妙な余白があるが移動させない）
    if (0 < increment && (ALL_PAGE - 1) === NOW_PAGE) { return; } // 末尾ページ以上は進まない（微妙な余白があるが移動させない）
    function cssF(key,q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const COL_GAP_EM = cssF('--column-gap-em');
    const FONT_SIZE_PX = cssF('--font-size-px');
    const COL_GAP_PX = FONT_SIZE_PX * COL_GAP_EM;
    const COL_RULE_WIDTH_PX = cssF('--column-rule-width-px');
    const COLUMNS = cssF('--columns');
//    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body') + COL_GAP_PX + (COL_RULE_WIDTH_PX * (0<increment) ? 1 : -1) + ((COL_RULE_WIDTH_PX/2)*((0<increment) ? -1 : 1 ))) * increment;
    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body') + COL_GAP_PX + (COL_RULE_WIDTH_PX * (0<increment) ? 1 : -1) + ((COL_RULE_WIDTH_PX/2)*((0<increment) ? -1 : 1 ))) * increment * COLUMNS;
//    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body') + COL_GAP_PX) * increment * COLUMNS;
    console.log(window.screen.height, document.body.clientHeight);
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollBy(X_INC, Y_INC);
}
function movePageAbsolute(page=0) { // pageは整数。0を最初のページとする。負数なら最後のページから数えた値。
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    function cssF(key,q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
    function calcPagePx() {
        const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width'));
        const COL_GAP_EM = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-em'));
        const FONT_SIZE_PX = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size-px'));
        const COL_GAP_PX = FONT_SIZE_PX * COL_GAP_EM;
        const COL_RULE_WIDTH_PX = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-rule-width-px'));
        const COLUMNS = cssF('--columns');
        const [ALL_PAGE, NOW_PAGE] = calcPage();
        if (0 <= page) {
            const increment = NOW_PAGE - page;
            return (PAGE_PX + COL_GAP_PX + (COL_RULE_WIDTH_PX * (0<increment) ? 1 : -1) + ((0<increment) ? 0 : 1)) * page * COLUMNS;
        }
        else {
            const TARGET_PAGE = ALL_PAGE + page;
            const increment = TARGET_PAGE - NOW_PAGE;
            return (PAGE_PX + COL_GAP_PX + (COL_RULE_WIDTH_PX * (0<increment) ? 1 : -1) + ((0<increment) ? 0 : 1)) * (TARGET_PAGE * COLUMNS);
        }
    }
    const PAGE_PX = calcPagePx();
    console.log(`*********PAGE_PX:${PAGE_PX}`)
    const X_INC = (IS_VERTICAL) ? 0 : PAGE_PX;
    const Y_INC = (IS_VERTICAL) ? PAGE_PX : 0;
    window.scrollTo(X_INC, Y_INC);
}
function calcPage() {
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
//    const PAGE_PX = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue((IS_VERTICAL) ? 'height' : 'width'));
    function cssF(key,q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
    const COL_GAP_EM = cssF('--column-gap-em');
    const FONT_SIZE_PX = cssF('--font-size-px');
    const COL_GAP_PX = FONT_SIZE_PX * COL_GAP_EM;
//    const COL_RULE_WIDTH_PX = cssF('--column-rule-width-px');
//    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body')) + (COL_GAP_PX / 2);
//    const COLUMNS = cssF('--columns');
//    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body')) + ((COL_GAP_PX / 2)*COLUMNS);
//    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body'));
    const COLUMNS = cssF('--columns');
//    const PAGE_PX = ((cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body')) + (COL_GAP_PX / 2) ) * COLUMNS;
//    const PAGE_PX = ((cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body')) + (COL_GAP_PX / (COLUMNS+1)) ) * COLUMNS;
//    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body') * COLUMNS) + (COL_GAP_PX * (COLUMNS - 1)) ;
    const PAGE_PX = (cssF(((IS_VERTICAL) ? 'height' : 'width'), 'body') * COLUMNS) + (COL_GAP_PX * (COLUMNS - 1)) ;

    const ALL_PX = (IS_VERTICAL) ? document.body.scrollHeight : document.body.scrollWidth;
    const ALL_PAGE = ALL_PX / PAGE_PX;
    const pos = getWindowScrollPosition();
    const NOW_PX = (IS_VERTICAL) ? pos.y : pos.x;
    const NOW_PAGE = (0 === NOW_PX) ? 0 : ALL_PAGE * (NOW_PX / ALL_PX);
    console.log(`ALL_PAGE:${ALL_PAGE}, NOW_PAGE:${NOW_PAGE}`);
    console.log(`ALL_PX:${ALL_PX}, PAGE_PX:${PAGE_PX}, NOW_PX:${NOW_PX}`);
    console.log(`scrollWidth:${document.body.scrollWidth}`);
    console.log(`ALL_PAGE:${parseInt(Math.ceil(ALL_PAGE))}, NOW_PAGE:${parseInt(NOW_PAGE)}`)
//    return [parseInt(ALL_PAGE), parseInt(NOW_PAGE)];
    return [parseInt(Math.ceil(ALL_PAGE)), parseInt(NOW_PAGE)];
}
function getWindowScrollPosition() {
    return {
        x : typeof window.scrollX !== 'undefined' ? window.scrollX : (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft : document.body.scrollLeft),
        y : typeof window.scrollY !== 'undefined' ? window.scrollY : (typeof document.documentElement.scrollTop  !== "undefined" ? document.documentElement.scrollTop  : document.body.scrollTop)
    };
};

function initPaging() {
    // window -> document.body に変更することで dialog.showModal() 時にイベント発火抑制できるかと思ったが、できなかった。
    window.addEventListener('touchstart', (event) => {
        console.log('touchstart', event);
        const setting = document.querySelector('#setting');
        if (setting.open) { if(!event.target.closest('#setting > form[method="dialog"]')) {setting.close();} return; }
        runScreenAreaRole(event.touches[0].X, event.touches[0].Y);
    });
    window.addEventListener('click', (event) => {
        const setting = document.querySelector('#setting');
        if (setting.open) { if(!event.target.closest('#setting > form[method="dialog"]')) {setting.close();} return; }
        runScreenAreaRole(event.clientX, event.clientY);
    });
    window.addEventListener('mousemove', (event) => {
        if (document.querySelector('#setting').open) { return; }
        // body内に要素がない領域は反応しない！　末尾ページは下端までない箇所では反応しない！
        document.body.style.cursor = getCursorScreenAreaRole(event.clientX, event.clientY);
    });
    window.addEventListener("keydown", event => {
        if (document.querySelector('#setting').open) { return; }
        const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
        console.log(`keydown event.key:${event.key}, Shift:${event.shiftKey}`)
             if (event.key === 'ArrowUp') { event.preventDefault();  }   // menu(index,setting,tools)表示予定
        else if (event.key === 'ArrowDown') { // setting表示切替
            const dialog = document.querySelector('#setting');
            (dialog.open) ? dialog.close() : dialog.showModal();
            document.body.style.cursor = 'auto';
            event.preventDefault();
        }
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
        console.log(`keypress event.key:${event.key}`)
        if (document.querySelector('#setting').open) { if (event.key === 'Escape') {document.querySelector('#setting').close(); event.preventDefault();} return; }
        const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
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
        // 's' setting
        else if (event.key === 's') {
            const dialog = document.querySelector('#setting');
            (dialog.open) ? dialog.close() : dialog.showModal();
            document.body.style.cursor = 'auto';
        }
        else {}
    }, {passive: false});
}

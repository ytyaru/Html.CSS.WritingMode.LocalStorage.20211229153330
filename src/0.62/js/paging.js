function nextPage() { movePageRelative(1); }
function prevPage() { movePageRelative(-1); }
function firstPage() { movePageAbsolute(1); }
function lastPage() { movePageAbsolute(-1); }
function movePage(page) { movePageAbsolute(page); }
function movePageRelative(increment=1) { // incrementが正数なら進む。負数なら戻る。0なら何もしない。
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    function minmax(v, min, max) {
        if (v < min) { return min; }
        if (v > max) { return max; }
        return v;    
    }
    const NOW_PAGE = cssI('--page-index');
    const TARGET_PAGE = minmax(NOW_PAGE + increment, 1, cssI('--page-length'));
    const TARGET = document.querySelector(`p[page='${TARGET_PAGE}']`);
    console.log(`TARGET_PAGE:${TARGET_PAGE}`, TARGET, `--page-length:${cssI('--page-length')}`, `--page-index:${cssI('--page-index')}`, `increment:${increment}`);
    if (TARGET) {
        TARGET.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        document.querySelector(':root').style.setProperty('--page-index', TARGET_PAGE);
        setPageHeader(); // page-header.js
    }
}
function movePageAbsolute(page=1) { // pageは整数。1を最初のページとする。負数なら最後のページから数えた値。0なら目次表示？
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    function minmax(v, min, max) {
        if (v < min) { return min; }
        if (v > max) { return max; }
        return v;    
    }
    const NOW_PAGE = cssI('--page-index');
    const TARGET_PAGE = minmax(((0 <= page) ? page : cssI('--page-length') + page + 1), 1, cssI('--page-length'));
    const TARGET = document.querySelector(`p[page='${TARGET_PAGE}']`);
    console.log(TARGET_PAGE, TARGET, cssI('--page-length'));
    if (TARGET) {
        TARGET.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        document.querySelector(':root').style.setProperty('--page-index', TARGET_PAGE);
        setPageHeader(); // page-header.js
    }
}
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
            function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
            const page = window.prompt('何ページ目に移動しますか？', `${cssI('--page-index')}`)
            movePage(parseInt(page));
        }
        // 'h' here 現在ここは何ページ目かを表示する
        // 't' time 現在時刻。経過時刻。指定時間、指定時刻までの残り時間を表示する
        // 'i' index 作品名,目次,編,章,ページ数,著者名(著者他作品リンクへ)
        // 's' setting
        else if (event.key === 's') {
            const dialog = document.querySelector('#setting');
            (dialog.open) ? dialog.close() : dialog.showModal();
            document.body.style.cursor = 'auto';
        }
        else {}
    }, {passive: false});
}

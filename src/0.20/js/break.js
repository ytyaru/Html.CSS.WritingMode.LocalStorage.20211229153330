// 改ページ（改段組）位置を計算し、そこに改ページスタイルを仕込む。（ページをまたいで見切れてしまうのを防ぐ）
function resetBreak() {
    console.log('*************************');
    document.querySelector(':root').style.setProperty('--screen-avail-width', window.screen.availWidth);
    document.querySelector(':root').style.setProperty('--screen-avail-height', window.screen.availHeight);
//    document.querySelector(':root').style.setProperty('--client-width', document.body.clientWidth);
//    document.querySelector(':root').style.setProperty('--client-height', document.body.clientHeight);
    console.log(`${getComputedStyle(document.querySelector(':root')).getPropertyValue('--screen-avail-width')}`);
    console.log(`${getComputedStyle(document.querySelector(':root')).getPropertyValue('--screen-avail-height')}`);
//    document.querySelector('body').style.setProperty('width', document.body.clientWidth);
//    document.querySelector('body').style.setProperty('height', document.body.clientHeight);
//    document.querySelector('body').style.setProperty('column-width', document.body.clientWidth);
//getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-line-of-chars'))

//    if (document.querySelector('#columns').value < 2) { return; }
//    const writingMode = document.querySelector('body').style.getPropertyValue('writing-mode');
    const writingMode = document.querySelector('#writing-mode').value;
    console.log(`writingMode:${writingMode}`);
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    console.log(`IS_VERTICAL:${IS_VERTICAL}`);
    const COL_OF_PX = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth; // 1列の表示領域
    for (const p of document.querySelectorAll('p')) {
        if (p.style.getPropertyValue('break-after')) {p.style.removeProperty('break-after');}

        console.log(p.offsetTop, p.offsetLeft, p.offsetWidth, p.offsetHeight, p.innerHTML);
        const START = (IS_VERTICAL) ? p.offsetLeft : p.offsetTop;
        const LINE_OF_PX = (IS_VERTICAL) ? p.offsetWidth : p.offsetHeight; // 1段落の全行サイズ
        console.log(`START:${START}, LINE_OF_PX:${LINE_OF_PX}`);
        const SCREEN_LINE_OF_PX = (IS_VERTICAL) ? document.body.clientWidth: document.body.clientHeight; // 1画面の全行サイズ
        console.log(`${window.screen.availWidth}, ${window.screen.availHeight}, SCREEN_LINE_OF_PX:${SCREEN_LINE_OF_PX}`);
        if (SCREEN_LINE_OF_PX < LINE_OF_PX) { continue; } // p要素が画面サイズより大きければ対処不能として諦める
        const IS_BREAK = (IS_VERTICAL) ? (START <= LINE_OF_PX) : (document.body.clientHeight <= (START + LINE_OF_PX));
        if (IS_BREAK) {
// なぜかBREAK_ELEMENTがnullになってしまう
            const BREAK_ELEMENT = (IS_VERTICAL) ? p : p.previousElementSibling;
            console.log('------------------------------------', BREAK_ELEMENT, p)
            BREAK_ELEMENT.style.setProperty('break-after', 'column');

            
//            const BREAK_ELEMENT = (IS_VERTICAL) ? p : p.previousElementSibling;
//            console.log('------------------------------------', BREAK_ELEMENT, p, p.previousElementSibling)
//            if (IS_VERTICAL) { p.style.setProperty('break-after', 'column'); }
//            else { p.previousElementSibling.style.setProperty('break-after', 'column'); }
        }
//        p.visibility = true; // なぜか縦書きにすると文字がすべて消える！　visibilityしてもダメだった。
//        p.display = 'block';
    }
    // 再描画（break-after:columnを動的に仕込んでも反映されなかったので再描画する。再描画の方法はresize,fullscreenも試したが以下でしか実現できなかった。もっと明示的に再描画できればいいのだが、できるのかどうかも知らない）
    document.querySelector('body').style.display = (IS_VERTICAL) ? 'inline' : 'inline-block';
}


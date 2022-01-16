function setPageHeaderPosition() { // 柱（ページヘッダ）を左寄せ／右寄せする（縦書き：左、横書き：右）
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const PAGE_HEADER = document.querySelector('#page-header');
    if (IS_VERTICAL) {
        PAGE_HEADER.style.setProperty('text-align', 'start'); 
        PAGE_HEADER.style.setProperty('left', 0); 
        PAGE_HEADER.style.removeProperty('right'); 
    } else {
        PAGE_HEADER.style.setProperty('text-align', 'end'); 
        PAGE_HEADER.style.setProperty('right', 0); 
        PAGE_HEADER.style.removeProperty('left'); 
    }
}
function setPageHeader(isSearchPrev=false) { // 柱（ページヘッダ）に現在表示中の章名（h1のinnerHTML）をセットする
    console.log('setPageHeader:', isSearchPrev);
    let options = {
        root: document.querySelector('main:not([hidden])'),
        rootMargin: '0px',
        threshold: 1.0
    }
    function callback(entries, observer) {
        console.log('==================================');
        entries.forEach(entry => {
            document.querySelector('#page-header').setAttribute('heading', entry.target.innerHTML);
            console.log(`#page-header heading:${entry.target.innerHTML}`);
        });
    }
    let observer = new IntersectionObserver(callback, options);

    /*
    // 監視対象要素＝現在ページの先頭からみて最初にみつかったh1
        ここのアルゴリズムを実装して正しいTARGETを指定したい。
    */
    function getTarget() {
        function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
        const HEAD_P = document.querySelector(`p[page="${cssI('--page-index')}"]`);
        console.log('HEAD_P:', HEAD_P);
        console.log(HEAD_P.previousElementSibling);
        console.log(HEAD_P.previousElementSibling.tagName);

        // 現在ページ先頭p要素の直前にh1がある場合
        if ('h1' === HEAD_P.previousElementSibling.tagName.toLowerCase()) { return HEAD_P.previousElementSibling; }
        else {
            function searchH1(propName='nextElementSibling') {
                let element = HEAD_P[`${propName}`];
                while(element) {
                    if ('h1' === element.tagName.toLowerCase()) { return element; }
                    element = element[`${propName}`];
                }
            }
            return searchH1('previousElementSibling');
            /*
            // 現在ページ先頭p要素以前にh1がある場合（先頭から末尾へ移動した場合など）
            if (isSearchPrev) { return searchH1('previousElementSibling'); }
            // 現在ページ先頭p要素以降にh1がある場合（h1があるページから次のh1がないページへ移動した場合など）
            else { return searchH1('nextElementSibling'); }
            */
            /*
            // 現在ページ先頭p要素以降にh1がある場合（h1があるページから次のh1がないページへ移動した場合など）
            let element = HEAD_P.nextElementSibling;
            while(element) {
                if ('h1' === element.tagName.toLowerCase()) { return element; }
                element = element.nextElementSibling;
            }
            // 現在ページ先頭p要素以前にh1がある場合（先頭から末尾へ移動した場合など）
            element = HEAD_P.previousElementSibling;
            while(element) {
                if ('h1' === element.tagName.toLowerCase()) { return element; }
                element = element.previousElementSibling;
            }
            */
        }
    }
    const TARGET = getTarget();
    console.log(TARGET);
//    const TARGET = document.querySelector('h1');
//    const TARGET = document.querySelectorAll('h1');
    if (TARGET) { observer.observe(TARGET); }
//    return observer;
}
// https://sbfl.net/blog/2017/07/04/javascript-intersection-observer/
// https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API

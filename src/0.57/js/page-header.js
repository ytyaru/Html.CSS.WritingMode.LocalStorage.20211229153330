function setPageHeader() {
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
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    const HEAD_P = document.querySelector(`p[page="${cssI('--page-index')}"]`);
        ここのアルゴリズムを実装して正しいTARGETを指定したい。
    */

    const TARGET = document.querySelector('h1');
//    const TARGET = document.querySelectorAll('h1');
    observer.observe(TARGET);
    return observer;
}
// https://sbfl.net/blog/2017/07/04/javascript-intersection-observer/
// https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API

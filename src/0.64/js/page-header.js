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
function setPageHeader() { // 柱（ページヘッダ）に現在表示中の章名（h1のinnerHTML）をセットする
    function getTarget() { // 監視対象要素（現在ページの先頭からみて最初にみつかったh1）を返す
        function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
        const HEAD_P = document.querySelector(`p[page="${cssI('--page-index')}"]`);
        // 現在ページ先頭p要素の直前にh1がある場合
        if ('h1' === HEAD_P.previousElementSibling.tagName.toLowerCase()) { return HEAD_P.previousElementSibling; }
        else {
            function searchH1(propName='nextElementSibling') { // h1を探す（兄弟のうち兄方向nextまたは弟方向prev）
                let element = HEAD_P[`${propName}`];
                while(element) {
                    if ('h1' === element.tagName.toLowerCase()) { return element; }
                    element = element[`${propName}`];
                }
            }
            return searchH1('previousElementSibling'); // 1つ以上前の要素からh1を探して返す
        }
    }
    const TARGET = getTarget();
    document.querySelector('#page-header').setAttribute('heading', TARGET.innerHTML);
}


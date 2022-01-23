const _Paging = function() { // ページ計算。ページ移動。
    this._count = 1; // 全ページ数（旧--page-length）
    this._page = 1; // 現在ページ（旧--page-index）
}
Object.defineProperties(_Paging.prototype, {
    Count: { get: function() { return this._count; } },
    Page: {
        get: function() { return this._page; },
        set: function(v) { // 指定したページへ移動する。インクリメントやデクリメントで相対移動もしたいのだが、できるのか？
            // Page++   次のページへ
            // Page--   前のページへ
            // Page = -1  最後のページへ
            // Page = 1   最初のページへ
            // Page = 0   ？
            // Page = 最大値超過  最後のページへ（先頭からループはしない）
            console.log(`現在値:${this._page}, 新しい値:${v}`);
//            this._page = v;
            this.movePageAbsolute(v);
//            if (v < 0) {this.movePageRelative(v);}
//            else { this.movePageAbsolute(v); }
        }
    },
    ReadRate: { get: function() { return this._page / this._count; } }, // 読了率
    RemainingPages: { get: function() { return this._count - this._page; } }, // 残りページ数
});
_Paging.prototype.movePageRelative = function(increment=1) { // 正数:進む, 負数:戻る, 0:何もしない。
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    function minmax(v, min, max) {
        if (v < min) { return min; }
        if (v > max) { return max; }
        return v;    
    }
//    const NOW_PAGE = cssI('--page-index');
//    const TARGET_PAGE = minmax(NOW_PAGE + increment, 1, cssI('--page-length'));
    const TARGET_PAGE = minmax(this.Page + increment, 1, this.Count);
    const TARGET = document.querySelector(`p[page='${TARGET_PAGE}']`);
//    console.log(`TARGET_PAGE:${TARGET_PAGE}`, TARGET, `--page-length:${cssI('--page-length')}`, `--page-index:${cssI('--page-index')}`, `increment:${increment}`);
    console.log(`TARGET_PAGE:${TARGET_PAGE}`, TARGET, `Page/Count:${this.Page}/${this.Count}`, `increment:${increment}`);
    if (TARGET) {
        TARGET.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
//        document.querySelector(':root').style.setProperty('--page-index', TARGET_PAGE);
        this._page = TARGET_PAGE;
        this.setNowSectionHeading();
        this.setPageFooter(); 
//        document.getElementById('page-number').innerHTML = this.Page;
//        document.getElementById('remaining-pages').innerHTML = `あと ${this.RemainingPages}`;
//        document.getElementById('read-rate').innerHTML = `${Math.floor(this.ReadRate * 100)}%`;
//        setNowSectionHeading();
//        calcReadRate(); // remaining-pages.js
    }
}

_Paging.prototype.movePageAbsolute = function(page=1) { // 1:最初の頁。負数:最後のページから数えた値。0:目次表示？
    const self = _Paging;
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    function minmax(v, min, max) {
        if (v < min) { return min; }
        if (v > max) { return max; }
        return v;    
    }
//    const NOW_PAGE = cssI('--page-index');
//    const TARGET_PAGE = minmax(((0 <= page) ? page : cssI('--page-length') + page + 1), 1, cssI('--page-length'));
    const TARGET_PAGE = minmax(((0 <= page) ? page : this.Count + page + 1), 1, this.Count);
    const TARGET = document.querySelector(`p[page='${TARGET_PAGE}']`);
//    console.log(TARGET_PAGE, TARGET, cssI('--page-length'));
    console.log(TARGET_PAGE, TARGET, this.Count);
    if (TARGET) {
        TARGET.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
//        document.querySelector(':root').style.setProperty('--page-index', TARGET_PAGE);
        this._page = TARGET_PAGE;
        this.setNowSectionHeading();
        this.setPageFooter(); 
        /*
        document.getElementById('page-number').innerHTML = this.Page;
        document.getElementById('remaining-pages').innerHTML = `あと ${this.RemainingPages}`;
        document.getElementById('read-rate').innerHTML = `${Math.floor(this.ReadRate * 100)}%`;
        console.log('==============================',this, this.Page, this.RemainingPages, this.ReadRate)
        console.log('==============================',self, self.Page, self.RemainingPages, self.ReadRate)
        console.log('==============================',_Paging, _Paging.Page, _Paging.RemainingPages, _Paging.ReadRate)
        console.log('==============================',Paging, Paging.Page, Paging.RemainingPages, Paging.ReadRate)
//        setNowSectionHeading();
//        calcReadRate(); // remaining-pages.js
        */
    }
}
_Paging.prototype.break = function() { // 画面サイズに応じてページを区切る
    function css(key) { return getComputedStyle(document.querySelector(':root')).getPropertyValue(key); }
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    function cssF(key) { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    const IS_VERTICAL = ('vertical-rl' === document.getElementById('writing-mode').value);
//    const COL_COUNT= cssF('--column-count');
    const COL_COUNT= document.getElementById('column-count').value;
    let page = 1; // ページ数
    let page_pos = 0; // ページ座標
    let col_pos = COL_COUNT; // 段組位置

    // 現在位置保存（初回以降）
//    console.log(css('--page-index'));
//    console.log(cssI('--page-index'));
    console.log(`ページ再計算する前のページ状態：${this.Page}/${this.Count}`);
    let HEAD_P = document.querySelector(`p[page="${this.Page}"]`);
//    let HEAD_P = document.querySelector(`p[page="${cssI('--page-index')}"]`);
    console.log(HEAD_P);
    if(HEAD_P) { HEAD_P.setAttribute('class', 'break-page-head'); }

    // スクロールを先頭にする（さもなくばページ先頭が現在ページになってしまう）
    const MAIN = document.querySelector('main:not([hidden])');
    MAIN.scrollTop = 0;
    MAIN.scrollLeft = 0;
    for (const p of document.querySelectorAll('p')) {
        const RECT = p.getBoundingClientRect();
//        console.log('RECT:', RECT);
        const P_INLINE_START = RECT.left;
        const P_BLOCK_START = (IS_VERTICAL) ? RECT.top : RECT.left; 
        const P_PAGE_POS = P_BLOCK_START;
        p.removeAttribute('page');
        if (page_pos < P_PAGE_POS) { // 次のページの先頭要素
            col_pos++;
            page_pos = P_PAGE_POS;
            if (COL_COUNT < col_pos) {
    //            p.style.setProperty('break-before', 'all');
                p.setAttribute('page', `${page}`);
                col_pos = 1;
                page++;
                page_pos = P_PAGE_POS;
    //            console.log(`ページ追加:${page}, page_pos:${page_pos}`);
                console.log(`ページ:${page-1}`, RECT);
            }
        }
    }
    // 全ページ数セット
//    document.querySelector(':root').style.setProperty('--page-length', (page-1));
    this._count = (page-1);

    // 現在位置を戻す（初回以降）
    if (HEAD_P) {
        HEAD_P.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        // 現在ページ数セット
        HEAD_P = document.querySelector('p[class="break-page-head"]');
//        if (HEAD_P.hasAttribute('page')) { document.querySelector(':root').style.setProperty('--page-index', HEAD_P.getAttribute('page'));}
        if (HEAD_P.hasAttribute('page')) { this.Page = parseInt(HEAD_P.getAttribute('page'));}
        else {
            let index = 1;
            let element = HEAD_P.previousElementSibling;
            while (element) {
                if (element.hasAttribute('page')) {
//                    document.querySelector(':root').style.setProperty('--page-index', element.getAttribute('page'));
                    this.Page = parseInt(element.getAttribute('page'));
                    break;
                }
                element = element.previousElementSibling;
            }
        }
        HEAD_P.removeAttribute('class');
    }
    this.setPageFooter();
    console.log(`ページ再計算した後のページ状態：${this.Page}/${this.Count}`);
}

_Paging.prototype.setPageFooter = function(page=1) {
    document.getElementById('page-number').innerHTML = this.Page;
    document.getElementById('remaining-pages').innerHTML = `あと ${this.RemainingPages}`;
    document.getElementById('read-rate').innerHTML = `${Math.floor(this.ReadRate * 100)}%`;
    this.setNowSectionHeading();
}
_Paging.prototype.setNowSectionHeading = function() { // 柱（ページヘッダ）に現在表示中の章名（h1のinnerHTML）をセットする
    if (!document.getElementById('now-section-heading-visibility').checked) { return; }
    const self = Paging;
    function getTarget() { // 監視対象要素（現在ページの先頭からみて最初にみつかったh1）を返す
        function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
        const HEAD_P = document.querySelector(`p[page="${self.Page}"]`);
//        const HEAD_P = document.querySelector(`p[page="${this.Page}"]`);
//        console.log('==========================', this, this.Page, HEAD_P);
//        this = _Paging;
//        console.log('==========================', this, this.Page, HEAD_P);
//        console.log('==========================', _Paging, _Paging.Page, HEAD_P);
        console.log('==========================', self, self.Page, HEAD_P);
        if (!HEAD_P) { return; }
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
    console.log('==========================', TARGET);
    console.log('==========================', getComputedStyle(document.querySelector(':root')).getPropertyValue('--now-section-heading-visibility'));

    if (TARGET) {
//        document.querySelector('#now-section-heading').setAttribute('heading', TARGET.innerHTML);
        document.querySelector('#now-section-heading').innerHTML = TARGET.innerHTML;
    }
}
const Paging = new _Paging();

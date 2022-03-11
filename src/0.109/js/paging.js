const _Paging = function() { // ページ計算。ページ移動。
    this._count = 1; // 全ページ数（旧--page-length）
    this._page = 1; // 現在ページ（旧--page-index）
    this._query = 'p'; // ページ区切単位
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
//            console.debug(`現在値:${this._page}, 新しい値:${v}`);
            this.movePageAbsolute(v);
        }
    },
    ReadRate: { get: function() { return this._page / this._count; } }, // 読了率
    RemainingPages: { get: function() { return this._count - this._page; } }, // 残りページ数
});

_Paging.prototype.moveFileRelative = async function(isPrev=false) { // 前後ファイルをロードする
    console.debug('moveFileRelative', isPrev)
    const url = new URL(location.href);
    const nowFile = parseInt(url.searchParams.get('file'));
    console.debug(nowFile)
    const maxFile = 1000; // 最終ファイル値は別ファイルから取得する。とりあえず仮で。
    const diff = (isPrev) ? ((0 < nowFile) ? -1 : 0) : ((nowFile < maxFile) ? 1 : 0);
    console.debug(diff)
    if (0 === diff) { return; }
    const nextFile = nowFile + diff;
    //const bookUrl = `./book/${url.searchParams.get('book')}/${nextFile}.txt`
    //const bookUrl = `book-page.html?book=${url.searchParams.get('book')}&file=${nextFile}`
    const bookUrl = `book-page.html?book=${url.searchParams.get('book')}&file=${nextFile}&page=${(0 < diff) ? 1 : -1}`
    console.debug(bookUrl)
    location.href = location.origin + '/' + bookUrl;
    /*
    const book = await FileLoader.text(bookUrl);
    const content = NovelParser.parse(`${book}`);
    Html.Main.innerHTML = `${content}`;
    //Html.Main.innerHTML = `${content}\n${Html.Main.innerHTML}`;
    this.break();
    this._page = 1;
    this.setNowSectionHeading();
    this.setPageFooter(); 
    */
}
_Paging.prototype.moveNextFile = function() { this.moveFileRelative(); }
_Paging.prototype.movePrevFile = function() { this.moveFileRelative(true); }

_Paging.prototype.movePageRelative = function(increment=1) { // 正数:進む, 負数:戻る, 0:何もしない。
         if ((this.Page === this.Count) && (0 < increment)) { this.moveNextFile(); return; }
    else if ((this.Page === 1) && (increment < 0)) { this.movePrevFile(); return; }
    function minmax(v, min, max) {
        if (v < min) { return min; }
        if (v > max) { return max; }
        return v;    
    }
    const TARGET_PAGE = minmax(this.Page + increment, 1, this.Count);
    //const TARGET = document.querySelector(`p[page='${TARGET_PAGE}']`);
    const TARGET = document.querySelector(`${this._query}[page='${TARGET_PAGE}']`);
    console.debug(`TARGET_PAGE:${TARGET_PAGE}`, TARGET, `Page/Count:${this.Page}/${this.Count}`, `increment:${increment}`);
    if (TARGET) {
        TARGET.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        this._page = TARGET_PAGE;
        this.setNowSectionHeading();
        this.setPageFooter(); 
    }
}
_Paging.prototype.movePageAbsolute = function(page=1) { // 1:最初の頁。負数:最後のページから数えた値。0:目次表示？
    console.debug(this.Page, this.Count)
         if ((this.Page === this.Count) && (this.Count < page)) { this.moveNextFile(); return; }
    else if ((this.Page === 1) && (page === 0)) { this.movePrevFile(); return; }
    //else if ((this.Page === 1) && (page < 1)) { this.movePrevFile(); return; }
//         if (this.Count < page) { this.moveNextFile(); return; }
//    else if (page < 1) { this.movePrevFile(); return; }
    function minmax(v, min, max) {
        if (v < min) { return min; }
        if (v > max) { return max; }
        return v;    
    }
    //const TARGET_PAGE = minmax(((0 <= page) ? page : this.Count + page + 1), 1, this.Count);
    const TARGET_PAGE = (-1 === page) ? this.Count : minmax(((0 <= page) ? page : this.Count + page + 1), 1, this.Count);
    //const TARGET = document.querySelector(`p[page='${TARGET_PAGE}']`);
    const TARGET = document.querySelector(`${this._query}[page='${TARGET_PAGE}']`);
    console.debug(TARGET_PAGE, TARGET, this.Count);
    if (TARGET) {
        TARGET.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        this._page = TARGET_PAGE;
        this.setNowSectionHeading();
        this.setPageFooter(); 
    }
}
_Paging.prototype.break = function(query='p') { // 画面サイズに応じてページを区切る
    const IS_VERTICAL = ('vertical-rl' === document.getElementById('writing-mode').value);
    const COL_COUNT= document.getElementById('column-count').value;
    let page = 1; // ページ数
    let page_pos = 0; // ページ座標
    let col_pos = COL_COUNT; // 段組位置
    this._query = query;

    // 現在位置保存（初回以降）
    console.debug(`ページ再計算する前のページ状態：${this.Page}/${this.Count}`);
    //let HEAD_P = document.querySelector(`p[page="${this.Page}"]`);
    let HEAD_P = document.querySelector(`${query}[page="${this.Page}"]`);

    console.debug(HEAD_P);
    if(HEAD_P) { HEAD_P.setAttribute('class', 'break-page-head'); }

    // スクロールを先頭にする（さもなくばページ先頭が現在ページになってしまう）
    const MAIN = document.querySelector('main:not([hidden])');
    MAIN.scrollTop = 0;
    MAIN.scrollLeft = 0;

    // 既存のページ位置クリア
    //for (const p of document.querySelectorAll('p')) { p.removeAttribute('page'); }
    for (const e of document.querySelectorAll(query)) { e.removeAttribute('page'); }

    // 最初のページ位置セット
    //const first_p = document.querySelector('p');
    const first_p = document.querySelector(query);
    if (first_p) {
        first_p.setAttribute('page', `${page}`); // 最初のp
        console.log(first_p)
        console.log(first_p.getAttribute('page'))
        page++;
        const RECT = first_p.getBoundingClientRect(); // パフォーマンス改善のためoffsetTopとoffsetLeftに変更
        page_pos = (IS_VERTICAL) ? RECT.top : RECT.left
    }

    // 二ページ目以降の位置セット
    //for (const p of document.querySelectorAll('p')) {
    //for (const p of document.querySelectorAll('p:not(:first-child)')) {
    //for (const p of document.querySelectorAll('p:nth-child(n+2)')) {
    for (const p of document.querySelectorAll(`${query}:nth-child(n+2)`)) {
        const RECT = p.getBoundingClientRect(); // パフォーマンス改善のためoffsetTopとoffsetLeftに変更
//        console.debug('RECT:', RECT);
        const P_INLINE_START = RECT.left;
        //const P_INLINE_START = p.offsetLeft;
        const P_BLOCK_START = (IS_VERTICAL) ? RECT.top : RECT.left; 
        //const P_BLOCK_START = (IS_VERTICAL) ? p.offsetTop : p.offsetLeft; 
        //const P_BLOCK_START = (IS_VERTICAL) ? p.top : p.left; 
//        console.debug(`RECT.top:${RECT.top}, p.top:${p.top}, p.offsetTop:${p.offsetTop}, padding-top:${Css.Body.get('padding-top')}`);
//        console.debug(`RECT.left:${RECT.left}, p.left:${p.left}, p.offsetTop:${p.offsetLeft}`);
        const P_PAGE_POS = P_BLOCK_START;
//        p.removeAttribute('page');
        if (page_pos < P_PAGE_POS) { // 次のページの先頭要素
            col_pos++;
            page_pos = P_PAGE_POS;
            if (COL_COUNT < col_pos) {
    //            p.style.setProperty('break-before', 'all');
                p.setAttribute('page', `${page}`);
                col_pos = 1;
                page++;
                p
                age_pos = P_PAGE_POS;
                console.debug(`ページ:${page-1}`, P_BLOCK_START, p);
//                console.debug(`ページ:${page-1}`, RECT);
            }
        }
    }
    // 全ページ数セット
    this._count = (page-1);
    //console.debug(`最初のページp要素1：${document.querySelector('p[page="1"]')}`);
    console.debug('最初のページp要素1：', document.querySelector(`${query}[page="1"]`));

    // 現在位置を戻す（初回以降）
    if (HEAD_P) {
        HEAD_P.scrollIntoView({block: "start", inline: "start", behavior: "auto"}); // 遷移アニメbehavior: auto/smooth。
        // 現在ページ数セット
        //HEAD_P = document.querySelector('p[class="break-page-head"]');
        HEAD_P = document.querySelector(`${query}[class="break-page-head"]`);
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
    console.debug(`ページ再計算した後のページ状態：${this.Page}/${this.Count}`);
    console.debug(`最初のページp要素2：${document.querySelector('p[page="1"]')}`);
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
        //const HEAD_P = document.querySelector(`p[page="${self.Page}"]`);
        const HEAD_P = document.querySelector(`${self._query}[page="${self.Page}"]`);
        if (!HEAD_P) { return; }
        // 現在ページ先頭p要素の直前にh1がある場合
        if (!HEAD_P.previousElementSibling) { return; }
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
    if (TARGET) {
        Html.id('now-section-heading').innerHTML = TARGET.innerHTML;
    }
}
const Paging = new _Paging();

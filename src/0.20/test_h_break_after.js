window.addEventListener('DOMContentLoaded', (event) => {
    // 画面サイズに応じて改ページ（改段組み）するHTML要素を見つけ出してbreak-after: column;する。
    // 計算方法
    // 1. HTML要素を先頭から順に見てゆく
    // 2. 1を表示する幅（高さ）をCSSピクセル単位で取得する
    // 3. 2を次々に加算してゆく
    // 4. 3が画面サイズを超過したとき、直前の要素に対してbreak-after: column;する
    // 5. 3の値を0に戻し、現在のHTML要素から再び1を繰り返す。これを最後の要素まで繰り返す。

    const writingMode = document.querySelector('body').style.getPropertyValue('writing-mode');
    document.querySelector('body').style.setProperty('client-width', document.body.clientWidth);
    document.querySelector('body').style.setProperty('client-height', document.body.clientHeight);
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域



    for (const p of document.querySelectorAll('p')) {
        console.log(p.offsetTop, p.offsetLeft, p.offsetWidth, p.offsetHeight, p.innerHTML)
    }
});


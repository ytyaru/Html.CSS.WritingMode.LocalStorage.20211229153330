window.addEventListener('DOMContentLoaded', (event) => {
//window.addEventListener('load', (event) => {
    // 画面サイズに応じて改ページ（改段組み）するHTML要素を見つけ出してbreak-after: column;する。
    // 計算方法
    // 1. HTML要素を先頭から順に見てゆく
    // 2. 1を表示する幅（高さ）をCSSピクセル単位で取得する
    // 3. 2を次々に加算してゆく
    // 4. 3が画面サイズを超過したとき、直前の要素に対してbreak-after: column;する
    // 5. 3の値を0に戻し、現在のHTML要素から再び1を繰り返す。これを最後の要素まで繰り返す。

    document.querySelector('body').style.setProperty('writing-mode', 'vertical-rl'); // CSSにセットした状態だと以下コードで取得できないためここで強制的に縦書きプロパティをセットした
    const writingMode = document.querySelector('body').style.getPropertyValue('writing-mode');
//    const writingMode = getComputedStyle(document.querySelector(':root')).getPropertyValue('writing-mode');

    document.querySelector('body').style.setProperty('client-width', document.body.clientWidth);
    document.querySelector('body').style.setProperty('client-height', document.body.clientHeight);
    const COL_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // 1列の表示領域
    console.log(`writingMode:${writingMode}, COL_OF_PX:${COL_OF_PX}`);

    for (const p of document.querySelectorAll('p')) {
        // パラグラフごとに強制的に改ページ（改段組み）したが変化なし。再描画されないようだ。困る。動的に改ページ位置を指定できないではないか！
//        p.style.setProperty('break-after', 'column');
//        p.style.setProperty('break-after', 'always');
        console.log(p.offsetTop, p.offsetLeft, p.offsetWidth, p.offsetHeight, p.innerHTML)
        const START = ('vertical-rl' === writingMode) ? p.offsetLeft : p.offsetTop;
        const LINE_OF_PX = ('vertical-rl' === writingMode) ? p.offsetWidth : p.offsetHeight; // pの表示サイズ
        console.log(`START:${START}, LINE_OF_PX:${LINE_OF_PX}`);
        if (START <= LINE_OF_PX) {
            // この位置で改ページ（改段組み）すると見切れることがなくなるはず。なのに再描画されない……。
            p.style.setProperty('break-after', 'column');
            console.log('------------------------------------')
        }
    }
});


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

    const root = document.querySelector(':root');
//    root.style.setProperty('--client-width', document.body.clientWidth);
//    root.style.setProperty('--client-height', document.body.clientHeight);
    root.style.setProperty('--client-width', Math.min(window.screen.availWidth, document.body.clientWidth));
    root.style.setProperty('--client-height', Math.min(window.screen.availHeight, document.body.clientHeight));
    const COL_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // 1列の表示領域
    console.log(`writingMode:${writingMode}, COL_OF_PX:${COL_OF_PX}`);

//    root.style.setProperty('--column-width-px', Math.min(window.screen.availWidth, document.body.clientWidth));
//    root.style.setProperty('--column-width-px', 100000);
//    document.querySelector(':root').style.setProperty('column-width', 'auto');
    //document.querySelector(':root').style.setProperty('column-width', ('vertical-rl' === writingMode) ? window.screen.availHeight : window.screen.availWidth);
    console.log(`--column-width-px:${getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-width-px')}`);
    console.log(`body column-width:${document.querySelector('body').style.getPropertyValue('column-width')}`);
    console.log(`body column-width:${getComputedStyle(document.querySelector('body')).getPropertyValue('column-width')}`);

    // column-widthにピクセル単位の値をセットして縦書きにすると何も表示されなくなってしまう！
    // autoをセットすると成功する。バグか？
    document.querySelector('body').style.setProperty('column-width', 'auto');
//    document.querySelector('body').style.setProperty('column-width', '80vw');
//    document.querySelector('body').style.setProperty('column-width', '100vh');

    /*
    document.querySelector('body').style.setProperty('column-width', window.screen.availWidth);
    console.log(`body column-width:${document.querySelector('body').style.getPropertyValue('column-width')}`);
    console.log(`body column-width:${document.querySelector('body')}`);
    console.log(`body column-width:${document.querySelector('body').style}`);
    console.log(`body column-width:${document.querySelector('body').style.getPropertyValue('column-width')}`);
    console.log(`window.screen.availWidth:${window.screen.availWidth}`);
    */

    for (const p of document.querySelectorAll('p')) {
        // パラグラフごとに強制的に改ページ（改段組み）したが変化なし。再描画されないようだ。困る。動的に改ページ位置を指定できないではないか！
//        p.style.setProperty('break-after', 'column');
//        p.style.setProperty('break-after', 'always');
        console.log(p.offsetTop, p.offsetLeft, p.offsetWidth, p.offsetHeight, p.getBoundingClientRect(), p.innerHTML)
        let START = ('vertical-rl' === writingMode) ? p.offsetLeft : p.offsetTop;
        while (START < 0) {START += (window.screen.availWidth * 0.95);}
        const LINE_OF_PX = ('vertical-rl' === writingMode) ? p.offsetWidth : p.offsetHeight; // pの表示サイズ
        console.log(`START:${START}, LINE_OF_PX:${LINE_OF_PX}`);
        if (window.screen.availWidth < LINE_OF_PX) { continue; } // 1段落サイズが画面サイズを超過していたら諦める（見切れうる）
        if (START <= LINE_OF_PX) {
            // この位置で改ページ（改段組み）すると見切れることがなくなるはず。なのに再描画されない……。
            // F11で全画面ON/OFFすると再描画され、見切れることがなくなる。けれどこれを自動化することはできない。API仕様。ぐぬぬ！
            p.style.setProperty('break-after', 'column');
//            p.style.setProperty('break-after', 'always');
//            p.style.setProperty('break-before', 'always');
            console.log('------------------------------------')
        }
    }
    // ページ単位と段組単位で装飾を分けたいのにできない。
//    document.querySelector('body').style.setProperty('column-rule', '8px solid black');
//    document.querySelector('main').style.setProperty('column-rule', '1px solid black');

    // 再描画イベント発火用処理（ムリヤリ）
//    window.dispatchEvent(new Event('resize'));
//    window.document.dispatchEvent(new Event('resize'));
//    document.querySelector('body').style.display = 'none';
//    document.querySelector('body').style.display = 'block';
    document.querySelector('body').style.display = 'inline';
});


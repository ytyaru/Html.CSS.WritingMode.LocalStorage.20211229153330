window.addEventListener('DOMContentLoaded', async(event) => {
    Debug.on();
    defineConst('Html', defineHtml());
    defineConst('Css', defineCss());
    defineConst('Screen', defineScreen());
    initFullScreen();
    initWritingMode();
    initColorScheme();
    initColumns();
    initLineOfChars();
    initLineHeight();
    initLetterSpacing();
    initMargin();
    initSettingSubInfo();
    setPageHeaderPosition();
    setPosPageFooter();
    initClock();
    const parser = new Parser();
    defineConst('NovelParser', parser);
    const book = await FileLoader.text('./book/index.book');
    const content = parser.parse(`${book}`);
    Html.Main.innerHTML = `${content}\n${Html.Main.innerHTML}`;
    window.addEventListener('load', (event) => {
        console.debug("load");

        // なぜかクリックせずキー入力を最初にするとページが真っ白になる！ content-visibilityがautoだとそうなるが、visibleだとOK。
        document.querySelector(':root').style.setProperty('--content-visibility', 'visible'); 
        //document.querySelector(':root').style.setProperty('--content-visibility', 'auto');

        // UIとイベントをすべて作成し終えたら最後に一度だけ重い処理を実行する（フォントサイズとページの計算）
        setFontSizePixel();
        Paging.break();
    });
    window.addEventListener('beforeunload', (event) => {
        console.debug("beforeunload");
        saveFullScreen();
        saveColumns();
        saveWritingMode();
        saveLineOfChars();
        saveLineHeight();
        saveSettingSubInfo();
        saveMargin();
        saveLetterSpacing();
        removeClock();
    });
    window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
        console.debug("orientationchange");
        setMaxColumns(); // columns.js
        setMaxLineOfChars(); // resize.js
        setFontSizePixel(); // resize.js
        Paging.break();
    });
    window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
        console.debug("resize");
        setMaxColumns(); // columns.js
        setMaxLineOfChars(); // resize.js
        setFontSizePixel(); // resize.js
        Paging.break();
    });
    // OSのダークモード変更に合わせる
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        console.debug('=============================');
        setColorScheme((event.matches) ? 'dark' : 'light')
    });
    window.addEventListener('touchstart', (event) => { // タッチ
        console.debug('touchstart', event);
        const setting = document.querySelector('#setting');
        if (setting.open) { if(!event.target.closest('#setting > form[method="dialog"]')) {setting.close();} return; }
        Screen.on(event.touches[0].X, event.touches[0].Y);
    });
    window.addEventListener('click', (event) => { // マウス（クリック）
        const setting = document.querySelector('#setting');
        if (setting.open) { if(!event.target.closest('#setting > form[method="dialog"]')) {setting.close();} return; }
        Screen.on(event.clientX, event.clientY);
    });
    window.addEventListener('mousemove', (event) => { // マウス（移動）
        if (document.querySelector('#setting').open) { return; }
        // body内に要素がない領域は反応しない！　末尾ページは下端までない箇所では反応しない！
        document.body.style.cursor = Screen.cursor(event.clientX, event.clientY);
    });
    window.addEventListener("keydown", event => { // キーボード
        if (event.repeat) { return; } // 押しっぱなしによる連続入力の禁止
        if (document.querySelector('#setting').open) { return; }
        const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
        console.debug(`keydown event.key:${event.key}, Shift:${event.shiftKey}`)
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
    window.addEventListener("keypress", event => { // キーボード
        console.debug(`keypress event.key:${event.key}`)
        if (document.querySelector('#setting').open) { if (event.key === 'Escape') {document.querySelector('#setting').close(); event.preventDefault();} return; }
        const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
        if (event.key === 'n') {Paging.Page++;}
        else if (event.key === 'p') {Paging.Page--;}
        else if (event.key === 'f') {Paging.Page=1;}
        else if (event.key === 'l') {Paging.Page=-1;}

        // 'u' undo 前の移動を取り消す
        // 'm' move 移動するページを絶対値で指定する
        else if (event.key === 'm') {
            const page = window.prompt('何ページ目に移動しますか？', `${Paging.Page}`);
            Paging.Page = parseInt(page);
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
        else if (event.key === 'S') { // 余白（補足情報）の表示／非表示切替
            const SUB = document.querySelector('#sub-info-disabled');
            SUB.checked = !SUB.checked;
            SUB.dispatchEvent(new Event('change'));
        }
        else if (event.key === 'c') {
            const COLOR_SCHEME = document.getElementById('color-scheme');
            setColorScheme(COLOR_SCHEME.value);
        }
        else if (event.key === 'F') {
            setFullScreen(!(document.fullscreenElement));
        }
        else if (event.key === 'w') {
            document.getElementById('writing-mode').dispatchEvent(new Event('click'));
        }
        else {}
    }, {passive: false});

});


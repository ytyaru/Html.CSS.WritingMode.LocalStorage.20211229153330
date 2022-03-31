// https://developer.mozilla.org/ja/docs/Web/API/Pointer_events
window.addEventListener("pointerdown", (event) => { // ポインタ（マウス、ペン、タッチ）のボタン押下
    console.log(event);
    switch (event.button) {
        case 0: console.log('左 クリック！'); break;
        case 1: console.log('中 クリック！'); break;
        case 2: console.log('右 クリック！'); break;
        case 3: console.log('X1 クリック！'); break;
        case 4: console.log('X2 クリック！'); break;
        case 5: console.log('ペンの消しゴム クリック！'); break;
    }
    if (event.deltaY < 0) { console.log('ホイール上'); }
    if (event.deltaY < 0) { console.log('ホイール上'); }
    if (0 < event.deltaY) { console.log('ホイール下'); }
    if (0 < event.deltaX) { console.log('チルト右'); }
    if (event.deltaX < 0) { console.log('チルト左'); }
    /*
    */
});


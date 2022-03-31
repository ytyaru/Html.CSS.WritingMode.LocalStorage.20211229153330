window.addEventListener("wheel", (event) => { // ホイール、チルト
    console.log(event);
    if (event.deltaY < 0) { console.log('ホイール上'); }
    if (0 < event.deltaY) { console.log('ホイール下'); }
    if (0 < event.deltaX) { console.log('チルト右'); }
    if (event.deltaX < 0) { console.log('チルト左'); }
    /*
    */
});


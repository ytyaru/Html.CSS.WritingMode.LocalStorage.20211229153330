window.addEventListener("click", function(e) { // マウスのクリック（左）
    console.log(e);
    console.log('マウス左クリック');
});
window.addEventListener("contextmenu", function(e) { // マウスのクリック（右）
    console.log(e);
    //preventDefault();
    console.log('マウス右クリック');
});
window.addEventListener("auxclick", function(e) { // マウスのクリック（中央（ホイール押し込み））
    console.log(e);
    console.log('マウス中央ボタンのクリック');
});


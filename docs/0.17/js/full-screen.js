function saveFullScreen() {
    localStorage.setItem('FullScreen', document.querySelector('#full-screen').value);
}
function setFullScreen(value) {
    const fullScreen = document.querySelector('#full-screen');
    if ('0' === value) {
        window.document.exitFullscreen.call(window.document);
        fullScreen.innerHTML = '―'; 
        fullScreen.value = '0'; 
    } else {
        window.document.documentElement.requestFullscreen.call(window.document.documentElement);
        fullScreen.innerHTML = '全'; 
        fullScreen.value = '1'; 
    }
    // CSS変数は不要かも？
    document.querySelector(':root').style.setProperty('--is-full-screen', `${fullScreen.value}`);
}
function initFullScreen() { // UI操作で全画面ON/OFF切替
    /*
    // フルスクリーン化はユーザ操作が必要。自動化しようとするとエラーになり動作しない
    // https://teratail.com/questions/339734
    const init_value = localStorage.getItem('full-screen') || '0'; // 0, 1
    setFullScreen(init_value); // Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
    // 将来マニフェストで対応するかもしれないため永続化コードのコメントアウトは残しておく。
    */
    const fullScreen = document.querySelector('#full-screen');
    fullScreen.addEventListener('click', e => {
        const v = document.querySelector('#full-screen').value;
        setFullScreen(('0' === v) ? '1' : '0');
    });
}


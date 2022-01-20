function saveFullScreen() {
    localStorage.setItem('full-screen', document.querySelector('#full-screen').value);
}
function setFullScreen(value) {
    /*
    const fullScreen = document.querySelector('#full-screen');
    function getIconUrl(TYPE, DIR) { return `${BASE_URL }/assets/images/cursors/${COLOR_SCHEME}/${TYPE}-${DIR}-16x16.png`; }
    const MODE_NAME = ('0' === value) ? 'windowed' : 'full-screen' ;
    const URL = getAssetsUrl(`images/icons/${MODE_NAME}.svg`);
    document.querySelector('#full-screen > img').setAttribute('src', `${URL}`);
    if ('0' === value) {
        window.document.exitFullscreen.call(window.document);
        fullScreen.value = '0'; 
    } else {
        window.document.documentElement.requestFullscreen.call(window.document.documentElement);
        fullScreen.value = '1'; 
    }
    */
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
    /*
    */
    // CSS変数は不要かも？
    document.querySelector(':root').style.setProperty('--is-full-screen', `${fullScreen.value}`);
}
function initFullScreen() { // UI操作で全画面ON/OFF切替
    const fullScreen = document.querySelector('#full-screen');
    // 現在のスクリーン状態に応じてボタンをセットする
    if (window.fullscreen) {
        fullScreen.innerHTML = '―'; 
        fullScreen.value = '0'; 
    } else {
        fullScreen.innerHTML = '全'; 
        fullScreen.value = '1'; 
    }
    /*
    // 現在のスクリーン状態に応じてアイコンをセットする
    const MODE_NAME = (window.fullscreen) ? 'windowed' : 'full-screen' ;
    const URL = getAssetsUrl(`images/icons/${MODE_NAME}.svg`);
    document.querySelector('#full-screen > img').setAttribute('src', `${URL}`);
    */
    /*
    // フルスクリーン化はユーザ操作が必要。自動化しようとするとエラーになり動作しない
    // https://teratail.com/questions/339734
    const init_value = localStorage.getItem('full-screen') || '0'; // 0, 1
    setFullScreen(init_value); // Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
    // 将来マニフェストで対応するかもしれないため永続化コードのコメントアウトは残しておく。
    */
    fullScreen.addEventListener('click', e => {
        const v = document.querySelector('#full-screen').value;
        setFullScreen(('0' === v) ? '1' : '0');
    });

    document.addEventListener('fullscreenchange', (event) => {
        console.log(document.fullscreenElement);
        if (document.fullscreenElement) {
            console.log(`Element: ${window.fullscreenElement.id} entered full-screen mode.`);
        } else {
            console.log('Leaving full-screen mode.');
        }
    });
    document.addEventListener('webkitfullscreenchange', (event) => {
        console.log(document.fullscreenElement);
        if (document.fullscreenElement) {
            console.log(`Element: ${window.fullscreenElement.id} entered full-screen mode.`);
        } else {
            console.log('Leaving full-screen mode.');
        }
    });
}


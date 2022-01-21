function saveFullScreen() {
    localStorage.setItem('full-screen', document.querySelector('#full-screen').value);
}
/*
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
    document.querySelector('#full-screen > img').src = (window.fullscreen) ? getAssetsUrl('images/icons/windowed.svg') : getAssetsUrl('images/icons/full-screen.svg');
}
*/
function setFullScreen(is, notDo=false) { // 真ならfull-screen、偽ならwindowed。それぞれの状態のときの値をセットする。
    const fullScreen = document.querySelector('#full-screen');
    if (!notDo) {
        if (is) { window.document.documentElement.requestFullscreen.call(window.document.documentElement); }
        else { window.document.exitFullscreen.call(window.document); }
    }
    fullScreen.value = (is) ? '1' : '0';
    //fullScreen.innerHTML = (is) ? '全' : '―'; 
    document.querySelector(':root').style.setProperty('--is-full-screen', `${fullScreen.value}`);
    console.log(document.querySelector('#full-screen'));
    console.log(document.querySelector('#full-screen > img'));

    const MODE_NAME = (is) ? 'windowed' : 'full-screen' ;
    const URL = getAssetsUrl(`images/icons/${MODE_NAME}.svg`);
    document.querySelector('#full-screen > img').setAttribute('src', `${URL}`);
    console.log(fullScreen.value);
    console.log(is);
    console.log(URL);

//    document.querySelector('#full-screen > img').setAttribute('src', `${(is) ? getAssetsUrl('images/icons/windowed.svg') : getAssetsUrl('images/icons/full-screen.svg')}`);
//    console.log(document.querySelector('#full-screen > img').getAttribute('src'));
    // なぜかダイアログの背景が透過してしまう。クリックしても反応しない。z-index:99999で手前に表示してもダメ。仕方ないので閉じる。
    document.querySelector('#setting').close();
}
function initFullScreen() { // UI操作で全画面ON/OFF切替
    const fullScreen = document.querySelector('#full-screen');
    /*
    if (window.fullscreen) {
        fullScreen.innerHTML = '―'; 
        fullScreen.value = '0'; 
    } else {
        fullScreen.innerHTML = '全'; 
        fullScreen.value = '1'; 
    }
    */
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
//        setFullScreen(('0' === v) ? '1' : '0');
        setFullScreen(!('1' === v));
    });
    // 現在のスクリーン状態に応じてボタンをセットする
    setFullScreen((window.fullscreen), true);

    // イベントフックしたかったが動作しない。そのせいでブラウザのF11キーでフルスクリーンにしたタイミングでそれをキャッチできずバグる
    document.addEventListener('fullscreenchange', (event) => {
        console.log(document.fullscreenElement);
        if (document.fullscreenElement) {
            console.log('フルスクリーン要素', window.fullscreenElement);
//            console.log(`Element: ${window.fullscreenElement.id} entered full-screen mode.`);
            setFullScreen(true, true);
        } else {
            console.log('Leaving full-screen mode.');
            setFullScreen(false, true);
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


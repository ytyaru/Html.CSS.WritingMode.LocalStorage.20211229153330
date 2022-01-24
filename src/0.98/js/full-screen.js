function saveFullScreen() {
    localStorage.setItem('full-screen', document.querySelector('#full-screen').value);
}
function setFullScreen(is, notDo=false) { // 真ならfull-screen、偽ならwindowed。それぞれの状態のときの値をセットする。
    const fullScreen = document.querySelector('#full-screen');
    if (!notDo) {
        if (is) { window.document.documentElement.requestFullscreen.call(window.document.documentElement); }
        else { window.document.exitFullscreen.call(window.document); }
    }
    fullScreen.value = (is) ? '1' : '0';
    //fullScreen.innerHTML = (is) ? '全' : '―'; // <img>タグまで削除されてしまいバグる
    document.querySelector(':root').style.setProperty('--is-full-screen', `${fullScreen.value}`);
    console.log(document.querySelector('#full-screen'));
    console.log(document.querySelector('#full-screen > img'));

    const MODE_NAME = (is) ? 'windowed' : 'full-screen' ;
    const URL = getAssetsUrl(`images/icons/${MODE_NAME}.svg`);
    const IMG = document.querySelector('#full-screen > img');
    IMG.setAttribute('src', `${URL}`);
    IMG.setAttribute('alt', `${(is) ? '全' : '―'}`);
    console.log(fullScreen.value);
    console.log(is);
    console.log(URL);

    // なぜかダイアログの背景が透過してしまう。クリックしても反応しない。z-index:99999で手前に表示してもダメ。仕方ないので閉じる。
    document.querySelector('#setting').close();
}
function initFullScreen() { // UI操作で全画面ON/OFF切替
    const fullScreen = document.querySelector('#full-screen');
    fullScreen.addEventListener('click', e => {
        const v = document.querySelector('#full-screen').value;
        setFullScreen(!('1' === v));
    });
    // 現在のスクリーン状態に応じてボタンをセットする
    // フルスクリーン化はユーザ操作が必要。自動化しようとするとエラーになり動作しない。なので第二引数でそれだけ回避した。
    // https://teratail.com/questions/339734
    setFullScreen((window.fullscreen), true);

    // ブラウザのF11キーでフルスクリーンにしたイベントはキャッチできずバグる！
    document.addEventListener('fullscreenchange', (event) => {
        console.log(document.fullscreenElement);
        if (document.fullscreenElement) {
            console.log('フルスクリーン要素', window.fullscreenElement);
            setFullScreen(true, true);
        } else {
            console.log('Leaving full-screen mode.');
            setFullScreen(false, true);
        }
    });
}


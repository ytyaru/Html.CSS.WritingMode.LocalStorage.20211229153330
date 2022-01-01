function saveFullScreen() {
    const writingMode = document.querySelector('#FullScreen');
    localStorage.setItem('FullScreen', document.querySelector('#FullScreen').value);
}
function setFullScreen(value) {
    const fullScreen = document.querySelector('#FullScreen');
    if ('0' === value) {
        window.document.exitFullscreen.call(window.document);
        fullScreen.innerHTML = '―'; 
        fullScreen.value = '0'; 
    } else {
        window.document.documentElement.requestFullscreen.call(window.document.documentElement);
        fullScreen.innerHTML = '全'; 
        fullScreen.value = '1'; 
    }
}
function initFullScreen() { // UI操作で全画面ON/OFF切替
    const init_value = localStorage.getItem('FullScreen') || '0'; /* 0, 1 */
    // フルスクリーン化はユーザ操作が必要。自動化しようとするとエラーになり動作しない
    // https://teratail.com/questions/339734
    setFullScreen(init_value); // Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
    const fullScreen = document.querySelector('#FullScreen');
    fullScreen.addEventListener('click', e => {
        const v = document.querySelector('#FullScreen').value
        setFullScreen(('0' === v) ? '1' : '0');
    });
}


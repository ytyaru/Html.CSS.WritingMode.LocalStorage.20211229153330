function setColorScheme(value) {
    const IS_LIGHT = ('light' === value);
    const COLOR_SCHEME = document.getElementById('color-scheme');
    const FC = (IS_LIGHT) ? 'black' : 'white';
    const BC = (IS_LIGHT) ? 'white' : 'black';
    Css.Root.set('--color-scheme', (IS_LIGHT) ? 'light' : 'dark');
    Css.Root.set('--background-color', BC);
    Css.Root.set('--color', FC);
    Css.Root.set('--a-color', (IS_LIGHT) ? 'blue' : 'yellow');
    Css.Root.set('--sub-font-color', (IS_LIGHT) ? '#666666' : '#CCCCCC');
    Css.Root.set('--svg-invert', (IS_LIGHT) ? '0' : '1');
    Css.Root.set('--selected-background-color', (IS_LIGHT) ? 'lightcyan' : '#665500');
    Css.Root.set('--selected-color', FC);
    Css.Root.set('--disabled-color', (IS_LIGHT) ? '#AAAAAA' : '#AAAAAA');
    COLOR_SCHEME.value = (IS_LIGHT) ? 'dark' : 'light';
    COLOR_SCHEME.innerText = (IS_LIGHT) ? '🌙' : '☀';
    // 補足情報の色切替
    Css.Root.set('--sub-info-transition-duration', '2s');
    for (const INPUT of getSettingSubInfoElements()) { setSettingSubInfoColor(INPUT); }
    // アニメーションON
    setSettingSubInfoAnimation(true);
}
function initColorScheme() {
    document.getElementById('color-scheme').addEventListener("click", function (e) { // ボタン押下時に変更する
        setColorScheme(e.target.value);
    });
}

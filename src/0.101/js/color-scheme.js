function setColorScheme(value) {
    console.log(value)
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
    COLOR_SCHEME.value = (IS_LIGHT) ? 'light' : 'dark';
    COLOR_SCHEME.innerText = (IS_LIGHT) ? 'ð' : 'â';
//    COLOR_SCHEME.value = (IS_LIGHT) ? 'dark' : 'light';
//    COLOR_SCHEME.innerText = (IS_LIGHT) ? 'ð' : 'â';
    // è£è¶³æå ±ã®è²åæ¿
    Css.Root.set('--sub-info-transition-duration', '2s');
    for (const INPUT of getSettingSubInfoElements()) { setSettingSubInfoColor(INPUT); }
    // ã¢ãã¡ã¼ã·ã§ã³ON
    setSettingSubInfoAnimation(true);
}
function initColorScheme() {
    document.getElementById('color-scheme').addEventListener("click", function (e) { // ãã¿ã³æ¼ä¸æã«å¤æ´ãã
        console.log(e.target.value)
        //setColorScheme(e.target.value);
        setColorScheme(('light' === e.target.value) ? 'dark' : 'light' );
    });
}

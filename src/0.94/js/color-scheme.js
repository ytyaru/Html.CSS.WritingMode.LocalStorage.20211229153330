function setColorScheme(value) {
    console.log('===========', value);
    function css(key) { return getComputedStyle(document.querySelector(':root')).getPropertyValue(key); }
    const STYLE = document.querySelector(':root').style;
    const IS_LIGHT = ('light' === value);
    const COLOR_SCHEME = document.getElementById('color-scheme');
//    if (value === COLOR_SCHEME.value) { return; }

    const FC = (IS_LIGHT) ? 'black' : 'white';
    const BC = (IS_LIGHT) ? 'white' : 'black';

    STYLE.setProperty('--color-scheme', (IS_LIGHT) ? 'light' : 'dark');
//    STYLE.setProperty('--background-color', (IS_LIGHT) ? 'black' : 'white');
    STYLE.setProperty('--background-color', BC);
//    STYLE.setProperty('--color', (IS_LIGHT) ? 'white' : 'black');
    STYLE.setProperty('--color', FC);
    STYLE.setProperty('--a-color', (IS_LIGHT) ? 'blue' : 'yellow');
    STYLE.setProperty('--sub-font-color', (IS_LIGHT) ? '#666666' : '#CCCCCC');
    STYLE.setProperty('--svg-invert', (IS_LIGHT) ? '0' : '1');
//    STYLE.setProperty('--svg-invert', (IS_LIGHT) ? '1' : '0');
    STYLE.setProperty('--selected-background-color', (IS_LIGHT) ? 'lightcyan' : '#665500'); // saddlebrown
    STYLE.setProperty('--selected-color', FC);
    STYLE.setProperty('--disabled-color', (IS_LIGHT) ? '#AAAAAA' : '#AAAAAA');

    console.log(css('--svg-invert'));
    console.log(css('--background-color'));
    console.log(css('--sub-info-transition-duration'));

    COLOR_SCHEME.value = (IS_LIGHT) ? 'dark' : 'light';
    COLOR_SCHEME.innerText = (IS_LIGHT) ? '🌙' : '☀';

    // 補足情報の色切替
    Css.Root.set('--sub-info-transition-duration', '2s');
    for (const INPUT of getSettingSubInfoElements()) { setSettingSubInfoColor(INPUT); }

    // アニメーションON
    //Css.Root.set('--sub-info-transition-duration', '2s');
    setSettingSubInfoAnimation(true);

    /*
    if ('light' === value) {
        STYLE.setProperty('--color-scheme', 'dark')
        STYLE.setProperty('--background-color', 'black')
        STYLE.setProperty('--color', 'white')
        STYLE.setProperty('--a-color', 'yellow')
        STYLE.setProperty('--sub-font-color', '#CCCCCC')
        e.target.value = 'dark';
        e.target.innerText = '🌙';
    } else {
        STYLE.setProperty('--color-scheme', 'light')
        STYLE.setProperty('--before-background-color', css('--background-color'))
        STYLE.setProperty('--background-color', 'white')
        STYLE.setProperty('--after-background-color', css('--background-color'))
        STYLE.setProperty('--color', 'black')
        STYLE.setProperty('--a-color', 'blue')
        STYLE.setProperty('--sub-font-color', '#666666')
        e.target.value = 'light';
        e.target.innerText = '☀';
    }
    */
}
function initColorScheme() {
    document.getElementById('color-scheme').addEventListener("click", function (e) { // ボタン押下時に変更する
        setColorScheme(e.target.value);
        /*
        //window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(new Event('change'));
        //console.log(`明暗ボタン押下:${e.target.value}`);
        const STYLE = document.querySelector(':root').style;
        function css(key) { return getComputedStyle(document.querySelector(':root')).getPropertyValue(key); }
        if ('light' === e.target.value) {
            STYLE.setProperty('--color-scheme', 'dark')
            STYLE.setProperty('--background-color', 'black')
            STYLE.setProperty('--color', 'white')
            STYLE.setProperty('--a-color', 'yellow')
            STYLE.setProperty('--sub-font-color', '#CCCCCC')
            e.target.value = 'dark';
            e.target.innerText = '🌙';
        } else {
            STYLE.setProperty('--color-scheme', 'light')
            STYLE.setProperty('--before-background-color', css('--background-color'))
            STYLE.setProperty('--background-color', 'white')
            STYLE.setProperty('--after-background-color', css('--background-color'))
            STYLE.setProperty('--color', 'black')
            STYLE.setProperty('--a-color', 'blue')
            STYLE.setProperty('--sub-font-color', '#666666')
            e.target.value = 'light';
            e.target.innerText = '☀';
        }
        STYLE.setProperty('--svg-invert', ('light' === e.target.value) ? '0' : '1');
        */
    });
}

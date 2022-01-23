function setColorScheme(value) {
    function css(key) { return getComputedStyle(document.querySelector(':root')).getPropertyValue(key); }
    const STYLE = document.querySelector(':root').style;
    const IS_LIGHT = ('light' === value);
    STYLE.setProperty('--color-scheme', (IS_LIGHT) ? 'dark' : 'light');
    STYLE.setProperty('--background-color', (IS_LIGHT) ? 'black' : 'white');
    STYLE.setProperty('--color', (IS_LIGHT) ? 'white' : 'black');
    STYLE.setProperty('--a-color', (IS_LIGHT) ? 'yellow' : 'blue');
    STYLE.setProperty('--sub-font-color', (IS_LIGHT) ? '#CCCCCC' : '#666666');
    STYLE.setProperty('--svg-invert', (IS_LIGHT) ? '1' : '0');

    console.log(css('--svg-invert'));
    console.log(css('--background-color'));

    const COLOR_SCHEME = document.getElementById('color-scheme');
    COLOR_SCHEME.value = (IS_LIGHT) ? 'dark' : 'light';
    COLOR_SCHEME.innerText = (IS_LIGHT) ? '🌙' : '☀';
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

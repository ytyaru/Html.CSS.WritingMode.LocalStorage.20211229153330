function initColorScheme() {
    document.getElementById('color-scheme').addEventListener("click", function (e) { // ボタン押下時に変更する
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
    });
}

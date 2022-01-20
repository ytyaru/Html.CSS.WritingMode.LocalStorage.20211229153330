function calcReadRate() { // 残りページ数の計算（CSSのcontentプロパティには少数値を計算してセットできなかった。0.64.md参照）
    function cssI(key) { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue(key)); }
    const remainingRages = parseInt((cssI('--page-index') / cssI('--page-length')) * 100); // 小数点以下切り捨て
    document.querySelector(':root').style.setProperty('--read-rate', remainingRages);
    document.getElementById('read-rate').innerHTML = `${remainingRages}%`;
}

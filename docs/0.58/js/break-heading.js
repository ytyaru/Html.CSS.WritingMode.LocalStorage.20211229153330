function breakHeading() { // 先頭でない全h1のstyle属性値にbreak-before:column;を追加する。なぜかCSSでやっても効果がなかったため。
    /*
    for (const h1 of document.querySelectorAll('h1:not(:first-child)')) {
        h1.style.setProperty('break-before', 'column');
    }
    */
}

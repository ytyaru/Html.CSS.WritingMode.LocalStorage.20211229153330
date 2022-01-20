function initCursor() {
//    function cssF(key, e) { return parseFloat(getComputedStyle(e).getPropertyValue(key)); }
    function cssF(key, q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }
//    const CURSOR = document.getElementById('cursor')
    const width = cssF('width', '#cursor');
    const height = cssF('height', '#cursor');
    window.addEventListener('mousemove', (e) => {
//        const X = e.clientX - (width / 2);
        const X = Math.floor(e.clientX - (width / 2));
        const Y = Math.floor(e.clientY - (height / 2));
//        const W = cssF('width', 'body');
//        const H = cssF('height', 'body');
        const W = document.body.clientWidth;
        const H = document.documentElement.clientHeight;
//        console.log(X,Y,W,H)
        if (X < 0) { return; }
        if (H < (e.clientY + (height / 2) + 1)) { return; }
        document.querySelector(':root').style.setProperty('--cursor-x', e.clientX - (width / 2));
        document.querySelector(':root').style.setProperty('--cursor-y', e.clientY - (height / 2));
        //console.log(e.pageX - (width / 2), e.pageY - (height / 2));
        /*
        document.querySelector(':root').style.setProperty('--page-index', TARGET_PAGE);
        CURSOR.css({
            left: e.pageX - (width / 2),
            top: e.pageY - (height / 2)
        })
        */
    });
}

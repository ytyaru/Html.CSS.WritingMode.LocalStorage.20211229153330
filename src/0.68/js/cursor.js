function initCursor() {
    function cssF(key, e) { return parseFloat(getComputedStyle(e).getPropertyValue(key)); }
    const CURSOR = document.getElementById('cursor')
    const width = cssF('width', CURSOR);
    const height = cssF('height', CURSOR);
    window.addEventListener('mousemove', (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
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

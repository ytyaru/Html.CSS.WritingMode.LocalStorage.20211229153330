function runScreenAreaRole(x, y) { // 画面エリアに応じた役割を実行する
    function toggleDialog(dialog) { (dialog.open) ? dialog.close() : dialog.showModal(); document.body.style.cursor = 'auto'; }
    switch (getScreenAreaRole(x, y)) {
        case ROLE_PAGING_FORWARD: return nextPage();
        case ROLE_PAGING_BACK: return prevPage();
        case ROLE_PAGING_FIRST: return firstPage(); 
        case ROLE_PAGING_LAST: return lastPage(); 
        case ROLE_TOGGLE_MENU_SETTING: return toggleDialog(document.querySelector('#setting'));

        case ROLE_PAGING: return; 
        case ROLE_PAGING_SET: return; 
        case ROLE_PAGING_AUTO: return; 
        case ROLE_TOGGLE_MENU: return; 
        case ROLE_TOGGLE_MENU_INDEX: return; 
        case ROLE_TOGGLE_MENU_SETTING: return; 
        case ROLE_TOGGLE_MENU_TOOLS: return; 
        default: return;
    }
}
function getCursorScreenAreaRole(x, y) { // 画面エリアの役割に応じたマウスカーソルを返す
    const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
    const COLOR_SCHEME = document.getElementById('color-scheme').value;
    function getPagingIconUrl(TYPE, DIR) { return `/assets/images/cursors/${COLOR_SCHEME}/${TYPE}-${DIR}-16x16.png`; }
    function getForwardIconUrl() { return getPagingIconUrl('arrow', (IS_VERTICAL) ? 'left' : 'right'); }
    function getBackIconUrl() { return getPagingIconUrl('return', (IS_VERTICAL) ? 'right' : 'left'); }
    function getCursorName(role) {
        if (ROLE_PAGING_FORWARD === role) { return (IS_VERTICAL) ? 'w-resize' : 'e-resize'; }
        else { (IS_VERTICAL) ? 'e-resize' : 'w-resize'; }
    }
    function getCssCursor(URL, NAME='auto') { return `url("${URL}"), ${NAME}`; }
    function getPagingCursor(role) {
        //document.body.style.cursor = `url("${getPagingIconUrl(role)}"), ${getPagingCursorName(role)}`;
        return `url("${getPagingIconUrl(role)}"), ${getPagingCursorName(role)}`;
    }
    const ROLE = getScreenAreaRole(x, y);
    switch (ROLE) {
//        case ROLE_PAGING_FORWARD: return (IS_VERTICAL) ? 'w-resize' : 'e-resize';
//        case ROLE_PAGING_BACK: return (IS_VERTICAL) ? 'e-resize' : 'w-resize';
//        case ROLE_TOGGLE_MENU_SETTING: return 'url("https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/assets/image/setting_16x16.png"),auto';
        case ROLE_PAGING_FORWARD: return getCssCursor(getForwardIconUrl(), getCursorName(ROLE));
//        case ROLE_PAGING_BACK: return getPagingCursor(ROLE);
        case ROLE_PAGING_BACK: return getCssCursor(getBackIconUrl(), getCursorName(ROLE));
        case ROLE_TOGGLE_MENU_SETTING: return `url("/assets/images/cursors/${COLOR_SCHEME}/setting-16x16.png"), auto`;
        /*
        case ROLE_PAGING_FIRST: return ; 
        case ROLE_PAGING_LAST: return ; 
        case ROLE_TOGGLE_MENU_SETTING: return;

        case ROLE_PAGING: return; 
        case ROLE_PAGING_SET: return; 
        case ROLE_PAGING_AUTO: return; 
        case ROLE_TOGGLE_MENU: return; 
        case ROLE_TOGGLE_MENU_INDEX: return; 
        case ROLE_TOGGLE_MENU_SETTING: return; 
        case ROLE_TOGGLE_MENU_TOOLS: return; 
        */
        default: return 'auto';
    }
}

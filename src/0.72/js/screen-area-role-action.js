function runScreenAreaRole(x, y) { // 画面エリアに応じた役割を実行する
    function toggleDialog(dialog) {
//        centering(dialog);
//        (dialog.open) ? dialog.close() : dialog.showModal();
        getComputedStyle(dialog).getPropertyValue('display', 'block');
        document.body.style.cursor = 'auto';
    }
    function centering(dialog) {
        const DW = getComputedStyle(dialog).getPropertyValue('width');
        const DH = getComputedStyle(dialog).getPropertyValue('height');
        const CW = document.body.clientWidth;
        const CH = document.documentElement.clientHeight;
        document.querySelector(':root').style.setProperty('--dialog-left', `${(CW/2) - (DW/2)}px`);
        document.querySelector(':root').style.setProperty('--dialog-top', `${CH - DH}px`);
    }
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
    function getPagingIconUrl(TYPE, DIR) { return getAssetsUrl(`images/cursors/${COLOR_SCHEME}/${TYPE}-${DIR}-16x16.png`); }
    function getForwardIconUrl() { return getPagingIconUrl('arrow', (IS_VERTICAL) ? 'left' : 'right'); }
    function getBackIconUrl() { return getPagingIconUrl('return', (IS_VERTICAL) ? 'right' : 'left'); }
    function getCursorName(role) {
        if (ROLE_PAGING_FORWARD === role) { return (IS_VERTICAL) ? 'w-resize' : 'e-resize'; }
        else { (IS_VERTICAL) ? 'e-resize' : 'w-resize'; }
    }
    function getCssCursor(URL, NAME='auto') { return `url("${URL}"), ${NAME}`; }
    function getPagingCursor(role) {
        return `url("${getPagingIconUrl(role)}"), ${getPagingCursorName(role)}`;
    }
    const ROLE = getScreenAreaRole(x, y);
    switch (ROLE) {
        case ROLE_PAGING_FORWARD: return getCssCursor(getForwardIconUrl(), getCursorName(ROLE));
        case ROLE_PAGING_BACK: return getCssCursor(getBackIconUrl(), getCursorName(ROLE));
        case ROLE_TOGGLE_MENU_SETTING: return `url("${getAssetsUrl("images/cursors/" + COLOR_SCHEME + "/setting-16x16.png")}"), auto`;
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

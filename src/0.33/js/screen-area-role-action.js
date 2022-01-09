function runScreenAreaRole(x, y) { // 画面エリアに応じた役割を実行する
    function toggleDialog(dialog) { (dialog.open) ? dialog.close() : dialog.showModal(); }
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
    switch (getScreenAreaRole(x, y)) {
        case ROLE_PAGING_FORWARD: return (IS_VERTICAL) ? 'w-resize' : 'e-resize';
        case ROLE_PAGING_BACK: return (IS_VERTICAL) ? 'e-resize' : 'w-resize';
        case ROLE_TOGGLE_MENU_SETTING: return 'url("https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/assets/image/setting.svg"),auto';
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

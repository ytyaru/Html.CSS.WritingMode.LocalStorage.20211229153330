const ROLE_NONE = 0;
const ROLE_PAGING = 10;          // ページ遷移する
const ROLE_PAGING_FORWARD = 100; // 次ページへ遷移する
const ROLE_PAGING_BACK = 101;    // 前ページへ遷移する
const ROLE_PAGING_FIRST = 102; // 次ページへ遷移する
const ROLE_PAGING_LAST = 103;    // 前ページへ遷移する
const ROLE_PAGING_SET = 104;     // 指定したページへ遷移する
const ROLE_PAGING_AUTO = 105;    // 自動で次ページへ遷移する(ON/OFF,間隔)
const ROLE_TOGGLE_MENU = 20;          // メニュー表示切替
const ROLE_TOGGLE_MENU_INDEX = 200;   // index
const ROLE_TOGGLE_MENU_SETTING = 201; // setting
const ROLE_TOGGLE_MENU_TOOLS = 202;   // tools
function getScreenAreaRole(x, y) { // 画面エリアに応じた役割を返す
    const IS_VERTICAL = ('vertical-rl' === Html.id('writing-mode').value);
    switch(getScreenArea(x, y, vertexPattern=VP_LEFT_RIGHT)) {
        case POS_LEFT: return (IS_VERTICAL) ? ROLE_PAGING_FORWARD : ROLE_PAGING_BACK;  // 右綴じ／左綴じ
        case POS_RIGHT: return (IS_VERTICAL) ? ROLE_PAGING_BACK : ROLE_PAGING_FORWARD; // 右綴じ／左綴じ
        case POS_TOP: return ;
        case POS_BOTTOM: return ROLE_TOGGLE_MENU_SETTING;
        case POS_TOP_LEFT: return ;
        case POS_TOP_RIGHT: return ;
        case POS_BOTTOM_LEFT: return ;
        case POS_BOTTOM_RIGHT: return ;
        default: return;
    }
}

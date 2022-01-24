const POS_NONE = 0; // 不明
const POS_TOP = 1; // 上
const POS_BOTTOM = 2; // 下
const POS_LEFT = 3;  // 左
const POS_RIGHT = 4;  // 右
const POS_CENTER = 5; // 中
const POS_TOP_LEFT = 6; // 北西（左上）
const POS_TOP_RIGHT = 7; // 北東（右上）
const POS_BOTTOM_LEFT = 8; // 南西（左下）
const POS_BOTTOM_RIGHT = 9; // 南東（右下）
const VP_VERTEX = 0;     // 四隅のとき四隅を返す
const VP_TOP_BOTTOM = 1; // 四隅のとき上下を返す
const VP_LEFT_RIGHT = 2; // 四隅のとき左右を返す
function getScreenArea(x, y, vertexPattern=VP_VERTEX) {
    const CLICK_SIZE_RATIO = 0.1; // 画面サイズに対するクリック領域比
    //const WIDTH = document.body.clientWidth; // 画面サイズ
    //const HEIGHT = document.body.clientHeight; // 画面サイズ
    const WIDTH = parseFloat(Css.Body.get('width')); // 画面サイズ
    const HEIGHT = parseFloat(Css.Body.get('height')); // 画面サイズ
    const CLICK_W = WIDTH * CLICK_SIZE_RATIO; // クリック領域サイズ
    const CLICK_H = HEIGHT * CLICK_SIZE_RATIO; // クリック領域サイズ

    const IS_TOP = (y <= CLICK_H);
    const IS_BOTTOM = ((HEIGHT - CLICK_H) < y)
    const IS_LEFT = (x <= CLICK_W);
    const IS_RIGHT = ((WIDTH - CLICK_W) < x)
    const IS_TOP_LEFT = (IS_TOP && IS_LEFT);
    const IS_TOP_RIGHT = (IS_TOP && IS_RIGHT);
    const IS_BOTTOM_LEFT = (IS_BOTTOM && IS_LEFT);
    const IS_BOTTOM_RIGHT = (IS_BOTTOM && IS_RIGHT);

    function getPosVP(V, TB, LR) { // 四隅のときどれを返すか（四隅、左右、上下のうち）
        switch (vertexPattern) {
            case VP_VERTEX: return V;
            case VP_TOP_BOTTOM: return TB;
            case VP_LEFT_RIGHT: return LR;
        }
    }
         if (IS_TOP_LEFT) { return getPosVP(POS_TOP_LEFT, POS_TOP, POS_LEFT); } // 左上
    else if (IS_TOP_RIGHT) { return getPosVP(POS_TOP_RIGHT, POS_TOP, POS_RIGHT); } // 右上
    else if (IS_BOTTOM_LEFT) { return getPosVP(POS_BOTTOM_LEFT, POS_BOTTOM, POS_LEFT); } // 左下
    else if (IS_BOTTOM_RIGHT) { return getPosVP(POS_BOTTOM_RIGHT, POS_BOTTOM, POS_RIGHT); } // 右下
    else if (IS_TOP) { return POS_TOP; } // 上
    else if (IS_BOTTOM) { return POS_BOTTOM; } // 下
    else if (IS_LEFT) { return POS_LEFT; } // 左
    else if (IS_RIGHT) { return POS_RIGHT; } // 右
    else { return POS_CENTER; } // 中
}

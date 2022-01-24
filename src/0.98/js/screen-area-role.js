function defineScreenAreaRoll() {
    const ScreenAreaRoll = function() {
        // 定数
        const Roll = function() {}
        Object.defineProperties(Roll.prototype, {
            None: { get: function() { return 0; } },
            Paging: { get: function() { return 10; } },             // ページ遷移する
            PagingForward: { get: function() { return 100; } },     // 次ページへ遷移する
            PagingBack: { get: function() { return 101; } },        // 前ページへ遷移する
            PagingFirst: { get: function() { return 102; } },       // 最初のページへ遷移する
            PagingLast: { get: function() { return 103; } },        // 最後のページへ遷移する
            PagingSet: { get: function() { return 104; } },         // 指定したページへ遷移する
            PagingAuto: { get: function() { return 105; } },        // 自動で次ページへ遷移する(ON/OFF,間隔)
                                                                    // 次の章へ遷移する
                                                                    // 前の章へ遷移する
                                                                    // 表表紙へ遷移する
                                                                    // 裏表紙へ遷移する
                                                                    // 目次へ遷移する
                                                                    // 索引へ遷移する
            ToggleMenu: { get: function() { return 20; } },         // メニュー表示切替
            ToggleMenuIndex: { get: function() { return 200; } },   // index
            ToggleMenuSetting: { get: function() { return 201; } }, // setting
            ToggleMenuTools: { get: function() { return 202; } },   // tools
        });
        ScreenArea.VertexPrimary = ScreenArea.VertexPrimarys.LeftRight; // 四隅は左右だと判定する
    }
    ScreenAreaRoll.prototype.is = function(x, y) {// 画面エリアに応じた役割を返す
        const self = this;
        const IS_VERTICAL = ('vertical-rl' === Html.id('writing-mode').value);
        switch(ScreenArea.is(x, y)) {
            case ScreenArea.Area.Left: return (IS_VERTICAL) ? self.Roll.PagingForward : self.Roll.ROLE_PAGING_BACK;  // 右綴じ／左綴じ
            case ScreenArea.Area.Right: return (IS_VERTICAL) ? self.Roll.PagingBack : self.Roll.PagingForward; // 右綴じ／左綴じ
            case ScreenArea.Area.Top: return ;
            case ScreenArea.Area.Bottom: return self.Roll.ToggleMenuSetting;
            default: return;
        }
    }
    return new ScreenAreaRoll();
}

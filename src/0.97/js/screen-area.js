function defineScreen() { // 画面領域・役割・クリックしたときの処理
    //------------------------------
    // 領域
    //------------------------------
    const _ScreenArea = function() {
        // 定数
        const Primary = function() {}
        Object.defineProperties(Primary.prototype, {      // 四隅のときの判定パターン
            Vertex: { get: function() { return 0; } },    // 四隅のとき四隅と判断する
            TopBottom: { get: function() { return 1; } }, // 四隅のとき上下と判断する
            LeftRight: { get: function() { return 2; } }, // 四隅のとき左右と判断する
        });
        const Area = function() {}                        // 画面エリア（全９種（四隅、上下左右、中央））
        Object.defineProperties(Area.prototype, {
            None: { get: function() { return 0; } },
            Top: { get: function() { return 1; } },
            Bottom: { get: function() { return 2; } },
            Left: { get: function() { return 3; } },
            Right: { get: function() { return 4; } },
            Center: { get: function() { return 5; } },
            TopLeft: { get: function() { return 6; } },
            TopRight: { get: function() { return 7; } },
            BottomLeft: { get: function() { return 8; } },
            BottomRight: { get: function() { return 9; } },
        });
        // Stateパターン。毎回頂点優先度で分岐するのはムダなので最初からパターンを型にしてしまう。
        const VertexPrimaryArea = function() { Area.call(this); }
        const TopBottomPrimaryArea = function() { Area.call(this); }
        const LeftRightPrimaryArea = function() { Area.call(this); }
        inherits(VertexPrimaryArea, Area);
        inherits(TopBottomPrimaryArea, Area);
        inherits(LeftRightPrimaryArea, Area);
        Object.defineProperties(TopBottomPrimaryArea.prototype, {
            TopLeft: { get: function() { return this.Top; } },
            TopRight: { get: function() { return this.Top; } },
            BottomLeft: { get: function() { return this.Bottom; } },
            BottomRight: { get: function() { return this.Bottom; } },
        });
        Object.defineProperties(LeftRightPrimaryArea.prototype, {
            TopLeft: { get: function() { return this.Left; } },
            TopRight: { get: function() { return this.Right; } },
            BottomLeft: { get: function() { return this.Left; } },
            BottomRight: { get: function() { return this.Right; } },
        });
        this._areas = new Area();
        this._primarys = new Primary();
        this._area = this._areas.None;
        this._primary = this._primarys.Vertex;
    }
    Object.defineProperties(_ScreenArea.prototype, {
        Primarys: { get: function() { return this._primarys; } },
        Areas: { get: function() { return this._areas; } },
        Primary: { get: function() { return this._primary; } },
        Area: { get: function() { return this._area; } },
    });
    _ScreenArea.prototype.area = function(x, y) {
        const self = this;
        const CLICK_SIZE_RATIO = 0.1; // 画面サイズに対するクリック領域比
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

             if (IS_TOP_LEFT) { return self.Primary.TopLeft; } // 左上
        else if (IS_TOP_RIGHT) { return self.Primary.TopRight; } // 右上
        else if (IS_BOTTOM_LEFT) { return self.Primary.BottomLeft; } // 左下
        else if (IS_BOTTOM_RIGHT) { return self.Primary.BottomRight; } // 右下
        else if (IS_TOP) { return self.Areas.Top; } // 上
        else if (IS_BOTTOM) { return self.Areas.Bottom; } // 下
        else if (IS_LEFT) { return self.Areas.Left; } // 左
        else if (IS_RIGHT) { return self.Areas.Right; } // 右
        else { return self.Areas.Center; } // 中
    }
    const ScreenArea = new _ScreenArea();
    ScreenArea.Primary = ScreenArea.Primarys.LeftRight; // 四隅は左右だと判定する
    
    //------------------------------
    // 役割
    //------------------------------
    const _ScreenAreaRole = function() {
        const Role = function() {}                        // 役割
        Object.defineProperties(Role.prototype, {
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
        this._rolls = new Role();
    }
    Object.defineProperties(_ScreenAreaRole.prototype, {
        Roles: { get: function() { return this._rolls; } },
    });
    _ScreenAreaRole.prototype.roll = function(x, y) {// 画面エリアに応じた役割を返す
        const self = this;
        const IS_VERTICAL = ('vertical-rl' === Html.id('writing-mode').value);
        switch(ScreenArea.area(x, y)) {
            case ScreenArea.Areas.Left: return (IS_VERTICAL) ? self.Roles.PagingForward : self.Roles.ROLE_PAGING_BACK;  // 右綴じ／左綴じ
            case ScreenArea.Areas.Right: return (IS_VERTICAL) ? self.Roles.PagingBack : self.Roles.PagingForward; // 右綴じ／左綴じ
            case ScreenArea.Areas.Top: return ;
            case ScreenArea.Areas.Bottom: return self.Roles.ToggleMenuSetting;
            default: return;
        }
    }
    const ScreenAreaRole = new _ScreenAreaRole();

    //------------------------------
    // 処理
    //------------------------------
    const _Screen = function() {
        this._area = ScreenArea;     
        this._roll = ScreenAreaRole;     
    }
    Object.defineProperties(_Screen.prototype, {
        Areas: { get: function() { return this._area.Areas; } },
        Roles: { get: function() { return this._roll.Roles; } },
    });
    _Screen.prototype.area = function(x, y) { const self = this; return self._area.area(x, y); }
    _Screen.prototype.roll = function(x, y) { const self = this; return self._roll.roll(x, y); }
    _Screen.prototype.on = function(x, y) {
        const self = this;
        function toggleDialog(dialog) {
            //centering(dialog);
            (dialog.open) ? dialog.close() : dialog.showModal();
            document.body.style.cursor = 'auto';
        }
        /*
        function centering(dialog) {
            const DW = getComputedStyle(dialog).getPropertyValue('width');
            const DH = getComputedStyle(dialog).getPropertyValue('height');
            const CW = document.body.clientWidth;
            const CH = document.documentElement.clientHeight;
            document.querySelector(':root').style.setProperty('--dialog-left', `${(CW/2) - (DW/2)}px`);
            document.querySelector(':root').style.setProperty('--dialog-top', `${CH - DH}px`);
        }
        */
        switch (self.roll(x, y)) {
            case self.Roles.PagingForward: return Paging.Page++;
            case self.Roles.PagingBack: return Paging.Page--;
            case self.Roles.PagingFirst: return Paging.Page = 1; 
            case self.Roles.PagingLast: return Paging.Page = -1;
            case self.Roles.Paging: return; 
            case self.Roles.PagingSet: return; 
            case self.Roles.PagingAuto: return; 
            case self.Roles.ToggleMenu: return; 
            case self.Roles.ToggleMenuIndex: return; 
            case self.Roles.ToggleMenuSetting: return toggleDialog(Html.id('setting'));
            case self.Roles.ToggleMenuTools: return; 
            default: return;
        }
    }
    _Screen.prototype.cursor = function(x, y) {
        const self = this;
        const IS_VERTICAL = ('vertical-rl' === Html.id('writing-mode').value);
        const COLOR_SCHEME = document.getElementById('color-scheme').value;
        function getPagingIconUrl(TYPE, DIR) { return getAssetsUrl(`images/cursors/${COLOR_SCHEME}/${TYPE}-${DIR}-16x16.png`); }
        function getForwardIconUrl() { return getPagingIconUrl('arrow', (IS_VERTICAL) ? 'left' : 'right'); }
        function getBackIconUrl() { return getPagingIconUrl('return', (IS_VERTICAL) ? 'right' : 'left'); }
        function getCursorName(role) {
            if (self.Roles.PagingForward === role) { return (IS_VERTICAL) ? 'w-resize' : 'e-resize'; }
            else { (IS_VERTICAL) ? 'e-resize' : 'w-resize'; }
        }
        function getCssCursor(URL, NAME='auto') { return `url("${URL}"), ${NAME}`; }
        function getPagingCursor(role) {
            return `url("${getPagingIconUrl(role)}"), ${getPagingCursorName(role)}`;
        }
        const ROLE = self.roll(x, y);
        switch (ROLE) {
            case self.Roles.PagingForward: return getCssCursor(getForwardIconUrl(), getCursorName(ROLE));
            case self.Roles.PagingBack: return getCssCursor(getBackIconUrl(), getCursorName(ROLE));
            case self.Roles.PagingFirst: return ; 
            case self.Roles.PagingLast: return ; 

            case self.Roles.Paging: return; 
            case self.Roles.PagingSet: return; 
            case self.Roles.PagingAuto: return; 
            case self.Roles.ToggleMenu: return; 
            case self.Roles.ToggleMenuIndex: return; 
            case self.Roles.ToggleMenuSetting: return `url("${getAssetsUrl("images/cursors/" + COLOR_SCHEME + "/setting-16x16.png")}"), auto`;
            case self.Roles.ToggleMenuTools: return; 
            default: return 'auto';
        }
    }
    return new _Screen();
}

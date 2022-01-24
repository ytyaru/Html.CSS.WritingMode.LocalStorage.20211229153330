const _Css = function() {
    const _Element = function(element) { // 指定した要素のCSSを取得・設定する
        this._element = element;
    }
    Object.defineProperties(_Element.prototype, {
        Element: { get: function() { return this._element; } }
    });
    _Element.prototype.get = function(key, isNotComputed=false) {
        const STYLE = (isNotComputed) ? this._element.style : getComputedStyle(this._element);
        return STYLE.getPropertyValue(key); 
    }
    _Element.prototype.set = function(key, value, q=null) {
        const ELEMENT = (q) ? this._element.querySelector(q) : this._element;
        ELEMENT.style.setProperty(key, value);
    }
    const _Root = function() { _Element.call(this, document.querySelector(':root')); }
    const _Body = function() { _Element.call(this, document.querySelector('body')); }
    const _Main = function() { _Element.call(this, document.querySelector('main:not([hidden])')); }
    inherits(_Root, _Element);
    inherits(_Body, _Element);
    inherits(_Main, _Element);
    /*
    const _Main = function() {
        this._element = document.querySelector('main:not([hidden])');
        this._style = getComputedStyle(this._element)
    }
    Object.defineProperties(_Css.prototype, {
        Root: { get: function() { return this._root; } }
        Main: { get: function() { return this._main; } }
    });
    Object.defineProperties(_Root.prototype, {
        Element: { get: function() { return this._element; } }
    });
    _Root.prototype.get = function(key, isNotComputed=false) {
        const STYLE = (isNotComputed) ? this._element.style : this._style;
        return STYLE.getPropertyValue(key); 
    }
    _Root.prototype.set = function(key, value, q=null) {
        const ELEMENT = (q) ? document.querySelector(q) : this._element;
        ELEMENT.style.setProperty(key, value);
//        this._element.style.setProperty(key, value);
    }
    Object.defineProperties(_Main.prototype, {
        Element: { get: function() { return this._element; } }
    });
    _Main.prototype.get = function(key, isNotComputed=false) {
        const STYLE = (isNotComputed) ? this._element.style : this._style;
        return STYLE.getPropertyValue(key); 
    }
    _Main.prototype.set = function(key, value, q=null) {
        const ELEMENT = (q) ? document.querySelector(q) : this._element;
        ELEMENT.style.setProperty(key, value);
//        this._element.style.setProperty(key, value);
    }
    */
    this._root = new _Root();
    this._body = new _Main();
    this._main = new _Main();
    console.log('???????????????????????????', this._root)
}
Object.defineProperties(_Css.prototype, {
    Root: { get: function() { return this._root; } },
    Body: { get: function() { return this._body; } },
    Main: { get: function() { return this._main; } },
});
_Css.prototype.set = function(key, isNotComputed=false, q=':root') {
    const ELEMEN = (q instanceof HTMLElement) ? q : document.querySelector(q);
    const STYLE = (isNotComputed) ? ELEMENT.style : getComputedStyle(ELEMENT);
    return STYLE.getPropertyValue(key); 
}
_Css.prototype.set = function(key, value, q=':root') {
    const ELEMEN = (q instanceof HTMLElement) ? q : document.querySelector(q);
    ELEMENT.style.setProperty(key, value);
}
const Css = new _Css();
//console.log(Css.Root.Element);
//console.log(Css.Root.get('--color'));
//console.log(Css.Root.set('--color', 'green'));

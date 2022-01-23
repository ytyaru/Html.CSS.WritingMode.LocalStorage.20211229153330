const _Css = function() {
    const _Root = function() {
        this._element = document.querySelector(':root');
        this._style = getComputedStyle(this._element)
    }
    Object.defineProperties(_Css.prototype, {
        Root: { get: function() { return this._root; } }
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
    this._root = new _Root();
}
const Css = new _Css();
//console.log(Css.Root.Element);
//console.log(Css.Root.get('--color'));
//console.log(Css.Root.set('--color', 'green'));

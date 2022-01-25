const _Debug = function(level=0) { // console出力抑制。0=全非表示。-1:全表示。5=全表示。（trace,debug,info,warn,errorのみ対象。logは対象外）
    this._level = level;
}
_Debug.prototype.on = function() { const self = this; self.set(-1); }
_Debug.prototype.off = function() { const self = this; self.set(0); }
_Debug.prototype.set = function(level=NaN) {
    const self = this;
    if (!isNaN(level)) { self._level = level; }
    if(!window.console){window.console = {};}
    const METHODS = ['trace', 'debug', 'info', 'warn', 'error'];
    self._level = (METHODS.length < self._level) ? METHODS.length : self._level;
    if (self._level < 0) { self._level = METHODS.length - 1; };
    for (let i = 0; i < (METHODS.length - self._level); i++) {
        console[METHODS[i]] = function(){};
    }
    if (self._level == 0) { 
        const COMMON_METHODS = ['group', 'groupCollapsed', 'groupEnd'];
        const ATHOR_METHODS = ['assert', 'clear', 'count', 'countReset', 'dir', 'dirxml', 'table', 'time', 'timeEnd', 'timeLog', 'timeStamp'];
        for (const method of COMMON_METHODS) { console[method] = function(){}; }
        for (const method of ATHOR_METHODS)  { console[method] = function(){}; }
    }
}
const Debug = new _Debug(0);


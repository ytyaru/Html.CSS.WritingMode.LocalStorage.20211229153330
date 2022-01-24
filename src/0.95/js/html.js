const _Html = function() {}
Object.defineProperties(_Html.prototype, {
    Url: { get: function() { return location.href; } }
    Html: { get: function() { return document.documentElement; } }
    Body: { get: function() { return document.body; } }
    Main: { get: function() { return document.querySelector('main:not([hidden])'); } }
});
_Html.prototype.id = function(id) { return document.getElementById(id); }
_Html.prototype.name = function(name) { return document.getElementsByName(name); } // name属性であり要素名ではない
_Html.prototype.tag = function(name) { return document.getElementsByTagName(name); } // 要素名でありname属性ではない
_Html.prototype.query = function(q, e=document) { return e.querySelector(q); }
_Html.prototype.querys = function(q, e=document) { return e.querySelectorAll(q); }
const Html = new _Html();


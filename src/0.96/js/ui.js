UI = function(id) { // UserInterface。具象化としてButton,ToggleButton,SelectButton, Switch,RollSwitch,CircleSwitch, Slider等がある
    this._id = id;
}
Object.defineProperties(UI.prototype, {
    Id: {
        get: function() { return this._id; }
    },
    Html: {
        get: function() { return document.getElementById(`${id}`); }
    },
    Storage: {
        get: function() { return localStorage.getItem(`${id}`); }
        set: function(v) { return localStorage.getItem(`${id}`, v); }
    }
//    ,
//    Db: { // IndexedDB
//        get: function() { return localStorage.getItem(`${id}`); }
//        set: function(v) { return localStorage.getItem(`${id}`, v); }
//    }
}
LineOfChars.prototype.load = function() {}
LineOfChars.prototype.save = function() {}
LineOfChars.prototype.addEvent = function() {}
LineOfChars.prototype.removeEvent = function() {}

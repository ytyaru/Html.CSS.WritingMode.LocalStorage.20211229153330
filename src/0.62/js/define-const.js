/// グローバル定数を定義する https://pisuke-code.com/js-way-to-create-global-constant/
function defineConst(name, value){
    Object.defineProperty(window, name, { 
        get: function(){return value;},
        set: function(){throw(`${name} is already defined !!`);},
    });
}

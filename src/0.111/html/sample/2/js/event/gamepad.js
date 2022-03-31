window.addEventListener('DOMContentLoaded', function(e) {
    defineConst('GamePads', []);
    defineConst('GamePadFrameId', null);
    function gamepadHandler(event, connecting) {
        var gamepad = event.gamepad; // gamepad === navigator.getGamepads()[gamepad.index]
        if (connecting) { GamePads[gamepad.index] = gamepad; }
        else { delete GamePads[gamepad.index]; }
        console.log("Gamepad connected at index [%d]: [%s]. [%d] buttons, [%d] axes.",
            event.gamepad.index,
            event.gamepad.id,
            event.gamepad.buttons.length,
            event.gamepad.axes.length);
        //console.log(navigator.getGamepads());
    }
    function buttonPressed(button) {
        if (typeof button == "object") { return button.pressed; }
        else if (typeof button == "object") { return button.touched; }
        else if (typeof button == "object") { return 0 !== button.value; }
        return button == 1.0;
    }
    function gameLoop() {
        const gamepads = navigator.getGamepads
            ? navigator.getGamepads()
            : navigator.webkitGetGamepads
            ? navigator.webkitGetGamepads
            : [];
        if (!gamepads) { return; }
        const gp = gamepads[0];
        for (let i=0; i<gp.buttons.length; i++) {
            if (buttonPressed(gp.buttons[i])) { console.log(`${i} ボタン押下`); /*console.log(gp);*/ }
        }
        for (let i=0; i<gp.axes.length; i++) { // axes[0..3] 0.0〜1.0
            if (0 != gp.axes[i]) { console.log(`${i} スティック傾倒: ${gp.axes[i]}`); }
        }
        /*if (buttonPressed(gp.buttons[0])) { console.log("Aボタン押下"); }*/
        GamePadFrameId = requestAnimationFrame(gameLoop);
    }
    window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); gameLoop(); }, false); // ゲームパッドの接続
    window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); cancelAnimationFrame(GamePadFrameId); }, false); // ゲームパッドの切断
});

/*
window.addEventListener("gamepadconnected", function(e) { // ゲームパッドの接続
});
window.addEventListener("gamepaddisconnected", function(e) { // ゲームパッドの切断
    console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id);
});
*/



//TIMER_CLOCK = null;
function initClock() { // 現在時刻と経過時間を表示する
//    if (TIMER_CLOCK) { return; }
    defineConst('STARTUP_TIME', new Date());
    defineConst('TIMER_CLOCK', setInterval(setClockAndElapsedTime, 30000)); // 30秒ごとに実行する
    setClockAndElapsedTime(); // 初回は即実行
}
function removeClock() {
    if (TIMER_CLOCK) { clearInterval(TIMER_CLOCK); }
}
function setClockAndElapsedTime() {
    // 現在時刻
    const NOW = new Date();
    const H = `${NOW.getHours()}`.padStart(2, '0');
    const M = `${NOW.getMinutes()}`.padStart(2, '0');
    document.getElementById("clock").innerHTML = `${H}:${M}`;
    // 経過時間
    const ELAPSED_TIME = Math.abs(NOW.getTime() - STARTUP_TIME.getTime());
    const EH = Math.floor(ELAPSED_TIME / (60*60*1000));
    const EM = Math.floor(ELAPSED_TIME / (60*1000));
    const EHS = (0 < EH) ? `${EH}h ` : '';
    document.getElementById("elapsed-time").innerHTML = `${EHS}${EM}m`;
    //console.log(EH, EM, STARTUP_TIME, NOW, ELAPSED_TIME, ELAPSED_TIME / (60*60*1000));
}

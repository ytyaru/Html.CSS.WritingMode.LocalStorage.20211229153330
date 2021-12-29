import {LineOfCharsFactory} from '/js/LineOfCharsFactory.js';
const charsFactory = new LineOfCharsFactory();

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOMContentLoaded");
    console.log(`devicePixelRatio = ${window.devicePixelRatio}`);
    charsFactory.create();
    charsFactory.init();
});
window.addEventListener('load', (event) => {
    console.log("load");
});
window.addEventListener('beforeunload', (event) => {
    console.log("beforeunload");
    charsFactory.save();
});


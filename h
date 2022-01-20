[1mdiff --git a/src/0.68/css/styles.css b/src/0.68/css/styles.css[m
[1mindex 1537cc9..8f5b2b7 100644[m
[1m--- a/src/0.68/css/styles.css[m
[1m+++ b/src/0.68/css/styles.css[m
[36m@@ -229,6 +229,8 @@[m [mh1::before {[m
     content: '第' counter(section) '章 ';[m
 }[m
 dialog {[m
[32m+[m[32m/*    z-indes: 900; // カーソルの下になるようにする*/[m
[32m+[m[32m/*    cursor: auto;*/[m
     transition: background-color 2s linear;[m
     background-color: var(--background-color);[m
     color: var(--color);[m
[1mdiff --git a/src/0.68/js/cursor.js b/src/0.68/js/cursor.js[m
[1mindex d74c2b4..bd48e20 100644[m
[1m--- a/src/0.68/js/cursor.js[m
[1m+++ b/src/0.68/js/cursor.js[m
[36m@@ -1,11 +1,20 @@[m
 function initCursor() {[m
[31m-    function cssF(key, e) { return parseFloat(getComputedStyle(e).getPropertyValue(key)); }[m
[31m-    const CURSOR = document.getElementById('cursor')[m
[31m-    const width = cssF('width', CURSOR);[m
[31m-    const height = cssF('height', CURSOR);[m
[32m+[m[32m//    function cssF(key, e) { return parseFloat(getComputedStyle(e).getPropertyValue(key)); }[m
[32m+[m[32m    function cssF(key, q=':root') { return parseFloat(getComputedStyle(document.querySelector(q)).getPropertyValue(key)); }[m
[32m+[m[32m//    const CURSOR = document.getElementById('cursor')[m
[32m+[m[32m    const width = cssF('width', '#cursor');[m
[32m+[m[32m    const height = cssF('height', '#cursor');[m
     window.addEventListener('mousemove', (e) => {[m
[31m-        mouseX = e.pageX;[m
[31m-        mouseY = e.pageY;[m
[32m+[m[32m//        const X = e.clientX - (width / 2);[m
[32m+[m[32m        const X = Math.floor(e.clientX - (width / 2));[m
[32m+[m[32m        const Y = Math.floor(e.clientY - (height / 2));[m
[32m+[m[32m//        const W = cssF('width', 'body');[m
[32m+[m[32m//        const H = cssF('height', 'body');[m
[32m+[m[32m        const W = document.body.clientWidth;[m
[32m+[m[32m        const H = document.documentElement.clientHeight;[m
[32m+[m[32m//        console.log(X,Y,W,H)[m
[32m+[m[32m        if (X < 0) { return; }[m
[32m+[m[32m        if (H < (e.clientY + (height / 2) + 1)) { return; }[m
         document.querySelector(':root').style.setProperty('--cursor-x', e.clientX - (width / 2));[m
         document.querySelector(':root').style.setProperty('--cursor-y', e.clientY - (height / 2));[m
         //console.log(e.pageX - (width / 2), e.pageY - (height / 2));[m

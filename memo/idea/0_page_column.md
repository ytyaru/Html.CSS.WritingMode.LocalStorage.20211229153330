# ページとカラム

## 要件

　HTML/CSS/JSで本のように表示・印刷したい。

## 方法

　読みやすくしたい。そのためには紙面と字サイズの兼ね合いを考慮する必要がある。

* 指定した１行字数で表示したい
    * 日本語における読みやすい１行字数40〜50字で表示したい
    * 最小フォントサイズ10pxより小さくなることはないようにしたい（スマホなど小型画面では１行字数を減らすことで対処）
    * 画面サイズや紙サイズに適した１行字数を指定したい（下限、上限をデバイスサイズに応じて用意する）
* 指定した段組み数で表示したい
    * 大きなディスプレイや紙面では段組みで文字を詰めページ数を減らしたい
    * １行字数40〜50字で、さらに適正フォントサイズ16px以上なら、段組み表示できるようにしたい（段組みしないようにもできるようにしたい）

## 要点

* 1段組あたり1画面サイズにする（`width:100vw`,`height:100vh`,`column-width:100vw`）
* 段組数を2にする（`2`のところを`3`,`4`のようにすることで指定の段組数にできる）
    * 縦書き:（`width:100vw`,`height:calc(100vh/2)`,`column-width:100vw`）
    * 横書き:（`width:calc(100vw/2)`,`height:100vh`,`column-width:100vw`）

　以下、余白を考慮したもの。

```css
:root {
    --width-vw:100;
    --height-vh:100;
    --column-gap-em:1;
    --column-gap-em-w:var(--column-gap-em); /* 縦書き時=0,横書き時=1 */
    --column-gap-em-h:var(--column-gap-em); /* 縦書き時=1,横書き時=0 */
}
body {
    width: calc((var(--width-vw) * 1vw) - calc(var(--column-gap-em-w) * 1em));
    height: calc((var(--height-vh) * 1vh) - calc(var(--column-gap-em-h) * 1em));
    column-width: 100vw;
    column-gap: calc(var(--column-gap-em) * 1em); /* 段組み余白 */
    column-rule-width: 1px;   /* 段組み装飾 */
    column-rule-style: solid;
    column-rule-color: black;
}
```

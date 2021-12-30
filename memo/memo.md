# 気になった点

* フォントサイズUIを操作しても`input`のフォントサイズが変化しない
* スライダーUIが縦書きにあわせて縦になってくれない
* 「縦中横」はHTML要素で囲う必要がある
* 縦書きだとフォント次第で鉤括弧など記号の位置がおかしい
* 字／行は「縦書き」と「横書き」でそれぞれ個別に持ちたい
* ブラウザが表示できる最小フォントより小さい「字／行」を入力できないようにしたい（max値を最小フォント値より大きくなるよう計算したい）

## フォントサイズUIを操作しても`input`のフォントサイズが変化しない

```css
button, input, select, textarea {
  font-family : inherit;
  font-size   : 100%;
}
```

　`font-family: inherit;`を指定することで親要素の値を継承する。`font-size: 100%;`で親要素のフォントサイズと同じにできる。

* https://kuroeveryday.blogspot.com/2017/04/css-styling-html-forms.html

## スライダーUIが縦書きにあわせて縦になってくれない

　以下のようにして縦書きにする。けれどスライダーUIが縦書きにならない。

```css
body { writing-mode: vertical-rl; }
```
```html
<input type="range" id="FontSize" name="FontSize" min="10" max="50">
```

　ググったら以下でできるらしい。

* [例② スライダーを縦方向にする - <input type="range">の使い方・サンプルコード](https://codeforfun.jp/reference-html-tag-input-type-range/#i-5)

```css
input[type="range"] {
  -webkit-appearance:slider-vertical; /* Chrome, Opera, Safari */
  writing-mode: bt-lr; /* IE, Edge */
}
```
```html
<input type="range" name="range" orient="vertical"><!-- Firefox -->
```

## 「縦中横」はHTML要素で囲う必要がある

```css
.num {
    text-combine-upright: all; /* 縦中横 */
}
```
```html
<p>令和<span class="num">3</span>年<span class="num">12</span>月<span class="num">31</span>日。</p>
<p>令和<span class="num">３</span>年<span class="num">１２</span>月<span class="num">３１</span>日。</p>
```

　しかも数字が半角だと異常に小さくなる。全角で丁度いい。

## 縦書きだとフォント次第で鉤括弧など記号の位置がおかしい

　「IPAex明朝」など縦書きを考慮したフォントを使えば、正しい位置で表示される。`@font-face`にてローカルまたはネットからフォントを入手する。ネットにより入手したときはキャッシュしたい。

```css
@font-face
{
    font-family: IPAex明朝;
    src: local('IPAex明朝'), 
         local('ipaexm.ttf') format('opentype'),
         local('fonts-japanese-mincho.ttf') format('truetype'),
         url('https://cdn.leafscape.be/IPAexfont/ipaexm_web.woff2') format("woff2");
}
body {
    font-family: 'IPAex明朝', sans-serif; 
}
```

## 字／行は「縦書き」と「横書き」でそれぞれ個別に持ちたい

　スマホで閲覧するとき、以下のようなパターンがある。

置き|WritingMode|
----|-----------|
縦|縦
縦|横
横|縦
横|横

置き|WritingMode|行|列
----|-----------|--|--
縦|縦|長辺|短辺
縦|横|短辺|長辺
横|縦|短辺|短辺
横|横|長辺|短辺

　Galaxy S5 360*640の場合、最小フォントサイズが10px／字とすると、以下のようになる。

置き|WritingMode|行|列|字数／行|字数／列
----|-----------|--|--|--------|--------
縦|縦|長辺|短辺|64(640/10)|36(360/10)
縦|横|短辺|長辺|36(360/10)|64(640/10)
横|縦|短辺|短辺|36(360/10)|64(640/10)
横|横|長辺|短辺|64(640/10)|36(360/10)

　縦置き、横置きにしたときにそれぞれ適切な字数がある。同じ字／行を使うと大きすぎたり小さすぎることになる。

　そこで、縦置き、横置きにしたときのイベントをキャッチし、その時々に丁度いい字／行をセットしたい。

* https://developer.mozilla.org/ja/docs/Web/API/CSS_Object_Model/Managing_screen_orientation

キーワード|意味
----------|----
`portrait`|縦長
`landscape`|横長

　スマホなら縦長のとき片手で持ちやすいと思われる。逆にスマホの横長は片手でもつのは難しいかもしれない。

```css
// 画面の向きごとに縦書き／横書きどちらであるかを保持する
--portrait-writing-mode
--landscape-writing-mode

// 画面の向きとWritingModeの組合せごとに１行あたりの字数を保持する
--portrait-vartical-chars
--portrait-holizontal-chars
--landscape-vartical-chars
--landscape-holizontal-chars
```

　これ、超面倒くさくないか？　

1. 画面サイズを取得する
2. 最小フォントサイズを定義する（10px）
3. 長辺・短辺における最大字数／行を算出する
4. 現在の画面向きに応じて3をUIの`max`値にセットする
5. 現在の画面向きごとにWritingModeを保存する
6. 現在の画面向きとWritingModeごとに字数／行を保存する

　ユーザが編集するのは一度だけにしたい。一度変更したら画面向きを変えようがWritingModeを変えようがすべて共通して変わってほしい。すると字／行ではなくピクセルによる絶対指定のほうが好都合だろう。

```css
/* スマホ 4〜7インチ 1〜599px 縦置き */
@media screen and (max-width: 599px) and (orientation: portrait) {
:root {
    --line-of-chars:10;
}
}
/* スマホ 4〜7インチ 1〜599px 横置き */
@media screen and (max-width: 599px) and (orientation: landscape) {
:root {
    --line-of-chars:10;
}
}
```

　初期値だけ設定しても仕方ない。触っているうちに縦置きや横置きにしたり、縦書きや横書きに変更したりする。そのときに応じて適切なサイズが必要。これはもう計算するしかない。

* https://www.ipentec.com/document/javascript-get-screen-size

　

```javascript
screen.addEventListener("orientationchange", function () {
    console.log("The orientation of the screen is: " + Screen.orientation);
    // 最小フォントサイズ10px 横書き
    字/行max = window.screen.availWidth / 10
    // 最小フォントサイズ10px 縦書き
    字/行max = window.screen.availHeight / 10
});
```

## 最小フォント

　ブラウザによっては9px、10pxなど最小フォントが定められている。これよりも小さく表示しようとしてもできない。

　それはいいのだが、不都合が起きた。画面サイズが小さいとき（デベロッパツール Galaxy S5 360*640）に横書きで40字／行にすると、指定値が最小フォントより小さい値を指定しているのに、表示上は大きいままになってしまう。どうやら36字／行が最小らしい。横幅360pxで１字10pxに縮めると36字入る。１字あたりはこれ以上小さくできないため、最大で36字／行となるわけだ。

　そこで、最小フォントサイズより小さくできないように入力UIの`max`値を算出したい。

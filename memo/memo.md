# 気になった点

解決版|問題
------|----
`0`|リサイズしてもフォントサイズは不変でいてほしい
`0`|縦書きだとフォント次第で鉤括弧など記号の位置がおかしい
`0.1`|`<input type='button'>`でなく`<button type='button'>`を使うべきだった
`0.1`|フォントサイズUIを操作しても`input`のフォントサイズが変化しない
`0.2`|スライダーUIが縦書きにあわせて縦になってくれない
`0.3`|ブラウザが表示できる最小フォントより小さい「字／行」を入力できないようにしたい（max値を最小フォント値より大きくなるよう計算したい）
`0.4`|縦だろうが横だろうが同じフォントサイズでいてほしい。けれど字／行の値は縦・横それぞれにふさわしい値になってほしい
`0.5`|字／行のスライダーmax値が大きくなりすぎないようにする（最小フォントサイズ10pxで算出するが、CSS変数で指定した値を超過しないようにする）
`0.6`|リサイズしたとき字／行を再計算してラベルに表示したい
`0.7`△|JSで全画面ON/OFFしたい
`0.8`|行間、字間の最適値をCSS定義したい
`0.9`|行間、字間を考慮した字／行を算出したい
`0.10`|行間、字間を調整するUIが欲しい（UI縦書き、字間によるフォントサイズ再計算）
`0.11`|スライダーUI縦書き時にラベルが次行になってしまうのを防ぐ
`0.11`△|スライダーUIのラベルの数値を縦中横にしたい
`0.12`|字間、行間の単位をemから%字にしたい
``|「縦中横」はHTML要素で囲う必要がある
``|字／行は「縦書き」と「横書き」でそれぞれ個別に持ちたい
``|縦書きにするとマウスホイールによるスクロールができない

　以下の初版を作って動作させたところ、上記のように大量の問題点が出てきた。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0/index.html

## `<input type='button'>`でなく`<button type='button'>`を使うべきだった

* https://hsmt-web.com/blog/submit-input-button/

　なお、`type='button'`を指定しないと`type='submit'`と判断され、`unload`イベントが発生してしまう。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.1/index.html

## フォントサイズUIを操作しても`input`のフォントサイズが変化しない

```css
button, input, select, textarea {
  font-family : inherit;
  font-size   : 100%;
}
```

　`font-family: inherit;`を指定することで親要素の値を継承する。`font-size: 100%;`で親要素のフォントサイズと同じにできる。

* https://kuroeveryday.blogspot.com/2017/04/css-styling-html-forms.html

　`<button>`なら変化した。けれど`<input type="range">`は変化しなかった。`width`で長さを指定する必要があるらしい。

* https://stackoverflow.com/questions/44209345/how-to-increase-the-length-size-of-html5-input-type-of-range

　`range`の幅についてはデフォルトにまかせよう。

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

　たしかにできた。けれど新たな問題が発生した。UIを縦書きにすると次のようになってしまう。

* ラベルが次の行位置で表示されてしまう
* UIを操作するとき画面がガタガタして操作しづらいときがある

　UIを縦書きにするとUI操作したとき画面がガタガタになり入力しづらいことがある。特にデベロッパツールでレスポンシブ再現するとき`Galaxy S5`のような小型ディスプレイにして、`20字／行`から`21字／行`にするときのマウス操作でガタガタになりやすい。`40字／行`など高い値のときはガタガタにならずスムーズなことが多い。言葉では伝えづらい現象のため、`0.2`版のデモを参照されたし。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.2/index.html

　原因不明。推測してみる。UI操作と同時にフォントサイズが変わるせいかもしれない。UIフォントサイズをUI自身の操作で変更させると操作が難しくなってしまうのだろう。でも`0.1`版でもフォントサイズがUI自身によって変更されるのに、画面がガタガタにならない。違いといえばUIが縦書きになることなのだが、`0.2`版では横書き状態のUIでも画面がガタガタになるようになってしまった。なぜ？

　ということで、UIも縦書きにしたかったが諦めて横にしておいたほうが無難である。残念。こういうバグにより実現できないことがあるとストレスがたまりまくる。

## ブラウザが表示できる最小フォントより小さい「字／行」を入力できないようにしたい

　最小フォントサイズを10pxとし、最大字数／行を算出することで解決した。このとき、画面の向き（縦置き／横置き）や、WritingMode（縦書き／横書き）が変化したときのイベントをフックして最大字数／行を算出しなおし、`input range`の`max`値にセットしている。

　各ブラウザには最小フォントが定められている。それは`9px`や`10px`などバラバラ。いずれにせよ、拡大縮小しようが、CSSで設定しようが、それ以上は小さくならない値が定められている。

　私の設定した「字／行」も同じだ。デベロッパーツールの`Galaxy S5`360ピクセル幅にて、40字／行にすると、10pxより小さくなるはず。なのに表示上は36字／行になっている。なぜなら最小フォントサイズが`10px`だから。360px / 10px = 36字。

　ならもう、最小フォントサイズを`10px`と決め打ちし、JSにて最大字数／行を算出してしまおう。それをHTMLのinput rangeのmaxにセットした。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.3/index.html

　デベロッパツールでスマホの回転を再現できる。consoleにログが出力され、正しく値が出力されることが確認できるはず。

最大字数／行|
------------|
全角／半角|全角なら`40`、半角なら`80`が好ましい。スマホは小さいため全角`20`。ユーザが以下の範囲内において自由にセットできる。
初期値|前回終了時値をLocalStorageから取得する。ないならメディアクエリで決め打ち。599px以下なら`20`, 1024px以下なら`30`、1025px以上なら`40`。
最小値|スマホなら`10`〜`15`。PCなら`20`〜`25`。メディアクエリで決め打ち。
最大値|ブラウザが規定する最小フォントサイズ`9px`/`10px`がある。これに倣って`10px`として算出する。画面の向き、WritingMode、解像度から。

## 縦だろうが横だろうが同じフォントサイズでいてほしい。けれど字／行の値は縦・横それぞれにふさわしい値になってほしい

　フォントサイズ算出。画面の向き、WritingModeごとに字／行単位でのサイズを算出し、それをピクセル単位に変換してCSSのfont-sizeにセットする。デベロッパツールのGalaxy S5 再現モードなら正しい数値になるが、デフォルト状態だと不正値になる。解決したとは到底いえない。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.4/index.html

　どうやら字数／行で表示したいなら、`vw`,`vh`を使うしかなさそう。すべてCSSピクセル換算されるはずなので計算できるはずなのだが。一体なにがダメなのか。以下のように`devicePixelRatio`にしたら今度はデベロッパツールで再現したスマホ側が小さくなりすぎてしまう。どゆこと？

```javascript
function calcFontSizePixelFromLineOfChars(lineOfChars) { // 字数／行からその値をピクセル単位に変換する
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
    console.log(`${SIZE / lineOfChars}px = ${SIZE}px / ${lineOfChars}字／行`);
    return SIZE / (lineOfChars * window.devicePixelRatio);
//    return SIZE / lineOfChars;
}
```

　と思ったら、ブラウザの拡大縮小率が150%になっていた。こいつのせいだ。でもおかしいな？　たしか以下HTMLの`user-scalable=0`でユーザの拡大縮小ができないように指定したはずなのに。

```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
```

* [iOS11以降でピンチインアウトで拡大縮小禁止](https://webinlet.com/2020/ios11%E4%BB%A5%E9%99%8D%E3%81%A7%E3%83%94%E3%83%B3%E3%83%81%E3%82%A4%E3%83%B3%E3%82%A2%E3%82%A6%E3%83%88%E6%8B%A1%E5%A4%A7%E7%B8%AE%E5%B0%8F%E7%A6%81%E6%AD%A2)
* [iOS10のSafariでuser-scalable=no が効かなくズームがされる問題への対策](https://qiita.com/GrDolphium/items/d74e5758a36478fbc039)

　どうやら`user-scalable=0`で拡大縮小させないようにする機能は使えなくなっているらしい。使えねー。なんのための属性だよ。

* [JavaScript | ブラウザのズーム倍率をパーセント値で取得する方法](https://1-notes.com/javascript-get-browser-zoom-level/)

　さらに調査したところ、ブラウザのズーム倍率をJSで取得できることがわかった。

```javascript
window.devicePixelRatio
```

　え、`devicePixelRatio`ってデバイスピクセル比だよね？　レティーナなど高精細ディスプレイのハードウェア的なピクセル数じゃなかったの？　ブラウザの拡大縮小まで考慮されるの？　でもデベロッパツールでGalaxy S5を再現したときは正しく計算できていたのに、ブラウザズームが150%なPCブラウザではフォントが大きく表示されて計算がずれてたよ？

```javascript
window.addEventListener(`resize`, () => {
  let zoom_level = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
  zoom_level = Math.floor(zoom_level * 100);

  console.log(zoom_level);
  document.querySelector('#output').innerHTML = zoom_level + '%';
})
```

　まあ、これ以上は特に何もしなくても大丈夫だろう。ただ、ブラウザの拡大縮小については計算外。これをされると字／行やフォントサイズの値が狂ってしまう。つまりブラウザ拡大率100%のときだけ、正しく表示できる。

## 字／行のスライダーmax値が大きくなりすぎないようにする（最小フォントサイズ10pxで算出するが、CSS変数で指定した値を超過しないようにする）

　日本語は大体一行あたり40字くらいが読みやすい。作文用紙も40字だし、本もほぼ同じである。なのでできるだけその範囲に近づけたい。

```css
/* PC 13〜21インチ 1025px〜 */
:root {
    --max-line-of-chars:50;
}
/* タブレット 7〜13インチ 600〜1024px */
@media screen and (max-width: 1024px) {
:root {
    --max-line-of-chars:40;
}
}
/* スマホ 4〜7インチ 1〜599px  */
@media screen and (max-width: 599px) {
:root {
    --max-line-of-chars:30;
}
}
```

MinFontSize.js
```javascript
function calcMaxLineOfChars() { // 解像度と画面の向きから最小フォントサイズ（10px）字の最大字数／行を算出する（但しCSSで指定した最大値より大きくはならない）
    const MIN_FONT_SIZE = 10; // px。各ブラウザによって9px,10pxだったりする。ここでは10pxと決め打ちする。
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
//    return Math.floor(SIZE / MIN_FONT_SIZE);
    return Math.min(Math.floor(SIZE / MIN_FONT_SIZE), getComputedStyle(document.querySelector(':root')).getPropertyValue('--max-line-of-chars'))
}
```

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.5/index.html

## リサイズしてもフォントサイズは不変でいてほしい

```javascript
window.addEventListener("resize", function (e) { // 窓をリサイズしたら
    console.log(e);
});
```

　利用状況の想定として基本的にリサイズすることはない。スマホやタブレットは画面が小さいため全画面表示するだろう。PCでも同じだ。1920*1080であれば縦半分に配置することがあるかもしれない。けれどそれで丁度いいときは縦書きであり１行あたりの字数が40字／行のときだろう。フォントサイズは変えないまま、表示される行数だけが半分になるような表示だ。スクロール量が倍になる。なのでリサイズ時のフォントサイズ調整に関しては考えなくていい。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.4/index.html

## リサイズしたとき字／行を再計算してラベルに表示したい

　リサイズしたときフォントサイズは不変であってほしい。それはいいのだが、リサイズしたとき字／行が増減することがある。フルスクリーン（全画面）にしたらメニューバーやタスクバーの分だけ表示領域が増えるから。そうなるとスライダーUIのラベル「字／行」の数を再計算させる必要が出てくる。

* `resize`イベントを追加し再計算処理を仕込んだ
* サイズ計算に使用する変数を`window.screen.availHeight`から`document.body.clientHeight`へ変更した

main.js
```javascript
window.addEventListener("orientationchange", function () { // 画面向きに応じて最大字数／行を変更する
    console.log("orientationchange");
    setMaxLineOfChars(); // CalcFontSize.js
    setLineOfCharsFromFontSizePixel(); // CalcFontSize.js
    document.querySelector('#FontSize_').innerHTML = calcLineOfCharsFromFontSizePixel(parseFloat(document.querySelector('body').style.getPropertyValue('font-size')));
});
window.addEventListener("resize", function (e) { // 全画面やリサイズ時に字／行の値を再計算する
    console.log("resize");
    setMaxLineOfChars(); // CalcFontSize.js
    setLineOfCharsFromFontSizePixel(); // CalcFontSize.js
    document.querySelector('#FontSize_').innerHTML = calcLineOfCharsFromFontSizePixel(parseFloat(document.querySelector('body').style.getPropertyValue('font-size')));
});
```

CalcFontSize.js
MinFontSize.js
```javascript
//    const SIZE = ('vertical-rl' === writingMode.value) ? window.screen.availHeight : window.screen.availWidth;
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
```

```css
.num {
    text-combine-upright: all; /* 縦中横 */
}
```

* [JavaScriptでウインドウサイズを取得](https://web-designer.cman.jp/javascript_ref/window/size/)

　OK。これで全画面にしようがリサイズしようが正しい字／行が出る。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.6/index.html

## JSで全画面ON/OFFしたい

　ボタンを押したときに全画面のON/OFFができるようになった。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.7/index.html

　だが、起動時に自動で全画面にはできなかった。

* https://teratail.com/questions/339734

　以下エラーになる。どうやら全画面はユーザ操作せねばできない仕様らしい。これは困る。

```
Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
```

　解法としてはマニフェストを使用する。

* https://developer.mozilla.org/ja/docs/Web/Manifest

```html
<link rel="manifest" href="/manifest.webmanifest"/>
```

manifest.webmanifest
```javascript
{
  "display": "fullscreen",
}
```

　localStorageでユーザがアプリを終了した状態に応じて初期化したかったのだが。それはできなさそう。マニフェストはjsonファイルであり、書き換えることができないから。

　そもそもPWAとかSPAとか、ServiceWorkerとかCacheとか難しすぎる。

　なので今は一旦妥協する。フルスクリーンの自動化はしない。残念。本当は起動時に自動でフルスクリーンになってほしかったのに。

## 行間、字間の最適値をCSS定義したい

```css
body {
    font-size: 16px;
    line-height: 1.5em; /* 行間 1.5〜2.0em */
    letter-spacing: 0.05em; /* 字間 0.05〜0.1em */
}
```

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.8/index.html

　情報源。

* [letter-spacing](https://saruwakakun.com/html-css/reference/letter-spacing)
* [line-height](https://saruwakakun.com/html-css/reference/line-height)

　行間と字間の適切な値やその範囲は？

* https://wunderstand.net/379/

項目|最小|最大|中間
----|----|----|----
行間|1.5em|2.0em|1.75em
字間|0.05em|0.1em|0.075em

　今回は適正値がわからなかったので中間値にした。

## 行間、字間を考慮した字／行を算出したい

　行間と字間を追加したら字／行の計算が狂った。現在の計算式には行間と字間が考慮されていないからだ。そこでこれらを考慮した計算式にしたい。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.9/index.html

```javascript
function calcFontSizePixelFromLineOfChars(lineOfChars) { // 字数／行からその値をピクセル単位に変換する（字間を抜いたサイズ）
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
    const letterSpacing = getComputedStyle(document.querySelector(':root')).getPropertyValue('--letter-spacing');
    const px = SIZE / lineOfChars;
    console.log(`${px - (px * letterSpacing)}px = ${px}px(= ${SIZE}px / (${lineOfChars}字／行) - ${px * letterSpacing}px(${px}px * letterSpacing:${letterSpacing })行間)`);
    return px - (px * letterSpacing);
}
function calcLineOfCharsFromFontSizePixel(px) { // フォントのピクセル数から字数／行に変換する
    const writingMode = document.querySelector('#WritingMode');
    const SIZE = ('vertical-rl' === writingMode.value) ? document.body.clientHeight : document.body.clientWidth;
//    return Math.floor(SIZE / px);
    return Math.floor(SIZE / (px + (px * getComputedStyle(document.querySelector(':root')).getPropertyValue('--letter-spacing'))));
}
```

　字間を考慮していなかった従来の計算値から、字間の分だけ差し引いた。

## 行間、字間を調整するUIが欲しい（UI縦書き、字間によるフォントサイズ再計算）

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.9/index.html

```html
```

```javascript
```

```javascript
```

* UIを縦にする
* 字間を調整するUIをいじったら「字数／行」と「最大字数／行」を再計算するべし
    * どちらを変更するか
        * フォントサイズ（こちらが望ましい。字数／行はユーザにとっての指標だから。ただし計算が複雑）
        * 字数／行（現状はこちら。せっかく字数／行を調整したのに字間を調整すると変わってしまうのは嫌）

```javascript
function calcFontSizePixcel(writingMode, lineOfChars) { // フォントサイズをピクセル単位で算出する
    const SIZE = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth;
    let FontPx = SIZE / lineOfChars;
    const letterSpacingPx = FontPx * letterSpacing;

    SIZE = (FontPx * lineOfChars) + (letterSpacingPx * (lineOfChars - 1)
    return FontPx - letterSpacingPx;
}

```

```
        clientWidth
|--------------------------|
 ◯||◯  ◯  ◯  ◯  ◯  ◯
 ||||
 F L

writingMode = horizontal-tb
clientWidth = 360px
--letter-spacing = 0.05;

◯ = 字
７字／行
lineOfChars = 7

F = FontSizePixel
L = LetterSpacingPixel

F = clientWidth / lineOfChars
F = 360 / 7 = 51.4285714286;
L = F * --letter-spacing
L = 51.4... * 0.05 = 2.57142857143;
clientWidth = (newF * lineOfChars) + (L * (lineOfChars - 1));
360 = (newF * lineOfChars) + (2.57... * 6);
360 = 7newF + 15.4285714286
7newF = 360 - 15.4285714286
7newF = 360 - 15.4285714286 = 344.571428571
newF = 344.571428571 / 7 = 49.2244897959;
字間を抜いたフォントサイズ＝49.2244897959;


newF = SIZE - (L * (lineOfChars - 1)) / lineOfChars
```

```
const FontSizePx = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'));
const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
SIZE = (FontSizePx * lineOfChars) + (LetterSpacingPx * (lineOfChars - 1));
360 = (F * li) + (L * (li-1))
360 = (50 li) + (5 (li-1))
360 = (50x) + (5(x-1))
360 = 50x + 5x -5
360 = 55x - 5
55x = 360 + 5 = 365
x = 365 / 55
lineOfChars = (SIZE + (LetterSpacingPx*1)) / (FontSizePx + LetterSpacingPx)
lineOfChars = (SIZE + LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
lineOfChars = (360 + 2.5) / (51.4 + 2.5)
lineOfChars = (362.5) / (53.9)
```
```
const FontSizePx = (SIZE - ALL_LETTER_SPACING) / lineOfChars; // 入力した字／行と字間からピクセル単位でフォントサイズを算出する

const FontSizePx = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'));
const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
const SIZE = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
const ALL_LETTER_SPACING = LetterSpacingPx * (lineOfChars - 1); // 全字間サイズ（px）

FontSizePx = (SIZE - (LetterSpacingPx * (lineOfChars - 1))) / lineOfChars;
49.1 = (360 - (2.5 * (li - 1))) / li
49.1 = (360 - (2.5li - 2.5)) / li
49.1li = 360 - 2.5li - 2.5
49.1li + 2.5li = 360 - 2.5

(FontSizePx + LetterSpacingPx) * li = 360 - 2.5
(FontSizePx + LetterSpacingPx) * li = SIZE - LetterSpacingPx
FontSizePx + LetterSpacingPx = (SIZE - LetterSpacingPx) / li

(SIZE - LetterSpacingPx) / li = FontSizePx + LetterSpacingPx

li / (SIZE - LetterSpacingPx)

((SIZE - LetterSpacingPx) / li) * (li / (SIZE - LetterSpacingPx)) = (FontSizePx + LetterSpacingPx / 1) * (li / (SIZE - LetterSpacingPx))

(SIZE - LetterSpacingPx) * li   (FontSizePx + LetterSpacingPx) * li
----------------------------- = -----------------------------------
li * (SIZE - LetterSpacingPx)   1 * (SIZE - LetterSpacingPx)

(360 - 2.5) * li    (49.1 + 2.5) * li
----------------- = -----------------
li * (360 - 2.5)    (360 - 2.5)

    (49.1 + 2.5) * li
1 = -----------------
    (360 - 2.5)

    (FontSizePx + LetterSpacingPx) * li
1 = -----------------------------------
    (SIZE - LetterSpacingPx)

(SIZE - LetterSpacingPx) = (FontSizePx + LetterSpacingPx) * li
(FontSizePx + LetterSpacingPx) * li = (SIZE - LetterSpacingPx)
li = (SIZE - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)

１行あたりの字数＝(SIZE - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)

3/x * x/3 = 1
x=4
3/4 * 4/3 = (3*4)/(4*3) = 1


50x + 5x
```

```
const FontSizePx = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'));
const L = document.querySelector('#letter-spacing').value;
const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）

F = 
clientWidth = (F * lineOfChars) + (L * (lineOfChars - 1));
```

calcFontSize.js
```javascript
function calcFontSizePixcel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出する
    const SIZE = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const F = SIZE / lineOfChars; // 字間なし時の１字あたりのフォントサイズ
    const L = F * letterSpacing; // 字間サイズ（emからpxに変換）
    const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）
    return (SIZE - ALL_LETTER_SPACING) / lineOfChars; // 入力した字／行と字間からフォントサイズを算出する（ピクセル単位）
}
```

　さらに画面の向きやwritingModeが変わったときは、フォントサイズのピクセル値から字／行を算出してHTMLにセットしたい。この目的は、縦横が変化してもフォントの絶対値は自動で変更させないようにするためである。

MinFontSize.js
```javascript
function setLineOfCharsFromFontSizePixel() {// 画面の向きまたはWritingMode変更時にフォントサイズのピクセル値から字／行を取得してHTMLにセットする
    const px = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'))
    const lineOfChars = calcLineOfCharsFromFontSizePixel(px);
    console.log(`${lineOfChars}字／行 ${px}px`);
    document.querySelector('#FontSize').value = lineOfChars;
    const fontSize = document.querySelector('#FontSize');
    fontSize.value = (lineOfChars < fontSize.min) ? fontSize.min : (fontSize.max < lineOfChars) ? fontSize.max : lineOfChars;
    document.querySelector('#FontSize_').innerHTML = lineOfChars;
}
```

calcFontSize.js
```javascript
function calcLineOfChars(writingMode) { // 字数／行を算出する（writingMode,フォントサイズpx,行間emから。縦横ボタン押下時）
    // １行あたりの字数＝(SIZE - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
    const FontSizePx = parseFloat(document.querySelector('body').style.getPropertyValue('font-size'));
    const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
    const SIZE = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const lineOfChars = (SIZE - LetterSpacingPx) / (FontSizePx + LetterSpacingPx);
    return lineOfChars;
}
```

## スライダーUI縦書き時にラベルが次行になってしまうのを防ぐ

　スライダーUIはラベルがないため別要素で追加している。だがこのときwritingModeで縦書きにするとラベルが次の行へ移動してしまう。同じ行に表示したい。以下で解決する。

style.css
```css
input[type="range"] {
    vertical-align: middle;
}
```

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.11/index.html

## スライダーUIのラベルの数値を縦中横にしたい

```html
<label for="volume"><span id="FontSize_" class="num"></span>字／行</label>
<input type="range" id="line-height" name="line-height" min="1.5" max="2.0" step="0.05">
<label for="volume"><span id="line-height_" class="num"></span>em行間</label>
<input type="range" id="letter-spacing" name="letter-spacing" min="0.05" max="0.1" step="0.005">
<label for="volume"><span id="letter-spacing_" class="num"></span>em字間</label>
```
```css
.num {
    text-combine-upright: all; /* 縦中横 */
    letter-spacing: 0; /* 字間 */
    text-transform: full-width; /* 全字全角 */
}
```

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.11/index.html

### ラベル数値が小さくなりすぎる問題

　ラベル数値が小さくなりすぎる問題がある。字間をゼロにする。文字を半角から全角にする。全角には`text-transform: full-width`でできると思ったのだが、見た目の大きさが変わらなかった。JSで文字コードを置換してやる必要がありそう。

* [text-transform](https://developer.mozilla.org/ja/docs/Web/CSS/text-transform)

　次のコードで大きさに違いがあることが確認できる。

```html
<p class="num">0.05</p>
<p class="num">０．０５</p>
```

```
1.50〜1.75〜2.00
0.050〜0.075〜0.1
```

　縦中横には全角文字を使ったほうがいい。おそらく縦書き用フォントは縦にしたときの全角文字バランスを考慮している。逆に半角文字は左詰めされている印象。これは半角文字が横書きを想定したフォントだからだと思われる。

writingMode|全角／半角
-----------|----------
vertical|全角
holizontal|半角

　CSSの`text-transform: full-width;`で可能だと思ったが、私の環境では半角のままだった。ググるとほとんどのブラウザで未対応（未実装）らしい。相変わらず縦書き環境についてはおざなりにされる。最悪、JSで強制的に文字コードを置換することで対応するハメになるだろう。

　縦中横にするときはせいぜい２字に収めたい。さもなくば小さすぎて見えない。とくに`0.075`のように５字もあるとまるで見えない。そこで表示文字を減らすために桁数を減らしたい。そのために単位を変えたい。

単位|概要
----|----
`em`|`font-size`を`1`としたときの相対値

　字間は`0.05em`〜`0.1em`の間の値でstepが`0.005`である。そのため`0.075em`のような５桁になってしまう。これを100倍して`%`表記にすれば`7.5`と3桁にできる。単位は`%字`。単なる`%`だとCSSが定義した画面全体の比率を指すことになってしまう。なのでここでは`%字`という独自の単位をつくる。単に`em`の百倍値にすぎないのだが。つまり`5%字`〜`10%字`となる。

　この`%字`は行間にも適用する。これで「字／行」「%字」という字の大きさを基準とした単位で設定できるようになった。ユーザとしてはピクセルだの`em`だの専門用語を出されるよりはわかりやすいはず。

　よって「縦中横が小さすぎる問題」を解決するには次の２点をクリアする必要がある。

* 縦書き用フォントを用いる（縦書きにしたときのフォント位置が適切になるよう調整されている）
* 半角でなく全角にする
* 字数（桁数）を減らす

## 字間、行間の単位をemから%字にしたい

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.12/index.html

　縦中横のとき`em`単位だと桁数が多くて字が小さくなりすぎる。そこで単位を百倍した`%字`にすることで桁数を減らす。たとえば字間`0.075`emの5桁を、`7.5`%字の3桁に減らす。これにて縦中横にしたときのフォントサイズが大きくなり読み取れるようになるはず。

　字間については`0.5`単位で丸める必要があったので関数を作った。

```javascript
function round(value, step=1.0) { // 指定したstep単位で丸める（今回は0.5単位で丸めたい）
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}
```
```javascript
document.querySelector('#letter-spacing_').innerHTML = round(value * 100, 0.5);
```

　JS内部では`em`単位で保持して、HTMLのラベルに表示するときは`%字`単位にする。

## バグ修正。WritingMode変更時に字／行の値がvalue属性に反映されていない

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.13/index.html

calcFontSize.js
```javascript
function setLineOfChars(writingMode) { // 字数／行を算出してHTMLにセットする
    const lineOfChars = parseInt(calcLineOfChars(writingMode))
    document.querySelector('#FontSize_').innerHTML = lineOfChars;
    document.querySelector('#FontSize').value = lineOfChars;
}
```

## WritingMode縦横それぞれのときでフォントサイズを共有しようとするとスライダー最大値を超えてしまうことがある

　デバイスピクセル比1(ブラウザ拡大率100%)、1920*1080、縦書き（WritingMode=vertical-rl）のとき、40字／行にしたあと、横書き（WritingMode=holizontal-tb）にしたら、71字／行になってしまう。これは縦横どちらのときも同じフォントサイズを維持するという現在の独自仕様によるものである。

* 最大字／行は50にしたい。日本語は１行あたり40字が適切とされており、最大でも50字以内が上限と考えられるから
* フォントサイズは変えたくない。何もしないとブラウザが自動的に縦横を変えたときフォントサイズを変えてしまう。私はそれが嫌で縦横フォントサイズを共通化した。けれど縦書き40字のときのフォントサイズを、横書きに適用すると71字分になってしまう。これはアスペクト比16:9のせい。

　さて、どうしたものか。選択肢は４つ。

* ブラウザのデフォルト実装にする。つまり縦横を変えたらフォントサイズも変更してしまう
* 現状の独自実装のままにする。つまり`WritingMode`、`screen.orientation`、`clientWidth`,`clientHeight`、`字／行`、`字間`からフォントサイズを算出する。現状のバグがある
* 現状の独自実装に倣いつつ、縦と横それぞれの字数／行を保持する。ユーザとしては二度手間な上に、縦と横でフォントサイズが共有されなくなるため使い勝手が悪い。デフォルトのブラウザ動作と同じであり、それが嫌で独自実装したため回帰したら本末転倒。
* 現状の独自実装に倣いつつ、WritingModeや画面向き変更時に字／行の数が最大値50を超えたら50にする。このときLocalStorageに保存する`WritingMode`と`字／行`は、超過する前のものであるべき。さもなくばリロードしたあとにWritingModeを戻すと超過後の値を基準に再計算されてしまうから。そうなると保存すべき値はピクセル単位のフォントサイズにするのがいいだろう。そこから縦／横それぞれに応じて字／行を算出すればいい。

screen.orientation|writingMode|解像度|最小字／行|最大字／行|初期値
------------------|-----------|------|----------|----------|------
`portrait`(縦置き)|`vertical-rl`(縦書き)|`clientHeight` <= `599`px|15|30|20
`portrait`(縦置き)|`vertical-rl`(縦書き)|`clientHeight` <= `1024`px|20|40|30
`portrait`(縦置き)|`vertical-rl`(縦書き)|`clientHeight` >= `1025`px|25|50|40
`portrait`(縦置き)|`holizontal-tb`(横書き)|`clientWidth` <= `599`px|15|30|20
`portrait`(縦置き)|`holizontal-tb`(横書き)|`clientWidth` <= `1024`px|20|40|30
`portrait`(縦置き)|`holizontal-tb`(横書き)|`clientWidth` >= `1025`px|25|50|40
`landscape`(横置き)|`vertical-rl`(縦書き)|`clientHeight` <= `599`px|15|30|20
`landscape`(横置き)|`vertical-rl`(縦書き)|`clientHeight` <= `1024`px|20|40|30
`landscape`(横置き)|`vertical-rl`(縦書き)|`clientHeight` >= `1025`px|25|50|40
`landscape`(横置き)|`holizontal-tb`(横書き)|`clientHeight` <= `599`px|15|30|20
`landscape`(横置き)|`holizontal-tb`(横書き)|`clientHeight` <= `1024`px|20|40|30
`landscape`(横置き)|`holizontal-tb`(横書き)|`clientHeight` >= `1025`px|25|50|40

* 最小フォントサイズ`10px`
* 最小スマホ解像度`320*480`
* 最小タブレット解像度`600`

```
320px / 10px = 32字
```

　スマホでは30最大字／行と考えてよい。`10px`は人が識字できる最小限度だと思われる。画数の多い漢字だと識字できない恐れもある。

```
600px / 10px = 60字
600px / 12px = 50字
600px / 15px = 40字
```

　タブレットでは40最大字／行と考えてよい。CSSでは`16px`が基準値だが、それより少し小さい。

```
1024px / 16px = 64字
1024px / 20.48px = 50字
1024px / 25.6px = 40字
```

　1024pxあれば40字を表示するのに１字あたり25pxにできる。こうなると１行あたりの適切な字数である40を基準にしたほうがよい。最大でも50字。それ以上はフォントサイズや余白で調整するようにしたほうが読みやすいだろう。

### 解像度ブレークポイント（ScreenSizeBreakPoint）

長辺|最小字／行|最大字／行|初期値
----|----------|----------|------
599px以下|15|30|20
1024px以下|20|40|30
1025px以上|25|50|40

ScreenSizeBreakPoint
```
long side px
long edge px
min line of chars
max line of chars
line of chars
```
```javascript
default class ScreenSizeBreakPoint {
    #longEdge;
    #lineOfChars;
    #minLineOfChars;
    #maxLineOfChars;
    constructor(longEdge, lineOfChars, minLineOfChars, maxLineOfChars) {
        this.#longEdge = longEdge;
        this.#lineOfChars = lineOfChars;
        this.#minLineOfChars = minLineOfChars;
        this.#maxLineOfChars = minLineOfChars;
    }
    get LongEdge() { return this.#longEdge; }
    get LineOfChars() { return this.#lineOfChars; }
    get MinLineOfChars() { return this.#minLineOfChars; }
    get MaxLineOfChars() { return this.#maxLineOfChars; }
}
```
ScreenSizeBreakPointFactory.js

```
[
    [599, 20, 15, 30],
    [1024, 30, 20, 40],
    [-1, 40, 25, 50],
]
```

```
const f = new ScreenSizeBreakPointFactory();
f.create([ // 字／行、最小字／行、最大字／行、解像度閾値（指定値以下なら適用する）
    [40, 25, 50],
    [30, 20, 40, 1024],
    [20, 15, 30, 599],
]);
```

```
const f = new ScreenSizeBreakPointFactory();
f.create([ // 字／行、最小字／行、最大字／行、解像度閾値（指定値以下なら適用する）
    [20, 15, 30, 599],
    [30, 20, 40, 1024],
    [40, 25, 50],
]);
```

* SmartPhoneFirst
* DesktopFirst

ScreenSizeBreakPointFactory.js
```javascript
import {ScreenSizeBreakPoint} from 'ScreenSizeBreakPoint.js'
default class ScreenSizeBreakPointFactory {
    #breakPoints = [];
    constructor(data) {
        for (const i of data) {
            this.#breakPoints.append(new ScreenSizeBreakPoint(i[0], i[1], i[2], (3 < i.length) ? i[3] : -1));
        }
    }
    get BreakPoints() { return this.#breakPoints; }
}
```


ScreenSizeBreakPointFactory.js
```javascript
import {ScreenSizeBreakPoint} from 'ScreenSizeBreakPoint.js'
default class ScreenSizeBreakPointFactory {
    #smartPhone;
    #tablet;
    #desktop;
    constructor() {
        this.#smartPhone = new ScreenSizeBreakPoint(599, 20, 15, 30);
        this.#smartPhone = new ScreenSizeBreakPoint(1024, 30, 20, 40);
        this.#smartPhone = new ScreenSizeBreakPoint(1025, 40, 25, 50);
    }
    get SmartPhone() { return this.#smartPhone; }
    get Tablet() { return this.#tablet; }
    get Desktop() { return this.#desktop; }
    get S() { return this.#smartPhone; }
    get M() { return this.#tablet; }
    get L() { return this.#desktop; }
}
```

　さらに全角の字数と半角の字数で分けたい。

BP|全角|半角
--|----|----
599px以下|15,20,30|30,40,60
799px以下|20,30,40|40,60,80
1024px以下|20,30,40|40,60,100
1279px以下|25,40,50|50,80,125
1280px以上|25,40,50|50,100,140

　最大字／行は小さくなる場合がある。たとえば599px以下である480pxのとき、半角の最大字／行は60だが、最小フォント10pxで並べると48字までとなる。ブラウザ仕様により最小フォントより小さくはできないため、最大字／行は60でなく48とするべき。

　逆に最大字／行はその閾値を超えることはない。たとえば1025px以上である1920pxのとき、最小フォント10pxで並べると192字までとなる。だが１行あたりが多すぎたり、フォントが小さすぎると読みづらい。なので英語圏Twitter上限値である140字を上限とする。

　端末やプログラミングでは80字／行である。これは半角文字を基準とした値である。なので初期値は80半角字／行とする。

　日本語圏では50最大全角字／行である。これは全角である。全角は半角の倍のサイズとなる。なので全角を基準としたとき半角では倍の100最大半角字／行となる。だが、日本語では１字あたりに多くの意味を伝えられるため少ない字数でもいいが、英語では１字あたりに込められる意味が少ない。必ず複数のアルファベットを用いる。つまり言語による情報密度の違いがある。よって全角／半角の幅だけで最大字数を決めるのはふさわしくない。

　概算だが、日本語は英語とくらべて情報密度が2.5倍だと言われている。

* https://nlab.itmedia.co.jp/nl/articles/1709/27/news114.html

英語|日本語
----|------
140|56

日本語|英語
----|------
50|125

　英語140字の情報量＝日本語56字の情報量である。

　日本語は１行あたり最大50字が適切。これが情報量に基づいた数だと仮定すると、英語では１行あたり125(`50 * 2.5`)字が適切だということになる。

　なお、端末では１行あたり80字が適切だという風習があった。これはディスプレイの解像度に関する限界値と思われる。現在は解像度が高まったことから100〜120字くらいが適切だとされているらしい。

　Twitterの140字制限の根拠はSMS（携帯のショートメール）によるもの。全部で160字だが20字分はユーザ名にあてており残り140字を自由につぶやける字数としたらしい。短く要約したほうが読むのに時間がかからず読みやすいのも理由か。

　2017年、Twitterは日本語以外、280字が上限となった。この事実からも日本語を含む漢字圏の言語では１字あたりの情報量が高いことを表している。ただ、この字数増加は政治的な戦略のものにすぎず、実際は必要性があまりないらしい。

* https://japan.cnet.com/article/35110222/2/

　重要なのは「要約すること」だと思う。何を言っているのかを端的に伝えることが大切だ。記事のタイトルをキャッチーにするのも同じことだ。パラグラフライティングではひとつのパラグラフ（段落）の先頭文に要約文（トピック・センテンス）を書く。日本語では１行あたり40字であり、それを１文の長さと仮定する。１文あたりは短くしたほうが理解しやすいため短くてもよいが、短すぎると情報量が足りない。その兼ね合いが難しい。概算として、要約文20字、詳細文40〜80字（1〜2文）、合計60〜100字くらいが、ひとつの話題について語れる適切な字数なのではないだろうか。だとすると英語140字とおなじ情報量である日本語56字というのは、かなり厳しい。要約した上でさらに端的に詳細を語らねばならない。頑張ればギリギリ収まるので、要約力が身につきそう。

　要約文は誤りやプロパガンダになりやすい。短い文字数だと情報量が減って「語れない事」が出てくる。それを字数制限のせいにして意図的に「語らない」ことで、人々の思考を誘導するような発言をくりかえす環境になる。ツイッターはまさにそういった環境であり、それが問題となって字数増加という対症療法をとったらしい。本や記事のキャッチーなタイトルも短い文である。よって要約された短文は、単純化された強力な伝達力をもつのである。

　そもそも英語圏は字数ではなく単語数が基準になる。折り返しの基準も単語（スペース）である。文書の規模を概算するのも単語数である。フォントが等幅ではなくプロポーショナルを使用していることが多いのも影響しているのだろう。

　だが、英語でも限られた紙面や画面に表示する１行あたりの字数という基準があってもいいと思う。じゃあ一体いくつにすればいい？　題材を調べてみる。プログラミングや端末では、かつて解像度の限界から80字／行とされていた。現在では100〜120が主流らしい。英語のブログでは90字程度だが、左右の余白が多かったり、著者情報など段組みされている。新聞でも段組みされており、１行あたりの字数が多くなりすぎないような工夫がある。

### 字／行の最大値や最小値を算出する

長辺閾値|最小|最大
--------|----|----
320〜599px|15|min(30, 32〜59=(長辺 / 10px))
600〜1024px|20|min(40, 60〜102=(長辺 / 10px), 40〜68.2(長辺 / 15px), 37.5〜64(長辺 / 16px))
1025〜1280px|25|min(50, 102〜128=(長辺 / 10px), 68.3〜85.3(長辺 / 15px), 64〜80(長辺 / 16px))

* 最小フォント: 10px
* 標準フォント: 16px
* 標準字／行: 40
* 最大字／行: 50

判定|最大字／行
----|----------
(SIZE / 10px) < 40|30
上下の中間|`(SIZE / 10px)`
(SIZE / 10px) > 50|50
(SIZE / 16px) > 50|50
((SIZE / 16px) / 40) < 2|40*2段
((SIZE / 16px) / 50) < 2|50*2段

　段組みすべきときはいつか。

* １行あたりが長過ぎる（50字以上）とき：ブログ
* 面積あたりに詰め込みたいとき：新聞

1920 / 10 = 192
1920 / 16 = 120

3 ((120字／行) / 40 ) < 2: 偽
2.4 ((120字／行) / 50 ) < 2: 偽

判定|最小字／行
----|----------
(SIZE / 10px) < 40|30
上下の中間|`(SIZE / 10px)`
(SIZE / 10px) > 50|50
(SIZE / 16px) > 50|50
((SIZE / 16px) / 40) < 2|40*2段
((SIZE / 16px) / 50) < 2|50*2段

　字／行の最大値や最小値の算出には文化圏・言語圏が関わっている。その言語における１字あたりの情報量に応じて変わる。英語圏が`1`だとすると日本語圏は`2.5`である。また、スマホやPCなどディスプレイの物理サイズや解像度でも変わってくる。大きければその言語圏における適切な字／行にすればよいが、画面が小さければ妥協して字数を減らさねばフォントが小さすぎて見えなくなってしまう。

### 段組み

* https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Columns/Using_multi-column_layouts

```css
#col {
  column-count: 2;
}
```
```html
<div id="col">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua.
  </p>
  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <p>
    Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.
  </p>
</div>
```
```
Lorem ipsum dolor sit amet, consectetur          |Duis aute irure dolor in 
adipisicing elit, sed do eiusmod tempor          |reprehenderit in voluptate velit esse cillum dolore eu fugiat 
incididunt ut labore et dolore magna aliqua.     |nulla pariatur.
                                                 |
Ut enim ad minim veniam, quis nostrud            |Excepteur sint occaecat cupidatat non 
exercitation ullamco laboris nisi ut aliquip ex  |proident, sunt in culpa qui officia deserunt 
ea commodo consequat.                            |mollit anim id est laborum.
````

　縦書きで段組みすると以下。

* https://www.webcreatorbox.com/tech/responsive-tategaki

```
```
２は
行じ
目ま
　り
----
４３
行行
目目
```

　段組みするときでも最小フォントサイズ10pxと標準字／行を意識すること。

```
段組み是非 = true/false
段組み数 = ((SIZE / 16px) / 40)
段組み数 = ((SIZE / 16px) / 50)
```

* 段組みToggleボタン
* 段組み数スライダー（最小値、最大値、初期値）

　段組みは見た目が大きく変わってしまう。ユーザの好みが分かれるため基本的には段組みせず１段で表示する。このときディスプレイサイズが大きいとフォントサイズを大きくすることで最大50字を表示するモードになる。ただ、人によってはもっとフォントサイズが小さくてもいいから１画面あたりの字数を増やしてページ送りに必要なクリック数を減らしたい人もいるだろう。そこで段組み表示できるオプションを用意する。

　段組みする段数を算出する。段組みは基本的に50字／行では少なかったり、フォントサイズをもっと小さくしても余裕で可読できるような大型ディスプレイを想定している。なので算出にもちいるフォントサイズは最小10pxではなく標準16pxにし、さらに字／行も標準40と最大50をもちいる。

　よって段組みモードのときのフォントサイズ指定は、字／行の40〜50の範囲しかない。さらに段組み数の最大値は`段組み数 = ((SIZE / 16px) / 40)`で計算される。最小値は`2`段。もし最大値が`2`ならスライダーUIにする必要はない。単に段組みToggleボタンだけでよい。もし最大値が`3`以上ならスライダーにする。もっともステップ値は`1`であるため、`2`と`3`のいずれかしかないが。

　このことから段組み１段のときと２段以上のときとでは、字／行の最小／最大値の算出方法が異なる。このため実装が複雑になるだろう。たとえばLocalStorageで起動時に状態を復元する時はどう保存するか。次の選択肢がある。

* 段組み数パターンどれかひとつだけを保存する
* １段とそれ以上の２パターンを保存する

　１パターンのみ保存するのが望ましい。理由は、保存して復元する目的が「そのデバイスとユーザにとって最適な表示」をすることだから。つまりユーザが自分の好みによって段組み数も決めているのだから、それこそが最適な状態だと判断する。

　ということは最初から段組みを想定したUI設計と計算式を考えて、実装もそれに作り直すべき。

　段組み数の最小値は1。ステップ値は`1`。最大値は以下の計算式により算出する。このときの`16px`は段組み時の最小フォント値、`40`は最小字／行である。

```
段組み最大値＝((SIZE / 16px) / 40)
```

　1920*1080、横置き、縦書きしたときの最大段組み数は1.6。整数値で小数点以下を切り捨てることから`1`になる。つまり段組みしない状態。

```
1.6875=(1080px / 16px) / 40字
```

　1920*1080、横置き、横書きしたときの最大段組み数は3。縦書き時とくらべて３倍である。

```
3=(1920px / 16px) / 40字
```

　段組みしたときのフォントサイズは最小でも16pxになる。あとは段組み数と字／行をスライダーで調整したとき自動的に変わる。最大3段まで組めるとき3段にしたら16pxだし、2段にしたらそれ以上、1段にしたらさらに増える。

　となると、今まで１段しか考えていない状態で字／行の閾値を決めていたが、今は段組みを考慮した上で字／行の閾値を決めるべきではないかと思えるのだ。

　たとえば1920*1080横置き、横書きのとき最大段組み数は`3`である。もし段組み数が`2`以上なら大型ディスプレイと判断してよい。そのときはたとえ1段であろうと字／行の最小値は40にしてしまっていいのではないだろうか。

```
16px/字 * 40字／行 * 2段 = 1280px
16px/字 * 50字／行 * 2段 = 1600px
```

　`1600`px以上あれば段組み数`2`にできると判断し、１段あたりの最小字／行を`40`、最大字／行を`50`にしてしまってよいと思われる。段組みしたときの字／行は`40`〜`50`にしたいため、最大である50字／行で計算したときの`1600`px以上を段組み`2`にできる判断の閾値としたい。

```
min-font-size-px = 10px;
standard-font-size-px = 16px;

line-height = localStorage || 1.5em;
min-line-height = 1.5em;
max-line-height = 2.0em;

letter-spacing = localStorage || 0.05em;
min-letter-spacing = 0.05em;
max-letter-spacing = 0.10em;

jp-standard-line-of-chars = 40;
jp-max-standard-line-of-chars = 50;
en-standard-line-of-chars = 80;
en-max-standard-line-of-chars = 100;

writingMode = localStorage || 'vertical-rl'

line-of-px = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
line-of-chars = localStorage || jp-standard-line-of-chars;
min-line-of-chars = jp-standard-line-of-chars;
max-line-of-chars = jp-max-standard-line-of-chars;

columns = localStorage || 1; // 1,2,3,...
min-columns = 1;
max-columns = parseInt((line-of-px / standard-font-size-px) / jp-standard-line-of-chars);

if (40 > (line-of-px / standard-font-size-px)) { // スマホ想定（639px以下）
  line-of-chars = localStorage || 20;
  min-line-of-chars = 15;
  max-line-of-chars = 30;
} else if (line-of-px < 1025) { // タブレット想定（1025px以下）
  line-of-chars = localStorage || 30;
  min-line-of-chars = 20;
  max-line-of-chars = 40;
}
```

　さて、本来の問題に戻ろう。縦置きから横置きに変えたときフォントサイズを維持する。しかしアスペクト比が違いすぎて字／行が最大値を超えてしまうことがある。どうしたらよいか。

* 同一フォントサイズを維持しつつ、字／行を超えていたら段組み数の増加で調整する

　これが最もスマートな解決策である。よって、この問題を解決するためにはまず段組みシステムを実装する必要がある。

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

　これをどうやって解決するか。いちいちHTMLを手書きしていたら超絶に大変。そこで青空文庫などの中間ファイル書式を作って、自動的に縦中横のHTMLにパースしてくれるような仕組みを作りたい。ただ、それをやるとページ送り単位をどうするかなど複数の別問題が併発する。たとえば１つの中間形式テキストファイルにすべての内容を入れるのか、それとも複数ファイルに分割するのか。WEB小説なら大体4000字で１ファイルにするし、電子本なら１ファイル１巻として10万字で１ファイルとする。これらを同じコードでそれぞれの媒体に応じて分割するにはどうしたらいいのか。また、それぞれの分割単位とは別に、次のテキストをどうやって表示するか。本のようにページ単位か、それともWEBサイトのようにスクロールか。スクロールにしたとき、縦書きだとマウスホイールが動作してくれない問題もある。媒体に応じて画面サイズが違い、１画面あたりに表示できる文字数が変わる。するとページ総数も変わる。このとき、進捗をあらわすページ数の表示はどうすべきか。また、栞をはさむときにどうするか。スクロールの座標を保存するのか、それともロードしたファイルパスも保存すべきか。

　このように果てしなく問題が波及してしまう。よってこの問題はまったくの別件として扱うべき。ここでは「縦中横はHTML要素で囲う必要がある」という問題があることを伝えるだけにしておく。解決はしない。

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

　横置き横書きで40字／行だと適正サイズなのに縦置きや縦書きまたは両方にすると実寸サイズが小さくなって見づらくなる問題。

　それを解決するために字／行は「縦書き」と「横書き」でそれぞれ個別に持てばいいと考えた。だがその場合、縦書き、横書きそれぞれでユーザは２回セットしなければならない。これは手間であり好ましくない。

　問題の本質はそこじゃない。正しくは「縦横どちらでも共通のフォント実寸サイズを算出して適用したい」である。たとえば１字あたり定規で測った5mmサイズにしたい。縦横関係なく。縦横どちらでも計算できるようにしたい。そして計算する単位はピクセルではなく「字／行」単位にしたいのだ。ユーザにわかりやすい単位だから。

　そもそもフォントサイズを変更する理由は、デバイスや人の視力、デバイスと目との距離など状況によって見やすいフォントサイズが異なるから。ユーザ自身が見やすいフォントサイズを調節できるようにしたい。これを解決するにはフォントの実寸サイズを算出するのがよい。だがピクセル単位でしか計算できない仕組みなのだ。mm（ミリメートル）換算できない。理由はディスプレイがピクセルでできていることと、物理ピクセルのサイズはデバイスごとに異なるから。なのでCSSピクセルで計算するしかない。CSSにはmmを含め様々な単位があるが、内部ではピクセル換算しているに過ぎない。

　さて、`Galaxy S5`の解像度`360*640`なとき、どうなるか計算してみよう。

画面の向き|WritingMode|最小フォントサイズ|最大字数／行
----------|-----------|------------------|------------
縦|縦|`height(640) / 10`|64
縦|横|`width(360) / 10`|36
横|縦|`height(360) / 10`|36
横|横|`width(640) / 10`|64

　このとき最大字数／行が`36`のときと`64`のときはどちらもフォントサイズが`10px`である。ユーザはスライダーUIを操作してフォントサイズを変更したい。最大字数／行より小さくするとフォントサイズが大きくなる。ただし、現状では縦と横で同じ値を共有してしまっている。なので不整合が起きる。たとえば縦縦のとき50字数／行にしたあと、横横にすると50になるはずだが、最大値が36なので切り捨てられて36になる。また、横横のとき30字／行にしたあと、縦縦にすると同じく30字／行だが、相対的にフォントサイズは小さくなってしまう。このように画面の向きやWritingModeによってフォントサイズが変わってしまうことを避けたい。

　画面の向きやWritingModeによってフォントサイズが変わってしまうことを避けるためには、フォントサイズの絶対値を算出し、異なる画面の向きやWritingModeにしたときのサイズに変換すればいい。もっといえば、`100vh`や`100vw`などの相対値単位を使わず、`16px`などの絶対値を使って指定すればいい。そのためには自力で字／行とピクセルの単位変換をする必要がある。

　ピクセル単位の値をCSSのfont-sizeにセットする。これにより`vw`,`vh`を使ったときのように縦置きと横置きによるフォントサイズの変化がなくなるため、ユーザがフォントサイズを調整する手間が一度だけで済む。

　と思っていたのだが、縦置き／横置きを変更したら勝手にフォントサイズが変更されてしまう。以下の設定でそれを抑制できるらしいが、私の環境ではできなかった。

```css
-webkit-text-size-adjust: 100%;
-moz-text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
text-size-adjust: 100%;
```

* https://stackoverflow.com/questions/40892327/why-is-font-size-changing-depending-on-portrait-or-landscape-for-mobile-devices


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

# 縦書きにするとマウスホイールによるスクロールができない

　マウスホイールでスクロールできるのは縦方向である。だが縦書きにすると縦方向は自動的に折り返して横方向へ文字が増えていく。なので縦書きのときは横方向へスクロールする必要がある。なのにマウスホイールでは縦方向にしかスクロールできない。マウスのチルト機能があれば横方向へスクロールできるが、チルトがあるマウスは少ない。

　そもそもスクロール操作はデバイスによって異なる。以下のような状況がありうる。

* チルトがないマウス
* ホイールがないマウス
* マウスやキーボードがないデバイス（タブレット）
* マウスもタッチもないデバイス（キーボードのみPC）

　これらを考慮すると、次のようにスクロールできるべきである。

デバイス|進む|戻る
--------|----|----
キーボード|`SPACE`|`Shift`+`SPACE`
マウス（クリック）|画面左側|画面右側
マウス（ホイール）|奥|手前
マウス（チルト）|左|右
タッチ|フリック（左→右）|フリック（右→左）

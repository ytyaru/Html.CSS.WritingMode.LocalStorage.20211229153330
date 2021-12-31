# 気になった点

* 縦書きだとフォント次第で鉤括弧など記号の位置がおかしい
* `<input type='button'>`でなく`<button type='button'>`を使うべきだった
* フォントサイズUIを操作しても`input`のフォントサイズが変化しない
* スライダーUIが縦書きにあわせて縦になってくれない
* ブラウザが表示できる最小フォントより小さい「字／行」を入力できないようにしたい（max値を最小フォント値より大きくなるよう計算したい）
* 縦だろうが横だろうが同じフォントサイズでいてほしい。けれど字／行の値は縦・横それぞれにふさわしい値になってほしい
* リサイズしてもフォントサイズは不変でいてほしい
* 「縦中横」はHTML要素で囲う必要がある
* 字／行は「縦書き」と「横書き」でそれぞれ個別に持ちたい
* 縦書きにするとマウスホイールによるスクロールができない

解決版|問題
------|----
`0`|縦書きだとフォント次第で鉤括弧など記号の位置がおかしい
`0.1`|`<input type='button'>`でなく`<button type='button'>`を使うべきだった
`0.1`|フォントサイズUIを操作しても`input`のフォントサイズが変化しない
`0.2`|スライダーUIが縦書きにあわせて縦になってくれない
`0.3`|ブラウザが表示できる最小フォントより小さい「字／行」を入力できないようにしたい（max値を最小フォント値より大きくなるよう計算したい）
`0.4`△|縦だろうが横だろうが同じフォントサイズでいてほしい。けれど字／行の値は縦・横それぞれにふさわしい値になってほしい
`0.4`|リサイズしてもフォントサイズは不変でいてほしい
`0.5`|字／行のスライダーmax値が大きくなりすぎないようにする（最小フォントサイズ10pxで算出するが、CSS変数で指定した値を超過しないようにする）
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

## リサイズしてもフォントサイズは不変でいてほしい

```javascript
window.addEventListener("resize", function (e) { // 窓をリサイズしたら
    console.log(e);
});
```

　利用状況の想定として基本的にリサイズすることはない。スマホやタブレットは画面が小さいため全画面表示するだろう。PCでも同じだ。1920*1080であれば縦半分に配置することがあるかもしれない。けれどそれで丁度いいときは縦書きであり１行あたりの字数が40字／行のときだろう。フォントサイズは変えないまま、表示される行数だけが半分になるような表示だ。スクロール量が倍になる。なのでリサイズ時のフォントサイズ調整に関しては考えなくていい。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0.4/index.html

　フォントサイズは不変でいいけど、字／行は増えることがある。フルスクリーン（全画面）にしたらメニューバーやタスクバーの分だけ表示領域が増えるから。そうなるとスライダーUIのラベル「字／行」の数を再計算させる必要が出てくる。

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

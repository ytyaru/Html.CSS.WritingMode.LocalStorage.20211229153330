# 保留

　気になっているが縦書きの域を超えるところがあるせいで大規模な実装が必要だったり、調査や理解が足りないなどの理由で保留していること一覧。

解決版|問題
------|----
``|縦書きにするとマウスホイールによるスクロールができない
``|「縦中横」はHTML要素で囲う必要がある（中間書式から自動でパースして作成したい）
``|「縦中横」の字幅は全角と半角で異なる（半角を全角に置換したい）

　以下は大規模すぎるため保留。

解決版|問題
------|----
``|表（テーブル）、画像、動画、音声を表示できるようにしたい（表をWritingModeでも適切に。画面サイズに応じて適切な画像サイズ選択）
``|ステータスプレートを表示したい（文章中に差し込み、改ページなどを適切に。設定画面から半透明でポップアップしいつでも閲覧可）
``|冒険者証カード（ドックタグ等）を表示したい
``|チャット画面を表示したい
``|人物相関図を表示したい
``|地の文と会話文をカスタム要素で分けたい（小説を構造化したい）
``|区切り単位と箇所を計算する（印刷する時は用紙サイズに適した箇所で区切る。ディスプレイ表示するときは画面サイズに適した箇所で区切る。それぞれサイズ変更が起きたときイベント発火させ、その都度再計算する。印刷とディスプレイでは異なるCSSを使い、かつbreak-afterの位置や値も適切に計算して別々に調整する。　http://shiru-web.com/2017/11/07/01-76/）

　以下はより詳細化して解決してゆくので削除予定。

解決版|問題
------|----
``|字／行は「縦書き」と「横書き」でそれぞれ個別に持ちたい？
``|最小フォント

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

## 「縦中横」はHTML要素で囲う必要がある（中間書式から自動でパースして作成したい）

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

## 「縦中横」の字幅は全角と半角で異なる（半角を全角に置換したい）

　半角だと小さくなりすぎる。全角だと適正。特に縦中横のときはそれが顕著である。なので縦書きのとき、少なくとも縦中横の箇所は半角文字をすべて全角にしたい。

　CSSで`text-transform: full-width;`とすれば全角になるはずだが、これを実装しているブラウザが現時点で皆無。そのため機能しない。

```css
.upright {
    text-combine-upright: all; /* 縦中横 */
    letter-spacing: 0; /* 字間 */
    text-transform: full-width; /* 全字全角 */
}
```
```html
<span class="upright">０．０７５</span>em
<span class="upright">0.0７５</span>em
```

　代案としては、JSで文字コード置換すること。それを実装するのは面倒くさいので、ぜひともCSSで対応できるようにしてほしい。


## 表（テーブル）、画像、動画、音声を表示できるようにしたい（表をWritingModeでも適切に。画面サイズに応じて適切な画像サイズ選択）

　表（テーブル）を縦書きにしたときどうなるか未調査。

　なろうのようなWEB小説ではよくステータス表示がある。アレをテーブルでやったら綺麗に表示できる気がする。けれど縦書き／横書きにも対応したい。

　他にもHTMLでできる特殊な表現を小説でも適切にできるようにしたい。

* `<table>`
* `<img>`
    * 画像（ラスタ）
    * 画像（ベクタ）
* `<video>`
* `<audio>`
* `<canvas>`
* `<embed>`
* `<kbd>`
* `<pre><code>`

## ステータスプレートを表示したい（文章中に差し込み、改ページなどを適切に。設定画面から半透明でポップアップしいつでも閲覧可）

　なろう小説ではよくステータス表示がある。著者が独自に項目と値をセットできるようにしたい。また、計算式を埋め込んで自動算出できるようにもしたい。たとえばnnn話では最初の話から3年経過している設定だから`+3年`するとキャラの年齢が加算されて表示するなど。

* 名前
* 種族
* 性別
* HP、MP、命、体、気、力、速、知、技、器、運、魅
* 家族構成

## 冒険者証カード（ドックタグ等）を表示したい

* ランク（等級、階級）
* 名前
* 顔
* 履歴（賞罰、昇降格）
* 所属（チーム、パーティ、クラン）

## チャット画面を表示したい

```
　　　┌─────┐
　　　│きいてよ！│＼　／
　　　│山田にパン│◯　◯
　　　│ツとられた＞　◯　
　　　└─────┘
　　　┌─────┐　　　
／　＼│それは災難│　　　
◯　◯│だったね〜│　　　
　▽　＜大丈夫？　│　　　
　　　└─────┘　　　
```

## 人物相関図を表示したい

　登場人物同士の関係性を図で表したい。

```
[主人公]
　　　　　兄妹
　　山田ーーーーさな [味方]
　　｜
　　｜敵対
　　｜
　　鈴木 [ライバル]
```

　また、オプションで物語におけるキャラごとの役割も表示できたらいいな。


## 地の文と会話文をカスタム要素で分けたい（小説を構造化したい）

　よく考えたら小説の文章構造は「」と「」の２つに大別できる。なのにHTMLにはそれを分ける要素がない。そこで小説の文書構造について考え、専用のカスタム要素を作ろうと思いついた。

* 作品（紹介、要約、表題（タイトル。見出し））
* 冊子（紹介、要約、表題（タイトル。見出し））
* 分割単位（著者、シリーズ、作品、編`arc`、部`part`、巻`volume`、話`episode`、章`chapter`、節`section`、段落`paragraph`）
* 印刷

カスタム要素|概要
------------|----
`<novel-monologue>`|地の文
`<novel-talk>`|会話文

　それぞれには順序をあらわす数字などがつく。さらに副題がつくこともある。特に`編`は数字ではなく副題であらわす。外伝も同じ。

カスタム要素|分割単位|分割基準|例
------------|--------|--------|--
|シリーズ|アトリエ（エリー／マリー）、とある（魔術の禁書目録／科学の超電磁砲）
|作品|とある魔術の禁書目録、とある科学の超電磁砲
|外伝(スピンオフ)|とある科学の超電磁砲（とある魔術の禁書目録からスピンオフした派生作品）
|編|皆殺し編
|部|1部,2部,FF7,FF8
|巻|上巻,中巻,下巻,1巻,2巻
|章|1章,2章
|節|1節,2節
|項|1項,2項
|目|1,2（`1目`のように`目`を単位として表記することは稀。もっぱら`1`のような数値のみ）

`<novel-book>`|本、1冊|字数
`<novel-arc>`|編|物語の時間や主人公（登場人物視点）
`<novel-arc>`|部|
`<novel-part>`|部、編|物語の時間や主人公（登場人物視点）
`<novel-monologue>`|地の文
`<novel-talk>`|会話文

和|英
--|--
シリーズ|`series`
作品|`work`
編|`arc`
部|`part`
巻|`volume`
章|`chapter`
節|`section`
項|`item`

和|英
--|--
話題|`topic`
段落|`paragraph`
文|`sentens`
語|`word`
字|`letter`,`charactor`,`alphabet`

　単位あたりの大凡の字数。

単位|字数
----|----
1巻|約10万字(8〜12万字)
1巻|約6章（4〜12章）
1章|約2万字（1〜2万字）
1章|約4話（1〜2万字）
1話|2000〜5000字

単位|字|話|章
----|--|--|--
1巻|10万(8〜12万)|20話(5千字／話)〜60話(2千字/話)|6(4〜12)
1章|2万(1〜2万)|4話(1〜2万字)|
1話|2千〜5千|4話(1〜2万字)

* [【英単語】「編」という意味の「arc」](https://b8270.hateblo.jp/entry/arc)
* [本の1巻、２巻って英語でなんて言うの？](https://eikaiwa.dmm.com/uknow/questions/21674/)
* [第1章について](https://www.raitonoveru.jp/counsel/novels/thread/2997)

　次のような流れが大事。

1. 何を書くか決める
1. プロットを決める
1. 過不足なく説明・描写する
1. 完結させる
1. 区切り見極め（要約、副題）
1. 章立て（分割決定、字数調整）

## 字／行は「縦書き」と「横書き」でそれぞれ個別に持ちたい？

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

　さらに段組みまで考える必要があるとわかった。

## 最小フォント

　ブラウザによっては9px、10pxなど最小フォントが定められている。これよりも小さく表示しようとしてもできない。

　それはいいのだが、不都合が起きた。画面サイズが小さいとき（デベロッパツール Galaxy S5 360*640）に横書きで40字／行にすると、指定値が最小フォントより小さい値を指定しているのに、表示上は大きいままになってしまう。どうやら36字／行が最小らしい。横幅360pxで１字10pxに縮めると36字入る。１字あたりはこれ以上小さくできないため、最大で36字／行となるわけだ。

　そこで、最小フォントサイズより小さくできないように入力UIの`max`値を算出したい。

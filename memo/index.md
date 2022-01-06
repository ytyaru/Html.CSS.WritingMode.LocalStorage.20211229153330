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
`0.13`|バグ修正。WritingMode変更時に字／行の値がvalue属性に反映されていない
`0.14`|名前の統一（ファイル名、変数名）。考察メモ追加（WritingMode縦横それぞれのときでフォントサイズを共有しようとするとスライダー最大値を超えてしまうことがある。どうやって解決するか。段組みシステムを実装し、段組み数を増加することで同一フォントを維持するようにする））
`0.15`|段組み用CSS変数追加（ついでにJSで計算している値や、将来使うかもしれない値などを用意する。ただしJS側が未対応）
`0.16`|フォント計算式をCSSに作る（JSでイベントフックしCSS変数に値セットする）
`0.17`|段組み用スライダーUIを用意する（1600px以上のとき2段以上にできる。フォントサイズ計算は未実装のため2段以上で字／行不一致バグあり）
`0.18`|字／行の計算に段組数を反映させる
`0.19`|最大段組数が1のときは段組数スライダーを隠す
`0.20`|調査中。段組み領域を1画面サイズにしたい（widthやheightを調整すればよい。column-widthは常に100vw。column-countは不要）
`0.21`|段組み領域を1画面サイズにしたい（widthやheightを調整すればよい。column-widthは常に100vw。column-countは不要。ただしcolumn-gap,column-rule-widthにおける余白が考慮されていないため1画面よりわずかに大きい！）
`0.22`|0.22 段組み領域を1画面サイズにしたい（widthやheightを調整すればよい。column-widthは常に100vw。column-countは不要。余白(column-gap)をvw,vh単位で計算した（ピクセル単位で計算するとなぜかバグる。でもフォントサイズは余白もピクセル単位で計算しているので合わせたい））


`0.20`|段組みの改ページ（改カラム）位置を指定したい（p要素のうち画面サイズ超過する箇所）

`0.20`|段組み領域を1画面サイズにしたい（`column-width:`, `width`, `height`, `column-gap`, `column-rule-width`, `break-after: column;`）

`0.21`|段組み領域を1画面サイズにしたい（widthやheightを調整すればよい。column-widthは常に100vw。column-countは不要。ただしcolumn-gap,column-rule-widthにおける余白が考慮されていない！）

0.20 調査中。段組み領域を1画面サイズにしたい（widthやheightを調整すればよい。column-widthは常に100vw。column-countは不要）

``|1画面に収まる単位を算出したい
``|1画面ごとに1段組み化したい。すべての画面終端位置を取得し、そこに`break`を仕込んで改ページし、そこへscroll-snapすることでページ送りできるようにしたい。

``|最大字／行は作品の対象年齢によって変えたい。小中学生だと25〜30字くらいにしたい。WEB小説などがそれ。改行を多めにいれて字数を減らしている。さらに漢字をへらしてひらがなを多めにしている。などなど対象年齢による違いもある。

``|`h1,h2,h3,h4,h5,h6 { column-span:all; }`を指定する。

``|画面が見切れないようにする（ページ単位、行単位で表示する）
``|ページ数を算出する（画面サイズ、フォントサイズ、スクロール位置から算出）

``|スライダーの固定された最小・最大値をJSでセットする。CSS変数から取得する。べつにHTMLに直書きでもいいのでは？困ってから対処しよう
``|スライダーの現在値をCSSでセットする（`input[type='ranger'] > label > span:first-of-type {content: attr(value)}`,`attr`）。writing-mode変更時はJSでセットせねばならないためCSSで値セットする必要性・有効性がない。よって却下。
``|スライダーの範囲値をCSSでセットする。できない。HTML要素の属性値を動的にセットするのはJSのみ可能。（`content`,`attr`）
``|スライダーの固定された最小・最大値をCSSでセットする。できない。HTML要素の属性値を動的にセットするのはJSのみ可能。
``|トグルボタンの現在値をCSSでセットする。疑似クラスでできる？　できない？　少なくともCSSではテキストノードを直接選択できない。イベント発火時にセットせねばならないためJSであるべき。よって却下。

　以下の初版を作って動作させたところ、上記のように大量の問題点が出てきた。

* https://ytyaru.github.io/Html.CSS.WritingMode.LocalStorage.20211229153330/0/index.html

　気になる情報。

* [Webブラウザで本を作ろう【CSSで組版 第1回】](https://www.ntt-tx.co.jp/column/dojo_review_blog/20180710/)
    * [vivliostyle](https://vivliostyle.org/)
    * [Vivliostyle Chrome拡張](https://chrome.google.com/webstore/detail/vivliostyle/ffeiildjegeigkbobbakjjmfeacadbne)
    * [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
* [縦書きCSSの夢：電子書籍みたいにページ単位でページ送りをする話](https://qiita.com/rutan/items/4d038b8ed14c99040617)
* [【CSS】本のページをめくるCSS【シンプルに改善版】](https://little-strange.hatenablog.com/entry/2021/08/30/235839)
* [表示領域にピタッと移動！CSSでスクロールスナップを実装しよう](https://www.webcreatorbox.com/tech/scroll-snap)
* [CSSスクロールスナップ](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts)



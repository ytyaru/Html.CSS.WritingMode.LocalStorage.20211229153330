# 相互変換

　各形式を相互変換したい。

## 形式

　４つの形式がある。

形式|例|目的
----|--|----
plain|`漢字(かんじ)`|テキストエディタによる可読性と編集性を最優先
aozora|`｜漢字《かんじ》`|日本語小説用。青空文庫をはじめとした小説の軽量マークアップ言語
denden|`{漢字|かんじ}`|電子書籍用。元はmarkdownにrubyを追加したもの。
html|`<ruby>漢字<rt>かんじ</rt></ruby>`|最終表示。ブラウザでルビを閲覧できる。

# 相互変換

## API

* from
    * fromPlain
    * fromAozora
    * fromDenden
    * fromHtml
* to
    * toPlain
    * toAozora
    * toDenden
    * toHtml

## ユースケース

　ユーザの目的に応じて最適な形式がある。主に以下３つの形式を相互変換する。

* `plain` <-> `aozora` <-> `html`

要望|形式
----|----
テキストエディタで閲覧・編集したい|plain
ブラウザでルビ表示したい|html
小説投稿サイトに投稿したい|aozora (Kakuyomu, Narou)

　各形式に相互変換する。パターンを網羅する。

### 小説

変換プロセス|目的
------------|----
plain -> aozora|テキストエディタ編集したものを小説投稿サイトへ投稿する
plain -> aozora -> html|テキストエディタ編集したものをブラウザで閲覧する
aozora -> plain|小説投稿サイト形式をテキストエディタで閲覧・編集する
aozora -> html|小説投稿サイト形式をブラウザで閲覧する
html -> plain|ブラウザ閲覧内容をテキストエディタで閲覧・編集する
html -> aozora|ブラウザ閲覧内容を小説投稿サイトへ投稿する

### 本・ブログ

変換プロセス|目的
------------|----
md -> html|マークダウンをブラウザで閲覧する
md -> denden -> html|マークダウンをブラウザで閲覧する。ルビも。
html -> md|ブラウザ閲覧内容をマークダウンにする
html -> md -> denden|ブラウザ閲覧内容をマークダウンにする

* `md` <-> `denden` <-> `html`
* `md` <-> `denden` <-> `epub`
* `html` <-> `epub`
* `html` <-> `denden` <-> `md`
* `epub` <-> `html`
* `epub` <-> `denden` <-> `md`


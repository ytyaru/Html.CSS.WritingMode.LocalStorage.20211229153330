# ページ・段組み

　次のような要件がある。

* ディスプレイや印刷をするとき、文字が中途半端に見切れることなく表示・印字したい
* ディスプレイや紙面が大きいとき、段組みしたいことがある

　1画面（ページ）と段組は同時に考えてCSS設定する必要がある。

## 縦書きCSS

```css
body {
    width: 100vw;
    height: 50vh; /* 2段にしたいなら50vh。つまり height = 100vh / 段数; (column-gapも考慮せよ) */
    column-width: 100vw;
    column-gap: 2em; /* 段組み余白 */
    column-rule: 4px solid black; /* 段組み装飾 */
}
```

## 横書きCSS

```css
body {
    width: 50vw; /* 2段にしたいなら50vh。つまり width = 100vw / 段数; (column-gapも考慮せよ) */
    height: 100vh;
    column-width: 100vw;
    column-gap: 2em; /* 段組み余白 */
    column-rule: 4px solid black; /* 段組み装飾 */
}
```

## ダメだったパターン

　columnをネストして2段構えにしようとしたが、ダメだった。つまり、親カラムは画面サイズにし、子カラムは段組み分割サイズにしようとした。けれどなぜか全テキストが消失したり、一切スクロールできなかったりと、失敗した。

```html
<body>
    <main>
        <p>本文。</p>
    </main>
</body>
```

親
```css
body {
    width: 100vw;
    height: 100vh;
    column-width: 100vw;
    column-gap: 2em; /* 段組み余白 */
    column-rule: 4px solid black; /* 段組み装飾 */
}
```
子（以下パターンを試したがどれも失敗）
```css
main {
    column-count: 2;
}
```
```css
main {
    column-width: 250px; /* body column-width の半分のピクセルサイズ */
    column-gap: 2em;
    column-rule: 1px solid black;
}
```

```css
main {
    width: 100vw;
    height: 50vh;
    column-width: 100vw;
    column-count: 2;
    column-gap: 2em;
    column-rule: 1px solid black;
}
```

## ページ

　1画面

function calcFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出する
    /*
    // 段組みがない場合
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const F = LINE_OF_PX / lineOfChars; // 字間なし時の１字あたりのフォントサイズ
    const L = F * letterSpacing; // 字間サイズ（emからpxに変換）
    const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）
    const fontSizePx = (LINE_OF_PX - ALL_LETTER_SPACING) / lineOfChars; // 入力した字／行と字間からピクセル単位でフォントサイズを算出する
    console.log(`${fontSizePx}。フォントサイズpx算出（writingMode:${writingMode}, lineOfChars:${lineOfChars}, letterSpacing:${letterSpacing}）。(１行の表示領域 - 全字間サイズ) / １行の字数\n＝((clientHeight or clientWidth) - ((字間なし字の１字あたりのフォントサイズpx * 字間em) * (１行の字数 - 1)) / １行の字数\n＝(${LINE_OF_PX} - ${ALL_LETTER_SPACING}) / ${lineOfChars}`);
    return fontSizePx;
    */

    const IS_VERTICAL = ('vertical-rl' === writingMode);
    /*
    if (IS_VERTICAL) {
        if (document.body.clientHeight < window.screen.availHeight) { return; }
    } else {
        if (document.body.clientWidth < window.screen.availWidth) { return; }
    }
    */

    // 段組みがある場合
    const LINE_OF_PX = (IS_VERTICAL) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const F = LINE_OF_PX / lineOfChars; // 字間なし時の１字あたりのフォントサイズ
    const L = F * letterSpacing; // 字間サイズ（emからpxに変換）
    const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）
//    const COL_GAP_PX = getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-px') || (FontSizePx * 2);
    const COL_GAP_PX = F * 2; // em(--column-gap-em)
//    const COLUMNS = document.querySelector('#columns').value;
    const COLUMNS = getComputedStyle(document.querySelector(':root')).getPropertyValue('--columns');
    const fontSizePx = (LINE_OF_PX - ALL_LETTER_SPACING - COL_GAP_PX) / (lineOfChars * COLUMNS); // 入力した字／行と字間からピクセル単位でフォントサイズを算出する
    console.log(`${fontSizePx}。フォントサイズpx算出（writingMode:${writingMode}, LINE_OF_PX:${LINE_OF_PX}, ALL_LETTER_SPACING:${ALL_LETTER_SPACING}, columns:${COLUMNS}, COL_GAP_PX:${COL_GAP_PX}, lineOfChars:${lineOfChars}, letterSpacing:${letterSpacing}, ）。(１行の表示領域 - 全字間サイズ - 全段組余白px) / (１行の字数 * 段組数)\n＝((clientHeight or clientWidth) - ((字間なし字の１字あたりのフォントサイズpx * 字間em) * (１行の字数 - 1)) / １行の字数\n＝(${LINE_OF_PX} - ${ALL_LETTER_SPACING}) / ${lineOfChars}`);
    return fontSizePx;
}
function setFontSizePixel(writingMode, lineOfChars, letterSpacing) { // フォントサイズをピクセル単位で算出してHTMLにセットする
    const px = calcFontSizePixel(writingMode, lineOfChars, letterSpacing);
    document.querySelector(':root').style.setProperty('--font-size-px', `${px}`);
}
function calcLineOfChars(writingMode) { // 字数／行を算出する（writingMode,フォントサイズpx,行間emから。縦横ボタン押下時）
    // １行あたりの字数＝(LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx)
    // console.log(document.querySelector('body').style);
    const FontSizePx = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size-px'));
    const LetterSpacingPx = FontSizePx * document.querySelector('#letter-spacing').value;
    const LINE_OF_PX = ('vertical-rl' === writingMode) ? document.body.clientHeight : document.body.clientWidth; // １行の表示領域
    const lineOfChars = (LINE_OF_PX - LetterSpacingPx) / (FontSizePx + LetterSpacingPx);
    console.log(`${lineOfChars}字／行。${window.screen.orientation.type} ${writingMode} ${LINE_OF_PX}px行長 ${FontSizePx}px字大 ${LetterSpacingPx}px字間`);
    return lineOfChars;
}
function setLineOfChars() { // 字数／行を算出してHTMLにセットする
    const lineOfChars = parseInt(calcLineOfChars(document.querySelector('#writing-mode').value))
    document.querySelector('#line-of-chars-label').innerHTML = lineOfChars;
    document.querySelector('#line-of-chars').value = lineOfChars;
}
function calcScreenSize(writingMode, columns) { // 画面比率を変える（writingModeと段組数に応じて）

    /*
    // vw, vh基準
//    const writingMode = document.querySelector('#writing-mode').value;
    const FULL_ID = ('vertical-rl' === writingMode) ? '--width-vw' : '--height-vh' ;
    const SPLIT_ID = ('vertical-rl' === writingMode) ? '--height-vh' : '--width-vw' ;
    document.querySelector(':root').style.setProperty(FULL_ID, 100);
    document.querySelector(':root').style.setProperty(SPLIT_ID, 100/columns); // 段組み数で割る
    */

    // colmun-gapをpx基準にしてみる
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const FULL_ID = (IS_VERTICAL) ? '--width-px' : '--height-px' ;
    const SPLIT_ID = (IS_VERTICAL) ? '--height-px' : '--width-px' ;
    console.log(`writingMode:${writingMode}, FULL_ID:${FULL_ID}, SPLIT_ID:${SPLIT_ID}`);

    // ブラウザを中途半端に小さくしたとき用にclientWidth,clientHeightも考慮したかったが、この値はHTML要素サイズになることがあるため画面サイズより小さくなってしまうことがあるっぽい。それは困るため画面サイズを取得するようにした。そのせいでウインドウを縮小したとき、それに合わせてくれなくなってしまう。
//    const WIDTH = Math.min(window.screen.availWidth, document.body.clientWidth); // 画面サイズまたはスクロール含むサイズ
//    const HEIGHT = Math.min(window.screen.availHeight, document.body.clientHeight);
    const WIDTH = window.screen.availWidth; // 画面サイズまたはスクロール含むサイズ
    const HEIGHT = window.screen.availHeight;
    console.log(`client W:${document.body.clientWidth} H:${document.body.clientHeight}\nscreen W:${window.screen.availWidth} H:${window.screen.availHeight}\n`);

    const FULL_EDGE_PX = (IS_VERTICAL) ? WIDTH : HEIGHT;
    const SPLIT_EDGE_PX = (IS_VERTICAL) ? HEIGHT : WIDTH;
//    const SPLIT_EDGE_PX = (IS_VERTICAL) ? WIDTH : HEIGHT;
//    const FULL_EDGE_PX = (IS_VERTICAL) ? HEIGHT : WIDTH;
    console.log(`FULL_EDGE_PX:${FULL_EDGE_PX}, SPLIT_EDGE_PX:${SPLIT_EDGE_PX}`)

    const LINE_OF_PX = (IS_VERTICAL) ? HEIGHT : WIDTH; // １行の表示領域
    const lineOfChars = document.querySelector('#line-of-chars').value;
    const letterSpacing = document.querySelector('#letter-spacing').value;
    const F = LINE_OF_PX / lineOfChars; // 字間なし時の１字あたりのフォントサイズ
    const L = F * letterSpacing; // 字間サイズ（emからpxに変換）
    const ALL_LETTER_SPACING = L * (lineOfChars - 1); // 全字間サイズ（px）

//    document.querySelector(':root').style.setProperty('--column-gap', `5v${(IS_VERTICAL) ? 'h' : 'w'}`);
//    const COL_GAP = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap')) * 1.5;
//    const COL_GAP_PX = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-px'));
    const COL_GAP_PX = F * 2; // em
    const ALL_COL_GAP_PX = COL_GAP_PX * (columns - 1);
//    const ALL_COL_GAP = COL_GAP * (columns - 0);
//    const ALL_COL_GAP = COL_GAP * (columns - 1);

    // 段組数で分割した1段あたりのサイズ
//    const SPLIT_PX = (SPLIT_EDGE_PX - ALL_COL_GAP_PX) / columns;
//    const SPLIT_COL_PX = (SPLIT_EDGE_PX - ALL_LETTER_SPACING - ALL_COL_GAP_PX) / columns;
    const SPLIT_COL_PX = (SPLIT_EDGE_PX / columns) - COL_GAP_PX;
    console.log(`SPLIT_COL_PX:${SPLIT_COL_PX}`);

    document.querySelector(':root').style.setProperty(FULL_ID, FULL_EDGE_PX);
    document.querySelector(':root').style.setProperty(SPLIT_ID, SPLIT_COL_PX);
//    document.querySelector('body').style.setProperty(FULL_ID, `${FULL_EDGE_PX}px`);
//    document.querySelector('body').style.setProperty(SPLIT_ID, `${SPLIT_COL_PX}px`);

//    getComputedStyle(document.querySelector('body')).setProperty((IS_VERTICAL) ? 'width' : 'height', FULL_EDGE_PX);
//    getComputedStyle(document.querySelector('body')).setProperty((IS_VERTICAL) ? 'height' : 'width', SPLIT_COL_PX);


//    getComputedStyle(document.querySelector('body')).setProperty('column-width', `${WIDTH}px`)
//    document.querySelector('body').style.setProperty('column-width', `${WIDTH}px`)
//    document.querySelector('body').style.setProperty('column-width', `${SPLIT_EDGE_PX}px`)
//    document.querySelector('body').style.setProperty('column-width', `${FULL_EDGE_PX}px`)

    console.log(`COL_GAP_PX:${COL_GAP_PX}`)
    console.log(`分割px:${SPLIT_COL_PX}`)
    console.log(`body w:${getComputedStyle(document.querySelector('body')).getPropertyValue('width')}`)
    console.log(`body h:${getComputedStyle(document.querySelector('body')).getPropertyValue('height')}`)
    console.log(`:root w:${getComputedStyle(document.querySelector(':root')).getPropertyValue('--width-px')}`)
    console.log(`:root h:${getComputedStyle(document.querySelector(':root')).getPropertyValue('--height-px')}`)
    console.log(`:${FULL_ID}=${FULL_EDGE_PX},${SPLIT_ID}=${SPLIT_EDGE_PX},${WIDTH},${HEIGHT},,,${ALL_COL_GAP_PX},${columns},${SPLIT_COL_PX}`)
//    console.log(`body w:${getComputedStyle(document.querySelector('body')).getPropertyValue('width')}`)
//    console.log(`body h:${getComputedStyle(document.querySelector('body')).getPropertyValue('height')}`)
//    console.log(`body column-width:${getComputedStyle(document.querySelector('body')).getPropertyValue('column-width')}`)

    document.querySelector('body').style.setProperty('column-width', `${WIDTH}px`)
//    document.querySelector('body').style.setProperty('column-width', `${(SPLIT_EDGE_PX - ALL_LETTER_SPACING - ALL_COL_GAP_PX) / columns}px`)
    console.log(`body column-width:${getComputedStyle(document.querySelector('body')).getPropertyValue('column-width')}`)

    // 再描画（これでいいんだっけ？）
//    document.querySelector('body').style.display = (IS_VERTICAL) ? 'inline' : 'inline-block';





    // colmun-gapをem基準にしてみる

    /*
    // colmun-gapをvw,vh基準にしてみる
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const FULL_ID = (IS_VERTICAL) ? '--width-vw' : '--height-vh' ;
    const SPLIT_ID = (IS_VERTICAL) ? '--height-vh' : '--width-vw' ;
//    document.querySelector(':root').style.setProperty('--column-gap', `5v${(IS_VERTICAL) ? 'h' : 'w'}`);
//    const COL_GAP = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap')) * 1.5;
    const COL_GAP = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap'));
    const ALL_COL_GAP = COL_GAP * (columns - 1);
//    const ALL_COL_GAP = COL_GAP * (columns - 0);
//    const ALL_COL_GAP = COL_GAP * (columns - 1);
    document.querySelector(':root').style.setProperty(FULL_ID, 100);
    document.querySelector(':root').style.setProperty(SPLIT_ID, (100 - ALL_COL_GAP) / columns); // 段組み数で割る
    console.log(`COL_GAP:${COL_GAP}`)
    */


    /*
    const WIDTH = Math.min(window.screen.availWidth, document.body.clientWidth); // 画面サイズまたはスクロール含むサイズ
    const HEIGHT = Math.min(window.screen.availHeight, document.body.clientHeight);
    const FULL_EDGE_PX = (IS_VERTICAL) ? WIDTH : HEIGHT;
    const SPLIT_EDGE_PX = (IS_VERTICAL) ? HEIGHT : WIDTH;
    const COL_GAP_PX = getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-px');
    const ALL_COL_GAP_PX = COL_GAP_PX * (columns - 1); // columnsは1以上の整数

    document.querySelector('body').style.setProperty(FULL_ID, FULL_EDGE_PX);
    document.querySelector('body').style.setProperty(SPLIT_ID, `${((SPLIT_EDGE_PX - ALL_COL_GAP_PX) / columns)}px`); // 段組み数で割る
//    document.querySelector('body').style.setProperty(SPLIT_ID, `calc(var(${SPLIT_ID}) / ${columns})`100/columns); // 段組み数で割る
    */

    /*
    // ピクセル基準
    const IS_VERTICAL = ('vertical-rl' === writingMode);
    const FULL_EDGE_ID = (IS_VERTICAL) ? '--width-px' : '--height-px';
    const SPLIT_EDGE_ID = (IS_VERTICAL) ? '--height-px' : '--width-px';

    const WIDTH = Math.min(window.screen.availWidth, document.body.clientWidth); // 画面サイズまたはスクロール含むサイズ
    const HEIGHT = Math.min(window.screen.availHeight, document.body.clientHeight);

    const FULL_EDGE_PX = (IS_VERTICAL) ? WIDTH : HEIGHT;
    const SPLIT_EDGE_PX = (IS_VERTICAL) ? HEIGHT : WIDTH;

    const COL_GAP_PX = getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap-px');
    const ALL_COL_GAP_PX = COL_GAP_PX * (columns - 1); // columnsは1以上の整数

    document.querySelector(':root').style.setProperty(FULL_EDGE_ID, FULL_EDGE_PX);
    document.querySelector(':root').style.setProperty(SPLIT_EDGE_ID, (SPLIT_EDGE_PX - ALL_COL_GAP_PX) / columns); // 段組み数で割る
    */
}

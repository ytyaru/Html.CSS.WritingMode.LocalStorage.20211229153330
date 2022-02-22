async function makeIndexPage() {
    defineConst('IndexDatas', TsvTable.toObjects(await FileLoader.text('./book/index.tsv')));
    console.debug(IndexDatas);
    const TITLE = `小説サイト`;
    const WORKS = IndexDatas.length;
    const CHARS = IndexDatas.map(data=>data.chars).reduce((sum, v)=>sum+v);
    return ElementString.get('h1', `${TITLE}`) + 
           ElementString.get('span', `${formatNumber(WORKS)}作品`) + 
           '　' + 
           ElementString.get('span', `${formatNumber(CHARS)}字`) + 
           '<br>' + 
           makeSorter() + await makeFilters() +
           ElementString.get('ul', IndexDatas.map(d=>makeWorkList(d.id, d.title)).join('\n'));
}
function formatNumber(num) {
    //return num.toLocaleString(); // nnn,nnn,nnn,nnnのように3桁刻みでカンマを入れる
    /*
    // 万,億,兆まで。京は出なかった。5.6万など四捨五入されてしまう。281兆4749億7671万656のように細かい値を出したい。
    const fmt =  new Intl.NumberFormat("ja-JP",{ 
        notation: "compact",
    })
    for (let i=2; i<15; i++) {
        console.debug(fmt.format(BigInt(64 ** i) ));
    }
    */
    function fullFormat(number) {
        const formatter = new Intl.NumberFormat("ja-JP",{ 
            notation: "compact",
            useGrouping: false,
            maximumFractionDigits: 0
        })
        const fmt = (number, result = []) => {
            const bigIntNum = BigInt(number)
            const [num, notation] = formatter.formatToParts(bigIntNum)
            const numStr = bigIntNum.toString()
            if (notation === undefined) {
                return [...result, numStr].join('')
            }
            const dig = num.value.length
            const value = numStr.slice(0, dig)
            const next = numStr.slice(dig)
            return fmt(next, [...result,`${value}${notation.value}`])
        }
        return fmt(number)
    }
    return fullFormat(num)
}
function makeWorkList(ID, TITLE) {
    const attrs = new Map();
    //attrs['href'] = "javascript:getBook('" + `./book/${ID}/0.txt` + "');"
    //attrs['href'] = "javascript:getBook('" + `book-page.html?book=${ID}&page=0` + "');"
    attrs['href'] = `book-page.html?book=${ID}&page=0`;
    const a = ElementString.get('a', TITLE, attrs);
    const li = ElementString.get('li', a);
    return li;
}
function makeSorter() {
    const selects = [];
    const DATAS = [
        {id:'date-sort', options:[{text:'新', value:'new', title:'新しい'}, {text:'古', value:'old', title:'古い'}]},
        {id:'volume-sort', options:[{text:'多', value:'new', title:"字数が多い"}, {text:'少', value:'old', title:"字数が少ない"}]},
        {id:'popular-sort', options:[{text:'密', value:'many', title:"人気"}, {text:'疎', value:'few', title:"過疎"}]},
    ]
    for (const data of DATAS) { selects.push(makeSomeSorter(data)); }

    const attrs = new Map();
    attrs['title'] = 'ソート（並び替え）';
    const legend = ElementString.get('legend', '⇅', attrs);
    return ElementString.get('fieldset', legend + selects.join(''));
}
function makeSomeSorter(data) {
    function makeOptions(options) {
        const html = [];
        console.log(options)
        for (const option of options) {
            const attrs = new Map();
            attrs['value'] = option.value;
            attrs['title'] = option.title;
            html.push(ElementString.get('option', option.text, attrs));
        }
        return html.join('');
    }
    const html = [];
    const attrs = new Map();
    attrs['id'] = data.id;
    attrs['name'] = data.id;
    console.log(data)
    html.push(ElementString.get('select', makeOptions(data.options), attrs));
    return html.join('');
}
async function makeFilters() {
    const selects = [];
    const DATAS = [];
    for (const id of ['genre', 'rating', 'tag', 'volume']) {
        DATAS.push({id:`${id}-filter`, tsv:`./book/${id}.tsv`})
    }
    for (const data of DATAS) { selects.push(await makeSomeFilter(data)); }

    selects.push(makeSomeSorter({id:'completed-filter', options:[{text:'全', value:'', title:'すべて'}, {text:'完', value:'completed', title:'完結済み'}, {text:'続', value:'serialized', title:'連載中'}]}));

    const attrs = new Map();
    attrs['title'] = 'フィルタ（絞り込み）';
    const legend = ElementString.get('legend', '▽', attrs);
    return ElementString.get('fieldset', legend + selects.join(''));

}
async function makeSomeFilter(data) {
    async function makeOptions(tsv) {
        const TSV = await FileLoader.text(tsv);
        const LINES = TSV.split(/\r\n|\r|\n/).filter(v => v);
        const KEYS = LINES[0].split(/\t/);
        const DATAS = LINES.slice(1);
        const html = [];

        attrs['value'] = '';
        attrs['title'] = 'どれか選んでください';
        html.push(ElementString.get('option', '（すべて）', attrs));
        for (const data of DATAS) {
            const [ID, NAME, DESCRIPTION] = data.split(/\t/);
            const attrs = new Map();
            attrs['value'] = ID;
            attrs['title'] = DESCRIPTION;
            html.push(ElementString.get('option', NAME, attrs));
        }
        return html.join('');
    }
    const html = [];
    const attrs = new Map();
    attrs['id'] = data.id;
    attrs['name'] = data.id;
    html.push(ElementString.get('select', await makeOptions(data.tsv), attrs));
    return html.join('');
}
function sortWorks() {
    const ids = new Map();
    for (const id of ['date-sort', 'volume-sort', 'popular-sort', 'genre-filter', 'rating-filter', 'tag-filter', 'volume-filter', 'completed-filter']) {
        const v = document.getElementById(id).value;
        if (v) { ids[id] = v; }
    }
    //['date-sort', 'volume-sort', 'popular-sort', 'genre-filter', 'rating-filter', 'tag-filter', 'volume-filter', 'completed-filter'].map(v=>document.getElementById(id).value).filter(v=>v)
    IndexDatas
}

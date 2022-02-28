async function makeIndexPage() {
    defineConst('IndexDatas', TsvTable.toObjects(await FileLoader.text('./book/index.tsv')));
    console.debug(IndexDatas);
    const TITLE = `小説サイト`;
    const WORKS = IndexDatas.length;
    const CHARS = IndexDatas.map(data=>data.chars).reduce((sum, v)=>sum+v);
    document.title = TITLE;
    document.getElementById('site-heading').innerText = TITLE;
    document.getElementById('works-count').innerText = `${formatNumber(WORKS)}`;
    document.getElementById('chars-count').innerText = `${formatNumber(CHARS)}`;
    document.getElementById('works-search-form').innerHTML = makeSorter() + await makeFilters();
    addSortEventListeners();
    addFilterEventListeners();
    updateIndexList(sortIndexList())
}
function updateIndexList(datas) {
    const ul = document.getElementById('works-list');
    while( ul.firstChild ){ ul.removeChild( ul.firstChild ); }
    ul.innerHTML = datas.map(d=>makeWorkList(d.id, d.title)).join('\n');
    Paging.break('li');
    Paging.Page = 1;
}
function formatNumber(num) {
    //return num.toLocaleString(); // nnn,nnn,nnn,nnnのように3桁刻みでカンマを入れる
    //const fmt =  new Intl.NumberFormat("ja-JP",{ notation: "compact"});// 万,億,兆まで。京は出なかった。5.6万など四捨五入されてしまう。281兆4749億7671万656のように細かい値を出したい。
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
    attrs['href'] = `book-page.html?book=${ID}&page=0`;
    const a = ElementString.get('a', TITLE, attrs);
    const li = ElementString.get('li', a);
    return li;
}
function makeSorter() {
    const selects = [];
    const DATAS = [
        {id:'date-sort', title:'日時', options:[{text:'新', value:'-1', title:'更新順'}, {text:'古', value:'1', title:'作成順'}]},
        {id:'volume-sort', title:'字数', options:[{text:'長', value:'-1', title:"字数が多い"}, {text:'短', value:'1', title:"字数が少ない"}]},
        {id:'popular-sort', title:'スター数', options:[{text:'密', value:'-1', title:"人気"}, {text:'疎', value:'1', title:"過疎"}]},
    ]
    for (const data of DATAS) { selects.push(makeSomeSorter(data)); }

    let attrs = new Map();
    attrs['title'] = 'ソート（並び替え）';
    const legend = ElementString.get('legend', '⇅', attrs);
    attrs = new Map();
    attrs['id'] = 'sort-fieldset';
    return ElementString.get('fieldset', legend + selects.join(''), attrs);
}
function makeSomeSorter(data) {
    function makeOptions(options) {
        const html = [];
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
    attrs['title'] = data.title;
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

    // completed,serialized
    selects.push(makeSomeSorter({id:'completed-filter', options:[{text:'全', value:'', title:'すべて'}, {text:'完', value:'1', title:'完結済み'}, {text:'続', value:'0', title:'連載中'}]}));

    let attrs = new Map();
    attrs['title'] = 'フィルタ（絞り込み）';
    const legend = ElementString.get('legend', '▽', attrs);
    attrs = new Map();
    attrs['id'] = 'filter-fieldset';
    return ElementString.get('fieldset', legend + selects.join(''), attrs);
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
function sortIndexList() {
    function getKey(id) {
        switch (id) {
            case 'date-sort': return ('-1' === document.getElementById(id).value) ? 'updated' : 'created';
            case 'volume-sort': return 'chars';
            case 'popular-sort': return 'stars';
            default: return id.replace('-sort', '');
        }
    }
    const keys = [];
    const dirs = [];
    console.debug(document.querySelector('#sort-fieldset'));
    for (const select of document.querySelectorAll(`#sort-fieldset > select`)) {
        keys.push(getKey(select.id));
        dirs.push(parseInt(select.value));
    }
    keys.push('id'); dirs.push(1);
    const datas = TsvTable.sort(filterIndexList(), keys, dirs)
    console.debug(keys, dirs, datas);
    return datas;
}
function addSortEventListeners() {
    for (const id of ['date', 'volume', 'popular'].map(v=>`${v}-sort`)) {
        document.getElementById(id).addEventListener('input', event=>{
            console.log(`${event.target.id}: ${event.target.value}`)
            updateIndexList(sortIndexList());
        });
    }
}
function addFilterEventListeners() {
    for (const id of ['genre', 'rating', 'tag', 'volume', 'completed'].map(v=>`${v}-filter`)) {
        document.getElementById(id).addEventListener('input', event=>{
            //updateIndexList(TsvTable.sort(filterIndexList(), keys, dirs));
            updateIndexList(sortIndexList());
        });
    }
}
function filterIndexList() {
    function getVolumeChars(volumeId) { // 規模IDに応じた字数範囲を取得する
        switch (volumeId) {
            case 0: return [1, 800];
            case 1: return [801, 8000];
            case 2: return [8001, 40000];
            case 3: return [40001, 120000];
            default: return [120001, Number.MAX_SAFE_INTEGER];
        }
    }
    function getFilterdDatas(datas, id, value) { // 種別に応じたフィルタリングをして結果を返す
        switch (id) {
            case 'volume-filter':
                let [min, max] = getVolumeChars(value);
                return datas.filter(d=> min <= d['chars'] && d['chars'] <= max);
            case 'completed-filter': return datas.filter(d=>(1 === value) ? d['completed'] : !d['completed']);
            case 'tag-filter': return datas.filter(d=>d['tag'].includes(value));
            case 'rating-filter': return datas.filter(d=>d['rating'][value] < 1);
            default: return datas.filter(d=>d[id.replace('-filter', '')]===value);
        }
    }
    let datas = IndexDatas;
    for (const id of ['genre', 'rating', 'tag', 'volume', 'completed'].map(v=>`${v}-filter`)) {
        const value = parseInt(document.getElementById(id).value);
        console.log(`${id}: ${value}`);
        if (isNaN(value)) { continue; }
        datas = getFilterdDatas(datas, id, value)
    }
    return datas;
}

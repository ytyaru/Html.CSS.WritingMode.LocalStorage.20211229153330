async function makeIndexPage() {
    defineConst('IndexDatas', TsvTable.toObjects(await FileLoader.text('./book/index.tsv')));
    console.debug(IndexDatas);
    console.debug(sortWorks());
    const TITLE = `小説サイト`;
    const WORKS = IndexDatas.length;
    const CHARS = IndexDatas.map(data=>data.chars).reduce((sum, v)=>sum+v);
    document.title = TITLE;
    document.getElementById('site-heading').innerText = TITLE;
    document.getElementById('works-count').innerText = `${formatNumber(WORKS)}`;
    document.getElementById('chars-count').innerText = `${formatNumber(CHARS)}`;
    document.getElementById('works-search-form').innerHTML = makeSorter() + await makeFilters();
    document.getElementById('works-list').innerHTML = IndexDatas.map(d=>makeWorkList(d.id, d.title)).join('\n');
    addSortEventListeners();
    /*
    const TITLE = `小説サイト`;
    const WORKS = IndexDatas.length;
    const CHARS = IndexDatas.map(data=>data.chars).reduce((sum, v)=>sum+v);
    return ElementString.get('h1', `${TITLE}`) + 
           ElementString.get('span', `${formatNumber(WORKS)}作品`) + 
           '　' + 
           ElementString.get('span', `${formatNumber(CHARS)}字`) + 
           '<br>' + 
           makeSorter() + await makeFilters() +
           ElementString.get('ul', IndexDatas.map(d=>makeWorkList(d.id, d.title)).join('\n'), attrs);
//           updateIndexList(IndexDatas);
    */
}
function updateIndexList(datas) {
    //document.querySelectorAll(`#works-list > li`).ForEach(e=>e.remove());
    const ul = document.getElementById('works-list');
    while( ul.firstChild ){ ul.removeChild( ul.firstChild ); }
    ul.innerHTML = datas.map(d=>makeWorkList(d.id, d.title)).join('\n');
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
        {id:'date-sort', title:'日時', options:[{text:'新', value:'-1', title:'更新順'}, {text:'古', value:'1', title:'作成順'}]},
        {id:'volume-sort', title:'字数', options:[{text:'長', value:'-1', title:"字数が多い"}, {text:'短', value:'1', title:"字数が少ない"}]},
        {id:'popular-sort', title:'スター数', options:[{text:'密', value:'-1', title:"人気"}, {text:'疎', value:'1', title:"過疎"}]},
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
        //console.log(options)
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
    //console.log(data)
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
function addSortEventListeners() {
    for (const id of ['date', 'volume', 'popular'].map(v=>`${v}-sort`)) {
        document.getElementById(id).addEventListener('change', event=>{
            console.log(`${event.target.value}`);
            //console.log(`${event.target.id}: ${event.target.value}`);
            const value = parseInt(event.target.value);
            if (value) {
                const keys = [];
                const dirs = [];
                if ('date-sort' === event.target.id) {
                    keys.push(('-1' === event.target.value) ? 'updated' : 'created')
                }
                else if ('volume-sort' === event.target.id) {
                    keys.push('chars')
                }
                else if ('popular-sort' === event.target.id) {
                    keys.push('stars')
                }
                dirs.push(value)
                keys.push('id'); dirs.push(1);
                //TsvTable.sort(IndexDatas, keys, dirs);
                //TsvTable.sort(IndexDatas, ['updated', 'chars', 'star', 'id'], [-1, 1, -1, 1]);
                const datas = TsvTable.sort(IndexDatas, keys, dirs);
                //const datas = TsvTable.sort(IndexDatas, ['id'], [1]);
                console.log(keys, dirs, datas);
                //console.log(TsvTable.sort(IndexDatas, ['created'], [-1]));
                //console.log(TsvTable.sort(IndexDatas, ['created'], [1]));
                updateIndexList(datas);
            }
        });
    }
}
function sortWorks() {
    return TsvTable.sort(IndexDatas, ['updated', 'chars', 'star', 'id'], [-1, 1, -1, 1]);
    /*
    const ids = new Map();
    for (const id of ['date', 'volume', 'popular'].map(v=>`${v}-sort`)) {
        const v = document.getElementById(id).value;
        if (v) { ids[id] = v; }
    }
    */
    /*
    const defaultSortFunc = function(a, b, key, direction = 1, nullsFirst = 1) {
        if (a[key] == undefined && b[key] == undefined) return 0;
        if (a[key] == undefined) return nullsFirst * 1;
        if (b[key] == undefined) return nullsFirst * -1;
        if (a[key] > b[key]) return direction * 1;
        if (a[key] < b[key]) return direction * -1;
        return 0;
    }
    const sortFunc = function(data, keys, directions) {
        const _data = data.slice();
        _data.sort((a, b) => {
            let order = 0;
            let i=0;
            keys.some(key => {
                order = defaultSortFunc(a, b, key, directions[i]);
                console.log(key, directions[i], order, !!order)
                i++;
                return !!order;
            });
            console.debug(order);
            return order;
        });
        return _data;
    }
    const data = [
        {"id":1,"group":1,"name":"tom"},
        {"id":2,"group":1,"name":"tim"},
        {"id":3,"group":3,"name":"tomas"},
        {"id":4,"group":3,"name":"tanaka"},
        {"id":5,"group":2,"name":"takahashi"},
        {"id":6,"group":2,"name":"takada"}
    ];
    console.log(sortFunc(data, ['group','id'], [-1,-1]));
    console.log(sortFunc(IndexDatas, ['id'], [-1]));
    //console.log(sortFunc(IndexDatas, ['created', 'chars', 'star', 'id'], [-1, 1, -1, 1]));

    //return sortFunc(IndexDatas, ['created', 'chars', 'star', 'id'], [-1, 1, -1, 1])
    //return sortFunc(IndexDatas, ['id'], [-1]);
    return sortFunc(IndexDatas, ['updated', 'chars', 'star', 'id'], [-1, 1, -1, 1])
    */

    /*
    IndexDatas.sort((a,b)=>{
        if (a.created < b.created) return -1;
    })
    for (const id of ['date-sort', 'volume-sort', 'popular-sort', 'genre-filter', 'rating-filter', 'tag-filter', 'volume-filter', 'completed-filter']) {
        const v = document.getElementById(id).value;
        if (v) { ids[id] = v; }
    }
    */
    //['date-sort', 'volume-sort', 'popular-sort', 'genre-filter', 'rating-filter', 'tag-filter', 'volume-filter', 'completed-filter'].map(v=>document.getElementById(id).value).filter(v=>v)
}
function filterWorks() {
    const ids = new Map();
    for (const id of ['genre', 'rating', 'tag', 'volume', 'completed'].map(v=>`${v}-filter`)) {
        const v = document.getElementById(id).value;
        if (v) { ids[id] = v; }
    }
}

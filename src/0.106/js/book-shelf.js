async function makeIndexPage() {
    const TSV = await FileLoader.text('./book/index.tsv');
    const LINES = TSV.split(/\r\n|\r|\n/).filter(v => v);
    const KEYS = LINES[0].split(/\t/);
    const DATAS = LINES.slice(1);
    //console.debug(DATAS)
    const list = []
    for (const line of DATAS) {
        const [ID, TITLE, COMPLETED, FILES, CHARS, CREATED, PUBLISHED, UPDATED, VIEWS, STARS, COMMENTS, GENRE, TAG, RATING] = line.split(/\t/);
        list.push(makeWorkList(ID, TITLE));
    }
    const TITLE = `小説サイト`;
    const WORKS = DATAS.length;
    const CHARS = DATAS.map(line=>parseInt(line.split(/\t/)[4])).reduce((sum, v)=>sum+v);
    return ElementString.get('h1', `${TITLE}`) + 
           ElementString.get('span', `${WORKS.toLocaleString()}作品`) + 
           '　' + 
           ElementString.get('span', `${CHARS.toLocaleString()}字`) + 
           '<br>' + 
           ElementString.get('ul', list.join('\n'));
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
/*
async function getBook(path) {
    const book = await FileLoader.text(path);
    const parser = new Parser();
    const content = parser.parse(`${book}`);
    //Html.Main.innerHTML += `${content}\n${Html.Main.innerHTML}`;
    Html.Main.innerHTML = `${content}`;
    setFontSizePixel();
    Paging.break();
}
*/

async function makeIndexPage() {
    const TSV = await FileLoader.text('./book/index.tsv');
    const LINES = TSV.split(/\r\n|\r|\n/).filter(v => v);
    const KEYS = LINES[0].split(/\t/);
    const DATAS = LINES.slice(1);
    //console.debug(DATAS)
    const list = []
    for (const line of DATAS) {
        const [ID, TITLE] = line.split(/\t/);
        const attrs = new Map();
        //attrs['href'] = "javascript:getBook('" + `./book/${ID}/0.txt` + "');"
        //attrs['href'] = "javascript:getBook('" + `book-page.html?book=${ID}&page=0` + "');"
        attrs['href'] = `book-page.html?book=${ID}&page=0`;
        const a = ElementString.get('a', TITLE, attrs);
        const li = ElementString.get('li', a);
        list.push(li);
    }
    return ElementString.get('ul', list.join('\n'));
}
async function getBook(path) {
    const book = await FileLoader.text(path);
    const parser = new Parser();
    const content = parser.parse(`${book}`);
    //Html.Main.innerHTML += `${content}\n${Html.Main.innerHTML}`;
    Html.Main.innerHTML = `${content}`;
    setFontSizePixel();
    Paging.break();
}

async function makeIndexPage() {
    const TSV = await FileLoader.text('./book/index.tsv');
    const LINES = TSV.split(/\r\n|\r|\n/).filter(v => v);
    const list = []
    for (const line of LINES) {
        const [ID, TITLE] = line.split(/\t/);
        const attrs = new Map();
        attrs['href'] = "javascript:getBook('" + `./book/${ID}/0.txt` + "');"
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

window.addEventListener('load', (event) => {
    document.querySelector('#selector').addEventListener('input', (event)=>{
        parse();
    });
    document.querySelector('#editor').addEventListener('input', (event)=>{
        parse();
    });
//    function getParserType() { return eval(document.querySelector('#selector').value); }
    function getParserType(){return Function(`return (${document.querySelector('#selector').value})`)();}
    function parse() {
        const editor = document.querySelector('#editor');
        const viewer = document.querySelector('#viewer');
        const drawer = document.querySelector('#drawer');
        const parserType = getParserType();
        const parser = new parserType();
        viewer.value = parser.parse(editor.value);
        drawer.innerHTML = BreakLine.parse(Paragraph.parse(viewer.value));
    }
    document.querySelector('#selector').focus();
    document.querySelector('#selector').options[0].selected = true;
    parse();
});

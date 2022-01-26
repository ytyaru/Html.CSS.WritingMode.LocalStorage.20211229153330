class Paragraph {
    // 行頭に全角スペース＋末尾に改行２つあれば<p>
    static #REGEX_PARAGRAPH = /^([\u{3000}])(.+)[\n]{2}/gmu;
    static parse(text) {
        text = text.replace(Paragraph.#REGEX_PARAGRAPH, (match, p1, p2)=>{
            return `<p>${p1}${p2}</p>`;
        });
        return text
    }
}

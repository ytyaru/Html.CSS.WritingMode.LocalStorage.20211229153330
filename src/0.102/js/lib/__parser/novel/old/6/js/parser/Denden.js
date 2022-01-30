class Denden { // でんでんマークダウン。{漢字|かんじ}, {漢字|かん|じ}
    #REGEX_RUBY = /[\{]([^\{\}]+)[\}]/g; // {...}
    parse(text) {
        text = text.replace(this.#REGEX_RUBY, (match, p1)=>{
            const texts = p1.split('|');
            if (texts.length === 2) {
                return `<ruby>${texts[0]}<rt>${texts[1]}</rt></ruby>`;
            }
            else if (texts[0].length === texts.length - 1) {
                let html = `<ruby>`;
                const rbs = texts[0].split('');
                const rts = texts.slice(1);
                for (let i=0; i<rbs.length; i++) {
                    html += `${rbs[i]}<rt>${rts[i]}</rt>`;
                }
                html += `</ruby>`;
                return html;
            } else { return p1; }
        });
        return text
    }
}

class BreakLine {
    static #REGEX_BLEAK_LINE= /[\n]/g;
    static parse(text) {
        return text.replace(BreakLine.#REGEX_BLEAK_LINE, '<br>');
    }
}

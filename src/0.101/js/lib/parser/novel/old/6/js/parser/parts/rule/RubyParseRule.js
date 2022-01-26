class RubyParseRule { // ｜ｅｔｃ《エトセトラ》　漢字《かんじ》　漢字（かんじ）　漢字(かんじ)　｜《エスケープ》　｜（エスケープ）
    #startChar = '｜|';
    #encloseStart = '《';
    #encloseEnd = '》';
    #rbLen = 10;
    #rtLen = 20;
    #canStartChar = true; // ｜漢字《かんじ》
    #canEscape = true; // ｜《二重山括弧をそのまま表示する》
    #canOmitStartChar = true; // 漢字《かんじ》　書式が有効である。｜漢字《かんじ》のような縦線を省く

    #REGEX_RUBY = /[｜|]([^\n]{1,50}?)《([^\n]{1,20}?)》/g;
    #REGEX_KANJI_RUBY = /([\u2e80-\u2fdf\u3005\3007\303b\u4e00-\u9faf\u3400-\u4dbf\uf900-\ufaff]{1,50}?)《([^\n]{1,20}?)》/g;
    constructor() {

    }
    get StartChar() { return this.#startChar; }
    setStartCharH() { this.#startChar = '|'; }
    setStartCharZ() { this.#startChar = '｜'; }
    setStartCharAll() { this.#startChar = '|｜'; }

    get EncloseStartChar() { return this.#encloseStart; }
    get EncloseEndChar() { return this.#encloseEnd; }
    setEncloseCharDoubleAngleBrackets() {
        this.#encloseStart = '《';
        this.#encloseEnd = '》';
    }
    setEncloseCharParentheses() {
        this.#encloseStart = '(（';
        this.#encloseEnd = ')）';
    }
    setEncloseCharParenthesesH() {
        this.#encloseStart = '(';
        this.#encloseEnd = ')';
    }
    setEncloseCharParenthesesZ() {
        this.#encloseStart = '（';
        this.#encloseEnd = '）';
    }
    get RbLen() { return this.#rbLen; }
    set RbLen(value) { if (0 < value) { this.#rbLen = value; } }
    get RtLen() { return this.#rtLen; }
    set RtLen(value) { if (0 < value) { this.#rtLen = value; } }

    get CanStartChar() { return this.#canStartChar; }
    set CanStartChar(value) { this.#canStartChar = value; }
    get CanEscape() { return this.#canEscape; }
    set CanEscape(value) { this.#canEscape = value; }
    get CanOmitStartChar() { return this.#canOmitStartChar; }
    set CanOmitStartChar(value) { this.#canOmitStartChar = value; }

    convert(rb_txt, rt_txt) {
        return `<ruby>${rb_txt}<rt>${rt_txt}</rt></ruby>`;
    }
}

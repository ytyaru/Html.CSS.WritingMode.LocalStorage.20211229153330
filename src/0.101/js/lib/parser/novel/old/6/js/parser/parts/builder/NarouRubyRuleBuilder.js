class NarouRubyRuleBuilder {
    #rules = [];
    constructor() {
        // ｜漢字《かんじ》,漢字《かんじ》を<ruby>漢字<rt>かんじ</rt></ruby>に変換する
        const angle = new RubyParseRule();
        angle.setEncloseCharDoubleAngleBrackets();
        angle.RbLen = 10;
        angle.RtLen = 20;
        angle.CanStartChar = true;
        angle.CanOmitStartChar = true;
        angle.CanEscape = true;
        this.#rules.push(angle);

        // 漢字（かんじ）,漢字(かんじ)を｜漢字《かんじ》に変換する
        const kakko = new RubyParseRule();
        kakko.setEncloseCharParentheses();
        kakko.RbLen = 10;
        kakko.RtLen = 20;
        kakko.CanStartChar = false;
        kakko.CanOmitStartChar = true;
        kakko.CanEscape = true;
        this.#rules.push(kakko);
    }
    get Rules() { return this.#rules; }
}

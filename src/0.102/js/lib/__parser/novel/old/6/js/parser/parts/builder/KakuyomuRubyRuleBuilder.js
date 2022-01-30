class KakuyomuRubyRuleBuilder {
    #rules = [];
    constructor(isKakko=false) {
        // 漢字（かんじ）,漢字(かんじ)を｜漢字《かんじ》に変換する
        if (isKakko) {
            this.#rules.concat(new PlainToAozoraRubyRuleBuilder().Rules);
        }
        // ｜漢字《かんじ》,漢字《かんじ》を<ruby>漢字<rt>かんじ</rt></ruby>に変換する
        const normal = new RubyParseRule();
        normal.setEncloseCharDoubleAngleBrackets();
        normal.RbLen = 50;
        normal.RtLen = 20;
        normal.CanEscape = true;
        normal.CanOmitStartChar = true;
        this.#rules.push(normal);
    }
    get Rules() { return this.#rules; }
}

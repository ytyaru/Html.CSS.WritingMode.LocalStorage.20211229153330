class PlainToHtmlRubyRuleBuilder {
    #rules = [];
    constructor(isKakko=false) {
        // 漢字（かんじ）,漢字(かんじ)を<ruby>漢字<rt>かんじ</rt></ruby>に変換する
        const rule = new RubyParseRule();
        rule.setEncloseCharParentheses();
        rule.RbLen = 50;
        rule.RtLen = 20;
        rule.CanStartChar = false;
        rule.CanEscape = true;
        rule.CanOmitStartChar = true;
        this.#rules.push(rule);
    }
    get Rules() { return this.#rules; }
}

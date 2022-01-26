class PlainToAozoraRubyRuleBuilder {
    #rules = [];
    constructor(isKakko=false) {
        // 漢字（かんじ）,漢字(かんじ)を｜漢字《かんじ》に変換する
        const aozora = new RubyParseRule();
        aozora.setEncloseCharParentheses();
        aozora.RbLen = 50;
        aozora.RtLen = 20;
        aozora.CanStartChar = false;
        aozora.CanEscape = true;
        aozora.CanOmitStartChar = true;
        aozora.convert = function(rb_txt, rt_txt) {
            return `｜${rb_txt}《${rt_txt}》`;
        }
        this.#rules.push(aozora);
    }
    get Rules() { return this.#rules; }
}

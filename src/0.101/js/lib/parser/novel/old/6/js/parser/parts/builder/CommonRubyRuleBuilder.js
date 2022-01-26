class CommonRubyRuleBuilder { // カクヨム、なろう、エブリスタ、アルファポリス共通 https://kakuyomu.jp/works/1177354054887461010/episodes/1177354054887475663
    #rules = [];
    constructor() {
        // ｜漢字《かんじ》を<ruby>漢字<rt>かんじ</rt></ruby>に変換する
        const rule = new RubyParseRule();
        rule.setEncloseCharDoubleAngleBrackets();
        rule.RbLen = 10;
        rule.RtLen = 20;
        rule.CanStartChar = true;
        rule.CanOmitStartChar = false; // アルファポリス非対応
        rule.CanEscape = false; // アルファポリス非対応
        this.#rules.push(rule);
    }
    get Rules() { return this.#rules; }
}

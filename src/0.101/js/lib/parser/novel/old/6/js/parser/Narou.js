class Narou {
    #rubyRuleBuilder;
    constructor() {
        this.#rubyRuleBuilder = new NarouRubyRuleBuilder();
    }
    parse(text) {
        text = RubyParser.parse(text, this.#rubyRuleBuilder);
        return text;
    }
}

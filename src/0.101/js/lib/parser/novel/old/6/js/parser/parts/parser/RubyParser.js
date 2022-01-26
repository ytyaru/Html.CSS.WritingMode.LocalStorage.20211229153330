class RubyParser { // 二重山括弧。
    static parse(text, builder) {// this.#rubyRuleBuilder
        for (let rule of builder.Rules) {
            let parser = new _RubyParser(rule);
            text = parser.parse(text);
        }
        return text;
    }
}

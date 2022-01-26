class _RubyParser { // Ruleをもらって正規表現をつくる
    #REGEX_RUBY;
    #REGEX_KANJI_RUBY;
    #REGEX_ESCAPE;
    #REGEX_KANJI = '[\\u2e80-\\u2fdf\\u3005\\3007\\303b\\u4e00-\\u9faf\\u3400-\\u4dbf\\uf900-\\ufaff]';
    #rule;
    constructor(rubyParseRule) {
        this.#rule = rubyParseRule;
        this.#REGEX_RUBY = new RegExp(`[${this.#rule.StartChar}]([^\\n]{1,${this.#rule.RbLen}}?)[${this.#rule.EncloseStartChar}]([^\\n]{1,${this.#rule.RtLen}}?)[${this.#rule.EncloseEndChar}]`, 'g');
        this.#REGEX_KANJI_RUBY = new RegExp(`(${this.#REGEX_KANJI}{1,${this.#rule.RbLen}}?)[${this.#rule.EncloseStartChar}]([^\\n]{1,${this.#rule.RtLen}}?)[${this.#rule.EncloseEndChar}]`, 'g');
        this.#REGEX_ESCAPE = new RegExp(`[${this.#rule.StartChar}]([${this.#rule.EncloseStartChar}])`, 'g');
    }
    parse(text) {
        const self = this;
        text = text.replace(this.#REGEX_RUBY, (match, p1, p2)=>{
            return self.#rule.convert(p1, p2);
        });
        if (self.#rule.CanOmitStartChar) {
            text = text.replace(this.#REGEX_KANJI_RUBY, (match, p1, p2)=>{
                return self.#rule.convert(p1, p2);
            });
        }
        if (self.#rule.CanEscape) {
            text = text.replace(this.#REGEX_ESCAPE, (match, p1)=>{
                return p1;
            });
        }
        return text
    }
}

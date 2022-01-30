class Ruby {
    static toHtml(ruby_txt, rt_txt) {
        return Ruby.#parse(ruby_txt, rt_txt, Ruby.#toHtml);
    }
    static toDom(ruby_txt, rt_txt) {
        return Ruby.#parse(ruby_txt, rt_txt, Ruby.#toDom);
    }
    static #parse(ruby_txt, rt_txt, method) {
        let base = ruby_txt;
        let rt = rt_txt;
        if (Ruby.#isString(ruby_txt, rt_txt)) { base = [ruby_txt]; rt = [rt_txt]; }
        else if (Ruby.#isArray(ruby_txt, rt_txt)) {}
        else { throw '型エラー。引数の型は指定したもののみ有効です。ruby_txt, rt_txt はどちらも文字リテラルか、文字リテラルの配列である必要があります。'; }
        return method(base, rt);
    }
    static #isArray(ruby_txt, rt_txt) {
        if (Array.isArray(ruby_txt) && Array.isArray(rt_txt) && ruby_txt.length === rt_txt.length) { return true; }
        else { return false; }
    }
    static #isString(ruby_txt, rt_txt) {
        if ('string' == typeof ruby_txt && 'string' == typeof rt_txt) { return true; }
        else { return false; }
    }
    static #toHtml(ruby_txt, rt_txt) {
        console.log('#toHtml', ruby_txt, rt_txt);
        let innerHtml = '';
        for (let i=0; i<ruby_txt.length; i++) {
            innerHtml += ruby_txt[i];
            innerHtml += '<rt>';
            innerHtml += rt_txt[i];
            innerHtml += '</rt>';
        }
        return innerHtml;
    }
    static #toDom(ruby_txt, rt_txt) {
        console.log('#toDom', ruby_txt, rt_txt);
        const ruby = document.createElement("ruby");
        for (let i=0; i<ruby_txt.length; i++) {
            const base = document.createTextNode(ruby_txt[i]);
            ruby.appendChild(base); //"漢字"
            const rt = document.createElement("rt");
            rt.textContent = rt_txt[i]; //"かんじ"
            ruby.appendChild(rt);
        }
        return ruby;
    }
}

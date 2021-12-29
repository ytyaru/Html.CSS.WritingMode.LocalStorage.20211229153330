export class LineOfChars { // １行あたりの字数（全角:10〜50,半角:30〜140）
    #id = 'line-of-chars'; // CSSカスタムプロパティ、HTML要素のid属性値
    #value = 40; // 字数（初期値）
    #min = 10;     // 字数（最小値）
    #max = 50;     // 字数（最大値）
    #elm_html_input = null; // input type=range
    #elm_html_label = null; // input値表示
    #elm_css_root = null;   // :root
    constructor(id='line-of-chars', value=40, min=10, max=50) {
        this.#id = id; // CSSカスタムプロパティ、HTML要素のid属性値
        this.#value = value; // 字数（初期値）
        this.#min = min;     // 字数（最小値）
        this.#max = max;     // 字数（最大値）
        this.#elm_html_input = null; // input type=range
        this.#elm_html_label = null; // input値表示
        this.#elm_css_root = null;   // :root
    }
    init() {
        this.#elm_html_input = document.querySelector(`#${this.#id}`);
        this.#elm_html_input.value = this.#value;
        this.#elm_html_input.min = this.#min;
        this.#elm_html_input.max = this.#max;
        this.#elm_html_input.addEventListener('input', (e) => { this.#change(e); }); // UI変更時その値をCSS変数やHTMLにセットする
        this.#elm_html_input.dispatchEvent(new Event('input'));
    }
    #change(e) {
        this.#value = e.target.value;
        document.querySelector(':root').style.setProperty(`--${this.#id}`, `${this.#value}`);
        document.querySelector(`#${this.#id}-label`).innerHTML = this.#value;
    }
    save() {
        localStorage.setItem(`${this.#id}`, document.querySelector(`#${this.#id}`).value);
    }
}


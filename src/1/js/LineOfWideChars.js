export class LineOfWideChars { // １行あたりの全角文字数（10〜50）
    constructor() {
        this.#id = 'line-of-wide-chars'; // CSSカスタムプロパティ、HTML要素のid属性値
        this.#value = 40;
        this.#min = 10;
        this.#max = 50;
        this.#elm_html_input = null;
        this.#elm_css_root = null;
        this.#init();
    }
    #get() {
        this.#elm_css_root = document.querySelector(':root');
        this.#value = ('LineOfChars' in localStorage) ? localStorage.getItem(`${this.#id}`) : getComputedStyle(root).getPropertyValue(`--${this.#id}`);
        this.#min = getComputedStyle(root).getPropertyValue(`--min-${this.#id}`);
        this.#max = getComputedStyle(root).getPropertyValue(`--max-${this.#id}`);
    }
    #init() {
        this.#get();
        this.#elm_html_input = document.querySelector(`#${this.#id}`);
        this.#elm_html_input.addEventListener('input', (e) => { this.#change(e); }); // UI変更時その値をCSS変数やHTMLにセットする
        /*
        fontSize.addEventListener('input', e => { // UI変更時その値をCSS変数やHTMLにセットする
            document.querySelector(':root').style.setProperty(`--${this.#id}`, `${value}`);
            document.querySelector(`${this.#id}-label`).innerHTML = value;
            console.log(`${value}`);
        });
        */
        this.#elm_html_input.dispatchEvent(new Event('input'));
    }
    #change(e) {
        this.#value = e.target.value;
        document.querySelector(':root').style.setProperty(`--${this.#id}`, `${this.#value}`);
        document.querySelector(`${this.#id}-label`).innerHTML = this.#value;
        console.log(`${this.#value}`);
    }
    save() {
        localStorage.setItem(`${this.#id}`, document.querySelector(`#${this.#id}`).value);
    }
}


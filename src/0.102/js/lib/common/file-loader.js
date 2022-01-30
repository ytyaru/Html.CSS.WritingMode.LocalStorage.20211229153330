class FileLoader { // https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
    static async text(path) { return this.#method(path, 'text'); }
    static async json(path) { return this.#method(path, 'json'); }
    static async blob(path) { return this.#method(path, 'blob'); }
    static async arrayBuffer(path) { return this.#method(path, 'arrayBuffer'); }
    static async fromData(path) { return this.#method(path, 'fromData'); }
    static async load(path, isStream=true) { return this.#method(path, this.#selectMethod(path, isStream)); }
    static async #method(path, methodName='text') {
        const response = await fetch(path);
        if (response.status !== 200) { throw new Error(`ファイル取得エラー: ${response.status} Loader.load(${path})`); }
        return await response[methodName]();
    }
    static #selectMethod(path, isStream=true) {
        const paths = path.split('.');
        console.log(paths);
        if (paths.length < 1) { return 'text'; }
        const ext = paths.slice(-1)[0].toLowerCase();
        if ('json' === ext) { return 'json'; }
        else if(this.#isRasterImage(ext)) { return 'blob'; }
        else if(this.#isRasterAudio(ext)) { return (isStream) ? 'arrayBuffer' : 'blob'; }
        else if(this.#isRasterVideo(ext)) { return (isStream) ? 'arrayBuffer' : 'blob'; }
        else { return 'text'; }
    }
    static #isRaster(ext) {
        return (this.#isRasterImage(ext) || this.#isRasterAudio(ext) || this.#isRasterVideo(ext));
    }
    static #isRasterImage(ext) {
        const exts = ['bmp','gif','png','apng','jpg','jpeg','webp','tiff','woff'];
        if (-1 < exts.indexOf(ext)) { return true; }
        return false;
    }
    static #isRasterAudio(ext) {
        const exts = ['wav','mp3','ogg','flac','aif','aac','m4a','mp4'];
        if (-1 < exts.indexOf(ext)) { return true; }
        return false;
    }
    static #isRasterVideo(ext) {
        const exts = ['avi','mp4','webm','mpg','mpeg','.swf','ogv','mov','qt'];
        if (-1 < exts.indexOf(ext)) { return true; }
        return false;
    }
}

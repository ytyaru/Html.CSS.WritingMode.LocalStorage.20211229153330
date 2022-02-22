class TsvTable {
    /*
       [{k:v},{k,v}]形式データに変換する。
       TSVは1行目がヘッダ名、2行目が型、3行目以降がデータである。
       型変換は独自形式などもあって大変なので基本的な型のみ対応とする。つまりtext,number(integer,float),boolean,dateのみ。
       文字列：string
       TSV-text：abc,def,ghi
       TSV-integer：0,1,2
       真偽：boolean
       数値：integer,BigInt,float,decimal
       日付：Date
       URL：new URL
    */
    static toObjects(tsv) {
        const LINES = tsv.split(/\r\n|\r|\n/).filter(v => v);
        const KEYS = LINES[0].split(/\t/);
        const TYPES = LINES[1].split(/\t/);
        const DATAS = LINES.slice(2);
        const objs = [];
        console.log(KEYS)
        console.log(TYPES)
        console.log(DATAS)
        for (const line of DATAS) {
            const VALUES = line.split(/\t/);
            const o = {};
            for (let i=0; i<KEYS.length; i++) {
                o[KEYS[i]] = TsvTable._boxing(TYPES[i], VALUES[i]); 
            }
            objs.push(o);
        }
        return objs;
    }
    static _boxing(type, value) {
        if ('n' === type) { return Number(value); }
        else if ('I' === type) { return BigInt(value); }
        else if ('b' === type) { return ('1' === value); }
        else if ('d' === type) { return new Date(value); }
        else { return value; }
    }
}

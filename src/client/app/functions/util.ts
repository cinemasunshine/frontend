import * as libphonenumber from 'libphonenumber-js';

/**
 * カタカナをひらがなへ変換
 * @param {string} str
 */
export function convertToHiragana(str: string) {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
        const chr = match.charCodeAt(0) - 0x60;

        return String.fromCharCode(chr);
    });
}

/**
 * ひらがなをカタカナへ変換
 * @param {string} str
 */
export function convertToKatakana(str: string) {
    return str.replace(/[\u3041-\u3096]/g, (match) => {
        const chr = match.charCodeAt(0) + 0x60;

        return String.fromCharCode(chr);
    });
}

/**
 * 電話番号変換
 */
export function formatTelephone(telephone: string, format?: libphonenumber.NumberFormat) {
    if (telephone === undefined) {
        return '';
    }
    const parseNumber = libphonenumber.parse(telephone, 'JP');
    format = (format === undefined) ? 'International' : format;

    return libphonenumber.format(parseNumber, format).replace(/\s/g, '');
}

/**
 * オブジェクトをクエリストリングへ変換
 */
export function object2query(params: Object) {
    let query = '';
    for (let i = 0; i < Object.keys(params).length; i++) {
        const key = Object.keys(params)[i];
        const value = (<any>params)[key];
        if (i > 0) {
            query += '&';
        }
        query += `${key}=${value}`;
    }
    return query;
}

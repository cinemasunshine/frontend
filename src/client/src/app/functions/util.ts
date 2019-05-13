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

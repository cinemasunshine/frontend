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

export interface ISize {
    w: number;
    h: number;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IObject extends ISize, IPosition {
    image: string;
}

export interface IScreen {
    theaterCode: string;
    screenCode: string;
    type: number;
    size: ISize;
    objects: IObject[];
    seatStart: IPosition;
    map: number[][];
    special: string[];
    hc: string[];
    specialSeats: { name: string; data: string[]; }[];
    seatSize: ISize;
    specialSeatConfig: { name: string; className: string; size: ISize }[];
    seatMargin: ISize;
    aisle: {
        small: ISize;
        middle: ISize;
    };
    seatLabelPos: number;
    seatNumberPos: number;
    seatNumberAlign: 'left' | 'right';
    html: string;
    style?: string;
    columnLabel: boolean;
    lineLabel: boolean;
    hcSeatCode: {
        single: string;
        multiple: string[];
    };
}

export interface ILabel {
    /**
     * ID
     */
    id: number;
    /**
     * 幅
     */
    w: number;
    /**
     * 高さ
     */
    h: number;
    /**
     * 位置Y
     */
    y: number;
    /**
     * 位置X
     */
    x: number;
    /**
     * 表示名
     */
    label: string;
}

export interface ISeat {
    /**
     * cssクラス名
     */
    className: string;
    /**
     * 幅
     */
    w: number;
    /**
     * 高さ
     */
    h: number;
    /**
     * 位置Y
     */
    y: number;
    /**
     * 位置X
     */
    x: number;
    /**
     * 表示名
     */
    label: string;
    /**
     * 座席ステータス
     */
    status: string;
    coaInfo: {
        /**
         * 座席セクション
         */
        section: string;
        /**
         * 座席コード
         */
        seatNum: string;
        /**
         * 特別席区分
         * 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
         */
        spseatKbn: string;
        /**
         * 特別席加算額１
         * 特別席加算額の興行収入部分
         */
        spseatAdd1: number;
        /**
         * 特別席加算額２
         * 特別席加算額のミールクーポン部分
         */
        spseatAdd2: number;
    };
}

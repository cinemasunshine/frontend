/**
 * 座席テスト
 * @namespace Screen.ScreenModule
 */
import * as COA from '@motionpicture/coa-service';
import * as debug from 'debug';
import { Request, Response } from 'express';
import * as fs from 'fs-extra';
import * as HTTPStatus from 'http-status';
import { AppError, ErrorType } from '../Util/ErrorUtilModule';
import * as UtilModule from '../Util/UtilModule';
const log = debug('SSKTS:Screen.ScreenModule');

/**
 * 座席選択
 * @memberof Screen.ScreenModule
 * @function index
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function index(_: Request, res: Response): Promise<void> {
    res.render('screens/test');
}

/**
 * スクリーン状態取得
 * @memberof Screen.ScreenModule
 * @function getScreenStateReserve
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getScreenStateReserve(req: Request, res: Response): Promise<void> {
    try {
        const theaterCode = `00${req.body.theaterCode}`.slice(UtilModule.DIGITS['02']);
        const screenCode = `000${req.body.screenCode}`.slice(UtilModule.DIGITS['03']);
        const screen = await fs.readJSON(`./app/theaters/${theaterCode}/${screenCode}.json`);
        const setting = await fs.readJSON('./app/theaters/setting.json');
        res.json({
            err: null,
            result: {
                screen: screen,
                setting: setting
            }
        });
    } catch (err) {
        res.json({ err: err, result: null });
    }
}

/**
 * スクリーンHTML取得
 * @memberof Screen.ScreenModule
 * @function getScreenHtml
 * @param {Request} req
 * @param {Response} res
 */
export async function getScreenHtml(req: Request, res: Response) {
    try {
        if (req.query.theaterCode === undefined
            || req.query.dateJouei === undefined
            || req.query.titleCode === undefined
            || req.query.titleBranchNum === undefined
            || req.query.timeBegin === undefined
            || req.query.screenCode === undefined) {
            throw new AppError(HTTPStatus.BAD_REQUEST, ErrorType.Property);
        }
        const theaterCode = `00${req.query.theaterCode}`.slice(UtilModule.DIGITS['02']);
        const screenCode = `000${req.query.screenCode}`.slice(UtilModule.DIGITS['03']);
        const screen = await fs.readJSON(`./app/theaters/${theaterCode}/${screenCode}.json`);
        const setting = await fs.readJSON('./app/theaters/setting.json');
        const state = await COA.services.reserve.stateReserveSeat({
            theaterCode: req.query.theaterCode, // 施設コード
            dateJouei: req.query.dateJouei, // 上映日
            titleCode: req.query.titleCode, // 作品コード
            titleBranchNum: req.query.titleBranchNum, // 作品枝番
            timeBegin: req.query.timeBegin, // 上映時刻
            screenCode: req.query.screenCode // スクリーンコード
        });
        const html = await createScreen({
            setting: setting,
            screen: screen,
            state: state,
            option: req.query.option
        });
        res.json({
            result: {
                html: html,
                style: `${req.protocol}://${req.hostname}/css/screen.css`
            }
        });
    } catch (err) {
        if (err.code !== undefined && err.code === HTTPStatus.BAD_REQUEST) {
            res.status(err.code);
        } else {
            res.status(HTTPStatus.NOT_FOUND);
        }
        log(res.statusCode);
        res.json({ error: err });
    }
}

interface ISize {
    w: number;
    h: number;
}

interface IPosition {
    x: number;
    y: number;
}

interface IScreenSetting {
    seatSize: ISize;
    seatMargin: ISize;
    aisle: { small: ISize; middle: ISize };
    seatLabelPos: number;
    seatNumberPos: number;
    // tslint:disable-next-line:no-reserved-keywords
    type: number;
    size: ISize;
    objects: {
        w: number; h: number;
        x: number; y: number;
        image: string
    }[];
    seatStart: IPosition;
    map: number[][];
    special: string[];
    hc: string[];
    pair: string[];
    html?: string;
    style?: string;
}

interface ICreateScreenOption {
    resources?: string;
    width?: number;
}

interface ICreateScreenArgs {
    setting: IScreenSetting;
    screen: IScreenSetting;
    state: COA.services.reserve.IStateReserveSeatResult;
    option?: ICreateScreenOption;
}

/**
 * スクリーン生成
 * @function createScreen
 * @param {IScreenSetting} setting スクリーン共通設定
 * @param {IScreenSetting} screen スクリーン固有設定
 * @param {string | undefined} resources リソース場所
 * @returns {Promise<string>}
 */
// tslint:disable:max-func-body-length cyclomatic-complexity no-magic-numbers
async function createScreen(args: ICreateScreenArgs): Promise<string> {
    log('createScreen');
    const screen = args.screen;
    const setting = args.setting;
    const state = args.state;
    const option = args.option;
    let html = '';
    //スクリーンタイプ
    let screenType = '';
    switch (screen.type) {
        case 1:
            screenType = 'screen-imax';
            break;
        case 2:
            screenType = 'screen-4dx';
            break;
        default:
            screenType = '';
            break;
    }
    const scale = (option !== undefined && option.width) ? option.width / screen.size.w : 1;
    //html挿入の場合
    if (screen.html) {
        return `<div class="screen-cover ${screenType}">
        <div class="screen">
            <div class="screen-scroll"
            style="transform-origin: 0px 0px 0px;
            transform: scale(${scale});
            height: ${screen.size.h * scale}px">
                <div class="screen-inner" style=" width: ${screen.size.w}px; height: ${screen.size.h}px;">
                    ${screen.html}
                </div>
            </div>
        </div>
    </div>`;
    }
    //style挿入の場合
    if (screen.style) {
        html = screen.style;
    }
    //通路大きさ
    const aisle = (screen.aisle) ? screen.aisle : setting.aisle;
    //座席同士の間隔
    const seatMargin = (screen.seatMargin) ? screen.seatMargin : setting.seatMargin;
    //座席の大きさ
    const seatSize = (screen.seatSize) ? screen.seatSize : setting.seatSize;
    //座席ラベル位置
    const seatLabelPos = (screen.seatLabelPos) ? screen.seatLabelPos : setting.seatLabelPos;
    //座席番号位置
    const seatNumberPos = (screen.seatNumberPos) ? screen.seatNumberPos : setting.seatNumberPos;
    //y軸ラベル
    const labels = [];
    const startLabelNo = 65;
    const endLabelNo = 91;
    for (let i = startLabelNo; i < endLabelNo; i += 1) {
        labels.push(String.fromCharCode(i));
    }
    //ポジション
    const pos = { x: 0, y: 0 };
    //HTML
    const objectsHtml = [];
    const seatNumberHtml = [];
    const seatLabelHtml = [];
    const seatHtml = [];
    let labelCount = 0;
    for (const object of screen.objects) {
        const imageUrl = (option !== undefined && option.resources !== undefined)
            ? (option.resources + object.image)
            : object.image;
        objectsHtml.push(`<div class="object"
        style="width: ${object.w}px;
        height: ${object.h}px;
        top: ${object.y}px;
        left: ${object.x}px;
        background-image: url(${imageUrl});
        background-size: ${object.w}px ${object.h}px;"></div>`);
    }
    for (let y = 0; y < screen.map.length; y += 1) {
        if (y === 0)
            pos.y = 0;
        //ポジション設定
        if (y === 0) {
            pos.y += screen.seatStart.y;
        } else if (screen.map[y].length === 0) {
            pos.y += aisle.middle.h - seatMargin.h;
        } else {
            labelCount += 1;
            pos.y += seatSize.h + seatMargin.h;
        }
        for (let x = 0; x < screen.map[y].length; x += 1) {
            if (x === 0)
                pos.x = screen.seatStart.x;
            //座席ラベルHTML生成
            if (x === 0) {
                // tslint:disable-next-line:max-line-length
                seatLabelHtml.push(`<div
                class="object label-object line-object line-object-${labelCount}"
                style="width: ${seatSize.w}px; height: ${seatSize.h}px; top:${pos.y}px; left:${(pos.x - seatLabelPos)}px">
                ${labels[labelCount]}</div>`);
            }
            if (screen.map[y][x] === 8) {
                pos.x += aisle.middle.w;
            } else if (screen.map[y][x] === 9) {
                pos.x += aisle.middle.w;
            } else if (screen.map[y][x] === 10) {
                pos.x += (seatSize.w / 2) + seatMargin.w;
            } else if (screen.map[y][x] === 11) {
                pos.x += (seatSize.w / 2) + seatMargin.w;
            }
            //座席番号HTML生成
            if (y === 0) {
                seatNumberHtml.push(`<div
                class="object label-object column-object column-object-${x}"
                style="width: ${seatSize.w}px; height: ${seatSize.h}px; top:${(pos.y - seatNumberPos)}px; left:${pos.x}px">
                ${(x + 1)}</div>`);
            }
            if (screen.map[y][x] === 1
                || screen.map[y][x] === 4
                || screen.map[y][x] === 5
                || screen.map[y][x] === 8
                || screen.map[y][x] === 10) {
                //座席HTML生成
                const code = `${toFullWidth(labels[labelCount])}－${toFullWidth(String(x + 1))}`; //Ａ－１９
                const label = `${labels[labelCount]}${String(x + 1)}`;
                if (screen.hc.indexOf(label) !== -1) {
                    seatHtml.push(`<div class="seat seat-hc"
                    style="top:${pos.y}px; left:${pos.x}px">
                        <a href="#"
                        class="default"
                        style="width: ${seatSize.w}px; height: ${seatSize.h}px"
                        data-seat-code="${code}" data-seat-section="">
                            <span>${label}</span>
                        </a>
                    </div>`);
                } else {
                    let section = '';
                    let seat: COA.services.reserve.IStateReserveSeatFreeSeat | undefined;
                    state.listSeat.forEach((listSeat) => {
                        if (seat !== undefined) {
                            return;
                        }
                        seat = listSeat.listFreeSeat.find((freeSeat) => {
                            return (freeSeat.seatNum === code);
                        });
                        if (seat !== undefined) {
                            section = listSeat.seatSection;
                        }
                    });
                    seatHtml.push(`<div class="seat"
                    style="top:${pos.y}px; left:${pos.x}px">
                        <a href="#"
                        class="${(seat === undefined) ? 'disabled' : 'default'}"
                        style="width: ${seatSize.w}px; height: ${seatSize.h}px"
                        data-seat-code="${code}"
                        data-seat-section="${section}">
                            <span>${label}</span>
                        </a>
                    </div>`);
                }
            }
            //ポジション設定
            if (screen.map[y][x] === 2) {
                pos.x += aisle.middle.w + seatMargin.w;
            } else if (screen.map[y][x] === 3) {
                pos.x += aisle.small.w + seatMargin.w;
            } else if (screen.map[y][x] === 4) {
                pos.x += aisle.middle.w + seatSize.w + seatMargin.w;
            } else if (screen.map[y][x] === 5) {
                pos.x += aisle.small.w + seatSize.w + seatMargin.w;
            } else if (screen.map[y][x] === 6) {
                pos.x += aisle.middle.w + seatSize.w + seatMargin.w;
            } else if (screen.map[y][x] === 7) {
                pos.x += aisle.small.w + seatSize.w + seatMargin.w;
            } else {
                pos.x += seatSize.w + seatMargin.w;
            }
        }
    }
    html += `<div class="screen-inner"
        style=" width: ${screen.size.w}px; height: ${screen.size.h}px;">
        ${objectsHtml.join('\n')}
        ${seatNumberHtml.join('\n')}
        ${seatLabelHtml.join('\n')}
        ${seatHtml.join('\n')}
    <div>`;

    return `<div class="screen-cover ${screenType}">
        <div class="screen">
            <div class="screen-scroll"
            style="transform-origin: 0px 0px 0px;
            transform: scale(${scale});
            height: ${screen.size.h * scale}px">
                <div class="screen-inner" style=" width: ${screen.size.w}px; height: ${screen.size.h}px;">
                    ${html}
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * 半角=>全角
 * @function toFullWidth
 * @param {string} value
 * @returns {string}
 */
function toFullWidth(value: string) {
    return value.replace(/./g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}

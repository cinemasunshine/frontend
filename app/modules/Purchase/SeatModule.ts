/**
 * 購入座席選択
 * @namespace Purchase.SeatModule
 */

import * as COA from '@motionpicture/coa-service';
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs-extra';
import * as MP from '../../../libs/MP';
import * as seatForm from '../../forms/Purchase/SeatForm';
import * as PurchaseSession from '../../models/Purchase/PurchaseModel';
import * as ErrorUtilModule from '../Util/ErrorUtilModule';
import * as UtilModule from '../Util/UtilModule';
const log = debug('SSKTS:Purchase.SeatModule');

/**
 * 座席選択
 * @memberof Purchase.SeatModule
 * @function index
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.session === undefined) throw ErrorUtilModule.ERROR_PROPERTY;
        if (req.session.purchase === undefined) throw ErrorUtilModule.ERROR_EXPIRE;
        const purchaseModel = new PurchaseSession.PurchaseModel(req.session.purchase);
        if (purchaseModel.isExpired()) throw ErrorUtilModule.ERROR_EXPIRE;
        if (!purchaseModel.accessAuth(PurchaseSession.PurchaseModel.SEAT_STATE)) {
            throw ErrorUtilModule.ERROR_ACCESS;
        }
        if (req.params.id === undefined) throw ErrorUtilModule.ERROR_ACCESS;
        if (purchaseModel.transactionMP === null) throw ErrorUtilModule.ERROR_PROPERTY;
        purchaseModel.performance = await MP.services.performance.getPerformance({
            accessToken: await UtilModule.getAccessToken(req),
            performanceId: req.params.id
        });
        log('パフォーマンス取得');

        purchaseModel.theater = await MP.services.theater.getTheater({
            accessToken: await UtilModule.getAccessToken(req),
            theaterId: purchaseModel.performance.attributes.theater.id
        });
        log('劇場詳細取得');
        if (purchaseModel.theater === null) throw ErrorUtilModule.ERROR_PROPERTY;
        const website = purchaseModel.theater.attributes.websites.find((value) => {
            return (value.group === 'PORTAL');
        });

        const screen = await MP.services.screen.getScreen({
            accessToken: await UtilModule.getAccessToken(req),
            screenId: purchaseModel.performance.attributes.screen.id
        });
        log('スクリーン取得');
        const film = await MP.services.film.getFilm({
            accessToken: await UtilModule.getAccessToken(req),
            filmId: purchaseModel.performance.attributes.film.id
        });
        log('作品取得');

        purchaseModel.performanceCOA = {
            theaterCode: purchaseModel.theater.id,
            screenCode: screen.attributes.coa_screen_code,
            titleCode: film.attributes.coa_title_code,
            titleBranchNum: film.attributes.coa_title_branch_num,
            flgMvtkUse: film.attributes.flg_mvtk_use,
            dateMvtkBegin: film.attributes.date_mvtk_begin,
            kbnJoueihousiki: film.attributes.kbn_joueihousiki
        };
        log('COAパフォーマンス取得');

        res.locals.performance = purchaseModel.performance;
        res.locals.performanceCOA = purchaseModel.performanceCOA;
        res.locals.reserveSeats = (purchaseModel.reserveSeats !== null)
            ? JSON.stringify(purchaseModel.reserveSeats) //仮予約中
            : null;
        res.locals.transactionId = purchaseModel.transactionMP.id;
        res.locals.error = null;
        res.locals.portalTheaterSite = (website !== undefined) ? website.url : process.env.PORTAL_SITE_URL;
        res.locals.step = PurchaseSession.PurchaseModel.SEAT_STATE;
        //セッション更新
        req.session.purchase = purchaseModel.toSession();
        res.render('purchase/seat', { layout: 'layouts/purchase/layout' });
    } catch (err) {
        const error = (err instanceof Error)
            ? new ErrorUtilModule.CustomError(ErrorUtilModule.ERROR_EXTERNAL_MODULE, err.message)
            : new ErrorUtilModule.CustomError(err, undefined);
        next(error);
    }
}

/**
 * 選択座席
 * @interface ReserveSeats
 */
interface ISelectSeats {
    seat_num: string;
    seat_section: string;
}

/**
 * 座席決定
 * @memberof Purchase.SeatModule
 * @function select
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function select(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.session === undefined) throw ErrorUtilModule.ERROR_PROPERTY;
        if (req.session.purchase === undefined) throw ErrorUtilModule.ERROR_EXPIRE;
        const purchaseModel = new PurchaseSession.PurchaseModel(req.session.purchase);
        if (purchaseModel.isExpired()) throw ErrorUtilModule.ERROR_EXPIRE;
        if (purchaseModel.transactionMP === null) throw ErrorUtilModule.ERROR_PROPERTY;
        if (req.params.id === undefined) throw ErrorUtilModule.ERROR_ACCESS;
        //取引id確認
        if (req.body.transaction_id !== purchaseModel.transactionMP.id) throw ErrorUtilModule.ERROR_ACCESS;
        if (purchaseModel.theater === null) throw ErrorUtilModule.ERROR_PROPERTY;
        const website = purchaseModel.theater.attributes.websites.find((value) => {
            return (value.group === 'PORTAL');
        });
        //バリデーション
        seatForm.seatSelect(req);
        const validationResult = await req.getValidationResult();
        if (!validationResult.isEmpty()) {
            res.locals.transactionId = purchaseModel.transactionMP;
            res.locals.performance = purchaseModel.performance;
            res.locals.reserveSeats = req.body.seats;
            res.locals.error = validationResult.mapped();
            res.locals.portalTheaterSite = (website !== undefined) ? website.url : process.env.PORTAL_SITE_URL;
            res.locals.step = PurchaseSession.PurchaseModel.SEAT_STATE;
            res.render('purchase/seat', { layout: 'layouts/purchase/layout' });

            return;
        }
        const selectSeats: ISelectSeats[] = JSON.parse(req.body.seats).list_tmp_reserve;
        await reserve(req, selectSeats, purchaseModel);
        //セッション更新
        req.session.purchase = purchaseModel.toSession();
        // ムビチケセッション削除
        delete req.session.mvtk;
        //券種選択へ
        res.redirect('/purchase/ticket');

        return;
    } catch (err) {
        const error = (err instanceof Error)
            ? new ErrorUtilModule.CustomError(ErrorUtilModule.ERROR_EXTERNAL_MODULE, err.message)
            : new ErrorUtilModule.CustomError(err, undefined);
        next(error);

        return;
    }
}

/**
 * 座席仮予約
 * @memberof Purchase.SeatModule
 * @function reserve
 * @param {Request} req
 * @param {ReserveSeats[]} reserveSeats
 * @param {PurchaseSession.PurchaseModel} purchaseModel
 * @returns {Promise<void>}
 */
// tslint:disable-next-line:max-func-body-length
async function reserve(req: Request, selectSeats: ISelectSeats[], purchaseModel: PurchaseSession.PurchaseModel): Promise<void> {
    if (purchaseModel.performance === null) throw ErrorUtilModule.ERROR_PROPERTY;
    if (purchaseModel.transactionMP === null) throw ErrorUtilModule.ERROR_PROPERTY;
    if (purchaseModel.performanceCOA === null) throw ErrorUtilModule.ERROR_PROPERTY;
    const performance = purchaseModel.performance;

    //予約中
    if (purchaseModel.reserveSeats !== null) {
        if (purchaseModel.authorizationCOA === null) throw ErrorUtilModule.ERROR_PROPERTY;
        const reserveSeats = purchaseModel.reserveSeats;
        //COA仮予約削除
        await COA.services.reserve.delTmpReserve({
            theater_code: performance.attributes.theater.id,
            date_jouei: performance.attributes.day,
            title_code: purchaseModel.performanceCOA.titleCode,
            title_branch_num: purchaseModel.performanceCOA.titleBranchNum,
            time_begin: performance.attributes.time_start,
            tmp_reserve_num: reserveSeats.tmp_reserve_num
        });
        log('COA仮予約削除');
        // COAオーソリ削除
        await MP.services.transaction.removeAuthorization({
            accessToken: await UtilModule.getAccessToken(req),
            transactionId: purchaseModel.transactionMP.id,
            authorizationId: purchaseModel.authorizationCOA.id
        });
        log('MPCOAオーソリ削除');
    }
    //COA仮予約
    purchaseModel.reserveSeats = await COA.services.reserve.updTmpReserveSeat({
        theater_code: performance.attributes.theater.id,
        date_jouei: performance.attributes.day,
        title_code: purchaseModel.performanceCOA.titleCode,
        title_branch_num: purchaseModel.performanceCOA.titleBranchNum,
        time_begin: performance.attributes.time_start,
        // cnt_reserve_seat: number,
        screen_code: purchaseModel.performanceCOA.screenCode,
        list_seat: selectSeats
    });
    log('COA仮予約', purchaseModel.reserveSeats);

    if (purchaseModel.salesTicketsCOA === null) {
        //コアAPI券種取得
        purchaseModel.salesTicketsCOA = await COA.services.reserve.salesTicket({
            theater_code: purchaseModel.performance.attributes.theater.id,
            date_jouei: purchaseModel.performance.attributes.day,
            title_code: purchaseModel.performanceCOA.titleCode,
            title_branch_num: purchaseModel.performanceCOA.titleBranchNum,
            time_begin: purchaseModel.performance.attributes.time_start
            // flg_member: COA.services.reserve.FlgMember.NonMember
        });
        log('コアAPI券種取得', purchaseModel.salesTicketsCOA);
    }

    //コアAPI券種取得
    const salesTickets = purchaseModel.salesTicketsCOA;

    purchaseModel.reserveTickets = [];
    //予約チケット作成
    const tmpReserveTickets = purchaseModel.reserveSeats.list_tmp_reserve.map((tmpReserve) => {
        return {
            section: tmpReserve.seat_section,
            seat_code: tmpReserve.seat_num,
            ticket_code: salesTickets[0].ticket_code,
            ticket_name: salesTickets[0].ticket_name,
            ticket_name_eng: salesTickets[0].ticket_name_eng,
            ticket_name_kana: salesTickets[0].ticket_name_kana,
            std_price: salesTickets[0].std_price,
            add_price: salesTickets[0].add_price,
            dis_price: 0,
            sale_price: salesTickets[0].sale_price,
            add_price_glasses: 0,
            glasses: false,
            mvtk_app_price: 0,
            add_glasses: 0,
            kbn_eisyahousiki: '00', // ムビチケ映写方式区分
            mvtk_num: '', // ムビチケ購入管理番号
            mvtk_kbn_denshiken: '00', // ムビチケ電子券区分
            mvtk_kbn_maeuriken: '00', // ムビチケ前売券区分
            mvtk_kbn_kensyu: '00', // ムビチケ券種区分
            mvtk_sales_price: 0 // ムビチケ販売単価
        };
    });
    let price = 0;
    for (const tmpReserveTicket of tmpReserveTickets) {
        price += tmpReserveTicket.sale_price;
    }
    //COAオーソリ追加
    const coaAuthorizationResult = await MP.services.transaction.addCOAAuthorization({
        accessToken: await UtilModule.getAccessToken(req),
        transaction: purchaseModel.transactionMP,
        reserveSeatsTemporarilyResult: purchaseModel.reserveSeats,
        salesTicketResults: tmpReserveTickets,
        performance: performance,
        theaterCode: purchaseModel.performanceCOA.theaterCode,
        titleCode: purchaseModel.performanceCOA.titleCode,
        titleBranchNum: purchaseModel.performanceCOA.titleBranchNum,
        screenCode: purchaseModel.performanceCOA.screenCode,
        price: price
    });
    log('MPCOAオーソリ追加', coaAuthorizationResult);
    purchaseModel.authorizationCOA = coaAuthorizationResult;
    purchaseModel.authorizationCountGMO = 0;
    log('GMOオーソリカウント初期化');
}

/**
 * スクリーン状態取得
 * @memberof Purchase.SeatModule
 * @function getScreenStateReserve
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function getScreenStateReserve(req: Request, res: Response): Promise<void> {
    try {
        //バリデーション
        seatForm.screenStateReserve(req);
        const validationResult = await req.getValidationResult();
        if (!validationResult.isEmpty()) throw ErrorUtilModule.ERROR_VALIDATION;
        const theaterCode = `00${req.body.theater_code}`.slice(UtilModule.DIGITS_02);
        const screenCode = `000${req.body.screen_code}`.slice(UtilModule.DIGITS_03);
        const screen = await fs.readJSON(`./app/theaters/${theaterCode}/${screenCode}.json`);
        const setting = await fs.readJSON('./app/theaters/setting.json');
        const state = await COA.services.reserve.stateReserveSeat({
            theater_code: req.body.theater_code, // 施設コード
            date_jouei: req.body.date_jouei, // 上映日
            title_code: req.body.title_code, // 作品コード
            title_branch_num: req.body.title_branch_num, // 作品枝番
            time_begin: req.body.time_begin, // 上映時刻
            screen_code: req.body.screen_code // スクリーンコード
        });
        res.json({
            err: null,
            result: {
                screen: screen,
                setting: setting,
                state: state
            }
        });
    } catch (err) {
        res.json({ err: err, result: null });
    }
}

/**
 * 券種情報をセションへ保存
 * @memberof Purchase.SeatModule
 * @function getSalesTickets
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function saveSalesTickets(req: Request, res: Response): Promise<void> {
    try {
        //バリデーション
        seatForm.salesTickets(req);
        const validationResult = await req.getValidationResult();
        if (!validationResult.isEmpty()) throw ErrorUtilModule.ERROR_VALIDATION;
        if (req.session === undefined) throw ErrorUtilModule.ERROR_PROPERTY;
        if (req.session.purchase === undefined) throw ErrorUtilModule.ERROR_EXPIRE;
        const purchaseModel = new PurchaseSession.PurchaseModel(req.session.purchase);
        if (purchaseModel.salesTicketsCOA === null) {
            //コアAPI券種取得
            purchaseModel.salesTicketsCOA = await COA.services.reserve.salesTicket({
                theater_code: req.body.theater_code,
                date_jouei: req.body.date_jouei,
                title_code: req.body.title_code,
                title_branch_num: req.body.title_branch_num,
                time_begin: req.body.time_begin
                // flg_member: COA.services.reserve.FlgMember.NonMember
            });
            log('コアAPI券種取得', purchaseModel.salesTicketsCOA);
            req.session.purchase = purchaseModel.toSession();
            res.json({ err: null });
        } else {
            res.json({ err: null });
        }
    } catch (err) {
        res.json({ err: err });
    }
}

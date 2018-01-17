/**
 * 購入
 */
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import { Request, Response } from 'express';
import { getOptions, errorProsess } from '../base/base.controller';
import * as moment from 'moment';
import * as debug from 'debug';
const log = debug('SSKTS:purchase');

/**
 * 座席ステータス取得
 * @function getSeatState
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getSeatState(req: Request, res: Response): Promise<void> {
    try {
        const args = req.query;
        const result = await COA.services.reserve.stateReserveSeat(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 取引開始
 * @function transactionStart
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function transactionStart(req: Request, res: Response): Promise<void> {
    try {
        log('transactionStart');
        const options = getOptions(req);
        const args = req.body;
        args.expires = moment(args.expires).toDate();
        const result = await sasaki.service.transaction.placeOrder(options).start(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 座席登録
 * @function createSeatReservation
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function createSeatReservation(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).createSeatReservationAuthorization(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 座席更新
 * @function changeSeatReservation
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function changeSeatReservation(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).changeSeatReservationOffers(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 座席削除
 * @function cancelSeatReservation
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function cancelSeatReservation(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).cancelSeatReservationAuthorization(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * ムビチケ照会
 * @function mvtkPurchaseNumberAuth
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function mvtkPurchaseNumberAuth(req: Request, res: Response): Promise<void> {
    try {
        const args = req.body;
        const result = await mvtkReserve.services.auth.purchaseNumberAuth.purchaseNumberAuth(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * ムビチケ登録
 * @function createMvtkAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function createMvtkAuthorization(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).createMvtkAuthorization(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * ムビチケ削除
 * @function cancelMvtkAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function cancelMvtkAuthorization(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).cancelMvtkAuthorization(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 購入者情報登録
 * @function setCustomerContact
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function setCustomerContact(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).setCustomerContact(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * クレジットカード登録
 * @function createCreditCardAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function createCreditCardAuthorization(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).createCreditCardAuthorization(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * クレジットカード削除
 * @function cancelCreditCardAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function cancelCreditCardAuthorization(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).cancelCreditCardAuthorization(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * ムビチケ座席指定情報連携
 * @function mvtksSatInfoSync
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function mvtksSatInfoSync(req: Request, res: Response): Promise<void> {
    try {
        const args = req.body;
        const result = await mvtkReserve.services.seat.seatInfoSync.seatInfoSync(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 購入確定
 * @function setCustomerContact
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function transactionConfirm(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.transaction.placeOrder(options).confirm(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

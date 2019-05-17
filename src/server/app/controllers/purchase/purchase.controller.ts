/**
 * 購入
 */
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as debug from 'debug';
import { Request, Response } from 'express';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-frontend:purchase');

/**
 * 座席ステータス取得
 * @function getSeatState
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getSeatState(req: Request, res: Response): Promise<void> {
    log('getSeatState');
    try {
        const args = req.query;
        const result = await COA.services.reserve.stateReserveSeat(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * ムビチケチケットコード取得
 * @function mvtkTicketcode
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function mvtkTicketcode(req: Request, res: Response): Promise<void> {
    log('mvtkTicketcode');
    try {
        const args = req.body;
        const result = await COA.services.master.mvtkTicketcode(args);
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
    log('mvtkPurchaseNumberAuth');
    try {
        const args = req.body;
        const result = await mvtkReserve.services.auth.purchaseNumberAuth.purchaseNumberAuth(args);
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
    log('mvtksSatInfoSync');
    try {
        const args = req.body;
        const result = await mvtkReserve.services.seat.seatInfoSync.seatInfoSync(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 購入
 */
import * as COA from '@motionpicture/coa-service';
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
        const service = new COA.service.Reserve({
            endpoint: <string>process.env.COA_ENDPOINT,
            auth: new COA.auth.RefreshToken({
                endpoint: <string>process.env.COA_ENDPOINT,
                refreshToken: process.env.COA_REFRESH_TOKEN
            })
        });
        const result = await service.stateReserveSeat(args);
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
        const service = new COA.service.Master({
            endpoint: <string>process.env.COA_ENDPOINT,
            auth: new COA.auth.RefreshToken({
                endpoint: <string>process.env.COA_ENDPOINT,
                refreshToken: process.env.COA_REFRESH_TOKEN
            })
        });
        const result = await service.mvtkTicketcode(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}



/**
 * マスターデータ
 */
import * as COA from '@motionpicture/coa-service';
import * as debug from 'debug';
import { Request, Response } from 'express';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-frontend:master');


/**
 * 券種一覧取得
 * @function getSalesTickets
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getSalesTickets(req: Request, res: Response): Promise<void> {
    try {
        log('getSalesTickets');
        const args = req.query;
        const service = new COA.service.Reserve({
            endpoint: <string>process.env.COA_ENDPOINT,
            auth: new COA.auth.RefreshToken({
                endpoint: <string>process.env.COA_ENDPOINT,
                refreshToken: process.env.COA_REFRESH_TOKEN
            })
        });
        const result = await service.salesTicket(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 券種マスター一覧取得
 * @function getTickets
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getTickets(req: Request, res: Response): Promise<void> {
    try {
        log('getTickets');
        const args = req.query;
        const service = new COA.service.Master({
            endpoint: <string>process.env.COA_ENDPOINT,
            auth: new COA.auth.RefreshToken({
                endpoint: <string>process.env.COA_ENDPOINT,
                refreshToken: process.env.COA_REFRESH_TOKEN
            })
        });
        const result = await service.ticket(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * スクリーンマスター一覧取得
 * @function getScreens
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getScreens(req: Request, res: Response): Promise<void> {
    try {
        log('getScreens');
        const args = req.query;
        const service = new COA.service.Master({
            endpoint: <string>process.env.COA_ENDPOINT,
            auth: new COA.auth.RefreshToken({
                endpoint: <string>process.env.COA_ENDPOINT,
                refreshToken: process.env.COA_REFRESH_TOKEN
            })
        });
        const result = await service.screen(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

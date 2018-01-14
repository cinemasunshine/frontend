/**
 * マスターデータ
 */
import * as COA from '@motionpicture/coa-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import { Request, Response } from 'express';
import { getOptions, errorProsess } from '../base/base.controller';

/**
 * 劇場一覧取得
 * @function getTheaters
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getTheaters(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        console.log(options);
        const result = await sasaki.service.organization(options).searchMovieTheaters();
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * スケジュール取得
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getSchedules(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.query;
        const result = await await sasaki.service.event(options).searchIndividualScreeningEvent(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * イベント情報取得
 * @function getEvent
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getEvent(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.query;
        const result = await sasaki.service.event(options).findIndividualScreeningEvent(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 券種一覧取得
 * @function getSalesTickets
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getSalesTickets(req: Request, res: Response): Promise<void> {
    try {
        const args = req.query;
        const result = await COA.services.reserve.salesTicket(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}
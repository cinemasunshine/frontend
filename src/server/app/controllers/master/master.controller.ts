/**
 * マスターデータ
 */
import * as COA from '@motionpicture/coa-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as debug from 'debug';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { errorProsess, getOptions } from '../base/base.controller';
const log = debug('SSKTS:master');

/**
 * 劇場一覧取得
 * @function getTheaters
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getTheaters(req: Request, res: Response): Promise<void> {
    try {
        log('getTheaters');
        const options = getOptions(req);
        const result = await new sasaki.service.Organization(options).searchMovieTheaters();
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 劇場取得
 * @function getTheater
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getTheater(req: Request, res: Response): Promise<void> {
    try {
        log('getTheaters');
        const options = getOptions(req);
        const args = req.query;
        const result = await new sasaki.service.Organization(options).findMovieTheaterByBranchCode(args);
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
        log('getSchedules');
        const options = getOptions(req);
        const args = req.query;
        if (args.startFrom !== undefined) {
            args.startFrom = moment(req.query.startFrom).toDate();
        }
        if (args.startThrough !== undefined) {
            args.startThrough = moment(req.query.startThrough).toDate();
        }
        const result = await new sasaki.service.Event(options).searchIndividualScreeningEvent(args);
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
        log('getEvent');
        const options = getOptions(req);
        const args = req.query;
        const result = await new sasaki.service.Event(options).findIndividualScreeningEvent(args);
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
        log('getSalesTickets');
        const args = req.query;
        const result = await COA.services.reserve.salesTicket(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 照会
 */
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import { Request, Response } from 'express';
import { getOptions, errorProsess } from '../base/base.controller';

/**
 * 予約情報取得
 * @function getOrder
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getOrder(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const args = req.body;
        const result = await sasaki.service.order(options).findByOrderInquiryKey(args);
        res.json(result);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 照会表示
 * @function render
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function render(req: Request, res: Response): Promise<void> {
    
}
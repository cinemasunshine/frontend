/**
 * 重複予約
 * @namespace Purchase.OverlapModule
 */
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import { AuthModel } from '../../models/Auth/AuthModel';
import { PurchaseModel } from '../../models/Purchase/PurchaseModel';
import { AppError, ErrorType } from '../Util/ErrorUtilModule';
const log = debug('SSKTS:Purchase.OverlapModule');

/**
 * 仮予約重複
 * @memberof Purchase.OverlapModule
 * @function render
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function render(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.session === undefined) throw new AppError(HTTPStatus.BAD_REQUEST, ErrorType.Property);
        const authModel = new AuthModel(req.session.auth);
        const options = {
            endpoint: (<string>process.env.SSKTS_API_ENDPOINT),
            auth: authModel.create()
        };
        const purchaseModel = new PurchaseModel(req.session.purchase);

        if (req.params.id === undefined) throw new AppError(HTTPStatus.BAD_REQUEST, ErrorType.Property);
        if (purchaseModel.individualScreeningEvent === null) throw new AppError(HTTPStatus.BAD_REQUEST, ErrorType.Property);
        // イベント情報取得
        const individualScreeningEvent = await sasaki.service.event(options).findIndividualScreeningEvent({
            identifier: req.params.id
        });
        log('イベント情報取得', individualScreeningEvent);
        res.locals.after = individualScreeningEvent;
        res.locals.before = purchaseModel.individualScreeningEvent;
        res.render('purchase/overlap');
    } catch (err) {
        next(err);
    }
}

/**
 * 新規予約へ
 * @memberof Purchase.OverlapModule
 * @function newReserve
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function newReserve(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.session === undefined) throw new AppError(HTTPStatus.BAD_REQUEST, ErrorType.Property);
        const authModel = new AuthModel(req.session.auth);
        const options = {
            endpoint: (<string>process.env.SSKTS_API_ENDPOINT),
            auth: authModel.create()
        };
        const purchaseModel = new PurchaseModel(req.session.purchase);

        if (purchaseModel.transaction !== null
            && purchaseModel.seatReservationAuthorization !== null
            && !purchaseModel.isExpired()) {
            try {
                // COA仮予約削除
                await sasaki.service.transaction.placeOrder(options).cancelSeatReservationAuthorization({
                    transactionId: purchaseModel.transaction.id,
                    actionId: purchaseModel.seatReservationAuthorization.id
                });
                log('COA仮予約削除');
            } catch (err) {
                log('COA仮予約削除失敗', err);
            }
        }

        //購入スタートへ
        delete req.session.purchase;
        res.redirect(`/purchase?id=${req.body.performanceId}`);
    } catch (err) {
        next(err);
    }
}

/**
 * 前回の予約へ
 * @memberof Purchase.OverlapModule
 * @function prevReserve
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
export function prevReserve(req: Request, res: Response, next: NextFunction): void {
    if (req.session === undefined) {
        next(new AppError(HTTPStatus.BAD_REQUEST, ErrorType.Property));

        return;
    }
    //座席選択へ
    res.redirect(`/purchase/seat/${req.body.performanceId}/`);

    return;
}

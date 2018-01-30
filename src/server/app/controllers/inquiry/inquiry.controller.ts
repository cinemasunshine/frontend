/**
 * 照会
 */
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import { Request, Response } from 'express';
import { getOptions, errorProsess } from '../base/base.controller';
import * as debug from 'debug';
import { InquiryModel } from '../../models/inquiry/inquiry.model';
const log = debug('SSKTS:inquiry');
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
export async function login(req: Request, res: Response): Promise<void> {
    log('render');
    try {
        const inquiryModel = new InquiryModel((<Express.Session>req.session).inquiry);
        const options = getOptions(req);
        const args = { branchCode: req.query.theater };
        inquiryModel.movieTheaterOrganization = await sasaki.service.organization(options).findMovieTheaterByBranchCode(args);
        inquiryModel.input.reserveNum = (req.query.reserve !== undefined) ? req.query.reserve : '';
        inquiryModel.save(req.session);
        res.locals.inquiryModel = inquiryModel;
        res.locals.error = null;
        log(inquiryModel);
        res.render('inquiry/login');
    } catch (err) {
        log(err);
        res.locals.error = err;
        res.render('error/index');
    }
}

/**
 * 照会
 * @function auth
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function auth(req: Request, res: Response): Promise<void> {
    log('auth');
    try {
        loginForm(req);
        const options = getOptions(req);
        const inquiryModel = new InquiryModel((<Express.Session>req.session).inquiry);
        if (inquiryModel.movieTheaterOrganization === undefined) {
            throw new Error('movieTheaterOrganization is undefined');
        }
        const validationResult = await req.getValidationResult();
        inquiryModel.input = {
            reserveNum: req.body.reserveNum,
            telephone: req.body.telephone
        };
        inquiryModel.save(req.session);
        if (validationResult.isEmpty()) {
            const theaterCode = inquiryModel.movieTheaterOrganization.location.branchCode;
            inquiryModel.order = await sasaki.service.order(options).findByOrderInquiryKey({
                telephone: inquiryModel.input.telephone,
                confirmationNumber: Number(inquiryModel.input.reserveNum),
                theaterCode: inquiryModel.movieTheaterOrganization.location.branchCode
            });
            if (inquiryModel.order === undefined) {
                log('NOT FOUND');
                res.locals.inquiryModel = inquiryModel;
                res.locals.error = getInquiryError(req);
                return res.render('inquiry/login');
            }
            inquiryModel.save(req.session);
            const orderNumber = inquiryModel.order.orderNumber;
            return res.redirect(`/inquiry/${orderNumber}/?theater=${theaterCode}`);
        } else {
            res.locals.inquiryModel = inquiryModel;
            res.locals.error = validationResult.mapped();
            res.render('inquiry/login');

            return;
        }
    } catch (err) {
        log(err);
        res.locals.error = err;
        res.render('error/index');
    }
}

/**
 * 照会確認表示
 * @function confirm
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function confirm(req: Request, res: Response): Promise<void> {
    log('confirm');
    if (req.session === undefined || req.session.inquiry === undefined) {
        const orderNumber = req.params.orderNumber;
        const theaterCode = req.query.theater;
        return res.redirect(`/inquiry/login?orderNumber=${orderNumber}&theater=${theaterCode}`);
    }
    const inquiryModel = new InquiryModel(req.session.inquiry);
    res.locals.inquiryModel = inquiryModel;
    delete req.session.inquiry;
    res.render('inquiry/confirm');
}

/**
 * 購入者情報入力フォーム
 */
function loginForm(req: Request): void {
    const minLength = 9;
    req.checkBody('reserveNum', `${req.__('common.purchaseNumber')}${req.__('common.validation.required')}`).notEmpty();
    req.checkBody('reserveNum', `${req.__('common.purchaseNumber')}${req.__('common.validation.isNumber')}`).matches(/^[0-9]+$/);
    req.checkBody('telephone', `${req.__('common.telNum')}${req.__('common.validation.required')}`).notEmpty();
    req.checkBody('telephone', `${req.__('common.telNum')}${req.__('common.validation.isNumber')}`).matches(/^[0-9]+$/);
    req.checkBody(
        'telephone',
        `${req.__('common.telNum')}${req.__('common.validation.minlength %s', String(minLength))}`
    ).isLength({
        min: minLength
    });
};

/**
 * 照会エラー取得
 * @function getInquiryError
 * @param {Request} req
 * @returns {any}
 */
function getInquiryError(req: Request) {
    return {
        reserveNum: {
            parm: 'reserveNum',
            msg: `${req.__('common.purchaseNumber')}${req.__('common.validation.inquiry')}`,
            value: ''
        },
        telephone: {
            parm: 'telephone',
            msg: `${req.__('common.telNum')}${req.__('common.validation.inquiry')}`,
            value: ''
        }
    };
}

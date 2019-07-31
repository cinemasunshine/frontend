/**
 * mail
 */
import * as debug from 'debug';
import * as ejs from 'ejs';
import { Request, Response } from 'express';
import * as libphonenumber from 'libphonenumber-js';
import * as momentTimezone from 'moment-timezone';
import { errorProsess } from '../base/base.controller';
const log = debug('frontend:mail');

export async function getTemplate(req: Request, res: Response) {
    log('getTemplate');
    try {
        const view = req.body.view;
        const template = await ejs.render(view, {...req.body, layout: false, moment: momentTimezone, formatTelephone }, { async: true });
        res.json({ template });
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * 電話番号変換
 */
export function formatTelephone(telephone: string, format?: libphonenumber.NumberFormat) {
    if (telephone === undefined) {
        return '';
    }
    const parseNumber = libphonenumber.parse(telephone, 'JP');
    format = (format === undefined) ? 'International' : format;

    return libphonenumber.format(parseNumber, format).replace(/\s/g, '');
}


/**
 * authorize
 */
import { FlgMember } from '@motionpicture/coa-service/lib/services/reserve';
import * as debug from 'debug';
import { Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('SSKTS:authorize');

export async function getCredentials(req: Request, res: Response) {
    log('getCredentials');
    try {
        let authModel;
        if (req.query.member === FlgMember.NonMember) {
            authModel = new AuthModel((<Express.Session>req.session).auth);
        } else if (req.query.member === FlgMember.Member) {
            authModel = new Auth2Model((<Express.Session>req.session).auth);
        } else {
            throw new Error('member does not macth MemberType');
        }
        const options = {
            endpoint: (<string>process.env.SSKTS_API_ENDPOINT),
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };

        log('getCredentials MemberType', req.query.member);
        res.json(credentials);
    } catch (err) {
        errorProsess(res, err);
    }
}

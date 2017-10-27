/**
 * ルーティング照会
 */

import * as express from 'express';
import * as InquiryModule from '../modules/Inquiry/InquiryModule';

const inquiryRouter = express.Router();

//チケット照会ログイン
inquiryRouter.get('/login', InquiryModule.loginRender);

//チケット照会ログイン（認証）
inquiryRouter.post('/login', InquiryModule.inquiryAuth);

//チケット照会
inquiryRouter.get('/:orderNumber/', InquiryModule.confirmRender);

export default inquiryRouter;

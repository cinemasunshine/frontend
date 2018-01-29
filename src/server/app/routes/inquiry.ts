/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as inquiry from '../controllers/inquiry/inquiry.controller';
const router = express.Router();

//チケット照会ログイン
router.get('/login', router.loginRender);

//チケット照会ログイン（認証）
router.post('/login', router.inquiryAuth);

//チケット照会
router.get('/:orderNumber/', router.confirmRender);

export default router;

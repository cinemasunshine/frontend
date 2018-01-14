/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as inquiry from '../controllers/inquiry/inquiry.controller';
const router = express.Router();

router.post('/inquiry/getOrder', inquiry.getOrder);

export default router;

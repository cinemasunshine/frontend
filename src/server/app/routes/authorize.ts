/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as authorize from '../controllers/authorize/authorize.controller';
const router = express.Router();

router.post('/getCredentials', authorize.getCredentials);
router.post('/signIn', authorize.signIn);

export default router;

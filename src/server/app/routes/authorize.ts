/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as authorize from '../controllers/authorize/authorize.controller';
const router = express.Router();

router.get('/getCredentials', authorize.getCredentials);
router.get('/signIn', authorize.signIn);
router.get('/mocoin/signIn', authorize.mocoinSignIn);

export default router;

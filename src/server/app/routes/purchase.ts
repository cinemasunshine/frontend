/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as purchase from '../controllers/purchase/purchase.controller';
const router = express.Router();

router.get('/getSeatState', purchase.getSeatState);
router.post('/mvtk/ticketcode', purchase.mvtkTicketcode);

export default router;

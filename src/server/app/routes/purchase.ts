/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as purchase from '../controllers/purchase/purchase.controller';
const router = express.Router();

router.get('/getSeatState', purchase.getSeatState);
router.post('/mvtk/ticketcode', purchase.mvtkTicketcode);
router.post('/mvtk/purchaseNumberAuth', purchase.mvtkPurchaseNumberAuth);
router.post('/mvtk/satInfoSync', purchase.mvtkSatInfoSync);
router.post('/mg/ticketcode', purchase.mgTicketcode);
router.post('/mg/purchaseNumberAuth', purchase.mgPurchaseNumberAuth);
router.post('/mg/satInfoSync', purchase.mgSatInfoSync);

export default router;

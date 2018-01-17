/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as master from '../controllers/master/master.controller';
const router = express.Router();

router.get('/getEvent', master.getEvent);
router.get('/getSalesTickets', master.getSalesTickets);
router.get('/getSchedules', master.getSchedules);
router.get('/getTheaters', master.getTheaters);
router.get('/getTheater', master.getTheater);

export default router;

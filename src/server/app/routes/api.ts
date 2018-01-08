/**
 * ルーティングAPI
 */

import * as express from 'express';

const router = express.Router();

router.get('/test', (req: express.Request, res: express.Response): void => {
    const result = {
        code: req.statusCode
    };
    res.json(result);
});

export default router;

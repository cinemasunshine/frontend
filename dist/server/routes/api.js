"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/test', (req, res) => {
    const result = {
        code: req.statusCode
    };
    res.json(result);
});
exports.default = router;

"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const inquiry = require("../controllers/inquiry/inquiry.controller");
const router = express.Router();
router.post('/inquiry/getOrder', inquiry.getOrder);
exports.default = router;

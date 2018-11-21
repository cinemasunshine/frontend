"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authorize = require("../controllers/authorize/authorize.controller");
const router = express.Router();
router.post('/getCredentials', authorize.getCredentials);
router.post('/signIn', authorize.signIn);
exports.default = router;

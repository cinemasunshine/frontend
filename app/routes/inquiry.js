"use strict";
/**
 * ルーティング照会
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const InquiryModule = require("../modules/Inquiry/InquiryModule");
const inquiryRouter = express.Router();
//チケット照会ログイン
inquiryRouter.get('/login', InquiryModule.loginRender);
//チケット照会ログイン（認証）
inquiryRouter.post('/login', InquiryModule.inquiryAuth);
//チケット照会
inquiryRouter.get('/:orderNumber/', InquiryModule.confirmRender);
exports.default = inquiryRouter;
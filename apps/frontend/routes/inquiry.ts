import express = require('express');
import InquiryModule from '../modules/Inquiry/InquiryModule';

let router = express.Router();

//チケット照会ログイン
router.get('/login', InquiryModule.login);

//チケット照会ログイン（認証）
router.post('/login', InquiryModule.auth);

//チケット照会
router.get('/:transactionId/', InquiryModule.index);

export default router; 
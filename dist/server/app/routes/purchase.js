"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const purchase = require("../controllers/purchase/purchase.controller");
const router = express.Router();
router.post('/cancelCreditCardAuthorization', purchase.cancelCreditCardAuthorization);
router.post('/cancelMvtkAuthorization', purchase.cancelMvtkAuthorization);
router.post('/cancelSeatReservation', purchase.cancelSeatReservation);
router.post('/changeSeatReservation', purchase.changeSeatReservation);
router.post('/createCreditCardAuthorization', purchase.createCreditCardAuthorization);
router.post('/createMvtkAuthorization', purchase.createMvtkAuthorization);
router.post('/createSeatReservation', purchase.createSeatReservation);
router.get('/getSeatState', purchase.getSeatState);
router.post('/mvtkTicketcode', purchase.mvtkTicketcode);
router.post('/mvtkPurchaseNumberAuth', purchase.mvtkPurchaseNumberAuth);
router.post('/mvtksSatInfoSync', purchase.mvtksSatInfoSync);
router.post('/setCustomerContact', purchase.setCustomerContact);
router.post('/transactionConfirm', purchase.transactionConfirm);
router.post('/transactionStart', purchase.transactionStart);
exports.default = router;

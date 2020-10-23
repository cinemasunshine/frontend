"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const purchase = require("../../controllers/purchase/purchase.controller");
const router = express.Router();
router.get('/getSeatState', purchase.getSeatState);
router.post('/mvtk/ticketcode', purchase.mvtkTicketcode);
router.post('/mg/ticketcode', purchase.mgTicketcode);
exports.purchaseRouter = router;

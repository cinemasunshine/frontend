"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const master = require("../controllers/master/master.controller");
const router = express.Router();
router.get('/getEvent', master.getEvent);
router.get('/getSalesTickets', master.getSalesTickets);
router.get('/getSchedules', master.getSchedules);
router.get('/getTheaters', master.getTheaters);
router.get('/getTheater', master.getTheater);
exports.default = router;

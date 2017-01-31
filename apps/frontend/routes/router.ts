import express = require('express');
import NamedRoutes = require('named-routes');
import BaseController from '../controllers/BaseController';
import PerformanceController from '..//controllers/Performance/PerformanceController';

import PurchaseController from '../controllers/Purchase/PurchaseController';
import TransactionController from '../controllers/Purchase/TransactionController';
import OverlapController from '../controllers/Purchase/OverlapController';
import SeatController from '../controllers/Purchase/SeatController';
import InputController from '../controllers/Purchase/InputController';
import TicketController from '../controllers/Purchase/TicketController';
import ConfirmController from '../controllers/Purchase/ConfirmController';
import CompleteController from '../controllers/Purchase/CompleteController';

import MvtkInputController from '../controllers/Purchase/Mvtk/MvtkInputController';
import MvtkAuthController from '../controllers/Purchase/Mvtk/MvtkAuthController';
import MvtkConfirmController from '../controllers/Purchase/Mvtk/MvtkConfirmController';

import InquiryController from '../controllers/Inquiry/InquiryController';

import MethodController from '../controllers/Method/MethodController';

import ErrorController from '../controllers/Error/ErrorController';

/**
 * URLルーティング
 * 
 * app.get(パス, ルーティング名称, メソッド);
 * といった形でルーティングを登録する
 * ルーティング名称は、ejs側やコントローラーでURLを生成する際に用いたりするので、意識的にページ一意な値を定めること
 * 
 * リクエスト毎に、req,res,nextでコントローラーインスタンスを生成して、URLに応じたメソッドを実行する、という考え方
 * 
 */
export default (app: express.Application | any) => {
    let router: Express.NamedRoutes = new NamedRoutes();
    router.extendExpress(app);
    router.registerAppHelpers(app);

    app.get('/', 'index', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new BaseController(req, res, next);
        res.redirect(router.build('performance', {}));
    });

    app.get('/performance', 'performance', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new PerformanceController(req, res, next).index();
    });

    //パフォーマンス一覧
    app.post('/performance', 'performance', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new PerformanceController(req, res, next).getPerformances(req.body.day);
    });

    //購入(取引開始)
    app.get('/purchase/:id/transaction', 'purchase', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new TransactionController(req, res, next).start();
    });

    //仮予約重複
    app.get('/purchase/:id/overlap', 'purchase.overlap', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new OverlapController(req, res, next).index();
    });

    app.post('/purchase/overlap/new', 'purchase.overlap.new', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new OverlapController(req, res, next).newReserve();
    });

    app.post('/purchase/overlap/prev', 'purchase.overlap.prev', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new OverlapController(req, res, next).prevReserve();
    });

    //座席選択
    app.get('/purchase/seat/:id', 'purchase.seat', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new SeatController(req, res, next).index();
    });

    app.post('/purchase/seat/:id', 'purchase.seat', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new SeatController(req, res, next).select();
    });

    //券種選択
    app.get('/purchase/ticket', 'purchase.ticket', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new TicketController(req, res, next).index();
    });

    app.post('/purchase/ticket', 'purchase.ticket', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new TicketController(req, res, next).select();
    });

    //購入者情報入力
    app.get('/purchase/input', 'purchase.input', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new InputController(req, res, next).index();
    });

    app.post('/purchase/input', 'purchase.input', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new InputController(req, res, next).submit();
    });

    //購入内容確認
    app.get('/purchase/confirm', 'purchase.confirm', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new ConfirmController(req, res, next).index();
    });

    app.post('/purchase/confirm', 'purchase.confirm', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new ConfirmController(req, res, next).purchase();
    });

    //購入完了
    app.get('/purchase/complete', 'purchase.complete', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new CompleteController(req, res, next).index();
    });
    

    //ムビチケ券入力
    app.get('/purchase/mvtk', 'purchase.mvtk', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MvtkInputController(req, res, next).index();
    });

    app.post('/purchase/mvtk', 'purchase.mvtk', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MvtkInputController(req, res, next).auth();
    });

    //ムビチケ券認証
    app.get('/purchase/mvtk/auth', 'purchase.mvtk.auth', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MvtkAuthController(req, res, next).index();
    });

    app.post('/purchase/mvtk/auth', 'purchase.mvtk.auth', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MvtkAuthController(req, res, next).submit();
    });

    //ムビチケ券適用確認
    app.get('/purchase/mvtk/confirm', 'purchase.mvtk.confirm', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MvtkConfirmController(req, res, next).index();
    });

    app.post('/purchase/mvtk/confirm', 'purchase.mvtk.confirm', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MvtkConfirmController(req, res, next).submit();
    });

    //チケット照会ログイン
    app.get('/inquiry/login', 'inquiry.login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new InquiryController(req, res, next).login();
    });

    app.post('/inquiry/login', 'inquiry.login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new InquiryController(req, res, next).auth();
    });

    //チケット照会
    app.get('/inquiry', 'inquiry', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new InquiryController(req, res, next).index();
    });

    //チケット照会(QRコード発行印刷ページ)
    app.get('/inquiry/print', 'inquiry.print', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new InquiryController(req, res, next).print();
    });

    //入場方法説明
    app.get('/method/entry', 'method.entry', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MethodController(req, res, next).entry();
    });

    //発券方法説明
    app.get('/method/ticketing', 'method.ticketing', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new MethodController(req, res, next).ticketing();
    });

    //座席状態取得
    app.post('/purchase/getScreenStateReserve', 'purchase.getScreenStateReserve', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new PurchaseController(req, res, next).getScreenStateReserve();
    });

    

    app.get('/500', '500', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new BaseController(req, res, next);
        process.exit(1);
    });






    // error handlers
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        new ErrorController(req, res, next).index(err);
    });

    // 404
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        new ErrorController(req, res, next).notFound();
    });

    
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as COA from '@motionpicture/coa-service';
import { environment } from '../../../../../environments/environment';
import { IScreenConfig, ISeat } from '../../../../models';
import {
    ErrorService,
    FlgMember,
    ISalesTicketResult,
    PurchaseService,
    SasakiService,
    UserService
} from '../../../../services';

@Component({
    selector: 'app-purchase-seat',
    templateUrl: './purchase-seat.component.html',
    styleUrls: ['./purchase-seat.component.scss']
})
export class PurchaseSeatComponent implements OnInit {
    public isLoading: boolean;
    public seatForm: FormGroup;
    public notSelectSeatModal: boolean;
    public upperLimitModal: boolean;
    public seats: ISeat[];
    public disable: boolean;
    public screenData: {
        screenConfig: IScreenConfig;
        status: COA.services.reserve.IStateReserveSeatResult;
    };
    public environment = environment;
    public seatRegistrationErrorModal: boolean;

    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private formBuilder: FormBuilder,
        private sasaki: SasakiService,
        private error: ErrorService,
        private user: UserService,
        private http: HttpClient
    ) { }

    public async ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = true;
        this.notSelectSeatModal = false;
        this.seatRegistrationErrorModal = false;
        this.seats = [];
        this.seatForm = this.formBuilder.group({
            terms: [false, [Validators.requiredTrue]]
        });
        this.disable = false;
        if (this.purchase.data.screeningEvent === undefined) {
            this.error.redirect(new Error('screeningEvent is undefined'));

            return;
        }

        if (this.purchase.data.screeningEvent.coaInfo === undefined) {
            this.error.redirect(new Error('coaInfo is undefined'));

            return;
        }
        try {
            this.screenData = await this.getData({
                theaterCode: this.purchase.data.screeningEvent.coaInfo.theaterCode,
                dateJouei: this.purchase.data.screeningEvent.coaInfo.dateJouei,
                titleCode: this.purchase.data.screeningEvent.coaInfo.titleCode,
                titleBranchNum: this.purchase.data.screeningEvent.coaInfo.titleBranchNum,
                timeBegin: this.purchase.data.screeningEvent.coaInfo.timeBegin,
                screenCode: this.purchase.data.screeningEvent.coaInfo.screenCode
            });
            this.isLoading = false;
        } catch (error) {
            this.error.redirect(error);

            return;
        }
    }

    /**
     * データ取得
     * @method getData
     */
    public async getData(params: {
        theaterCode: string;
        dateJouei: string;
        titleCode: string;
        titleBranchNum: string;
        timeBegin: string;
        screenCode: string;
    }): Promise<{
        screenConfig: IScreenConfig,
        status: COA.services.reserve.IStateReserveSeatResult
        screen: COA.services.master.IScreenResult
    }> {
        const DIGITS = { '02': -2, '03': -3 };
        const theaterCode = `00${params.theaterCode}`.slice(DIGITS['02']);
        const screenCode = `000${params.screenCode}`.slice(DIGITS['03']);
        const screenConfig = await this.http.get<IScreenConfig>(`/json/theater/${theaterCode}/${screenCode}.json`).toPromise();
        const setting = await this.http.get<IScreenConfig>('/json/theater/setting.json').toPromise();

        await this.sasaki.getServices();
        const status = await this.sasaki.getSeatState({
            theaterCode: params.theaterCode,
            dateJouei: params.dateJouei,
            titleCode: params.titleCode,
            titleBranchNum: params.titleBranchNum,
            timeBegin: params.timeBegin,
            screenCode: params.screenCode
        });
        const screens = await this.sasaki.getScreens({
            theaterCode: params.theaterCode
        });
        const screen = screens.find(s => s.screenCode === params.screenCode);
        if (screen === undefined) {
            throw new Error('screen notfound');
        }
        // スクリーンデータをマージ
        return {
            screenConfig: Object.assign(setting, screenConfig),
            status,
            screen
        };
    }

    /**
     * スクリーン読み込み完了
     * @method loadScreen
     * @param {ISeat[]} seats
     */
    public loadScreen(seats: ISeat[]) {
        this.isLoading = false;
        this.seats = seats;
    }

    /**
     * 販売可能チケット情報取得
     * @method getSalesTickets
     */
    public async fitchSalesTickets() {
        const screeningEvent = this.purchase.data.screeningEvent;
        if (screeningEvent === undefined) {
            throw new Error('screeningEvent is undefined');
        }
        if (screeningEvent.coaInfo === undefined) {
            throw new Error('coaInfo is undefined');
        }
        await this.sasaki.getServices();
        const salesTicketArgs = {
            theaterCode: screeningEvent.coaInfo.theaterCode,
            dateJouei: screeningEvent.coaInfo.dateJouei,
            titleCode: screeningEvent.coaInfo.titleCode,
            titleBranchNum: screeningEvent.coaInfo.titleBranchNum,
            timeBegin: screeningEvent.coaInfo.timeBegin,
            flgMember: (this.user.isMember()) ? FlgMember.Member : FlgMember.NonMember
        };
        const salesTickets = await this.sasaki.getSalesTickets(salesTicketArgs);
        // console.log('salesTickets', salesTicketArgs, salesTickets);

        return salesTickets;
    }

    /**
     * 次へ
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.seats.length === 0) {
            this.notSelectSeatModal = true;
            return;
        }
        if (this.disable) {
            return;
        }
        if (this.seatForm.invalid) {
            this.seatForm.controls.terms.markAsDirty();

            return;
        }
        this.disable = true;
        this.isLoading = true;
        if (this.purchase.isExpired()) {
            this.router.navigate(['expired']);

            return;
        }

        try {
            // 券種取得
            if (this.purchase.data.salesTickets.length === 0) {
                this.purchase.data.salesTickets = await this.fitchSalesTickets();
            }
        } catch (error) {
            this.error.redirect(error);

            return;
        }

        try {
            // 座席取り消し
            if (this.purchase.data.tmpSeatReservationAuthorization !== undefined) {
                await this.purchase.cancelSeatRegistrationProcess();
            }
        } catch (error) {
            this.error.redirect(error);

            return;
        }

        try {
            const offers = this.seats.map((seat) => {
                const salesTicket = (<ISalesTicketResult[]>this.purchase.data.salesTickets)[0];

                return {
                    seatSection: seat.coaInfo.section,
                    seatNumber: seat.coaInfo.seatNum,
                    ticketInfo: {
                        ticketCode: salesTicket.ticketCode,
                        mvtkAppPrice: 0,
                        ticketCount: 1,
                        addGlasses: 0,
                        kbnEisyahousiki: '00',
                        mvtkNum: '',
                        mvtkKbnDenshiken: '00',
                        mvtkKbnMaeuriken: '00',
                        mvtkKbnKensyu: '00',
                        mvtkSalesPrice: 0
                    }
                };
            });
            await this.purchase.seatRegistrationProcess(offers);
            this.router.navigate(['/purchase/ticket']);
        } catch (error) {
            this.seatRegistrationErrorModal = true;
            this.isLoading = false;
            this.disable = false;
        }
    }

    /**
     * 座席選択
     * @method seatSelect
     * @param {Iseat[]} seats
     */
    public seatSelect(seats: ISeat[]) {
        this.seats = seats;
    }

    /**
     * 座席選択数警告
     * @method seatSelectionAlert
     */
    public seatSelectionAlert() {
        this.upperLimitModal = true;
    }

    public getSeatType(seatType: 'ottoman' | 'comfort' | 'grandClass' | 'premiumClass' | 'pairLeft' | 'pairRight') {
        if (this.screenData === undefined) {
            return false;
        }
        const findSpecialSeatsResult = this.screenData.screenConfig.specialSeats.find(s => s.name === seatType);
        return (findSpecialSeatsResult !== undefined && findSpecialSeatsResult.data.length > 0);
    }

}


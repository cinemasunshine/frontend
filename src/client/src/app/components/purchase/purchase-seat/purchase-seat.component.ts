import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISalesTicketResult } from '@motionpicture/coa-service/lib/services/reserve';
import { ErrorService } from '../../../services/error/error.service';
import { IIndividualScreeningEvent, ISalesTicket, PurchaseService } from '../../../services/purchase/purchase.service';
import { SasakiMasterService } from '../../../services/sasaki/sasaki-master/sasaki-master.service';
import { ISeat } from '../../parts/screen/screen.component';

@Component({
    selector: 'app-purchase-seat',
    templateUrl: './purchase-seat.component.html',
    styleUrls: ['./purchase-seat.component.scss']
})
export class PurchaseSeatComponent implements OnInit, AfterViewInit {
    public isLoading: boolean;
    public seatForm: FormGroup;
    public notSelectSeatModal: boolean;
    public upperLimitModal: boolean;
    public seats: ISeat[];

    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private formBuilder: FormBuilder,
        private sasakiMaster: SasakiMasterService,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = true;
        this.notSelectSeatModal = false;
        this.seats = [];
        this.seatForm = this.formBuilder.group({
            terms: [false, [Validators.requiredTrue]]
        });
    }

    public async ngAfterViewInit() {
        if (this.purchase.data.salesTickets === undefined) {
            this.purchase.data.salesTickets = await this.fitchSalesTickets();
        }
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
        const individualScreeningEvent = <IIndividualScreeningEvent>this.purchase.data.individualScreeningEvent;
        const salesTickets = await this.sasakiMaster.getSalesTickets({
            theaterCode: individualScreeningEvent.coaInfo.theaterCode,
            dateJouei: individualScreeningEvent.coaInfo.dateJouei,
            titleCode: individualScreeningEvent.coaInfo.titleCode,
            titleBranchNum: individualScreeningEvent.coaInfo.titleBranchNum,
            timeBegin: individualScreeningEvent.coaInfo.timeBegin
        });
        const result: ISalesTicket[] = [];
        for (const salesTicket of salesTickets) {
            const noGlasses = Object.assign({ glasses: false, mvtkNum: '' }, salesTicket);
            noGlasses.addGlasses = 0;
            result.push(noGlasses);
            if (salesTicket.addGlasses > 0) {
                // メガネあり券種作成
                const glasses = Object.assign({ glasses: true, mvtkNum: '' }, salesTicket);
                glasses.salePrice = glasses.salePrice + glasses.addGlasses;
                glasses.ticketName = glasses.ticketName + 'メガネ込み';
                result.push(glasses);
            }
        }

        return result;
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
        if (this.seatForm.invalid) {
            return;
        }
        this.isLoading = true;
        try {
            if (this.purchase.data.salesTickets === undefined) {
                this.purchase.data.salesTickets = await this.fitchSalesTickets();
            }
            const offers = this.seats.map((seat) => {
                const salesTicket = (<ISalesTicketResult[]>this.purchase.data.salesTickets)[0];

                return {
                    seatSection: seat.section,
                    seatNumber: seat.code,
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
        } catch (err) {
            this.error.redirect(err);
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

}


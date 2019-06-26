import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as COA from '@motionpicture/coa-service';
import { IScreen } from '../../../models';

@Component({
    selector: 'app-test-screen',
    templateUrl: './test-screen.component.html',
    styleUrls: ['./test-screen.component.scss']
})
export class TestScreenComponent implements OnInit {
    public isLoading: boolean;
    public screenData: {
        screen: IScreen;
        status: COA.services.reserve.IStateReserveSeatResult;
    };
    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.activatedRoute.params.subscribe(async (params) => {
            this.screenData = await this.getData({
                theaterCode: params.theaterCode,
                dateJouei: '',
                titleCode: '',
                titleBranchNum: '',
                timeBegin: '',
                screenCode: params.screenCode
            });

            this.isLoading = false;
        });
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
        screen: IScreen,
        status: COA.services.reserve.IStateReserveSeatResult
    }> {
        const DIGITS = {
            '02': -2,
            '03': -3
        };
        const theaterCode = `00${params.theaterCode}`.slice(DIGITS['02']);
        const screenCode = `000${params.screenCode}`.slice(DIGITS['03']);
        const screen = await this.http.get<IScreen>(`/json/theater/${theaterCode}/${screenCode}.json`).toPromise();
        const setting = await this.http.get<IScreen>('/json/theater/setting.json').toPromise();

        const seatStatus = (<any>{ listSeat: [] });
        // スクリーンデータをマージ
        return {
            screen: Object.assign(setting, screen),
            status: seatStatus
        };
    }

}

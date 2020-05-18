import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as COA from '@motionpicture/coa-service';
import { IScreenConfig } from '../../../../models';
import { CinerinoService } from '../../../../services';

@Component({
    selector: 'app-test-screen',
    templateUrl: './test-screen.component.html',
    styleUrls: ['./test-screen.component.scss']
})
export class TestScreenComponent implements OnInit {
    public isLoading: boolean;
    public screenData: {
        screenConfig: IScreenConfig;
        status: COA.services.reserve.IStateReserveSeatResult;
        screen?: COA.services.master.IScreenResult;
    };
    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private cinerinoService: CinerinoService
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
        screenConfig: IScreenConfig,
        status: COA.services.reserve.IStateReserveSeatResult,
        screen?: COA.services.master.IScreenResult
    }> {
        const DIGITS = { '02': -2, '03': -3 };
        const theaterCode = `00${params.theaterCode}`.slice(DIGITS['02']);
        const screenCode = `000${params.screenCode}`.slice(DIGITS['03']);
        const screenConfig = await this.http.get<IScreenConfig>(`/json/theater/${theaterCode}/${screenCode}.json`).toPromise();
        const setting = await this.http.get<IScreenConfig>('/json/theater/setting.json').toPromise();

        const status = (<any>{ listSeat: [] });
        let screen;
        try {
            const screens = await this.cinerinoService.getScreens({
                theaterCode: params.theaterCode
            });
            screen = screens.find(s => s.screenCode === params.screenCode);
        } catch (error) {
            console.error(error);
        }
        // スクリーンデータをマージ
        return {
            screenConfig: Object.assign(setting, screenConfig),
            status,
            screen
        };
    }

}

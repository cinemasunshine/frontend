import { Component, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import { SasakiMasterService } from '../../../services/sasaki/sasaki-master/sasaki-master.service';

@Component({
    selector: 'app-purchase-schedule',
    templateUrl: './purchase-schedule.component.html',
    styleUrls: ['./purchase-schedule.component.scss']
})
export class PurchaseScheduleComponent implements OnInit {
    public theaters: sasaki.factory.organization.movieTheater.IPublicFields[];

    constructor(private sasakiMaster: SasakiMasterService) { }

    public async ngOnInit() {
        this.theaters = await this.sasakiMaster.getTheaters();
        console.log(this.theaters);
    }

}

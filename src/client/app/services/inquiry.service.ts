import { Injectable } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { SasakiService } from './sasaki.service';
import { SaveType, StorageService } from './storage.service';


export interface IInquiryData {
    /**
     * 注文
     */
    order?: factory.order.IOrder;
    /**
     * 販売者
     */
    seller?: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
}


@Injectable({
    providedIn: 'root'
})
export class InquiryService {

    public data: IInquiryData;

    constructor(
        private storage: StorageService,
        private sasakiService: SasakiService
    ) {
        this.load();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: IInquiryData | null = this.storage.load('inquiry', SaveType.Session);
        if (data === null) {
            this.data = {};

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storage.save('inquiry', this.data, SaveType.Session);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        this.data = {};
        this.save();
    }

    /**
     * 販売者検索
     */
    public async searchSeller(branchCode: string) {
        await this.sasakiService.getServices();
        const result = await this.sasakiService.seller.search({
            location: { branchCodes: [branchCode] }
        });
        return result;
    }

    /**
     * 照会
     */
    public async findByOrderInquiryKey(params: {
        theaterCode: string;
        confirmationNumber: number;
        telephone: string;
    }) {
        await this.sasakiService.getServices();
        const order = await this.sasakiService.order.findByOrderInquiryKey(params);

        return order;
    }

}

import { Component, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { TimeFormatPipe } from '../../../pipes/time-format/time-format.pipe';
import { AwsCognitoService } from '../../../services/aws-cognito/aws-cognito.service';
import { ErrorService } from '../../../services/error/error.service';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {
    public order: sasaki.factory.order.IOrder;
    public transaction: sasaki.factory.transaction.placeOrder.ITransaction;
    public environment = environment;

    constructor(
        private storage: StorageService,
        private error: ErrorService,
        private sasakiPurchase: SasakiPurchaseService,
        private awsCognito: AwsCognitoService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.order = this.storage.load('order', SaveType.Session);
        this.transaction = this.storage.load('transaction', SaveType.Session);
        if (this.order === null || this.transaction === null) {
            this.error.redirect(new Error('order or transaction is null'));
        }
        this.mailSendProcess(0).then().catch();
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName() {
        return this.order.acceptedOffers[0].itemOffered.reservationFor.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        return this.order.acceptedOffers[0].itemOffered.reservationFor.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        return this.order.acceptedOffers[0].itemOffered.reservationFor.workPerformed.name;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        moment.locale('ja');

        return moment(this.order.acceptedOffers[0].itemOffered.reservationFor.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.order.acceptedOffers[0].itemOffered.reservationFor.coaInfo.dateJouei,
            this.order.acceptedOffers[0].itemOffered.reservationFor.startDate
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate() {
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.order.acceptedOffers[0].itemOffered.reservationFor.coaInfo.dateJouei,
            this.order.acceptedOffers[0].itemOffered.reservationFor.endDate
        );
    }

    /**
     * メール送信処理
     */
    public async mailSendProcess(count: number) {
        const text = (this.awsCognito.isAuthenticate()) ? this.getAppMailText() : this.getMailText();
        const sendEmailNotificationArgs = {
            transactionId: this.transaction.id,
            emailMessageAttributes: {
                sender: {
                    name: this.order.seller.name,
                    email: 'noreply@ticket-cinemasunshine.com'
                },
                toRecipient: {
                    name: `${this.order.customer.familyName} ${this.order.customer.givenName}`,
                    email: this.order.customer.email
                },
                about: `${this.order.seller.name} 購入完了`,
                text: text
            }
        };
        try {
            await this.sasakiPurchase.sendEmailNotification(sendEmailNotificationArgs);
        } catch (err) {
            const limit = 10;
            if (count < limit) {
                const timer = 1000;
                setTimeout(
                    () => {
                        this.mailSendProcess(count + 1);
                    },
                    timer
                );
            }
        }
    }

    public getMailText() {
        // tslint:disable:max-line-length
        return `${this.order.customer.familyName} ${this.order.customer.givenName} 様
この度は、${ this.order.seller.name}のオンライン先売りチケットサービスにてご購入頂き、誠にありがとうございます。お客様がご購入されましたチケットの情報は下記の通りです。

[予約番号]
${ this.order.confirmationNumber}

[鑑賞日時]
${ this.getAppreciationDate()} ${this.getStartDate()} - ${this.getEndDate()}

[作品名]
${ this.getTitle()}

[スクリーン名]
${ this.getScreenName()}

[座席]
${ this.order.acceptedOffers.map((offer) => {
        return `${offer.itemOffered.reservedTicket.coaTicketInfo.seatNum} ${offer.itemOffered.reservedTicket.coaTicketInfo.ticketName} ￥${offer.price}
    `;
    })}
[合計]
￥${ this.order.price}

【チケット発券について】
チケットの発券/入場方法は2通りからお選び頂けます。

<発券/入場方法1 入場用QRコードで入場>
以下のURLよりチケット情報確認画面へアクセス頂き、「チケットを購入した劇場」「予約番号」「お電話番号」を入力してログインしてください。 ご鑑賞時間の24時間前から入場用QRコードが表示されますので、入場時にそちらのQRコードをご提示ください。
${ this.environment.API_ENDPOINT}/inquiry/login?theater=${''}&reserve=${this.order.confirmationNumber}

<発券/入場方法2 劇場発券機で発券>
劇場に設置されている発券機にて発券頂きます。予約番号をお控えの上ご来場ください。
チケットが発券できなかった場合にはチケット売場にお越しください。

【ご注意事項】
・ご購入されたチケットの変更、キャンセル、払い戻しはいかなる場合でも致しかねます。
・チケットの発券にお時間がかかる場合もございますので、お時間の余裕を持ってご来場ください。
・メンバーズカード会員のお客様は、ポイントは付与いたしますので、発券したチケットまたは、表示されたQRコードとメンバーズカードをチケット売場までお持ちくださいませ。
・年齢や学生など各種証明が必要なチケットを購入された方は、入場時にご提示ください。
ご提示頂けない場合は、一般料金との差額を頂きます。

なお、このメールは、${ this.order.seller.name}の予約システムでチケットをご購入頂いた方にお送りしておりますが、
チケット購入に覚えのない方に届いております場合は、下記お問い合わせ先までご連絡ください。
※なお、このメールアドレスは送信専用となっておりますので、ご返信頂けません。
ご不明な点がございましたら、下記番号までお問合わせください。

お問い合わせはこちら
${ this.order.seller.name}
TEL：${ ''}`;
    }

    public getAppMailText() {
        // tslint:disable:max-line-length
        return `${this.order.customer.familyName} ${this.order.customer.givenName} 様
この度は、${ this.order.seller.name}のオンライン先売りチケットサービスにてご購入頂き、誠にありがとうございます。お客様がご購入されましたチケットの情報は下記の通りです。

[予約番号]
${ this.order.confirmationNumber}

[鑑賞日時]
${ this.getAppreciationDate()} ${this.getStartDate()} - ${this.getEndDate()}

[作品名]
${ this.getTitle()}

[スクリーン名]
${ this.getScreenName()}

[座席]
${ this.order.acceptedOffers.map((offer) => {
        return `${offer.itemOffered.reservedTicket.coaTicketInfo.seatNum} ${offer.itemOffered.reservedTicket.coaTicketInfo.ticketName} ￥${offer.price}
    `;
    })}
[合計]
￥${ this.order.price}

【チケット発券について】
チケットはシネマサンシャイン公式アプリの購入済みチケットホルダー内に格納されます。
ご鑑賞時間の24時間前から入場用QRコードが表示されますので、入場時にそちらのQRコードをご提示ください。

また購入済みチケットホルダー内にチケットが表示されなかった場合は、お手数ですが以下のURLよりチケット情報確認画面へアクセス頂き、「チケットを購入した劇場」「予約番号」「お電話番号」を入力してログインしてください。ご鑑賞時間の24時間前から入場用QRコードが表示されます。
${ this.environment.API_ENDPOINT}/inquiry/login?theater=${''}&reserve=${this.order.confirmationNumber}

または劇場に設置されている発券機にて発券頂きますので予約番号をお控えの上ご来場ください。
チケットが発券できなかった場合にはチケット売場にお越しください。

【ご注意事項】
・ご購入されたチケットの変更、キャンセル、払い戻しはいかなる場合でも致しかねます。
・チケットの発券にお時間がかかる場合もございますので、お時間の余裕を持ってご来場ください。
・メンバーズカード会員のお客様は、ポイントは付与いたしますので、発券したチケットまたは、表示されたQRコードとメンバーズカードをチケット売場までお持ちくださいませ。
・年齢や学生など各種証明が必要なチケットを購入された方は、入場時にご提示ください。
ご提示頂けない場合は、一般料金との差額を頂きます。

なお、このメールは、${ this.order.seller.name}の予約システムでチケットをご購入頂いた方にお送りしておりますが、
チケット購入に覚えのない方に届いております場合は、下記お問い合わせ先までご連絡ください。
※なお、このメールアドレスは送信専用となっておりますので、ご返信頂けません。
ご不明な点がございましたら、下記番号までお問合わせください。

お問い合わせはこちら
${ this.order.seller.name}
TEL：${ ''}`;
    }
}

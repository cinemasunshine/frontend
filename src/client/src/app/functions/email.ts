import * as moment from 'moment';
import { factory } from '../../../../../node_modules/@motionpicture/sskts-api-javascript-client';
import { environment } from '../../environments/environment';
import { TimeFormatPipe } from '../pipes/time-format/time-format.pipe';
import { convertToKatakana, formatTelephone } from './util';

/**
 * 購入完了メール取得
 */
export function getPurchaseCompletionEmail(params: {
    screeningEvent: factory.chevre.event.screeningEvent.IEvent;
    seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    seatReservationAuthorization: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>;
    customerContact: factory.person.IProfile;
}) {
    return `
| ${getInfo(params).customer.familyName} ${getInfo(params).customer.givenName} 様
| この度は、#{order.seller.name}のオンライン先売りチケットサービスにてご購入頂き、誠にありがとうございます。お客様がご購入されましたチケットの情報は下記の通りです。
|
| [予約番号]
| #{order.confirmationNumber}
|
| [鑑賞日時]
| ${getInfo(params).appreciationDate} ${getInfo(params).startDate} - ${getInfo(params).endDate}
|
| [作品名]
| ${getInfo(params).event.name}
|
| [スクリーン名]
| ${getInfo(params).screen.name}
|
| [座席]
| ${getSeat(params)}
|
| [合計]
| ￥#{order.price}
|
| 【チケット発券について】
| チケットの発券/入場方法は2通りからお選び頂けます。
|
| <発券/入場方法1 入場用QRコードで入場>
| 以下のURLよりチケット情報確認画面へアクセス頂き、「チケットを購入した劇場」「予約番号」「お電話番号」を入力してログインしてください。 ご鑑賞時間の24時間前から入場用QRコードが表示されますので、入場時にそちらのQRコードをご提示ください。
| ${environment.FRONTEND_ENDPOINT}/inquiry/login?theater=101&reserve=521121
|
| <発券/入場方法2 劇場発券機で発券>
| 劇場に設置されている発券機にて発券頂きます。予約番号をお控えの上ご来場ください。
| チケットが発券できなかった場合にはチケット売場にお越しください。
|
| 【ご注意事項】
| ・ご購入されたチケットの変更、キャンセル、払い戻しはいかなる場合でも致しかねます。
| ・チケットの発券にお時間がかかる場合もございますので、お時間の余裕を持ってご来場ください。
| ・メンバーズカード会員のお客様は、ポイントは付与いたしますので、発券したチケットまたは、表示されたQRコードとメンバーズカードをチケット売場までお持ちくださいませ。
| ・年齢や学生など各種証明が必要なチケットを購入された方は、入場時にご提示ください。
| ご提示頂けない場合は、一般料金との差額を頂きます。
|
| なお、このメールは、シネマサンシャイン池袋テストの予約システムでチケットをご購入頂いた方にお送りしておりますが、
| チケット購入に覚えのない方に届いております場合は、下記お問い合わせ先までご連絡ください。
| ※なお、このメールアドレスは送信専用となっておりますので、ご返信頂けません。
| ご不明な点がございましたら、下記番号までお問合わせください。
|
| お問い合わせはこちら
|
|
| #{order.seller.name}
| TEL：${getInfo(params).seller.telephone}
`;
}

/**
 * 購入完了メール(スマホアプリ)取得
 */
export function getPurchaseCompletionAppEmail(params: {
    screeningEvent: factory.chevre.event.screeningEvent.IEvent;
    seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    seatReservationAuthorization: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>;
    customerContact: factory.person.IProfile;
    userName: string;
}) {
    return `
| ${getInfo(params).customer.familyName} ${getInfo(params).customer.givenName} 様
| この度は、#{order.seller.name}のオンライン先売りチケットサービスにてご購入頂き、誠にありがとうございます。お客様がご購入されましたチケットの情報は下記の通りです。
|
| [ユーザーID]
| ${params.userName}
|
| [予約番号]
| #{order.confirmationNumber}
|
| [鑑賞日時]
| ${getInfo(params).appreciationDate} ${getInfo(params).startDate} - ${getInfo(params).endDate}
|
| [作品名]
| ${getInfo(params).event.name}
|
| [スクリーン名]
| ${getInfo(params).screen.name}
|
| [座席]
| ${getSeat(params)}
|
| [合計]
| ￥#{order.price}
|
| 【チケット発券について】
| チケットはシネマサンシャイン公式アプリの購入済みチケットホルダー内に格納されます。
| ご鑑賞時間の24時間前から入場用QRコードが表示されますので、入場時にそちらのQRコードをご提示ください。
|
| また購入済みチケットホルダー内にチケットが表示されなかった場合は、お手数ですが以下のURLよりチケット情報確認画面へアクセス頂き、「チケットを購入した劇場」「予約番号」「お電話番号」を入力してログインしてください。ご鑑賞時間の24時間前から入場用QRコードが表示されます。
| ${environment.FRONTEND_ENDPOINT}/inquiry/login?theater=118&reserve=#{order.confirmationNumber}
|
| または劇場に設置されている発券機にて発券頂きますので予約番号をお控えの上ご来場ください。
| チケットが発券できなかった場合にはチケット売場にお越しください。
|
| 【ご注意事項】
| ・ご購入されたチケットの変更、キャンセル、払い戻しはいかなる場合でも致しかねます。
| ・チケットの発券にお時間がかかる場合もございますので、お時間の余裕を持ってご来場ください。
| ・メンバーズカード会員のお客様は、ポイントは付与いたしますので、発券したチケットまたは、表示されたQRコードとメンバーズカードをチケット売場までお持ちくださいませ。
| ・年齢や学生など各種証明が必要なチケットを購入された方は、入場時にご提示ください。
| ご提示頂けない場合は、一般料金との差額を頂きます。
|
| なお、このメールは、#{order.seller.name}の予約システムでチケットをご購入頂いた方にお送りしておりますが、
| チケット購入に覚えのない方に届いております場合は、下記お問い合わせ先までご連絡ください。
| ※なお、このメールアドレスは送信専用となっておりますので、ご返信頂けません。
| ご不明な点がございましたら、下記番号までお問合わせください。
|
| お問い合わせはこちら
|
|
| #{order.seller.name}
| TEL：${getInfo(params).seller.telephone}
`;
}

/**
 * 情報取得
 */
function getInfo(params: {
    screeningEvent: factory.chevre.event.screeningEvent.IEvent;
    seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    customerContact: factory.person.IProfile;
}) {
    const plofile = params.customerContact;
    const screeningEvent = params.screeningEvent;
    if (screeningEvent.coaInfo === undefined
        || params.seller.location === undefined) {
        throw new Error('status is different');
    }
    moment.locale('ja');
    const timeFormat = new TimeFormatPipe();
    const familyName = (plofile.familyName === undefined) ? '' : convertToKatakana(plofile.familyName);
    const givenName = (plofile.givenName === undefined) ? '' : convertToKatakana(plofile.givenName);
    const seller = { telephone: (params.seller.telephone === undefined) ? '' : formatTelephone(params.seller.telephone, 'National') };
    const screen = { name: screeningEvent.location.name.ja };
    const event = { name: screeningEvent.name.ja };
    const appreciationDate = moment(screeningEvent.startDate).format('YYYY年MM月DD日(ddd)');
    const startDate = timeFormat.transform(screeningEvent.startDate, screeningEvent.coaInfo.dateJouei);
    const endDate = timeFormat.transform(screeningEvent.endDate, screeningEvent.coaInfo.dateJouei);
    const inquiryUrl =
        `${environment.FRONTEND_ENDPOINT}/inquiry/login?theater=${params.seller.location.branchCode}&reserve=#{order.confirmationNumber}`;

    return {
        customer: {
            familyName,
            givenName
        },
        seller,
        screen,
        event,
        appreciationDate,
        startDate,
        endDate,
        inquiryUrl
    };
}

/**
 * 座席取得
 */
function getSeat(params: {
    seatReservationAuthorization: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>;
}) {
    const mapResult = params.seatReservationAuthorization.object.acceptedOffer.map((offer) => {
        const seatNumber = offer.seatNumber;
        const ticketName = offer.ticketInfo.ticketName;
        const salePrice = offer.ticketInfo.salePrice;
        return `${seatNumber} ${ticketName} ￥${salePrice}`;
    });

    return mapResult.join('\n| ');
}

import * as moment from 'moment';
import { factory } from '../../../../../node_modules/@motionpicture/sskts-api-javascript-client';

export function createDataLayerGTM(args: {
    order: factory.order.IOrder,
    native: boolean,
    member: boolean
}) {
    const order = args.order;
    const native = args.native;

    return {
        ecommerce: {
            purchase: {
                actionField: {
                    id: String(order.confirmationNumber),  // 注文ID(購入番号など）を動的に挿入
                    affiliation: order.seller.name.replace(/\"/g, '\\"'), // 劇場名を動的に挿入
                    revenue: String(order.price) // 完了ページの[ご利用金額]を動的に挿入
                },
                products: order.acceptedOffers.map((offer) => {
                    const itemOffered = offer.itemOffered;
                    if (itemOffered.typeOf !== factory.reservationType.EventReservation) {
                        throw new Error('itemOffered.typeOf is not factory.reservationType.EventReservation');
                    }
                    const reservationFor = itemOffered.reservationFor;
                    const name = reservationFor.name.ja.replace(/\"/g, '\\"');
                    const purchaseCategory = (native) ? 'アプリ' : 'ウェブ';
                    const screen = reservationFor.location.name.ja.replace(/\"/g, '\\"');
                    const date = moment(reservationFor.startDate).format('YYYY年MM月DD日/(ddd)/HH:mm');
                    const category = `${purchaseCategory}/${screen}/${date}`;
                    const variant = itemOffered.reservedTicket.coaTicketInfo.ticketName.replace(/\"/g, '\\"');
                    const price = String(offer.price);
                    return {
                        name, // 購入した映画の作品名を動的に挿入
                        category, // 購入区分(ウェブorアプリ）/スクリーン名/鑑賞日/鑑賞開始時間を動的に挿入
                        variant, // チケットタイプを動的に挿入
                        price, // チケット単体金額 を動的に挿入
                        quantity: 1 // チケット数量 を動的に挿入
                    };
                })
            }
        }
    };
}

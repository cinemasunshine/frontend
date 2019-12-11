import { factory } from '@cinerino/api-javascript-client';

/**
 * 券種金額取得
 */
export function getTicketPrice(offer: any) {
    const ticketInfo = offer.ticketInfo;
    // const spseatAdd1 = (ticketInfo.spseatAdd1 === undefined) ? 0 : ticketInfo.spseatAdd1;
    const spseatAdd2 = (ticketInfo.spseatAdd2 === undefined) ? 0 : ticketInfo.spseatAdd2;
    return (ticketInfo.salePrice + spseatAdd2);
}

/**
 * 4DX判定
 */
export function is4DX(screeningEvent?: factory.chevre.event.screeningEvent.IEvent) {
    if (screeningEvent === undefined
        || screeningEvent.superEvent.coaInfo === undefined
        || screeningEvent.superEvent.coaInfo.kbnJoueihousiki === undefined) {
        return false;
    }
    const code = screeningEvent.superEvent.coaInfo.kbnJoueihousiki.kubunCode;
    return (code === '002' || code === '004');
}

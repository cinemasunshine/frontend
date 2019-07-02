/**
 * 券種金額取得
 */
export function getTicketPrice(offer: any) {
    const ticketInfo = offer.ticketInfo;
    // const spseatAdd1 = (ticketInfo.spseatAdd1 === undefined) ? 0 : ticketInfo.spseatAdd1;
    const spseatAdd2 = (ticketInfo.spseatAdd2 === undefined) ? 0 : ticketInfo.spseatAdd2;
    return (ticketInfo.salePrice + spseatAdd2);
}

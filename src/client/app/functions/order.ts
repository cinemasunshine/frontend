/**
 * 券種金額取得
 */
export function getOrderTicketPrice(offer: any) {
    const ticketInfo = offer.itemOffered.reservedTicket.coaTicketInfo;
    // const spseatAdd1 = (ticketInfo.spseatAdd1 === undefined) ? 0 : ticketInfo.spseatAdd1;
    const spseatAdd2 = (ticketInfo.spseatAdd2 === undefined) ? 0 : ticketInfo.spseatAdd2;
    return (ticketInfo.salePrice + spseatAdd2);
}

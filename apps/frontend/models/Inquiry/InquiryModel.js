"use strict";
class InquiryModel {
    constructor(session) {
        if (!session) {
            session = {};
        }
        this.transactionId = (session.transactionId) ? session.transactionId : null;
        this.performance = (session.performance) ? session.performance : null;
        this.stateReserve = (session.stateReserve) ? session.stateReserve : null;
        this.login = (session.login) ? session.login : null;
    }
    formatToSession() {
        return {
            transactionId: (this.transactionId) ? this.transactionId : null,
            performance: (this.performance) ? this.performance : null,
            stateReserve: (this.stateReserve) ? this.stateReserve : null,
            login: (this.login) ? this.login : null,
        };
    }
}
exports.InquiryModel = InquiryModel;
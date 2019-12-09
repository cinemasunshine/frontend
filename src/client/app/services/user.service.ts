import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { CinerinoService } from './cinerino.service';
import { SaveType, StorageService } from './storage.service';

type IAccount = factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<factory.accountType>>;

/**
 * ネイティブアプリフラグ
 */
enum NativeAppFlg {
    /**
     * 非ネイティブアプリ
     */
    NotNative = '0',
    /**
     * ネイティブアプリ
     */
    Native = '1'
}

/**
 * 会員用フラグ
 */
export enum FlgMember {
    /**
     * 非会員
     */
    NonMember = '0',
    /**
     * 会員
     */
    Member = '1',
}

export interface IUserData {
    native: NativeAppFlg;
    memberType: FlgMember;
    profile?: factory.person.IProfile;
    creditCards?: factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    accessToken?: string;
    account?: IAccount;
    clientId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public data: IUserData;

    constructor(
        private storage: StorageService,
        private cinerinoService: CinerinoService
    ) {
        this.load();
        this.save();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: IUserData | null = this.storage.load('user', SaveType.Session);
        if (data === null) {
            this.data = {
                native: NativeAppFlg.NotNative,
                memberType: FlgMember.NonMember
            };

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storage.save('user', this.data, SaveType.Session);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        this.data = {
            native: NativeAppFlg.NotNative,
            memberType: FlgMember.NonMember
        };
        this.save();
    }

    /**
     * 会員初期化
     */
    public async initMember() {
        this.data.memberType = FlgMember.Member;
        this.save();
        await this.cinerinoService.getServices();
        // 連絡先取得
        const profile = await this.cinerinoService.person.getProfile({
            id: 'me'
        });
        if (profile === undefined) {
            throw new Error('profile is undefined');
        }
        this.data.profile = profile;

        try {
            // クレジットカード検索
            const creditCards = await this.cinerinoService.ownershipInfo.searchCreditCards({
                id: 'me'
            });
            this.data.creditCards = creditCards;
        } catch (err) {
            console.error(err);
            this.data.creditCards = [];
        }

        // 口座検索
        const searchResult =
            await this.cinerinoService.ownershipInfo.search<factory.ownershipInfo.AccountGoodType.Account>({
                sort: {
                    ownedFrom: factory.sortType.Ascending
                },
                typeOfGood: {
                    typeOf: factory.ownershipInfo.AccountGoodType.Account,
                    accountType: factory.accountType.Point
                }
            });
        const accounts =
            searchResult.data.filter((a) => {
                return (a.typeOfGood.status === factory.pecorino.accountStatusType.Opened);
            });
        if (accounts.length === 0) {
            // 口座開設
            const openResult = await this.cinerinoService.ownershipInfo.openAccount({
                name: `${this.data.profile.familyName} ${this.data.profile.givenName}`,
                accountType: factory.accountType.Point
            });
            this.data.account = openResult;
        } else {
            this.data.account = accounts[0];
        }
        // console.log('口座番号', this.data.account.accountNumber);

        this.save();
    }

    /**
     * クレジットカード登録判定
     */
    public isRegisteredCreditCards() {
        return (this.data.creditCards !== undefined
            && this.data.creditCards.length > 0);
    }

    /**
     * ネイティブアプリ判定
     */
    public isNative() {
        return (this.data.native === NativeAppFlg.Native);
    }

    /**
     * 会員判定
     */
    public isMember() {
        return (this.data.memberType === FlgMember.Member);
    }

    /**
     * ネイティブアプリ判定設定
     */
    public setNative(value?: string) {
        this.data.native = (value === NativeAppFlg.Native)
            ? NativeAppFlg.Native
            : NativeAppFlg.NotNative;
    }

    /**
     * クライアントID設定
     */
    public setClientId(value?: string) {
        this.data.clientId = value;
    }

}

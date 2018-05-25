import { Injectable } from '@angular/core';
import { FlgMember } from '@motionpicture/coa-service/lib/services/reserve';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { SaveType, StorageService } from '../storage/storage.service';

/**
 * ネイティブアプリフラグ
 */
enum NativeAppFlg {
    NotNative = '0',
    Native = '1'
}

@Injectable()
export class UserService {
    public data: IData;

    constructor(
        private storage: StorageService
    ) {
        this.load();
        this.save();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: IData | null = this.storage.load('user', SaveType.Session);
        if (data === null) {
            this.data = {
                native: NativeAppFlg.NotNative,
                member: FlgMember.NonMember
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
            member: FlgMember.NonMember
        };
        this.save();
    }

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
        return (this.data.member === FlgMember.Member);
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
     * 会員判定設定
     */
    public setMember(value?: string) {
        this.data.member = (value === FlgMember.Member)
            ? FlgMember.Member
            : FlgMember.NonMember;
    }

    /**
     * アクセストークン設定
     */
    public setAccessToken(value?: string) {
        this.data.accessToken = value;
    }

}

export interface IData {
    native: NativeAppFlg;
    member: FlgMember;
    contacts?: factory.person.IContact;
    creditCards?: factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    accessToken?: string;
}

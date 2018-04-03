import { Injectable } from '@angular/core';
import { FlgMember } from '@motionpicture/coa-service/lib/services/reserve';
import { SaveType, StorageService } from '../storage/storage.service';

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
                native: FlgNative.NotNative,
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
            native: FlgNative.NotNative,
            member: FlgMember.NonMember
        };
        this.save();
    }

    /**
     * ネイティブアプリ判定
     */
    public isNative() {
        return (this.data.native === FlgNative.Native);
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
        this.data.native = (value === FlgNative.Native)
            ? FlgNative.Native
            : FlgNative.NotNative;
    }

    /**
     * 会員判定設定
     */
    public setMember(value?: string) {
        this.data.member = (value === FlgMember.Member)
            ? FlgMember.Member
            : FlgMember.NonMember;
    }

}

export interface IData {
    native: FlgNative;
    member: FlgMember;
}

enum FlgNative {
    NotNative = '0',
    Native = '1'
}

import { Injectable } from '@angular/core';
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
                native: false,
                member: false
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
            native: false,
            member: false
        };
        this.save();
    }

    /**
     * ネイティブアプリ判定
     */
    public isNative() {
        return this.data.native;
    }

    /**
     * 会員判定
     */
    public isMember() {
        return this.data.member;
    }

}

export interface IData {
    native: boolean;
    member: boolean;
}

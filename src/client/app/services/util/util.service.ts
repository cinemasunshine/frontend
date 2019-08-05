import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * json送信
     */
    public async postJson<T>(url: string, body?: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        const result = await this.http.post<T>(url, body, options).toPromise();

        return result;
    }

    /**
     * サーバータイム取得
     */
    public async getServerTime() {
        const result = await this.http.get<{ date: string }>('/api/serverTime').toPromise();

        return result;
    }

}

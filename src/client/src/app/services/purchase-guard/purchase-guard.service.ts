import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class PurchaseGuardService implements CanActivate {

    constructor() { }

    public canActivate(): boolean {
        return true;
    }

}

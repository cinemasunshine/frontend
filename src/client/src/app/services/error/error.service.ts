import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorService {
    public error: any;

    constructor(private router: Router) { }

    public redirect(error: any) {
        console.log(error);
        this.error = error;
        this.router.navigate(['/error']);
    }

}

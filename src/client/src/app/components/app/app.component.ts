import { Component } from '@angular/core';
import { AwsCognitoService } from '../../services/aws-cognito/aws-cognito.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        public awsCognito: AwsCognitoService
    ) {

    }
}

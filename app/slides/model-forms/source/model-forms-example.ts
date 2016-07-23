import {Component, ViewChild} from '@angular/core';

interface IContactModel {
    emailAddr: string;
    twitterHandle?: string;
}
interface IUserModel {
    userId: string;
    fullName?: string;
    contact: IContactModel;
}

@Component({
    moduleId: module.id,
    selector: 'model-forms-example',
    templateUrl: 'model-forms-example.html'
})
export class ModelFormsExampleComponent {
    public user: IUserModel;
    public submittedData: string;
    constructor() {
        this.user = {
            userId: 'dfbaskin',
            fullName: 'Dave F. Baskin',
            contact: {
                emailAddr: 'dfbaskin@gmail.com',
                twitterHandle: '@dfbaskin'
            }
        };
    }
    onSubmitUser(data: any) {
        this.submittedData = JSON.stringify(data, null, 2);
    }
}

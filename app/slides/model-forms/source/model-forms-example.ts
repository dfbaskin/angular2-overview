import {Component, ViewChild, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {FormBuilder, ControlGroup, Validators} from "@angular/common";

@Component({
    moduleId: module.id,
    selector: 'model-forms-example',
    templateUrl: 'model-forms-example.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ModelFormsExampleComponent implements OnInit {
    public submittedData: string;
    public userForm: ControlGroup;
    constructor(private formBuilder: FormBuilder) {
    }
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            userId: [
                'dfbaskin',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-z]([a-z0-9_])+$')
                ])
            ],
            fullName: [
                'Dave F. Baskin',
                Validators.required
            ],
            contact: this.formBuilder.group({
                emailAddr: [
                    'dfbaskin@gmail.com',
                    Validators.required
                ],
                twitterHandle: [
                    '@dfbaskin',
                    Validators.pattern('^\@[a-z]([a-z0-9_])+$')
                ],
            })
        });
    }
    onSubmitUser(data: any) {
        this.submittedData = JSON.stringify(data, null, 2);
    }
}

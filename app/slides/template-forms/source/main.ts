
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {TemplateFormsExampleComponent} from "./template-forms-example";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/cache';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<template-forms-example></template-forms-example>',
    directives: [TemplateFormsExampleComponent]
})
export class AppComponent {
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);

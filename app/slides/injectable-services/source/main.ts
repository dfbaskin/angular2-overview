
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {StateCapitalsComponent, StateCapitalsService} from './state-capitals.component'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/cache';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<state-capitals></state-capitals>',
    directives: [StateCapitalsComponent]
})
export class AppComponent {
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    StateCapitalsService
]);

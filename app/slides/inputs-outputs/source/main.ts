
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {StateCapitalsComponent} from './table-components'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<state-capitals></state-capitals>',
    directives: [StateCapitalsComponent]
})
export class AppComponent {
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);

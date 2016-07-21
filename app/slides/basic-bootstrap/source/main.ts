
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<h1>Hello World!!!</h1>',
})
export class AppComponent {
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);

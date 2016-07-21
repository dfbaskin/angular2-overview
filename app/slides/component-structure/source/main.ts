
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ExampleComponent} from './example-component'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<example-component></example-component>',
    directives: [ExampleComponent]
})
export class AppComponent {
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);

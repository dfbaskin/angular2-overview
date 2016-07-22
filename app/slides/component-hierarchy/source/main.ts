
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ContainerComponent} from './hierarchy-components'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<container-component></container-component>',
    directives: [ContainerComponent]
})
export class AppComponent {
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);


import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {provideRouter} from "@angular/router";

import {rootRoutes, RootContainerComponent} from './route-components';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: '<root-container></root-container>',
    directives: [RootContainerComponent]
})
export class AppComponent {
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provideRouter(rootRoutes)
]);

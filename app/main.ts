
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import {PlatformLocation} from '@angular/common';
import {BrowserPlatformLocation} from '@angular/platform-browser';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

bootstrap(AppComponent, [
    Location,
    HTTP_PROVIDERS,
    { provide: PlatformLocation, useClass: BrowserPlatformLocation },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
]);

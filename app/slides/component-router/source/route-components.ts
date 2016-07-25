
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig} from "@angular/router";

@Component({
    selector: 'root-container',
    template: `
        <h1>Router</h1>
        <div>
            <a [routerLink]="['/alpha']">Alpha Route</a> |
            <a [routerLink]="['/beta']">Beta Route</a>
        </div>
        <router-outlet></router-outlet>
`,
    directives: [ROUTER_DIRECTIVES]
})
export class RootContainerComponent{ }

@Component({
    selector: 'alpha-route',
    template: `<p>Alpha Route</p>`,
    directives: []
})
export class AlphaRouteComponent{ }

@Component({
    selector: 'beta-route',
    template: `<p>Beta Route</p>`,
    directives: []
})
export class BetaRouteComponent{ }

export const rootRoutes: RouterConfig = [
    { path: '', redirectTo: '/alpha', pathMatch: 'full' },
    { path: 'alpha', component: AlphaRouteComponent },
    { path: 'beta', component: BetaRouteComponent }
];

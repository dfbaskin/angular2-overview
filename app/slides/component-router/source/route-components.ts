
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'root-container',
    template: `
        <h1>Router</h1>
        <div>
            <a [routerLink]="['/alpha']">Alpha Route</a> |
            <a [routerLink]="['/beta', 'list']">Beta Route - List</a> |
            <a [routerLink]="['/beta', 'details', 'one']">Beta Route - Details One</a> |
            <a [routerLink]="['/beta', 'details', 'two']">Beta Route - Details Two</a> |
            <a [routerLink]="['/beta', 'details', 'three']">Beta Route - Details Three</a>
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
    template: `
        <p>Beta Route</p>
        <router-outlet></router-outlet>
`,
    directives: [ROUTER_DIRECTIVES]
})
export class BetaRouteComponent{ }

@Component({
    selector: 'beta-route-list',
    template: `<p>Beta Route - List</p>`,
    directives: []
})
export class BetaRouteListComponent{ }

@Component({
    selector: 'beta-route-details',
    template: `
        <p>Beta Route Details: {{id | async}}</p>
        <ul>
            <li *ngFor="let msg of messages">{{msg}}</li>
        </ul>
`,
    directives: []
})
export class BetaRouteDetailsComponent{
    messages: string[] = [];
    id: Observable<string>;
    constructor(r: ActivatedRoute) {
        this.id = r.params
            .map((r: any) => r.id)
            .do(id => setTimeout(() => {
                this.messages = this.messages.concat([`Routed to ${id}`]);
            }));
    }
}

export const alphaRoutes: RouterConfig = [
    { path: 'alpha', component: AlphaRouteComponent }
];

export const betaRoutes: RouterConfig = [
    { path: 'beta', component: BetaRouteComponent, children: [
        { path: 'list', component: BetaRouteListComponent },
        { path: 'details/:id', component: BetaRouteDetailsComponent }
    ]}
];

export const rootRoutes: RouterConfig = [
    { path: '', redirectTo: '/alpha', pathMatch: 'full' },
    ...alphaRoutes,
    ...betaRoutes
];

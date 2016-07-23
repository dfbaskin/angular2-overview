
import {Component} from '@angular/core';
import {UrlResolver} from '@angular/compiler';

@Component({
    moduleId: module.id,
    selector: 'observables',
    styleUrls: ['observables.component.css'],
    templateUrl: 'observables.component.html'
})
export class ObservablesComponent {

    constructor(private urlResolver: UrlResolver) {
    }

    public resolvePath(path) {
        return this.urlResolver.resolve(module.id, path);
    }
}

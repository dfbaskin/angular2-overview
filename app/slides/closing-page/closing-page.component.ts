
import {Component} from '@angular/core';
import {UrlResolver} from '@angular/compiler';

@Component({
    moduleId: module.id,
    selector: 'closing-page',
    styleUrls: ['closing-page.component.css'],
    templateUrl: 'closing-page.component.html'
})
export class ClosingPageComponent {

    constructor(private urlResolver: UrlResolver) {
    }

    public resolvePath(path) {
        return this.urlResolver.resolve(module.id, path);
    }
}

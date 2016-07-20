
import {Component} from '@angular/core';
import {UrlResolver} from '@angular/compiler';

@Component({
    moduleId: module.id,
    selector: 'title-page',
    styleUrls: ['title-page.component.css'],
    templateUrl: 'title-page.component.html'
})
export class TitlePageComponent {

    constructor(private urlResolver: UrlResolver) {
    }

    public resolvePath(path) {
        return this.urlResolver.resolve(module.id, path);
    }
}

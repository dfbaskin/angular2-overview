
import {Component, Input, OnInit} from '@angular/core';
import {UrlResolver} from '@angular/compiler';

@Component({
    selector: 'run-example',
    styles: [`
        a {
            position: fixed;
            bottom: 1.5vh;
            right: 1.5vh;
            font-size: 1.2vh;
        }
`
    ],
    template: `
        <div>
            <a [href]="exampleLink" target="example">Run Example</a>
        </div>
    `
})
export class RunExampleComponent implements OnInit {

    @Input() relativeTo: string;
    @Input() name: string;

    exampleLink: string = "#";

    constructor(private urlResolver: UrlResolver) {
    }

    ngOnInit() {
        this.exampleLink = this.urlResolver.resolve(this.relativeTo, this.name);
    }
}

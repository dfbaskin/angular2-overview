
import {Component, Input, ViewChild, OnInit, ElementRef} from '@angular/core';
import {NgClass} from '@angular/common';
import {UrlResolver} from '@angular/compiler';
import {Http} from '@angular/http';

declare var Prism: any;

@Component({
    moduleId: module.id,
    selector: 'source-code-view',
    templateUrl: 'source-code-view.component.html',
    directives: [NgClass]
})
export class SourceCodeViewComponent implements OnInit{

    @Input() language: string;
    @Input() relativeTo: string;
    @Input() name: string;
    @ViewChild('codeElement') codeElement: ElementRef;

    sourceCodeLanguage: string;
    sourceCodeContent: string;

    constructor(private http: Http, private urlResolver: UrlResolver) {
    }

    ngOnInit() {
        this.sourceCodeLanguage = `language-${this.language}`;
        let contentUrl = this.urlResolver.resolve(this.relativeTo, this.name);
        this.http.get(contentUrl)
            .map(rsp => rsp.text())
            .subscribe((content) => {
                this.sourceCodeContent = content;
                setTimeout(() => Prism.highlightElement(this.codeElement.nativeElement), 250);
            });
    }
}

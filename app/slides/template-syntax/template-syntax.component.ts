
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';

@Component({
    moduleId: module.id,
    selector: 'template-syntax',
    styleUrls: ['template-syntax.component.css'],
    templateUrl: 'template-syntax.component.html',
    directives: [SourceCodeViewComponent]
})
export class TemplateSyntaxComponent {
    public thisModuleId: string = module.id;
}

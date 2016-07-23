
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'template-forms',
    styleUrls: ['template-forms.component.css'],
    templateUrl: 'template-forms.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class TemplateFormsComponent {
    public thisModuleId: string = module.id;
}

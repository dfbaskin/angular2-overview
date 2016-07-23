
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'model-forms',
    styleUrls: ['model-forms.component.css'],
    templateUrl: 'model-forms.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class ModelFormsComponent {
    public thisModuleId: string = module.id;
}

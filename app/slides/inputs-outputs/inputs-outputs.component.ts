
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'inputs-outputs',
    styleUrls: ['inputs-outputs.component.css'],
    templateUrl: 'inputs-outputs.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class InputsOutputsComponent {
    public thisModuleId: string = module.id;
}

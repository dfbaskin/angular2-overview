
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'basic-bootstrap',
    styleUrls: ['basic-bootstrap.component.css'],
    templateUrl: 'basic-bootstrap.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class BasicBootstrapComponent {
    public thisModuleId: string = module.id;
}

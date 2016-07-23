
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'injectable-services',
    styleUrls: ['injectable-services.component.css'],
    templateUrl: 'injectable-services.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class InjectableServicesComponent {
    public thisModuleId: string = module.id;
}

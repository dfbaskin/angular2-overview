
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'component-router',
    styleUrls: ['component-router.component.css'],
    templateUrl: 'component-router.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class ComponentRouterComponent {
    public thisModuleId: string = module.id;
}

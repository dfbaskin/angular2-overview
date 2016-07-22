
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'component-hierarchy',
    styleUrls: ['component-hierarchy.component.css'],
    templateUrl: 'component-hierarchy.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class ComponentHierarchyComponent {
    public thisModuleId: string = module.id;
}

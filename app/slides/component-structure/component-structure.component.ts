
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';
import {RunExampleComponent} from '../../components/run-example/run-example';

@Component({
    moduleId: module.id,
    selector: 'component-structure',
    styleUrls: ['component-structure.component.css'],
    templateUrl: 'component-structure.component.html',
    directives: [SourceCodeViewComponent, RunExampleComponent]
})
export class ComponentStructureComponent {
    public thisModuleId: string = module.id;
}

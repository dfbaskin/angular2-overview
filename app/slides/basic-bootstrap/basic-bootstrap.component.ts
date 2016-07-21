
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';

@Component({
    moduleId: module.id,
    selector: 'basic-bootstrap',
    styleUrls: ['basic-bootstrap.component.css'],
    templateUrl: 'basic-bootstrap.component.html',
    directives: [SourceCodeViewComponent]
})
export class BasicBootstrapComponent {
    public thisModuleId: string = module.id;
}

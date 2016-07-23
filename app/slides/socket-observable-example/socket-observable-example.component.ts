
import {Component} from '@angular/core';
import {SourceCodeViewComponent} from '../../components/source-code-view/source-code-view.component';

@Component({
    moduleId: module.id,
    selector: 'socket-observable-example',
    styleUrls: ['socket-observable-example.component.css'],
    templateUrl: 'socket-observable-example.component.html',
    directives: [SourceCodeViewComponent]
})
export class SocketObservableExampleComponent {
    public thisModuleId: string = module.id;
}

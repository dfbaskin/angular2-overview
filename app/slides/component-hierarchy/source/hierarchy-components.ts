import {Component} from '@angular/core';

@Component({
    selector: 'item-component',
    template: `
        <div>
            <div>Item</div>
        </div>
    `
})
export class ItemComponent {
}

@Component({
    selector: 'panel-component',
    template: `
        <div>
            <div>Panel</div>
            <item-component></item-component>
            <item-component></item-component>
            <item-component></item-component>
        </div>
    `,
    directives: [ItemComponent]
})
export class PanelComponent { }

@Component({
    selector: 'container-component',
    template: `
        <div>
            <div>Container</div>
            <panel-component></panel-component>
            <panel-component></panel-component>
        </div>
    `,
    directives: [PanelComponent]
})
export class ContainerComponent { }

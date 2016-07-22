import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';
import {stateCapitalsList} from './state-capitals-data';

@Component({
    selector: '.state-capitals-row',
    template: `
        <td>{{item.postalCode}}</td>
        <td>{{item.name}}</td>
        <td>{{item.capital}}</td>
    `
})
export class StateCapitalsTableRowComponent {
    @Input() item: any;
}

@Component({
    selector: 'state-capitals-table',
    styles: [`
        tbody > tr { cursor: pointer; }
    `],
    template: `
        <table>
            <thead>
                <tr>
                    <th>Postal</th>
                    <th>Name</th>
                    <th>Capital</th>
                </tr>
            </thead>
            <tbody>
                <tr class="state-capitals-row"
                    [ngClass]="{active: item.isSelected}"
                    *ngFor="let item of itemList"
                    [item]="item"
                    (click)="onRowSelected(item)"></tr>
            </tbody>
        </table>
    `,
    directives: [StateCapitalsTableRowComponent, NgClass]
})
export class StateCapitalsTableComponent {
    @Input() itemList: any;
    @Output() itemSelected = new EventEmitter();
    onRowSelected(item) {
        this.itemSelected.emit(item);
        item.isSelected = true;
    }
}

@Component({
    selector: 'state-capitals',
    template: `
        <div>
            <h1>States and Capitals</h1>
            <p>Selected: {{currentItem?.name}}</p>
            <state-capitals-table
                [itemList]="itemList"
                (itemSelected)="onItemSelected($event)"></state-capitals-table>
        </div>
    `,
    directives: [StateCapitalsTableComponent]
})
export class StateCapitalsComponent {
    itemList: any = stateCapitalsList;
    currentItem: any = null;
    onItemSelected(item) {
        this.currentItem = item;
    }
}

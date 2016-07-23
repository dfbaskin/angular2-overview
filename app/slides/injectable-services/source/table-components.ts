import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';

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
        tbody > tr, thead > tr { cursor: pointer; }
    `],
    template: `
        <table>
            <thead>
                <tr>
                    <th (click)="onHeaderSelected('postal')">Postal</th>
                    <th (click)="onHeaderSelected('name')">Name</th>
                    <th (click)="onHeaderSelected('capital')">Capital</th>
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
    @Output() headerSelected = new EventEmitter();
    onRowSelected(item) {
        this.itemSelected.emit(item);
    }
    onHeaderSelected(name) {
        this.headerSelected.emit(name);
    }
}


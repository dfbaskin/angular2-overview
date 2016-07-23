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

@Component({
    selector: 'state-capitals',
    template: `
        <div>
            <h1>States and Capitals</h1>
            <p>Selected: {{currentItem?.name}}</p>
            <state-capitals-table
                [itemList]="itemList"
                (itemSelected)="onItemSelected($event)"
                (headerSelected)="onHeaderSelected($event)"></state-capitals-table>
        </div>
    `,
    directives: [StateCapitalsTableComponent]
})
export class StateCapitalsComponent {
    sortOrder: any = {};
    itemList: any[];
    currentItem: any = null;
    constructor() {
        this.onHeaderSelected('postal');
    }
    onItemSelected(item) {
        this.currentItem = item;
        this.itemList.forEach(listItem => {
            listItem.isSelected = listItem === item;
        });
    }
    onHeaderSelected(name) {
        if(this.sortOrder.name === name) {
            this.sortOrder.ascending = !this.sortOrder.ascending;
        }
        else {
            this.sortOrder = { name: name, ascending: true };
        }
        let propVal: (s: any) => string;
        switch(this.sortOrder.name) {
            case "postal":
                propVal = (s) => s.postalCode;
                break;
            case "name":
                propVal = (s) => s.name;
                break;
            case "capital":
                propVal = (s) => s.capital;
                break;
            default:
                return;
        }
        let orderMultiplier = this.sortOrder.ascending ? 1 : -1;
        this.itemList = stateCapitalsList
            .slice(0)
            .sort((a: any, b: any) => {
                let valueA = propVal(a).toUpperCase(); 
                let valueB = propVal(b).toUpperCase(); 
                if (valueA < valueB) {
                    return -1 * orderMultiplier;
                }
                if (valueA > valueB) {
                    return 1 * orderMultiplier;
                }
                return 0;
            });
    }
}

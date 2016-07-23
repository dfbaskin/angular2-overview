
import {Component, Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";

import {StateCapitalsTableComponent} from "./table-components";

@Injectable()
export class StateCapitalsService {

    private sortOrder: any = {};
    private stateCapitalsDataSource: any;
    public currentItem: any;

    constructor(private http: Http) {
    }

    getStateCapitals(sortByName: string = "postal") {
        return this.getStateCapitalsDataSource()
            .map(data => this.sortStateCapitals(data, sortByName));
    }

    selectCurrent(item: any) {
        this.currentItem = item;
        this.getStateCapitalsDataSource()
            .subscribe(list => list.forEach(listItem => listItem.isSelected = listItem === item));
    }

    private getStateCapitalsDataSource() {
        return this.stateCapitalsDataSource || (
            this.stateCapitalsDataSource = this.http
                .get("/app/slides/injectable-services/source/state-capitals.json")
                .map(result => result.json())
                .map((stateCapitals: any) => {
                    return Object.keys(stateCapitals).map((k) => ({
                        postalCode: k,
                        name: stateCapitals[k].name,
                        capital: stateCapitals[k].capital,
                        isSelected: false
                    }));
                })
                .do(data => {
                    // Side effect
                    console.log("Loaded State Capitals data.");
                    console.log(JSON.stringify(data, null, 2));
                })
                .cache(1)
                .catch(err => {
                    console.error(err);
                    return Observable.throw(err || 'backend server error');
                }));
    }

    private sortStateCapitals(stateCapitals: any[], sortByName: string) {
        if(this.sortOrder.name === sortByName) {
            this.sortOrder.ascending = !this.sortOrder.ascending;
        }
        else {
            this.sortOrder = { name: sortByName, ascending: true };
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
                throw new Error("Unknown sort order");
        }
        let orderMultiplier = this.sortOrder.ascending ? 1 : -1;
        return stateCapitals
            .slice(0)
            .sort((a: any, b: any) => {
                let valueA = propVal(a).toUpperCase();
                let valueB = propVal(b).toUpperCase();
                if (valueA < valueB) {
                    return -orderMultiplier;
                }
                if (valueA > valueB) {
                    return orderMultiplier;
                }
                return 0;
            });
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
    itemList: any[];
    constructor(private stateCapitalsService: StateCapitalsService) {
        this.onHeaderSelected('postal');
    }
    get currentItem() {
        return this.stateCapitalsService.currentItem;
    }
    onItemSelected(item) {
        this.stateCapitalsService.selectCurrent(item);
    }
    onHeaderSelected(name) {
        this.stateCapitalsService
            .getStateCapitals(name)
            .subscribe(list => this.itemList = list);
    }
}

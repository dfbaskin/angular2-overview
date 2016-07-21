import {Component} from '@angular/core';

// Usage: <example-component></example-component>

@Component({
    selector: 'example-component',
    styles: [
`
        h1 { color: blue; }
        span { color: darkgreen; font-style: italic; }
`
    ],
    template:
`
        <div>
            <h1>My Example Component</h1>
            <p>The current Date/Time is <span>{{currentDateTime}}</span></p>
        </div>
`,
})
export class ExampleComponent {
    currentDateTime: string;
    constructor() {
        this.currentDateTime = new Date().toString();
    }
}


import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[viewSlide]'
})
export class SlideDirective {

    private lastCondition: boolean = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }

    @Input() set viewSlide(condition: boolean) {
        if(condition != this.lastCondition) {
            if (condition) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
            this.lastCondition = condition;
        }
    }
}

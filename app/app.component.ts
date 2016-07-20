
import {Component, ViewChildren, QueryList} from '@angular/core';
import {Location} from '@angular/common';
import {SLIDE_COMPONENTS} from './slides';
import {SlideDirective} from './components/slide/slide.directive';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [
        SlideDirective,
        SLIDE_COMPONENTS
    ]
})
export class AppComponent {
    @ViewChildren(SlideDirective) slides: QueryList<SlideDirective>;

    private currentSlide = 0;

    constructor(private location: Location) {
    }

    ngAfterViewInit() {
        let idx = Number(this.location.path());
        if(idx >= 0 && idx < this.slides.length) {
            this.currentSlide = idx;
        }
        setTimeout(() => this.updateSlides());
    }

    handleKey(evt: KeyboardEvent) {
        switch(evt.key) {
            case "ArrowLeft":
                if(this.currentSlide > 0) {
                    this.currentSlide -= 1;
                    this.updateSlides();
                }
                break;
            case "ArrowRight":
                if(this.currentSlide + 1 < this.slides.length) {
                    this.currentSlide += 1;
                    this.updateSlides();
                }
                break;
        }
    }

    updateSlides() {
        this.slides.toArray()
            .forEach((slide, idx) => {
                slide.viewSlide = idx === this.currentSlide;
            });
        this.location.go(this.currentSlide.toString());
    }
}

import {
    Directive,
    ElementRef,
    Input,
    Output,
    AfterViewInit,
    Inject,
    EventEmitter
} from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { elementHasChild } from './domHelpers';
import { ScreenSizeService } from './../core/screenSize.service';

const CLASS_SIDEBAR_VISIBLE = 'layout--sidebar-visible';
const CLASS_ANIMATIONS_ENABLED = 'layout--animate';
const SELECTOR_SIDEBAR = '.layout__sidebar';

@Directive({
    selector: '[appSidebarOpen]'
})
export class SidebarOpenDirective implements AfterViewInit {
    @Input()
    set appSidebarOpen(val: boolean) {
        const el = this.element.nativeElement as HTMLElement;

        if (val) {
            el.classList.add(CLASS_SIDEBAR_VISIBLE);
        } else {
            el.classList.remove(CLASS_SIDEBAR_VISIBLE);
        }
    }
    get appSidebarOpen(): boolean {
        return (this.element.nativeElement as HTMLElement)
            .classList.contains(CLASS_SIDEBAR_VISIBLE);
    }
    @Output()
    public sidebarOpenChange = new EventEmitter<boolean>();

    private lastStatic = false;

    constructor(
        private element: ElementRef,
        router: Router,
        private screenSize: ScreenSizeService,
        @Inject(DOCUMENT) private document: HTMLDocument
    ) {
        router.events.subscribe((event) => {
            if ((event instanceof NavigationEnd) && !this.isSidebarStatic()) {
                this.closeSidebar();
            }
        });

        screenSize.onResize(() => { this.process(); });
    }

    public ngAfterViewInit(): void {
        const el = this.element.nativeElement as HTMLElement;
        const sidebarElement = el.querySelector(SELECTOR_SIDEBAR) as HTMLElement;

        // Enable Animations
        el.classList.add(CLASS_ANIMATIONS_ENABLED);

        // Add a "click outside" handler
        this.document.addEventListener('click', (event: Event) => {
            if (
                event.target !== sidebarElement &&
                    !elementHasChild(sidebarElement, event.target as HTMLElement) &&
                    !this.isSidebarStatic()
            ) {
                this.closeSidebar();
            }
        });

        // Launch
        this.process();
    }

    public process(): void {
        const isStatic = this.isSidebarStatic();

        if (isStatic !== this.lastStatic) {
            this.appSidebarOpen = isStatic;

            this.lastStatic = isStatic;

            this.sidebarOpenChange.emit(this.appSidebarOpen);
        }
    }

    private closeSidebar() {
        this.appSidebarOpen = false;
        this.sidebarOpenChange.emit(this.appSidebarOpen);
    }

    private isSidebarStatic() {
        return this.screenSize.matchMedia('(min-width: 1200px)');
    }
}

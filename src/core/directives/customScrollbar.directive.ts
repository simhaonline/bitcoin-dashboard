import { Directive, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import * as detectBrowser from 'detect-browser';
import { default as PerfectScrollbar } from 'perfect-scrollbar';

@Directive({
    selector: '[customScrollbar]'
})
/**
 * Applies perfect-scrollbar to elements when scroll can't
 * be customised by -webkit- css styling
 */
export class CustomScrollbarDirective implements AfterViewInit, OnDestroy {
    private _containerElement: HTMLElement;
    private _perfectScrollbar: PerfectScrollbar;
    private _psMutationObserver: MutationObserver;

    constructor(private _element: ElementRef, private _ngZone: NgZone) { }

    public ngAfterViewInit(): void {
        this._containerElement = this._element.nativeElement;

        const detectedBrowser = detectBrowser.detect();
        switch (detectedBrowser && detectedBrowser.name) {
            case 'firefox':
            case 'edge':
            case 'ie':
                this.applyCustomScrollBar();
            return;
            default:
                this._containerElement.classList.add('custom-scrollbars');
            return;
        }
    }

    public ngOnDestroy(): void {
        if (this._psMutationObserver) {
            this._psMutationObserver.disconnect();
        }
        if (this._perfectScrollbar) {
            this._perfectScrollbar.destroy();
        }
    }

    private applyCustomScrollBar() {
        this._containerElement.style.position = 'relative';

        let observePaused = false;
        const ps = this._perfectScrollbar = new PerfectScrollbar(this._containerElement);
        const contentObserver = this._psMutationObserver = new MutationObserver(() => {
            // TODO: Update fires the callback again, do something to prevent this
            if (observePaused) { return; };

            observePaused = true;
            this._ngZone.runOutsideAngular(() => {
                ps.update();

                setTimeout(() => { observePaused = false; }, 0);
            });
        });

        contentObserver.observe(this._containerElement, {
            subtree: true,
            attributes: true
        });
    }
}

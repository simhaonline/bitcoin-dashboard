import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ScreenSizeService implements OnDestroy {
    private resizeCallbacks: Array<() => void> = [];

    public onResize(callback: () => void) {
        if (window) {
            this.resizeCallbacks.push(callback);
            window.addEventListener('resize', () => { callback(); });
        }
    }

    public matchMedia(mediaQuery: string): boolean {
        if (window) {
            return !!window.matchMedia(mediaQuery).matches;
        }
        return false;
    }

    public ngOnDestroy(): void {
        for (let cb of this.resizeCallbacks) {
            window.removeEventListener('resize', cb);
        }
    }
}

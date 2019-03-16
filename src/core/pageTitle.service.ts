import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class PageTitleService {
    public get title(): Observable<string[]> {
        return this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map(() => {
                    const iterator = (snap: ActivatedRouteSnapshot, prev: string[] = []) => {
                        const child = snap.firstChild;

                        if (child) {
                            // tslint:disable-next-line: no-string-literal
                            const output = child.data['title'] ? [...prev, child.data['title']] : prev;
                            return iterator(child, output);
                        }

                        return prev;
                    };
                    return iterator(this.router.routerState.root.snapshot);
                })
            );
    }

    constructor(
        private router: Router,
    ) { }
}

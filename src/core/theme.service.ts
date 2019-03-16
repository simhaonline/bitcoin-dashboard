import {
    Injectable,
    EventEmitter,
    Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from 'angular-2-local-storage';

export enum ThemeStyle {
    Light = 'theme--light',
    Dark = 'theme--dark'
}

@Injectable()
export class ThemeService {
    public onStyleChange = new EventEmitter<ThemeStyle>();
    public set style(val: ThemeStyle) {
        const isDiff = val !== this._style;

        this._style = val;

        if (isDiff) {
            if (this.document) {
                const htmlElement: HTMLElement = this.document.querySelector('html');

                htmlElement.classList.remove(ThemeStyle.Dark, ThemeStyle.Light);
                htmlElement.classList.add(val);
            }

            this.localStorageService.set('style', this._style);
            this.onStyleChange.emit(this._style);
        }

    }
    public get style(): ThemeStyle {
        return this._style;
    }

    private _style;

    constructor(
        private localStorageService: LocalStorageService,
        @Inject(DOCUMENT) private document: Document
    ) {
        const storedStyle: ThemeStyle = this.localStorageService.get('style');

        if (storedStyle) {
            this.style = storedStyle;
        } else {
            this.style = ThemeStyle.Dark;
        }
    }
}

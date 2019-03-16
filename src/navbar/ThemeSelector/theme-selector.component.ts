import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { ThemeService, ThemeStyle } from 'core/theme.service';

@Component({
    selector: 'app-theme-selector',
    styleUrls: [
        './theme-selector.component.scss'
    ],
    templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
    private themeStyle: ThemeStyle;

    constructor(
        private themeService: ThemeService
    ) {
        this.themeStyle = themeService.style;

        themeService.onStyleChange.subscribe((newStyle: ThemeStyle) => {
            this.themeStyle = newStyle;
        });
    }

    public setTheme(val: ThemeStyle) {
        this.themeService.style = val;
    }
}

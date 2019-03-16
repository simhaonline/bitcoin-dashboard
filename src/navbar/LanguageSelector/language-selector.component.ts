import { Component } from '@angular/core';
import _ from 'lodash';

import { Languages, LanguageDeclaration } from 'consts/languages';

@Component({
    selector: 'app-language-selector',
    styleUrls: [
        './language-selector.component.scss'
    ],
    templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
    availableLangs: LanguageDeclaration[] = [ ...Languages ];
    selectedLang: LanguageDeclaration;

    set selectedLangKey(langKey: string) {
        this.langKey = langKey;
        this.selectedLang = _.find(this.availableLangs, { langKey });
    }
    get selectedLangKey(): string {
        return this.langKey;
    }
    private langKey: string = null;

    constructor() {
        this.selectedLangKey = 'en-GB';
    }
}

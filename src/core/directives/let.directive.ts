import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

interface LetContext<T> {
    ngLet: T;
}

@Directive({
    selector: '[ngLet]'
})
/**
 * Provides a possibility of storing a template variable
 */
export class LetDirective<T> {
    private _context: LetContext<T> = {ngLet: null};

    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
        _viewContainer.createEmbeddedView(_templateRef, this._context);
    }

    @Input()
    set ngLet(value: T) {
        this._context.ngLet = value;
    }
}

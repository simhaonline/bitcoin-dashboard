import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

export function getAnimationMeta() {
    return trigger('collapse', [
        state('visible', style({
            height: '*'
        })),
        state('collapsed', style({
            height: 0
        })),
        transition('* => *', animate('.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)'))
    ]);
}

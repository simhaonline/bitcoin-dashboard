import { Injectable } from '@angular/core';

export interface DebouncerConfig {
    delay?: number;
};

const DEBOUNCER_DEFAULT_CONFIG: DebouncerConfig = {
    delay: 100
};

@Injectable()
export class DebouncerService {
    public create(cb: () => void, config?: DebouncerConfig) {
        const options = { ...DEBOUNCER_DEFAULT_CONFIG, ...config };
        let timeout: any;

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => { cb(); }, options.delay);
        };
    }
}

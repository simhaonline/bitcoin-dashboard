import {
    Injectable,
} from '@angular/core';

if (typeof window !== 'undefined') {
    require('./../assets/vendor/trading-view');
}

interface TradingView {
    widget: (config: any) => void;
}

@Injectable()
export class TradingViewService {
    public getPrototype() {
        return (window as any).TradingView as TradingView;
    }
}

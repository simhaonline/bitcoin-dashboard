import { Observable } from 'rxjs';

export interface HotService<TOutput> {
    observe(): Observable<TOutput>;
    stop(): Promise<void>;
}

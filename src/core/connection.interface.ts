import { Observable } from 'rxjs';

export interface Connection {
    call(action: string, sig?: string, args?: object): Observable<any>;
    callRaw(
        action: string,
        sig?: string,
        args?: object,
        unfiltered?: boolean
    ): Observable<MessageOutput>;
}

export interface MessageOutput {
    id: string;
    success?: boolean;
    message?: string;
    notifications?: object[];
    result?: any;
    error?: number;
    usIn?: number;
    usOut?: number;
}

export interface MessageError {
    code: number;
    message: string;
}

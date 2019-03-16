import { Action } from '@ngrx/store';

import { RemoteStatusModel } from './../models/remote-status.model';

export const UPDATE_STATUS   = '[REMOTE-STATUS] UpdateStatus';

export class UpdateStatus implements Action {
    public readonly type = UPDATE_STATUS;

    constructor(public payload: RemoteStatusModel) {}
}

export type Actions = UpdateStatus;

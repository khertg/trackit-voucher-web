import { createAction } from '@reduxjs/toolkit';
import { Method } from 'axios';

export interface ApiPayload {
  url?: string;
  method?: Method;
  onStart?: string;
  onProcess?: string;
  onSuccess?: string;
  onError?: string;
  onEnd?: string;
  onUpdateFilter?: string;
  filterPayload?: any;
  data?: any;
}

export interface ApiAction {
  type: string;
  payload: ApiPayload;
}

export const apiCallBegan = createAction<any>('api/callBegan');
export const apiCallSuccess = createAction<any>('api/callSuccess');
export const apiCallFailed = createAction<any>('api/callFailed');

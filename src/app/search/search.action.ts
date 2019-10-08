import { createAction, props } from '@ngrx/store';
import { SearchResult } from '.';

export const fetchByTitle = createAction(
  '[Search] Fetch by title',
  props<{ payload: string; }>()
);

export const fetchByTitleSuccess = createAction(
  '[Search] Fetch by title success',
  props<{ payload: SearchResult}>()
);

export const fetchByTitleFailed = createAction(
  '[Search] Fetch by title failed',
  props<{ payload: any}>()
);



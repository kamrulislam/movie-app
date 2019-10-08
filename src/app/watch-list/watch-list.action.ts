import { createAction, props } from '@ngrx/store';
import { SearchResult, Movie } from '../search';

export const loadExisting = createAction(
  '[WatchList] Load existing'
);

export const loadExistingSuccess = createAction(
  '[WatchList] Load existing success',
  props<{ payload: SearchResult}>()
);

export const addMovie = createAction(
  '[WatchList] Add movie',
  props<{ payload: Movie}>()
);





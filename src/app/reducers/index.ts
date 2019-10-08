import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromSearchReducer from '../search/search.reducer';
import * as fromWatchListReducer from '../watch-list/watch-list.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  search: fromSearchReducer.reducer,
  watchList: fromWatchListReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

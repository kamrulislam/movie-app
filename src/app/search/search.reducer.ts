import { SearchResult } from '.';
import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as SearchActions from './search.action';

export interface SearchState {
  searchResult: SearchResult;
  page: number;
  searchText: string;
}

export const initialState: SearchState = {
  searchResult: undefined,
  searchText: '',
  page: 1
};

const searchdReducer = createReducer(
  initialState,
  on(SearchActions.fetchByTitle, (state, {payload, page}) => ({ ...state, searchText: payload, page})),
  on(SearchActions.fetchByTitleSuccess, (state, {payload}) => ({ ...state, searchResult: payload }))
);

export function reducer(state: SearchState | undefined, action: Action) {
  return searchdReducer(state, action);
}

export const selectFeature = state => state.search;

export const selectSearchResult = createSelector(
  selectFeature,
  (state: SearchState) => state.searchResult
);

export const selectPage = createSelector(
  selectFeature,
  (state: SearchState) => state.page
);

export const selectSearchText = createSelector(
  selectFeature,
  (state: SearchState) => state.searchText
);





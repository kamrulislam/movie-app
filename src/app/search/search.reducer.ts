import { SearchResult } from '.';
import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as SearchActions from './search.action';
import { ViewStatus } from './enum';

export interface SearchState {
  searchResult: SearchResult;
  page: number;
  searchText: string;
  viewStatus: ViewStatus;
  error: any;
}

export const initialState: SearchState = {
  searchResult: undefined,
  error: undefined,
  searchText: '',
  page: 1,
  viewStatus: ViewStatus.Initial
};

const searchdReducer = createReducer(
  initialState,
  on(SearchActions.fetchByTitle,
    (state, {payload, page}) => ({ ...initialState, searchText: payload, page, viewStatus: ViewStatus.Loading})),
  on(SearchActions.fetchByTitleSuccess,
    (state, {payload}) => ({ ...state, searchResult: payload, viewStatus: ViewStatus.Loaded })),
  on(SearchActions.fetchByTitleFailed,
    (state, {payload}) => ({ ...state, searchResult: payload, viewStatus: ViewStatus.Loaded }))
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

export const selectViewStatus = createSelector(
  selectFeature,
  (state: SearchState) => state.viewStatus
);

export const selectError = createSelector(
  selectFeature,
  (state: SearchState) => state.error
);





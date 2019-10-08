import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as WatchListActions from './watch-list.action';
import { Movie } from '../search';


export interface WatchListState {
  movies: Array<Movie>;
  movieIdMap: {[key: string]: boolean};
}

export const initialState: WatchListState = {
  movies: [],
  movieIdMap: {}
};

const addMovie = (state: WatchListState, payload: Movie) => {
  if (state.movieIdMap[payload.imdbID]) {
    return state;
  }
  return {
    movies: [...state.movies, payload],
    movieIdMap: {
      ...state.movieIdMap,
      [payload.imdbID]: true
    }
  };
}

const watchListReducer = createReducer(
  initialState,
  on(WatchListActions.addMovie, (state, {payload}) => addMovie(state, payload))
);

export function reducer(state: WatchListState | undefined, action: Action) {
  return watchListReducer(state, action);
}

export const selectFeature = state => state.watchList;

export const selectMovies = createSelector(
  selectFeature,
  (state: WatchListState) => state.movies
);





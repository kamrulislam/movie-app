import { SearchResult } from '.';
import { Action, createReducer, on, createSelector } from '@ngrx/store';
// import { fetchByTitle } from './search.action';
import * as WatchListActions from './watch-list.action';
import { Movie } from '../search';


export interface WatchListState {
  movies: Array<Movie>;
  movieIdMap: Map<string, boolean>;
}

export const initialState: WatchListState = {
  movies: [],
  movieIdMap: new Map<string, boolean>()
};

// export function reducer(state = initialState, action: Action): SearchState {
//   switch (action.type) {
//     case SearchActions.fetchByTitle.type:
//       console.log('fetch by title');
//       break;
//   }

//   return state;
// }

const addMovie = (state: WatchListState, payload: Movie) => {
  if (state.movieIdMap.has(payload.imdbID)) {
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

export const selectFeature = (state: WatchListState) => state;

export const selectMovies = createSelector(
  selectFeature,
  (state: WatchListState) => state.movies
);





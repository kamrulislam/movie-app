import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SearchService } from './search.service';
import { fetchByTitle, fetchByTitleSuccess, fetchByTitleFailed } from './search.action';


@Injectable()
export class SearchEffects {

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchByTitle.type),
      mergeMap(({payload}) => this.searchService.fetchMovies(payload)
        .pipe(
          map(searchResult => (fetchByTitleSuccess({payload: searchResult}))),
          catchError((error) => of(fetchByTitleFailed({payload: error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}
}

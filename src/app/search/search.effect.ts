import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SearchService } from './search.service';
import { fetchByTitle, fetchByTitleSuccess, fetchByTitleFailed } from './search.action';


@Injectable()
export class SearchEffects {

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchByTitle.type),
      switchMap(({payload, page}) => this.searchService.fetchMovies(payload, page)
        .pipe(
          map(searchResult => (fetchByTitleSuccess({payload: {...searchResult, searchText: payload, page}}))),
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

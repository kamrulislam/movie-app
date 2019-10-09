import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { SearchResult, Movie } from '.';
import { tap, map, filter } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { fetchByTitle } from './search.action';
import { selectSearchResult, selectViewStatus } from './search.reducer';
import { ViewStatus } from './enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searched = false;
  error = false;
  errorMessage = '';
  ViewStatus = ViewStatus;
  viewStatus$: Observable<ViewStatus>;
  movies$: Observable<Array<Movie>>;
  options = ['ADD'];

  constructor(
    private fb: FormBuilder,
    private store: Store<any>) { }

  ngOnInit() {
    this.searchForm =  this.fb.group({
      search: ['', Validators.required]
    });
    this.observerSearchedMovieChanges();
    this.viewStatus$ = this.store.select(selectViewStatus);
  }

  submit() {
    this.store.dispatch(fetchByTitle({payload: this.searchForm.value.search.trim(), page: 1}));
  }

  private observerSearchedMovieChanges() {
    this.movies$ = this.store.select(selectSearchResult).pipe(
      tap(() => this.error = false),
      filter(searchResult => !!searchResult),
      tap((searchResult: SearchResult) => {
        this.error = searchResult.Response === 'False';
        if (this.error) {
          this.errorMessage = searchResult.Error;
        }
      }),
      map((searchResult: SearchResult) => {
        if (searchResult.Response === 'False') {
          return [];
        }
        this.searchForm.patchValue({search: searchResult.searchText});
        return searchResult.Search;
      })
    );

  }
}

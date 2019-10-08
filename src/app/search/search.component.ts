import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { SearchResult, Movie } from '.';
import { tap, map, filter } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { fetchByTitle } from './search.action';
import { selectSearchResult } from './search.reducer';
import { addMovie } from '../watch-list/watch-list.action';

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
  movies$: Observable<Array<Movie>>;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>) { }

  ngOnInit() {
    this.searchForm =  this.fb.group({
      search: ['', Validators.required]
    });
    this.observerSearchedMovieChanges();
  }

  submit() {
    this.store.dispatch(fetchByTitle({payload: this.searchForm.value.search}));
  }

  add(movie: Movie) {
    console.log(movie);
    this.store.dispatch(addMovie({payload: movie}));
  }

  private observerSearchedMovieChanges() {
    this.movies$ = this.store.select(selectSearchResult).pipe(
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
        return searchResult.Search;
      })
    );

  }
}

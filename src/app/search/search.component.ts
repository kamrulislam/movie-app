import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { SearchServiceService } from './search-service.service';
import { SearchResult, Movie } from '.';
import { tap, map } from 'rxjs/internal/operators';

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
    private searchService: SearchServiceService) { }

  ngOnInit() {
    this.searchForm =  this.fb.group({
      search: ['', Validators.required]
    });
  }

  submit() {
    this.movies$ = this.searchService.fetchMovies(this.searchForm.value.search).pipe(
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

  add(movie: Movie) {
    console.log(movie);
  }
}

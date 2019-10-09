import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../search';
import { addMovie, removeMovie } from '../watch-list/watch-list.action';
import { Subscription } from 'rxjs';
import { selectPage, selectSearchText } from '../search/search.reducer';
import { fetchByTitle } from '../search/search.action';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements OnInit, OnDestroy {
  @Input()
  error = false;
  @Input()
  errorMessage = '';
  @Input()
  movies$: Observable<Array<Movie>>;
  @Input()
  showPreviousNext = false;
  @Input()
  options: Array<string>;

  currentPage = 1;
  pageSubscription$$: Subscription;

  searchText: string;
  searchTextSubscription$$: Subscription;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.pageSubscription$$ = this.store.select(selectPage).subscribe(
      page => this.currentPage = page
    );
    this.searchTextSubscription$$ = this.store.select(selectSearchText).subscribe(
      searchText => this.searchText = searchText
    );

  }

  add(movie: Movie) {
    this.store.dispatch(addMovie({payload: movie}));
  }

  remove(movie: Movie) {
    this.store.dispatch(removeMovie({payload: movie}));
  }

  loadNext() {
    this.store.dispatch(fetchByTitle({payload: this.searchText, page: this.currentPage + 1}));
  }

  loadPrev() {
    if (this.currentPage > 1) {
      this.store.dispatch(fetchByTitle({payload: this.searchText, page: this.currentPage - 1}));
    }

  }

  ngOnDestroy(): void {
    this.pageSubscription$$.unsubscribe();
  }

}

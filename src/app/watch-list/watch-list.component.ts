import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../search';
import { selectMovies } from './watch-list.reducer';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  movieWatchList$: Observable<Array<Movie>>;
  options = ['REMOVE'];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.movieWatchList$ = this.store.select(selectMovies);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../search';
import { addMovie } from '../watch-list/watch-list.action';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements OnInit {
  @Input()
  error = false;
  @Input()
  errorMessage = '';
  @Input()
  movies$: Observable<Array<Movie>>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }


  add(movie: Movie) {
    console.log(movie);
    this.store.dispatch(addMovie({payload: movie}));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SearchResult } from '.';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  fetchMovies(title: string, page: number = 1): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `http://www.omdbapi.com/?apikey=${environment.omdbApiKey}&s=${title}&page=${page}`
    );
  }
}

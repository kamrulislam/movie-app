import { MovieType } from './enum';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}

export interface SearchResult {
  Response: 'True' | 'False';
  Error?: string;
  Search?: Array<Movie>;
  totalResults?: number;
}

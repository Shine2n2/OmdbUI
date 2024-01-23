import { Injectable, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import { Moviesearch } from './models/moviesearch';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor() { }



movieData: Moviesearch | null = null;

storeMovieData(arg: Moviesearch): void {
  this.movieData = arg;
}

getStoredMovieData(id:string): Movie | undefined {
  if( this.movieData !==null) {
    return this.movieData?.Search.find(movie => movie.imdbID === id);
  }
 return
}



}

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Moviesearch } from './models/moviesearch';
import { Observable } from 'rxjs';
import { MovieDataService } from './movie-data.service';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string ='';
  searchResults: Movie[] = [];
  //searchResults: Moviesearch | any;

  latestQueries: string[] = [];
  moviesResult: Moviesearch | any;
  sNumber: number = 0;
  searchLenth: number = 0

  constructor(private http: HttpClient, private router: Router, private _dataMovieService: MovieDataService) { }

  ngOnInit(): void {

    this.getTopSearchQueries();
  }




  showDetails(imdbID: string): void {
    this.router.navigate(['/movie-details', imdbID]);
  }

  searchMoviesApi(searchTerm: string): Observable<Moviesearch> {
     return this.http.get<Moviesearch>('http://localhost:5212/api/Movie/search/' + searchTerm);
  }

  topSearchedQueriesApi(): Observable<any> {
     return this.http.get<any>('http://localhost:5212/api/Movie/latestQueries');
  }


  getSearchResult(): void
  {

    this.searchMoviesApi(this.title)
    .subscribe(
      (response)=>
      {
        this._dataMovieService.storeMovieData(response);
        this.searchResults = response.search;
        console.log("expected api res---", response.search);
       }
    );
  }

  getTopSearchQueries(): void
  {
    this.topSearchedQueriesApi()
    .subscribe(
      (response)=>
      {
        this.latestQueries = response
        console.log("expected query res---", this.latestQueries);
       }
    );
  }

}

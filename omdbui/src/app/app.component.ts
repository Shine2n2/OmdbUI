import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Moviesearch } from './models/moviesearch';
import { Observable } from 'rxjs';
import { MovieDataService } from './movie-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string ='';
  searchResults: any[] = [];
  latestQueries: string[] = [];
  moviesResult:Moviesearch[]= [];
  sNumber: number = 0;

  constructor(private http: HttpClient, private router: Router, private _dataMovieService: MovieDataService) { }

  ngOnInit(): void {

  }


  private saveLatestQuery(): void {
    if (this.latestQueries.length >= 5) {
      this.latestQueries.pop();
    }

    this.latestQueries.unshift(this.title);
  }


  handlePageChange(page: number): void {
    console.log('Page changed to:', page);
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

    let books: { title: string, year: number }[] = [
      { title: "Book 1", year: 2022 },
      { title: "Book 2", year: 2023 },
      { title: "Book 3", year: 2024 },
      { title: "Book 4", year: 2025 },
      { title: "Book 5", year: 2026 },
      { title: "Book 6", year: 2027 },
      { title: "Book 4", year: 2025 },
      { title: "Book 5", year: 2026 },
      { title: "Book 6", year: 2027 }
      ];

      this.searchResults = books;

    this.searchMoviesApi(this.title)
    .subscribe(
      (response)=>
      {
        this._dataMovieService.storeMovieData(response);
        console.log(response);
       }
    );
  }

  getTopSearchQueries(): void
  {
    this.topSearchedQueriesApi()
    .subscribe(
      (response)=>
      {
        this.moviesResult = response;
        this.latestQueries = response
        console.log(response);
       }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { MovieDataService } from '../movie-data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})


export class MovieDetailsComponent implements OnInit {
  imdbID: any;
  type: string ='';
  title: string ='';
  image: string='';
  year: string ='';


  constructor(private route: ActivatedRoute, private http: HttpClient, private _movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      {
      this.imdbID = params.get('imdbID');
      this.loadMovieDetails(this.imdbID);
    });
  }

  loadMovieDetails(id:any): void {
     var result = this._movieDataService.getStoredMovieData(this.imdbID);
     if(result){
      this.title = result?.Title;
      this.type = result?.Type;
      this.year = result?.Year;
      this.image = result?.Poster;
     }
  }
}

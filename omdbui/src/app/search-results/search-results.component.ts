import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Moviesearch } from '../models/moviesearch';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  @Input() searchResults: any[] = [];
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pageSize: number = 5;
  currentPage: number = 1;

  constructor(private http: HttpClient) { }

  getPaginatedResults(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.searchResults.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.searchResults.length / this.pageSize);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  searchMovies(searchTerm: string): Observable<Moviesearch> {
    return this.http.get<Moviesearch>('http://localhost:5212/api/Movie/search/' + searchTerm);
  }



}

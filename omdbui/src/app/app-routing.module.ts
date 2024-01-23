import { EventEmitter, Input, NgModule, Output } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';



const routes: Routes = [
  { path: 'results', component: SearchResultsComponent },
  { path: 'movie-detail', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { WatchListComponent } from './watch-list/watch-list.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: SearchComponent
}, {
  path: 'watch-list',
  pathMatch: 'full',
  component: WatchListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

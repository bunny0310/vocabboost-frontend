import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddWordComponent } from './add-word/add-word.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'add-word', component: AddWordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

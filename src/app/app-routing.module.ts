import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddWordComponent } from './add-word/add-word.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard} from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AllWordsComponent } from './all-words/all-words.component';


const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'add-word', component: AddWordComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'words', component: AllWordsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

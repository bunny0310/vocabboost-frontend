import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../helpers.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


const url = 'https://vocab-booster.herokuapp.com';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated = true;
  missingFields = false;
  serverError = false;
  constructor(
    private helpersService: HelpersService, private http: HttpClient, private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  validateLogin(username, password) {
    if (this.helpersService.loginFormCheck()) {
      this.missingFields = false;
      const data = {username: username.value, password: password.value};
      this.http.post<any>(url + '/api/login', {username: username.value, password: password.value}, {observe: 'response'})
      .subscribe((response) => {
        console.log(response);
        if (response.status !== 200) {
          this.serverError = true;
        } else {
          this.authenticated = true;
          this.authService.setUserInfo({user : response.body.username});
          this.router.navigate(['/']);
        }
      });
    } else {
      this.missingFields = true;
    }
  }

}

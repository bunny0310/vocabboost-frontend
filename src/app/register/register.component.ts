import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../helpers.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


const url = 'https://vocab-booster.herokuapp.com';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  validateRegister(username, password) {
    if (this.helpersService.registerFormCheck()) {
      this.missingFields = false;
      const data = {username: username.value, password: password.value};
      this.http.post<any>(url + '/api/register', {username: username.value, password: password.value}, {observe: 'response'})
      .subscribe((response) => {
        console.log(response);
        if (response.status !== 200) {
          this.serverError = true;
        } else {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.missingFields = true;
    }
  }

}


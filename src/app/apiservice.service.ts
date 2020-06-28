import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

const url = 'https://vocab-booster.herokuapp.com';
//const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class APIServiceService {
  words: [] = [];
  constructor(private http: HttpClient, private authService: AuthService) { }
  wordsUpdated = new Subject<{data: []}>();

  public getWords(mode, keyword = null, type = null) {
    let endpoint = '/api/words';
    if (mode === 'random') {
      endpoint = '/api/random-words';
    } else if (mode === 'search') {
      endpoint = '/api/search-words';
    }
    const username = this.authService.isAuthenticated() ? JSON.parse(localStorage.getItem('userInfo')).user : '';
    if (username !== '') {
      this.http.post<[]>(url + endpoint, {username, keyword, type}, {withCredentials: true})
      .subscribe((res: any) => {
        this.words = res.data;
        this.wordsUpdated.next({data: res.data});
      });
    }
  }

  public getWordsUpdateListener() {
    return this.wordsUpdated.asObservable();
  }
}

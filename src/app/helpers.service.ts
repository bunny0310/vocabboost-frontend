import { Injectable } from '@angular/core';
import { Tag } from './chip-input/chip-input.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  public fieldsSet  = new Set();
  public fieldsLoginSet  = new Set();
  public fieldsRegisterSet  = new Set();
  public loading = false;
  constructor() { }
  includesTag(str: string, list: Tag[]) {
    for (let tag of list) {
      if (tag.tag === str) {
        return true;
      }
    }
    return false;
  }

  public toogleLoader() {
    this.loading = !this.loading;
  }

  public addWordFormCheck() {
    if (
      this.fieldsSet.has('synonyms') &&
      this.fieldsSet.has('types') &&
      this.fieldsSet.has('sentence') &&
      this.fieldsSet.has('name') &&
      this.fieldsSet.has('meaning')
    ) {
      return true;
    }
    return false;
  }
  public loginFormCheck() {
    if (
      this.fieldsLoginSet.has('username') &&
      this.fieldsLoginSet.has('password')
    ) {
      return true;
    }
    return false;
  }

  public registerFormCheck() {
    if (
      this.fieldsLoginSet.has('username') &&
      this.fieldsLoginSet.has('password')
    ) {
      return true;
    }
    return false;
  }

  includesString(str: string, list: string[]) {
    for (let elem of list) {
      if (elem === str) {
        return true;
      }
    }
    return false;
  }
}

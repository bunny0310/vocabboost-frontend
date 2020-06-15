import { Injectable } from '@angular/core';
import { Tag } from './chip-input/chip-input.component';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  public fieldsSet  = new Set();
  constructor() { }
  includesTag(str: string, list: Tag[]) {
    for (let tag of list) {
      if (tag.tag === str) {
        return true;
      }
    }
    return false;
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

  includesString(str: string, list: string[]) {
    for (let elem of list) {
      if (elem === str) {
        return true;
      }
    }
    return false;
  }
}

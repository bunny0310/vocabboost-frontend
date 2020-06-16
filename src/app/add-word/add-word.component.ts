import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../helpers.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Word {
  name: string;
  meaning: string;
  tags: string[];
  types: string[];
  sentence: string[];
  synonyms: string[];
}

const url = 'https://vocab-booster.herokuapp.com'

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})


export class AddWordComponent implements  OnInit {

  missingFields = false;
  serverError = false;
  constructor(private helpersService: HelpersService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  addWord(name, meaning, sentence, tags, synonyms, types) {

    const word: Word = {
      name: name.value,
      meaning: meaning.value,
      sentence: sentence.tags,
      tags: tags.tags,
      types: types.data,
      synonyms: synonyms.tags
    };
    console.log(this.helpersService.fieldsSet);
    if (this.helpersService.addWordFormCheck() === true) {
      this.missingFields = false;
      this.http.post(url + '/api/add-word', {word: JSON.stringify(word)}, {observe: 'response'}).
      subscribe((response) => {
        if (response.status === 200) {
          this.serverError = false;
          this.router.navigate(['']);
        } else {
          this.serverError = true;
        }
      });
    } else {
      this.missingFields = true;
    }
  }

}

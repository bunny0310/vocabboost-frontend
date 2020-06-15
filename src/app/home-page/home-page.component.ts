import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  constructor(private APIService: APIServiceService) { }
  words: [] = [];
  dataSource = new MatTableDataSource(this.words);
  wordsSub: Subscription;
  displayedColumns: string[] = ['name', 'meaning', 'sentence', 'types', 'tags', 'synonyms'];
  ngOnInit() {
    this.APIService.getWords('random');
    this.APIService.getWordsUpdateListener()
    .subscribe(response => {
      this.words = response.data;
      console.log(response.data);
      const arr: [] = [];
      for (let word of this.words) {
          arr.push(word);
      }
      this.dataSource.data = arr;
    });
  }

}

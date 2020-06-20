import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  constructor(private APIService: APIServiceService,
  public helpersService: HelpersService, public breakpointObserver: BreakpointObserver) { }
  words: [] = [];
  message = '';
  showContainer = false;
  dataSource = new MatTableDataSource(this.words);
  wordsSub: Subscription;
  displayedColumns: string[] = ['name', 'meaning', 'sentence', 'types', 'tags', 'synonyms'];
  ngOnInit() {
    this.APIService.getWords('random');
    this.helpersService.loading = true;
    this.APIService.getWordsUpdateListener()
    .subscribe(response => {
      this.words = response.data;
      console.log(response.data);
      const arr: [] = [];
      for (let word of this.words) {
          arr.push(word);
      }
      if (arr.length < 5) {
        this.message = 'You need to have atleast 5 words in your dictionary';
      } else {
        this.message = '';
      }
      this.dataSource.data = arr;
      this.helpersService.loading = false;
    });
    this.breakpointObserver
    .observe(['(max-width: 1150px)', '(max-height:600px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showContainer = true;
      } else {
        this.showContainer = false;
      }
    });
  }

}
